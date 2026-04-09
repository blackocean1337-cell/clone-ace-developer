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
import mbwayLogo from "@/assets/mbway-logo.png";
import cardLogo from "@/assets/visa-mastercard-logo.png";

/* ─── CONSTANTS ─── */
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.90;
const CART_TIMER_MINUTES = 15;

/* ─── PT Postal Code → City lookup (simplified) ─── */
const POSTAL_CITY_MAP: Record<string, string> = {
  "1": "Lisboa", "2": "Lisboa", "3": "Coimbra", "4": "Porto",
  "5": "Vila Real", "6": "Castelo Branco", "7": "Évora", "8": "Faro",
  "9": "Funchal",
};

function getCityFromPostal(code: string): string {
  const first = code.charAt(0);
  return POSTAL_CITY_MAP[first] || "";
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
  const [nif, setNif] = useState("");
  const [shipping] = useState<"standard">("standard");
  const [payment, setPayment] = useState<"card" | "mbway" | "multibanco">("card");
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

  // Calculations
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const personalizationCost = persAccepted ? 9.99 : 0;
  const total = subtotal + shippingCost + personalizationCost;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
  const deliveryDays = 5;
  const deliveryDate = getDeliveryDate(deliveryDays);

  // Stock simulation
  const stockLeft = 3;

  // Postal code → city
  useEffect(() => {
    if (postalCode.length >= 4) {
      setCity(getCityFromPostal(postalCode));
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
    if (payment === "mbway" && !mbwayPhone.trim()) e.mbwayPhone = "Número MB Way é obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [name, email, phone, address, postalCode, city, payment, mbwayPhone]);

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    // TODO: integrate with Stripe Payment Intents
    setTimeout(() => setIsSubmitting(false), 2000);
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

      {/* ─── TOP BAR (sticky) ─── */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-checkout-heading text-xl font-extrabold tracking-wider uppercase">MRTUGA</span>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-[#111]/70">
            <span className="flex items-center gap-1"><Lock size={12} className="text-checkout-trust" /> Pagamento Seguro</span>
            <span className="flex items-center gap-1"><Truck size={12} /> Envio Rápido para Portugal</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex items-center justify-between text-xs font-checkout-heading font-semibold uppercase tracking-wider">
            <span className="text-muted-foreground">Carrinho</span>
            <div className="flex-1 mx-3 h-0.5 bg-muted relative">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-checkout-cta" />
            </div>
            <span className="text-checkout-cta">Pagamento</span>
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
                    {items.map((item, idx) => (
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
                      <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
                      <div className="flex justify-between">
                        <span>Envio</span>
                        {shippingCost === 0 ? <span className="text-checkout-trust font-bold">GRÁTIS</span> : <span>{shippingCost.toFixed(2)}€</span>}
                      </div>
                      {persAccepted && <div className="flex justify-between"><span>Personalização</span><span>{personalizationCost.toFixed(2)}€</span></div>}
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
            {shippingCost === 0 ? (
              <span className="text-sm font-bold text-checkout-trust">GRÁTIS ✓</span>
            ) : (
              <span className="text-sm font-bold">{SHIPPING_COST.toFixed(2).replace(".", ",")}€</span>
            )}
          </div>

          {remainingForFreeShipping > 0 && (
            <div className="mt-3 bg-orange-50 border border-checkout-cta/30 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">
                🚚 Faltam <strong className="text-checkout-urgency">{remainingForFreeShipping.toFixed(2)}€</strong> para envio grátis!
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                <motion.div className="h-full bg-checkout-cta rounded-full" initial={{ width: 0 }} animate={{ width: `${shippingProgress * 100}%` }} transition={{ duration: 0.6 }} />
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full text-sm font-bold text-checkout-cta underline underline-offset-2 hover:text-checkout-cta-hover transition-colors"
              >
                ← Voltar à loja e adicionar mais artigos
              </button>
            </div>
          )}
        </section>

        {/* ─── SECTION 4: PERSONALIZATION UPSELL ─── */}
        {!persAccepted && (
          <section className="mt-8">
            <div className="border-2 border-dashed border-checkout-cta bg-orange-50 rounded-lg p-5">
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
          <section className="mt-4 bg-orange-50 border border-checkout-cta/30 rounded-lg p-5">
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
            <FormField label="NIF (opcional)" value={nif} onChange={setNif} placeholder="123456789" hint="Para fatura com NIF" inputMode="numeric" />
          </div>
        </section>

        {/* ─── SECTION 6: PAYMENT METHODS ─── */}
        <section className="mt-6">
          <h2 className="font-checkout-heading text-xl font-bold mb-3">Método de Pagamento</h2>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "card" as const, logo: cardLogo, label: "Cartão" },
              { id: "mbway" as const, logo: mbwayLogo, label: "MB Way", highlight: true },
              { id: "multibanco" as const, logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Multibanco.svg", label: "Multibanco" },
            ] as const).map((m) => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                  payment === m.id ? "border-checkout-cta bg-orange-50" : "border-muted hover:border-muted-foreground/30"
                } ${"highlight" in m && m.highlight ? "ring-2 ring-checkout-cta/40" : ""}`}
              >
                {"highlight" in m && m.highlight && <span className="absolute -top-2 right-1 bg-checkout-cta text-black text-[9px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>}
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
          {payment === "multibanco" && (
            <p className="mt-3 text-sm text-muted-foreground bg-[#fafafa] p-3 rounded">Receberás a referência Multibanco por email e nesta página após confirmar.</p>
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

        {/* ─── SECTION 8: MEGA CTA BUTTON ─── */}
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
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-checkout-cta text-checkout-cta" />)}
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
                  <div className="w-8 h-8 bg-checkout-cta/20 rounded-full flex items-center justify-center font-bold text-sm">{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.city}</p>
                  </div>
                  <div className="ml-auto flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-checkout-cta text-checkout-cta" />)}</div>
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
              ["Emitem fatura?", "Sim, basta indicares o NIF no campo opcional durante o checkout."],
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground mb-3">
            {["Visa", "Mastercard", "MB Way", "Multibanco", "CTT Expresso"].map((logo) => (
              <span key={logo} className="bg-[#fafafa] px-3 py-1.5 rounded border">{logo}</span>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Entrega via CTT e DPD — Tracking em tempo real 🇵🇹
          </p>
        </section>
      </div>

      {/* ─── MOBILE STICKY BOTTOM CTA ─── */}
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
      className={`w-full border rounded-lg px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-checkout-cta ${error ? "border-checkout-urgency" : "border-muted"}`}
    />
    {hint && !error && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    {error && <p className="text-xs text-checkout-urgency mt-1 font-semibold">{error}</p>}
  </div>
);

export default CheckoutPage;
