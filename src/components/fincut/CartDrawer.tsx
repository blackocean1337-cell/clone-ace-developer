import { useState } from "react";
import { X, Minus, Plus, ChevronDown, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import tshirtBlack from "@/assets/tshirt-black.png";

interface CartItem {
  name: string;
  size: string;
  colors: string[];
  unitPrice: number;
  originalUnitPrice: number;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onModifyPack?: () => void;
}

const colorLabels: Record<string, string> = {
  noir: "PRETO",
  blanc: "BRANCO",
  marine: "MARINHO",
  kaki: "KAKI",
  gris: "CINZA",
  bordeaux: "BORDEAUX",
  marron: "CASTANHO",
  "bleu-ciel": "AZUL CLARO",
  saumon: "SALMÃO",
  moutarde: "MOSTARDA",
  turquoise: "TURQUESA",
};

const CartDrawer = ({ open, onClose, items, onModifyPack }: CartDrawerProps) => {
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  if (!open) return null;

  const totalItems = items.reduce((sum, item) => sum + item.colors.length * item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.unitPrice * item.colors.length * item.quantity, 0);
  const totalOriginal = items.reduce((sum, item) => sum + item.originalUnitPrice * item.colors.length * item.quantity, 0);
  const savings = totalOriginal - totalPrice;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="h-full w-full max-w-md bg-white overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <button
                onClick={onClose}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={20} className="text-fincut-black" />
              </button>
              <span className="font-body text-sm text-muted-foreground">
                O seu carrinho ({totalItems})
              </span>
            </div>

            {/* Delivery info */}
            <div className="px-6 pb-4">
              <div className="flex items-start gap-3 mb-3">
                <Truck size={18} className="text-fincut-black flex-shrink-0 mt-0.5" />
                <p className="font-body text-xs text-fincut-black">
                  ENTREGA <span className="text-fincut-gold font-semibold">GRÁTIS</span> ESTIMADA{" "}
                  <strong>QUINTA-FEIRA 19 MARÇO</strong>.
                  <br />
                  ENCOMENDE NAS PRÓXIMAS <span className="text-fincut-gold font-semibold">8H22MIN</span>.
                </p>
              </div>

              {/* Free shipping bar */}
              <div className="relative mb-1">
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-full bg-fincut-gold rounded-full w-full" />
                </div>
                <div className="absolute -top-0.5 right-0">
                  <Truck size={14} className="text-fincut-gold" />
                </div>
              </div>
              <p className="font-body text-[10px] text-fincut-gold text-right font-semibold tracking-wider">
                ENTREGA GRÁTIS
              </p>
            </div>

            <div className="border-t border-muted mx-6" />

            {/* Cart items */}
            <div className="px-6 py-4 flex-1">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-6">
                  <div className="w-16 h-16 bg-fincut-light flex-shrink-0 flex items-center justify-center">
                    <img src={tshirtBlack} alt="T-shirt" className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-body text-sm font-semibold text-fincut-black">
                          O seu pack personalizado de t-shirts col rond
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-body text-sm font-semibold text-fincut-black">
                          {totalPrice} €
                        </p>
                        {savings > 0 && (
                          <p className="font-body text-xs text-muted-foreground line-through">
                            {totalOriginal} €
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-0.5 mb-2">
                      {item.colors.map((color, i) => (
                        <p key={i} className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                          1X LE T-SHIRT ICÓNICO – {colorLabels[color] || color.toUpperCase()} ({item.size})
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      {onModifyPack && (
                        <button
                          onClick={() => { onClose(); onModifyPack(); }}
                          className="font-body text-xs text-fincut-black underline hover:no-underline"
                        >
                          MODIFICAR O MEU PACK
                        </button>
                      )}
                      <div className="flex items-center gap-3 ml-auto">
                        <button className="w-7 h-7 border border-muted flex items-center justify-center hover:border-fincut-black transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="font-body text-sm text-fincut-black">{item.quantity}</span>
                        <button className="w-7 h-7 border border-muted flex items-center justify-center hover:border-fincut-black transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell */}
              <div className="mb-6">
                <p className="font-body text-sm text-fincut-black mb-3">Eles também compraram :</p>
                <div className="border-2 border-fincut-gold bg-fincut-gold/10 p-3 flex gap-3 items-center">
                  <div className="w-14 h-14 bg-fincut-light flex-shrink-0 flex items-center justify-center rounded-sm">
                    <svg viewBox="0 0 40 50" className="w-8 h-8 text-fincut-black">
                      <rect x="5" y="5" width="30" height="40" rx="2" fill="currentColor" opacity="0.8" />
                      <rect x="10" y="15" width="8" height="20" rx="1" fill="white" opacity="0.3" />
                      <rect x="22" y="15" width="8" height="20" rx="1" fill="white" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-body text-sm font-semibold text-fincut-black">
                        Pack de 3 pares
                        <br />
                        Meias
                      </p>
                      <div className="text-right">
                        <span className="font-body text-sm font-semibold text-fincut-black">14 €</span>
                        <span className="font-body text-xs text-muted-foreground line-through ml-2">18 €</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <select className="font-body text-xs border border-muted px-2 py-1 bg-white text-fincut-black">
                        <option>Preto</option>
                        <option>Branco</option>
                        <option>Cinza</option>
                      </select>
                      <select className="font-body text-xs border border-muted px-2 py-1 bg-white text-fincut-black">
                        <option>39-42</option>
                        <option>43-46</option>
                      </select>
                      <button className="w-7 h-7 border border-muted flex items-center justify-center hover:border-fincut-black transition-colors ml-auto">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <button
                onClick={() => setPromoOpen(!promoOpen)}
                className="w-full flex items-center justify-between py-3 font-display text-sm font-bold tracking-widest text-fincut-black uppercase"
              >
                CÓDIGO PROMO
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${promoOpen ? "rotate-180" : ""}`}
                />
              </button>
              {promoOpen && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Introduza o código"
                    className="flex-1 border border-muted px-3 py-2 font-body text-sm text-fincut-black placeholder:text-muted-foreground focus:outline-none focus:border-fincut-black"
                  />
                  <button className="bg-fincut-black text-white px-4 py-2 font-display text-xs font-bold tracking-widest">
                    APLICAR
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 mt-auto pt-4 border-t border-muted">
              <button className="w-full h-14 bg-fincut-black text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-fincut-black/90 transition-colors duration-200 flex items-center justify-center gap-2">
                PASSAR AO PAGAMENTO | {totalPrice} €{" "}
                {savings > 0 && (
                  <span className="text-muted-foreground line-through text-xs">{totalOriginal} €</span>
                )}
              </button>
              {savings > 0 && (
                <p className="text-center font-body text-xs text-fincut-black mt-3">
                  POUPA <span className="font-semibold">{savings} €</span>{" "}
                  <span className="text-muted-foreground">NESTE CARRINHO</span>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
export type { CartItem };
