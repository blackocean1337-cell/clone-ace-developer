import { useState, useEffect } from "react";
import { X, Minus, Plus, ChevronDown, Truck, ShoppingCart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { applyPromo, loadStoredPromo, saveStoredPromo, normalizePromo, type PromoCode } from "@/lib/promo";

const tshirtBlack = "/lovable-uploads/dd6d21cb-9655-4120-bc20-560351fcf99d.png";

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
      {open && (
        <>
          {/* Overlay */}
          <motion.button
            aria-label="Fechar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] xl:z-[90] border-none w-full cursor-default"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
            className="fixed z-[100] flex items-stretch top-0 right-0 bottom-0 xl:top-4 xl:right-4 xl:bottom-4"
          >
            <div className="w-screen xl:w-[440px] bg-white flex flex-col xl:rounded-[6px] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 xl:px-6 pt-5 xl:pt-6 pb-4">
                <h2 className="font-serif text-[22px] xl:text-[24px] leading-none text-gray-900">
                  O seu carrinho ({totalItems})
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
                >
                  <X size={22} className="text-gray-900" strokeWidth={1.5} />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
                  <ShoppingCart size={40} className="text-gray-300" />
                  <h3 className="font-serif text-xl text-gray-900">O seu carrinho está vazio</h3>
                  <p className="font-body text-sm text-gray-500 text-center max-w-[260px]">
                    Descubra as nossas coleções e encontre as peças que lhe correspondem
                  </p>
                  <Link
                    to="/"
                    onClick={onClose}
                    className="mt-2 bg-[#001f4d] text-white px-8 py-3.5 font-body text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#001f4d]/90 transition-colors rounded-[4px]"
                  >
                    DESCOBRIR AS COLEÇÕES
                  </Link>
                </div>
              ) : (
                <>
                  {/* Free-shipping banner */}
                  <div className="px-5 xl:px-6 pb-4">
                    <p className="text-center font-body text-[14px] xl:text-[15px] text-gray-900 mb-3">
                      {hasFreeShipping ? (
                        <>Parabéns, tem direito a <strong>Envio grátis</strong> 🎉</>
                      ) : (
                        <>Faltam <strong>{remainingForFreeShipping.toFixed(2)} €</strong> para <strong>Envio grátis</strong> 🚚</>
                      )}
                    </p>

                    {/* Progress bar with truck at end */}
                    <div className="relative">
                      <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#facc15] rounded-full transition-all duration-500"
                          style={{ width: `${shippingProgress * 100}%` }}
                        />
                      </div>
                      <div
                        className="absolute -top-[11px] w-6 h-6 rounded-full bg-[#facc15] flex items-center justify-center transition-all duration-500"
                        style={{ left: `calc(${shippingProgress * 100}% - 12px)` }}
                      >
                        <Truck size={13} className="text-gray-900" strokeWidth={2} />
                      </div>
                    </div>

                    <p className="mt-3 text-right font-body text-[11px] tracking-[0.08em] uppercase text-gray-500">
                      Envio grátis
                    </p>
                  </div>

                  {/* Cart items */}
                  <div className="px-5 xl:px-6 flex-1 overflow-y-auto">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                        <div className="w-[88px] h-[88px] bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-[4px] overflow-hidden">
                          <img
                            src={item.image || tshirtBlack}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex justify-between items-start gap-3">
                            <div className="min-w-0">
                              <p className="font-serif text-[16px] leading-[120%] text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="font-body text-[11px] text-gray-500 uppercase tracking-[0.06em] mt-1">
                                {item.color} ({item.size})
                              </p>
                            </div>
                            <p className="font-body text-[15px] text-gray-900 flex-shrink-0">
                              {(item.unitPrice * item.quantity).toFixed(0)} €
                            </p>
                          </div>

                          <div className="flex items-center justify-end mt-auto pt-3">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => onUpdateQuantity?.(idx, Math.max(0, item.quantity - 1))}
                                className="w-6 h-6 flex items-center justify-center hover:opacity-60 transition-opacity"
                                aria-label="Diminuir"
                              >
                                <Minus size={16} className="text-gray-900" strokeWidth={1.5} />
                              </button>
                              <span className="font-body text-[15px] text-gray-900 min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity?.(idx, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center hover:opacity-60 transition-opacity"
                                aria-label="Aumentar"
                              >
                                <Plus size={16} className="text-gray-900" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer: promo + CTA */}
                  <div className="px-5 xl:px-6 pb-5 xl:pb-6 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setPromoOpen(!promoOpen)}
                      className="w-full flex items-center justify-between py-4 font-body text-[15px] text-gray-900"
                    >
                      <span className="flex items-center gap-2">
                        Código promo
                        {promoCode && (
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded normal-case tracking-normal">
                            ✓ {promoCode}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 text-gray-900 ${promoOpen ? "rotate-180" : ""}`}
                        strokeWidth={1.5}
                      />
                    </button>

                    {promoOpen && (
                      <div className="pb-3">
                        {promoCode ? (
                          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
                            <span className="text-xs font-bold text-emerald-700">
                              ✓ {promoCode} aplicado
                              {promoCode === "TUGA1" ? " — tudo a 1€" : promoCode === "TUGA30" ? " — −30€" : ""}
                            </span>
                            <button type="button" onClick={handleRemovePromo} className="text-[10px] underline text-gray-500 hover:text-gray-900">
                              remover
                            </button>
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
                                className="flex-1 border border-gray-200 rounded-[4px] px-3 py-2.5 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
                              />
                              <button
                                type="button"
                                onClick={handleApplyPromo}
                                className="bg-gray-900 text-white px-4 py-2.5 rounded-[4px] font-body text-xs font-bold tracking-widest uppercase"
                              >
                                Aplicar
                              </button>
                            </div>
                            {promoError && <p className="text-[11px] text-red-600 mt-1">{promoError}</p>}
                          </div>
                        )}
                      </div>
                    )}

                    {discount > 0 && (
                      <div className="flex justify-between text-xs mb-2 text-emerald-700 font-bold">
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
                          const { createCheckout } = await import("@/lib/shopify");
                          const url = await createCheckout(promo.items);
                          onClose?.();
                          window.location.href = url;
                        } catch (err) {
                          setLinkError(err instanceof Error ? err.message : "Erro ao iniciar pagamento");
                          setIsCreatingLink(false);
                        }
                      }}
                      className="w-full h-[56px] bg-[#001f4d] text-white font-body text-[14px] font-bold tracking-[0.15em] uppercase hover:bg-[#001a3d] transition-colors rounded-[4px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isCreatingLink ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          A PREPARAR PAGAMENTO…
                        </>
                      ) : (
                        <>
                          IR PARA PAGAMENTO |{" "}
                          {discount > 0 && (
                            <span className="line-through opacity-60 mr-1 font-normal">
                              {originalTotalPrice.toFixed(2)} €
                            </span>
                          )}
                          {totalPrice.toFixed(2)} €
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
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
export type { CartItem };
