import { useState, useEffect } from "react";
import { X, Minus, Plus, ChevronDown, Truck, ShoppingCart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const tshirtBlack = "/lovable-uploads/dd6d21cb-9655-4120-bc20-560351fcf99d.png";
import { Link } from "react-router-dom";
import { applyPromo, loadStoredPromo, saveStoredPromo, normalizePromo, type PromoCode } from "@/lib/promo";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  name: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

const FREE_SHIPPING_THRESHOLD = 55;

const CartDrawer = ({ open, onClose, items, onUpdateQuantity }: CartDrawerProps) => {
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(() => loadStoredPromo());
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setPromoCode(loadStoredPromo());
  }, [open]);

  if (!open) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const promo = applyPromo(items, promoCode);
  const originalTotalPrice = promo.originalSubtotal;
  const totalPrice = promo.subtotal;
  const discount = promo.discount;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(1, totalPrice / FREE_SHIPPING_THRESHOLD);
  const hasFreeShipping = remainingForFreeShipping === 0;

  const handleApplyPromo = () => {
    const valid = normalizePromo(promoInput);
    if (!valid) { setPromoError("Código inválido"); return; }
    setPromoCode(valid);
    saveStoredPromo(valid);
    setPromoInput("");
    setPromoError(null);
  };

  const handleRemovePromo = () => {
    setPromoCode(null);
    saveStoredPromo(null);
    setPromoError(null);
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/60"
        onClick={onClose}>
        
          <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="h-full w-full max-w-md bg-white flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                <X size={20} className="text-fincut-black" />
              </button>
              <span className="font-body text-sm text-muted-foreground">
                O seu carrinho ({totalItems})
              </span>
            </div>

            {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
                <ShoppingCart size={40} className="text-muted-foreground/40" />
                <h3 className="font-display text-xl font-bold text-fincut-black tracking-wide">
                  O seu carrinho está vazio
                </h3>
                <p className="font-body text-sm text-muted-foreground text-center max-w-[260px]">
                  Descubra as nossas coleções e encontre as peças que lhe correspondem
                </p>
                <Link
              to="/"
              onClick={onClose}
              className="mt-2 bg-fincut-black text-white px-8 py-3.5 font-display text-xs font-bold tracking-[0.2em] uppercase hover:bg-fincut-black/90 transition-colors">
              
                  DESCOBRIR AS COLEÇÕES
                </Link>
              </div>) :

          <>
                {/* Delivery info */}
                <div className="px-6 pb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Truck size={18} className="text-fincut-black flex-shrink-0 mt-0.5" />
                    <p className="font-body text-xs text-fincut-black uppercase tracking-wide leading-5">
                      ENTREGA ESTIMADA{" "}
                      <strong>QUINTA-FEIRA 19 MARÇO</strong>.
                      <br />
                      ENCOMENDE NAS PRÓXIMAS{" "}
                      <span className="text-fincut-gold font-semibold">2H14MIN</span>.
                    </p>
                  </div>

                  {/* Free shipping bar */}
                  <div className="relative mb-2">
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                    className="h-full bg-[#c8e600] rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress * 100}%` }} />
                  
                    </div>
                    <div className="absolute -top-0.5 right-0">
                      <Truck size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                  {hasFreeShipping ?
              <p className="font-body text-[10px] text-fincut-gold text-right font-semibold tracking-wider uppercase">
                      ENTREGA GRÁTIS
                    </p> :

              <p className="font-body text-[10px] text-muted-foreground text-right tracking-wider uppercase">
                      MAIS QUE{" "}
                      <span className="font-semibold text-fincut-black">{remainingForFreeShipping} €</span>
                      <br />
                      PARA ENTREGA GRÁTIS
                    </p>
              }
                </div>

                <div className="border-t border-muted mx-6" />

                {/* Cart items */}
                <div className="px-6 py-4 flex-1 overflow-y-auto">
                  {items.map((item, idx) =>
              <div key={idx} className="flex gap-4 mb-6">
                      <div className="w-[72px] h-[72px] bg-fincut-light flex-shrink-0 flex items-center justify-center">
                        <img
                    src={item.image || tshirtBlack}
                    alt={item.name}
                    className="w-14 h-14 object-contain" />
                  
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-body text-sm font-semibold text-fincut-black">
                              {item.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                              {item.color} ({item.size})
                            </p>
                          </div>
                          <p className="font-body text-sm font-semibold text-fincut-black flex-shrink-0 ml-2">
                            {item.unitPrice * item.quantity} €
                          </p>
                        </div>

                        <div className="flex items-center justify-end mt-3">
                          <div className="flex items-center gap-3">
                            <button
                        onClick={() => onUpdateQuantity?.(idx, Math.max(0, item.quantity - 1))}
                        className="w-7 h-7 border border-muted flex items-center justify-center hover:border-fincut-black transition-colors">
                        
                              <Minus size={12} />
                            </button>
                            <span className="font-body text-sm text-fincut-black w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                        onClick={() => onUpdateQuantity?.(idx, item.quantity + 1)}
                        className="w-7 h-7 border border-muted flex items-center justify-center hover:border-fincut-black transition-colors">
                        
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
              )}

                  {/* Upsell */}
                  <div className="mb-6">
                    

                
                    


































                
                  </div>

                  {/* Promo code */}
                  <button
                onClick={() => setPromoOpen(!promoOpen)}
                className="w-full flex items-center justify-between py-3 font-display text-sm font-bold tracking-[0.15em] text-fincut-black uppercase">
                
                    <span className="flex items-center gap-2">
                      CÓDIGO PROMO
                      {promoCode && <span className="text-[10px] bg-checkout-trust text-white px-2 py-0.5 rounded normal-case tracking-normal">✓ {promoCode}</span>}
                    </span>
                    <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${promoOpen ? "rotate-180" : ""}`} />
                
                  </button>
                  {promoOpen && (
                    <div className="mb-4">
                      {promoCode ? (
                        <div className="flex items-center justify-between bg-checkout-trust/10 border border-checkout-trust/30 rounded px-3 py-2">
                          <span className="text-xs font-bold text-checkout-trust">✓ {promoCode} aplicado — tudo a 1€</span>
                          <button type="button" onClick={handleRemovePromo} className="text-[10px] underline text-muted-foreground hover:text-fincut-black">remover</button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoInput}
                              onChange={(e) => { setPromoInput(e.target.value); setPromoError(null); }}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyPromo(); } }}
                              placeholder="Introduza o código"
                              className="flex-1 border border-muted px-3 py-2 font-body text-sm text-fincut-black placeholder:text-muted-foreground focus:outline-none focus:border-fincut-black" />
                            <button type="button" onClick={handleApplyPromo} className="bg-fincut-black text-white px-4 py-2 font-display text-xs font-bold tracking-widest">
                              APLICAR
                            </button>
                          </div>
                          {promoError && <p className="text-[11px] text-red-600 mt-1">{promoError}</p>}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer CTA */}
                <div className="px-6 pb-6 mt-auto pt-4 border-t border-muted">
                  {discount > 0 && (
                    <div className="flex justify-between text-xs mb-2 text-checkout-trust font-bold">
                      <span>Desconto ({promoCode})</span>
                      <span>−{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <button
                    disabled={isCreatingLink || items.length === 0}
                    onClick={async () => {
                      if (isCreatingLink) return;
                      setLinkError(null);
                      setIsCreatingLink(true);
                      try {
                        const { data, error } = await supabase.functions.invoke("create-nyva-paylink", {
                          body: {
                            items: promo.items,
                            promo_code: promoCode,
                            discount,
                          },
                        });
                        if (error) throw error;
                        if (!data?.url) throw new Error("Sem URL de pagamento");
                        onClose?.();
                        window.location.href = data.url as string;
                      } catch (err) {
                        setLinkError(err instanceof Error ? err.message : "Erro ao iniciar pagamento");
                        setIsCreatingLink(false);
                      }
                    }}
                    className="w-full h-14 bg-[#fff176] text-fincut-black font-display text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#ffee58] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isCreatingLink ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        A PREPARAR PAGAMENTO…
                      </>
                    ) : (
                      <>
                        PASSAR AO PAGAMENTO | {discount > 0 && <span className="line-through opacity-60 mr-1">{originalTotalPrice.toFixed(2)} €</span>}{totalPrice.toFixed(2)} €
                      </>
                    )}
                  </button>
                  {linkError && (
                    <p className="text-xs text-red-600 mt-2 text-center">
                      {linkError} —{" "}
                      <button onClick={() => setLinkError(null)} className="underline font-bold">
                        tentar novamente
                      </button>
                    </p>
                  )}


                </div>
              </>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

};

export default CartDrawer;
export type { CartItem };