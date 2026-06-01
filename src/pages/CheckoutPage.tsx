import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Truck, ChevronDown, ChevronUp, Minus, Plus, Shield,
  Package, Zap, Store, Star, Eye, ShoppingBag, Check, Loader2,
  ArrowRight, RotateCcw, Phone, CreditCard, X
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import NyvaInlinePanel from "@/components/checkout/NyvaInlinePanel";
import mbwayLogo from "@/assets/mbway-logo.png";
import cardLogo from "@/assets/visa-mastercard-logo.png";
import { applyPromo, loadStoredPromo, saveStoredPromo, normalizePromo, type PromoCode } from "@/lib/promo";


/* ─── CONSTANTS ─── */
const FREE_SHIPPING_THRESHOLD = 0;
const SHIPPING_COST = 0;
const CART_TIMER_MINUTES = 15;

/* ─── PT Postal Code → City / District lookup (simplified) ─── */
const POSTAL_CITY_MAP: Record<string, string> = {
  "1": "Lisboa", "2": "Lisboa", "3": "Coimbra", "4": "Porto",
  "5": "Vila Real", "6": "Castelo Branco", "7": "Évora", "8": "Faro",
  "9": "Funchal",
};
const POSTAL_DISTRICT_MAP: Record<string, string> = {
  "1": "Lisboa", "2": "Setúbal", "3": "Coimbra", "4": "Porto",
  "5": "Vila Real", "6": "Castelo Branco", "7": "Évora", "8": "Faro",
  "9": "Madeira",
};

function getCityFromPostal(code: string): string {
  const first = code.charAt(0);
  return POSTAL_CITY_MAP[first] || "";
}
function getDistrictFromPostal(code: string): string {
  const first = code.charAt(0);
  return POSTAL_DISTRICT_MAP[first] || "";
}

/* ─── Delivery date calculation (skip weekends) ─── */
function getDeliveryDate(businessDays: number): string {
  const date = new Date();
  let added = 0;
  while (added < businessDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });
}

/* ─── Cart Timer Hook ─── */
function useCartTimer() {
  const [seconds, setSeconds] = useState(() => {
    const stored = localStorage.getItem("checkout-timer");
    if (stored) {
      const remaining = Math.floor((parseInt(stored) - Date.now()) / 1000);
      return remaining > 0 ? remaining : CART_TIMER_MINUTES * 60;
    }
    const end = Date.now() + CART_TIMER_MINUTES * 60 * 1000;
    localStorage.setItem("checkout-timer", String(end));
    return CART_TIMER_MINUTES * 60;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 0) return 0;
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return { mins, secs, expired: seconds <= 0 };
}

/* ─── FOMO Hook ─── */
function useFomo() {
  const [viewers, setViewers] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => Math.max(8, v + Math.floor(Math.random() * 5) - 2));
    }, 25000);
    return () => clearInterval(interval);
  }, []);
  return viewers;
}

/* ─── SIZE GUIDE MODAL ─── */
const SizeGuideModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-checkout-heading text-xl font-bold text-[#111]">Guia de Tamanhos</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <table className="w-full text-sm font-checkout-body">
          <thead>
            <tr className="border-b"><th className="py-2 text-left">Tamanho</th><th>Peito (cm)</th><th>Comprimento (cm)</th></tr>
          </thead>
          <tbody>
            {[["S","96","70"],["M","100","72"],["L","104","74"],["XL","108","76"],["2XL","112","78"]].map(([s,p,c]) => (
              <tr key={s} className="border-b"><td className="py-2 font-semibold">{s}</td><td className="text-center">{p}</td><td className="text-center">{c}</td></tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

/* ─── MAIN CHECKOUT PAGE ─── */
const CheckoutPage = () => {
  const { items, updateQuantity } = useCart();
  const navigate = useNavigate();
  const timer = useCartTimer();
  const viewers = useFomo();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  
  const [shipping] = useState<"standard">("standard");
  const [payment, setPayment] = useState<"card" | "mbway">("mbway");
  const [mbwayPhone, setMbwayPhone] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderExpanded, setOrderExpanded] = useState(false);

  // Personalization upsell
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [persName, setPersName] = useState("");
  const [persNumber, setPersNumber] = useState("");
  const [persAccepted, setPersAccepted] = useState(false);

  // NYVA inline embed
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isCreatingEmbed, setIsCreatingEmbed] = useState(false);
  const [embedError, setEmbedError] = useState<string | null>(null);

  // Promo code
  const [promoCode, setPromoCode] = useState<PromoCode | null>(() => loadStoredPromo());
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  // Calculations (com promo aplicado)
  const promo = applyPromo(items, promoCode);
  const effectiveItems = promo.items;
  const originalSubtotal = promo.originalSubtotal;
  const subtotal = promo.subtotal;
  const discount = promo.discount;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const personalizationCost = persAccepted ? 9.99 : 0;
  const total = subtotal + shippingCost + personalizationCost;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
  const deliveryDays = 5;
  const deliveryDate = getDeliveryDate(deliveryDays);

  const applyPromoCode = () => {
    const valid = normalizePromo(promoInput);
    if (!valid) {
      setPromoError("Código inválido");
      return;
    }
    setPromoCode(valid);
    saveStoredPromo(valid);
    setPromoInput("");
    setPromoError(null);
  };

  const removePromoCode = () => {
    setPromoCode(null);
    saveStoredPromo(null);
    setPromoError(null);
  };

  // Stock simulation
  const stockLeft = 3;

  // Postal code → city + district
  useEffect(() => {
    if (postalCode.length >= 4) {
      setCity(getCityFromPostal(postalCode));
      setDistrict((prev) => prev || getDistrictFromPostal(postalCode));
    }
  }, [postalCode]);

  // Validation
  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Nome é obrigatório";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Email inválido";
    if (!phone.trim()) e.phone = "Telemóvel é obrigatório";
    if (!address.trim()) e.address = "Morada é obrigatória";
    if (!postalCode.trim() || !/^\d{4}-?\d{3}$/.test(postalCode.replace(/\s/g, ""))) e.postalCode = "Código postal inválido (XXXX-XXX)";
    if (!city.trim()) e.city = "Cidade é obrigatória";
    if (!district.trim()) e.district = "Distrito é obrigatório";
    if (payment === "mbway" && !mbwayPhone.trim()) e.mbwayPhone = "Número MB Way é obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [name, email, phone, address, postalCode, city, district, payment, mbwayPhone]);

  // Form válido para cartão (NÃO obriga mbwayPhone)
  const isCardFormValid =
    name.trim() !== "" &&
    /\S+@\S+\.\S+/.test(email.trim()) &&
    phone.trim() !== "" &&
    address.trim() !== "" &&
    /^\d{4}-?\d{3}$/.test(postalCode.replace(/\s/g, "")) &&
    city.trim() !== "" &&
    district.trim() !== "";

  const productName =
    items.length === 1
      ? `${items[0].name}${items[0].color ? ` ${items[0].color}` : ""}${items[0].size ? ` (${items[0].size})` : ""}`
      : `MRTUGA — ${items.length} artigos`;

  const createCardEmbed = useCallback(async () => {
    if (isCreatingEmbed || embedUrl) return;
    setIsCreatingEmbed(true);
    setEmbedError(null);
    try {
      const { data, error } = await supabase.functions.invoke("create-nyva-embed", {
        body: {
          amount: total,
          customer_email: email,
          customer_name: name,
          product_name: productName,
          billing_address: {
            name,
            line1: address,
            city,
            state: district,
            postalCode,
            country: "PT",
          },
          metadata: {
            items: effectiveItems.map((i) => ({
              name: i.name, color: i.color, size: i.size, qty: i.quantity, unit: i.unitPrice,
            })),
            shipping: { name, phone, address, postalCode, city },
            personalization: persAccepted ? { name: persName, number: persNumber } : null,
            promo_code: promoCode,
            discount,
          },
        },
      });
      if (error) throw error;
      if (!data?.embed_url) throw new Error("Sem embed_url");
      setEmbedUrl(data.embed_url as string);
    } catch (err) {
      setEmbedError(err instanceof Error ? err.message : "Erro ao iniciar pagamento");
    } finally {
      setIsCreatingEmbed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, email, name, productName, effectiveItems, phone, address, postalCode, city, persAccepted, persName, persNumber, promoCode, discount, embedUrl, isCreatingEmbed]);

  // Auto-criar embed quando seleciona cartão e form fica válido
  useEffect(() => {
    if (payment === "card" && isCardFormValid && !embedUrl && !isCreatingEmbed && !embedError) {
      createCardEmbed();
    }
  }, [payment, isCardFormValid, embedUrl, isCreatingEmbed, embedError, createCardEmbed]);

  // Invalida o embed se mudar de método ou alterar dados-chave
  useEffect(() => {
    if (payment !== "card" && embedUrl) setEmbedUrl(null);
  }, [payment, embedUrl]);

  useEffect(() => {
    // Se o total ou email mudarem depois de criado, marcar como stale
    setEmbedUrl(null);
    setEmbedError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, email, name, phone, address, postalCode, city, promoCode, persAccepted]);

  const handleSubmit = async () => {
    if (!validate()) return;
    // Cartão é tratado inline pelo iframe — só MB Way passa por aqui
    if (payment === "card") return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-nyva-checkout", {
        body: {
          packs: items.map((i) => ({
            size: i.quantity,
            attributes: [
              { key: "_lov_item_1_name", value: i.name },
              { key: "_lov_item_1_color", value: i.color ?? "" },
              { key: "_lov_item_1_size", value: i.size ?? "" },
            ],
          })),
          market: "PT",
        },
      });
      if (error) throw error;
      if (!data?.url) throw new Error("Sem url de pagamento");
      window.location.href = data.url as string;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao iniciar pagamento";
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-checkout-body">
        <ShoppingBag size={48} className="text-muted-foreground/40 mb-4" />
        <h2 className="font-checkout-heading text-2xl font-bold text-[#111] mb-2">O teu carrinho está vazio</h2>
        <button onClick={() => navigate("/")} className="mt-4 bg-checkout-cta text-black font-bold px-8 py-3 rounded hover:bg-checkout-cta-hover transition-colors">
          VOLTAR À LOJA
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-checkout-body text-[#111]">
      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      {/* NYVA agora renderiza inline na secção de pagamento */}

      {/* ─── TOP BAR (sticky) ─── */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex items-center justify-between text-xs font-checkout-heading font-semibold uppercase tracking-wider">
            <span className="text-muted-foreground">Carrinho</span>
            <div className="flex-1 mx-3 h-0.5 bg-muted relative">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-foreground" />
            </div>
            <span className="text-foreground font-bold">Pagamento</span>
            <div className="flex-1 mx-3 h-0.5 bg-muted" />
            <span className="text-muted-foreground">Confirmação</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-40 md:pb-24">

        {/* ─── SECTION 1: URGENCY STRIP ─── */}
        <div className="bg-checkout-urgency text-white py-2 px-4 -mx-4 mt-0">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 text-xs font-checkout-body">
            <span>⚡ Apenas <strong>{stockLeft}</strong> no teu tamanho</span>
            <span className="text-white/40">|</span>
            <motion.span
              key={timer.secs}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="font-bold tabular-nums tracking-wider"
            >
              ⏱ {String(timer.mins).padStart(2, "0")}:{String(timer.secs).padStart(2, "0")}
            </motion.span>
          </div>
        </div>

        {/* ─── SECTION 2: COMPACT ORDER SUMMARY ─── */}
        <section className="mt-6">
          <div className="bg-[#fafafa] rounded-lg p-4">
            <button
              onClick={() => setOrderExpanded(!orderExpanded)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-muted-foreground" />
                <span className="font-checkout-heading font-bold text-sm">
                  {items.length} {items.length === 1 ? "artigo" : "artigos"}
                </span>
                {orderExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              <span className="font-checkout-heading text-lg font-bold">{total.toFixed(2)}€</span>
            </button>

            <AnimatePresence>
              {orderExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t space-y-2">
                    {effectiveItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded border flex items-center justify-center flex-shrink-0">
                          <img src={item.image || "/lovable-uploads/dd6d21cb-9655-4120-bc20-560351fcf99d.png"} alt={item.name} className="w-10 h-10 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{item.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="bg-[#111] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">{item.size}</span>
                            <span className="text-[10px] text-muted-foreground">×{item.quantity}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold">{(item.unitPrice * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        {discount > 0 ? (
                          <span>
                            <span className="line-through text-muted-foreground mr-1">{originalSubtotal.toFixed(2)}€</span>
                            <span className="font-bold">{subtotal.toFixed(2)}€</span>
                          </span>
                        ) : (
                          <span>{subtotal.toFixed(2)}€</span>
                        )}
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-checkout-trust font-bold">
                          <span>Desconto ({promoCode})</span>
                          <span>−{discount.toFixed(2)}€</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Envio</span>
                        <span className="text-checkout-trust font-bold">GRÁTIS</span>
                      </div>
                      {persAccepted && <div className="flex justify-between"><span>Personalização</span><span>{personalizationCost.toFixed(2)}€</span></div>}
                    </div>

                    {/* Promo code */}
                    <div className="pt-3 mt-2 border-t">
                      {promoCode ? (
                        <div className="flex items-center justify-between bg-checkout-trust/10 border border-checkout-trust/30 rounded px-3 py-2">
                          <span className="text-xs font-bold text-checkout-trust">✓ {promoCode} aplicado — tudo a 1€</span>
                          <button type="button" onClick={removePromoCode} className="text-[10px] underline text-muted-foreground hover:text-[#111]">remover</button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoInput}
                              onChange={(e) => { setPromoInput(e.target.value); setPromoError(null); }}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyPromoCode(); } }}
                              placeholder="Código promocional"
                              className="flex-1 border border-muted px-3 py-2 text-xs font-checkout-body focus:outline-none focus:border-[#111]"
                            />
                            <button type="button" onClick={applyPromoCode} className="bg-[#111] text-white px-3 py-2 text-[11px] font-bold tracking-wider uppercase">
                              APLICAR
                            </button>
                          </div>
                          {promoError && <p className="text-[10px] text-red-600 mt-1">{promoError}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Free shipping progress */}
            {remainingForFreeShipping > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-1">Faltam <strong>{remainingForFreeShipping.toFixed(2)}€</strong> para envio grátis</p>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-checkout-trust rounded-full" initial={{ width: 0 }} animate={{ width: `${shippingProgress * 100}%` }} transition={{ duration: 0.6 }} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── EMAIL FIRST (capture lead ASAP) ─── */}
        <section className="mt-6">
          <h2 className="font-checkout-heading text-xl font-bold mb-3">Para onde enviamos?</h2>
          <div className="space-y-3">
            <FormField label="Email" type="email" value={email} onChange={setEmail} error={errors.email} placeholder="joao@email.com" hint="Recebes confirmação e tracking neste email" />
            <FormField label="Nome completo" value={name} onChange={setName} error={errors.name} placeholder="João Silva" />
            <FormField label="Telemóvel" type="tel" value={phone} onChange={setPhone} error={errors.phone} placeholder="+351 912 345 678" inputMode="tel" />
          </div>
        </section>

        {/* ─── SECTION 3: SHIPPING INFO ─── */}
        <section className="mt-6">
          <div className="flex items-center justify-between bg-[#fafafa] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Package size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold">Envio Standard — 3-5 dias úteis</p>
                <p className="text-xs text-muted-foreground">Recebe até: <strong className="text-foreground">{deliveryDate}</strong></p>
              </div>
            </div>
            <span className="text-sm font-bold text-checkout-trust">GRÁTIS ✓</span>
          </div>

          {remainingForFreeShipping > 0 && (
            <div className="mt-3 bg-muted border border-foreground/20 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">
                🚚 Faltam <strong className="text-checkout-urgency">{remainingForFreeShipping.toFixed(2)}€</strong> para envio grátis!
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                <motion.div className="h-full bg-foreground rounded-full" initial={{ width: 0 }} animate={{ width: `${shippingProgress * 100}%` }} transition={{ duration: 0.6 }} />
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full text-sm font-bold text-foreground underline underline-offset-2 hover:text-foreground/70 transition-colors"
              >
                ← Voltar à loja e adicionar mais artigos
              </button>
            </div>
          )}
        </section>

        {/* ─── SECTION 4: PERSONALIZATION UPSELL ─── */}
        {!persAccepted && (
          <section className="mt-8">
            <div className="border-2 border-dashed border-foreground bg-muted rounded-lg p-5">
              <p className="font-checkout-heading text-lg font-bold mb-1">⚽ Queres personalizar a camisola?</p>
              <p className="text-sm text-muted-foreground mb-3">Adiciona nome e número por apenas <strong className="text-[#111]">+9,99€</strong></p>
              <div className="flex gap-3">
                <button onClick={() => { setPersAccepted(true); setShowPersonalization(true); }} className="bg-checkout-cta text-black font-bold text-sm px-5 py-2.5 rounded hover:bg-checkout-cta-hover transition-colors">
                  Sim, quero personalizar
                </button>
                <button className="text-sm text-muted-foreground underline">Não, obrigado</button>
              </div>
            </div>
          </section>
        )}

        {persAccepted && showPersonalization && (
          <section className="mt-4 bg-muted border border-foreground/20 rounded-lg p-5">
            <h3 className="font-checkout-heading font-bold text-lg mb-3">Personalização</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nome (máx. 12 carateres)</label>
                <input value={persName} onChange={(e) => setPersName(e.target.value.slice(0, 12).toUpperCase())} className="w-full border rounded px-3 py-2 text-sm font-bold uppercase tracking-wider" placeholder="NOME" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Número (1-99)</label>
                <input type="number" min={1} max={99} value={persNumber} onChange={(e) => setPersNumber(e.target.value)} className="w-full border rounded px-3 py-2 text-sm font-bold" placeholder="10" inputMode="numeric" />
              </div>
            </div>
            {(persName || persNumber) && (
              <div className="mt-3 bg-[#111] text-white rounded p-4 text-center">
                <p className="font-checkout-heading text-2xl font-bold tracking-widest">{persName || "NOME"}</p>
                <p className="font-checkout-heading text-4xl font-extrabold">{persNumber || "10"}</p>
              </div>
            )}
          </section>
        )}

        {/* ─── SECTION 5: SHIPPING ADDRESS ─── */}
        <section className="mt-6">
          <h2 className="font-checkout-heading text-xl font-bold mb-3">Morada de Entrega</h2>
          <div className="space-y-3">
            <FormField label="Morada completa" value={address} onChange={setAddress} error={errors.address} placeholder="Rua dos Campeões, Nº 10, 2º Esq." />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Código Postal" value={postalCode} onChange={setPostalCode} error={errors.postalCode} placeholder="1000-001" inputMode="numeric" />
              <FormField label="Cidade" value={city} onChange={setCity} error={errors.city} placeholder="Lisboa" />
            </div>
            <FormField label="Distrito" value={district} onChange={setDistrict} error={errors.district} placeholder="Lisboa, Porto, Setúbal…" />
            
          </div>
        </section>

        {/* ─── SECTION 6: PAYMENT METHODS ─── */}
        <section className="mt-6">
          <h2 className="font-checkout-heading text-xl font-bold mb-3">Método de Pagamento</h2>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: "mbway" as const, logo: mbwayLogo, label: "MB Way", highlight: true },
              { id: "card" as const, logo: cardLogo, label: "Cartão" },
            ] as const).map((m) => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                  payment === m.id ? "border-foreground bg-muted" : "border-muted hover:border-muted-foreground/30"
                } ${"highlight" in m && m.highlight ? "ring-2 ring-foreground/30" : ""}`}
              >
                {"highlight" in m && m.highlight && <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-foreground text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">🔥 MAIS RÁPIDO</span>}
                <img src={m.logo} alt={m.label} className="h-6 w-auto object-contain" />
                <span className="text-[11px] font-semibold">{m.label}</span>
              </button>
            ))}
          </div>

          {payment === "mbway" && (
            <div className="mt-3">
              <FormField label="Número MB Way" type="tel" value={mbwayPhone} onChange={setMbwayPhone} error={errors.mbwayPhone} placeholder="+351 912 345 678" inputMode="tel" />
            </div>
          )}

          {/* Iframe NYVA inline para cartão */}
          {payment === "card" && (
            <>
              {!isCardFormValid && (
                <div className="mt-3 p-3 rounded-lg border border-muted bg-muted/40 text-xs text-muted-foreground">
                  Preenche os dados de envio acima para carregar o pagamento seguro com cartão.
                </div>
              )}
              {isCardFormValid && isCreatingEmbed && !embedUrl && (
                <div className="mt-3 p-6 rounded-lg border border-muted bg-white flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 size={16} className="animate-spin" /> A preparar pagamento seguro…
                </div>
              )}
              {isCardFormValid && embedError && !embedUrl && (
                <div className="mt-3 p-3 rounded-lg border border-red-300 bg-red-50 text-xs text-red-700 flex items-center justify-between gap-3">
                  <span>Erro: {embedError}</span>
                  <button
                    type="button"
                    onClick={() => { setEmbedError(null); createCardEmbed(); }}
                    className="bg-red-700 text-white px-3 py-1.5 rounded font-bold text-[11px]"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}
              {embedUrl && (
                <NyvaInlinePanel
                  embedUrl={embedUrl}
                  onSuccess={() => navigate("/obrigado")}
                />
              )}
            </>
          )}
        </section>

        {/* ─── SECTION 7: TRUST STACK ─── */}
        <section className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Lock, text: "Pagamento Seguro" },
              { icon: Truck, text: "Envio Tracked" },
              { icon: RotateCcw, text: "Trocas Fáceis 30 dias" },
              { icon: Phone, text: "Suporte em Português" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-checkout-trust/20">
                <Icon size={16} className="text-checkout-trust flex-shrink-0" />
                <span className="text-xs font-semibold text-checkout-trust">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 8: MEGA CTA BUTTON (só MB Way; cartão paga no iframe inline) ─── */}
        {payment === "mbway" && (
          <section className="mt-8">
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-16 bg-checkout-cta text-black font-checkout-heading text-lg font-extrabold uppercase tracking-wider rounded-lg shadow-lg hover:bg-checkout-cta-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  <Check size={20} />
                  FINALIZAR COMPRA — PAGAR {total.toFixed(2)}€
                </>
              )}
            </motion.button>
            <div className="text-center mt-2 space-y-1">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Lock size={10} /> Encriptação SSL 256-bit | Os teus dados estão seguros
              </p>
              <p className="text-xs text-muted-foreground">Após pagamento recebes email de confirmação imediato</p>
            </div>
          </section>
        )}

        {/* ─── SECTION 9: RETURNS ─── */}
        <section className="mt-8 bg-green-50 border border-checkout-trust/20 rounded-lg p-5">
          <h3 className="font-checkout-heading text-lg font-bold flex items-center gap-2">
            <RotateCcw size={18} className="text-checkout-trust" />
            TROCAS E DEVOLUÇÕES FÁCEIS — 30 DIAS
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Tamanho errado? Produto com defeito? Tratamos de tudo sem complicações.
            Tens 30 dias para trocar ou devolver, sem burocracia.
          </p>
        </section>

        {/* ─── SECTION 10: SOCIAL PROOF ─── */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-foreground text-foreground" />)}
            <span className="font-bold text-sm">4.9/5 — Mais de 2.300 avaliações verificadas</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "Rui C.", city: "Porto", text: "Chegou em 2 dias, qualidade incrível, igual à original" },
              { name: "Ana S.", city: "Lisboa", text: "Personalizei para o meu filho, ficou perfeita!" },
              { name: "Miguel F.", city: "Braga", text: "MB Way funcionou na perfeição, super rápido" },
            ].map((r) => (
              <div key={r.name} className="bg-[#fafafa] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center font-bold text-sm">{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.city}</p>
                  </div>
                  <div className="ml-auto flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-foreground text-foreground" />)}</div>
                </div>
                <p className="text-sm italic text-muted-foreground">"{r.text}"</p>
              </div>
            ))}
          </div>

          {/* FOMO */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
              <Eye size={14} className="text-checkout-urgency" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={viewers}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="text-sm font-semibold text-checkout-urgency"
                >
                  🔥 {viewers} pessoas estão a ver este produto agora
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
              <Check size={14} className="text-checkout-trust" />
              <span className="text-sm font-semibold text-checkout-trust">✅ 47 camisolas vendidas esta semana</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 11: FAQ ─── */}
        <section className="mt-8">
          <h2 className="font-checkout-heading text-xl font-bold mb-3">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible>
            {[
              ["Quando recebo a minha encomenda?", "Envio Standard: 3-5 dias úteis. Envio Expresso: 1-2 dias úteis. Recebe tracking por email."],
              ["As camisolas são originais/licenciadas?", "Sim, todas as nossas camisolas são oficiais e licenciadas."],
              ["Posso trocar o tamanho?", "Sim! Trocas gratuitas nos primeiros 30 dias."],
              ["A personalização pode ser removida?", "Não, a personalização é permanente. Confirma bem o nome e número antes de finalizar."],
              ["Posso pagar com MB Way?", "Sim! MB Way é uma das formas mais rápidas e populares de pagamento."],
              
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-checkout-body text-sm font-semibold text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ─── SECTION 12: BOTTOM TRUST BAR ─── */}
        <section className="mt-8 pb-8 border-t pt-6">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
            <img src={cardLogo} alt="Visa / Mastercard" className="h-8 object-contain" />
            <img src={mbwayLogo} alt="MB Way" className="h-6 object-contain" />
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Envio com tracking em tempo real 🇵🇹
          </p>
        </section>
      </div>

      {/* ─── MOBILE STICKY BOTTOM CTA (só MB Way; cartão paga no iframe inline) ─── */}
      {payment === "mbway" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 md:hidden z-40">
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 bg-checkout-cta text-black font-checkout-heading text-base font-extrabold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <>Finalizar — {total.toFixed(2)}€</>}
          </motion.button>
        </div>
      )}
    </div>
  );
};

/* ─── FORM FIELD COMPONENT ─── */
const FormField = ({
  label, value, onChange, error, placeholder, hint, type = "text", inputMode,
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; hint?: string; type?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
}) => (
  <div>
    <label className="text-xs font-semibold text-[#111]/70 mb-1 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      className={`w-full border rounded-lg px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-foreground ${error ? "border-checkout-urgency" : "border-muted"}`}
    />
    {hint && !error && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    {error && <p className="text-xs text-checkout-urgency mt-1 font-semibold">{error}</p>}
  </div>
);

export default CheckoutPage;
