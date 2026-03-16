import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import SizeTechModal from "./SizeTechModal";
import CartDrawer, { type CartItem } from "./CartDrawer";
import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtBlack from "@/assets/tshirt-black.png";
import tshirtKaki from "@/assets/tshirt-kaki.png";
import pullBlack from "@/assets/pull-black.png";
import { motion, AnimatePresence } from "framer-motion";

const packCards = [
  { image: tshirtNavy, label: "T-shirt Col rond", color: "Azul", size: "S", rotation: "-6deg", top: "10%", left: "38%", zIndex: 1 },
  { image: tshirtBlack, label: "Produit à choisir", color: "AU CHOIX", size: "AU CHOIX", rotation: "3deg", top: "5%", left: "52%", zIndex: 2 },
  { image: tshirtBlack, label: "Produit à choisir", color: "AU CHOIX", size: "AU CHOIX", rotation: "8deg", top: "0%", left: "60%", zIndex: 0 },
  { image: pullBlack, label: "Pull", color: "noir", size: "S", rotation: "12deg", top: "8%", left: "68%", zIndex: 1 },
];

const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const colorOptions = [
  { id: "noir", label: "Preto", image: tshirtBlack },
  { id: "blanc", label: "Branco", image: tshirtWhite },
  { id: "marine", label: "Marinho", image: tshirtNavy },
  { id: "kaki", label: "Kaki", image: tshirtKaki },
  { id: "gris", label: "Cinza", image: null },
  { id: "bordeaux", label: "Bordeaux", image: null },
  { id: "marron", label: "Castanho", image: null },
  { id: "bleu-ciel", label: "Azul claro", image: null },
  { id: "saumon", label: "Salmão", image: null },
  { id: "moutarde", label: "Mostarda", image: null },
  { id: "turquoise", label: "Turquesa", image: null },
];

const colorHex: Record<string, string> = {
  noir: "#1a1a1a",
  blanc: "#f5f5f0",
  marine: "#1e3a5f",
  kaki: "#6b7c5e",
  gris: "#9ca3af",
  bordeaux: "#7c1d3e",
  marron: "#6b4226",
  "bleu-ciel": "#a8d8ea",
  saumon: "#f4a6a0",
  moutarde: "#d4a017",
  turquoise: "#a8dcd9",
};

const pricePerArticle = (count: number) => {
  if (count >= 6) return 18;
  if (count >= 4) return 20;
  if (count >= 3) return 22;
  if (count >= 2) return 24;
  return 28;
};

interface PackBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onOpenSizeTech: () => void;
  onAddToCart: (colors: string[], size: string) => void;
  initialStep?: number;
  preselectedSize?: string;
}

const PackBuilderModal = ({ open, onClose, onOpenSizeTech, onAddToCart, initialStep = 1, preselectedSize }: PackBuilderModalProps) => {
  const [step, setStep] = useState(initialStep);
  const [selectedSize, setSelectedSize] = useState(preselectedSize || "M");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Reset when opening
  useState(() => {
    if (open) {
      setStep(initialStep);
      if (preselectedSize) setSelectedSize(preselectedSize);
    }
  });

  const toggleColor = (id: string) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  if (!open) return null;

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
                onClick={step === 1 ? onClose : () => setStep(1)}
                className="flex items-center gap-1 font-body text-sm text-fincut-black hover:opacity-70 transition-opacity"
              >
                <ChevronLeft size={16} />
                {step === 1 ? "Sair" : "Voltar"}
              </button>
              <span className="bg-fincut-gold text-fincut-black font-display text-xs font-bold px-3 py-1 tracking-wider">
                PackBuilder+
              </span>
            </div>

            {/* Progress bar */}
            <div className="px-6 mb-6">
              <div className="h-0.5 bg-muted rounded-full">
                <div
                  className="h-full bg-fincut-black rounded-full transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="pb-step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-8 flex-1"
                >
                  <h2 className="font-display text-xl font-bold text-fincut-black mb-2">
                    Etapa 1 : Selecionar o meu tamanho
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mb-8">
                    Os descontos são integrados diretamente no PackBuilder+.
                    <br />
                    Nenhum código adicional é necessário.
                  </p>

                  {/* Body silhouette */}
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 flex items-center justify-center">
                      <svg viewBox="0 0 120 160" className="w-full h-full text-muted-foreground/20">
                        <ellipse cx="60" cy="25" rx="18" ry="22" fill="currentColor" />
                        <path d="M35 50 C35 45 45 42 60 42 C75 42 85 45 85 50 L90 90 C90 92 88 94 85 94 L35 94 C32 94 30 92 30 90 Z" fill="currentColor" />
                        <rect x="38" y="94" width="18" height="55" rx="6" fill="currentColor" />
                        <rect x="64" y="94" width="18" height="55" rx="6" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* Size selection */}
                  <p className="font-body text-sm text-fincut-black mb-3">
                    Selecione o seu tamanho :
                  </p>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 border font-body text-sm font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? "border-fincut-black bg-fincut-black text-white"
                            : "border-muted-foreground/30 text-fincut-black hover:border-fincut-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* SizeTech CTA */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-fincut-black text-white px-4 py-3 flex flex-col justify-center">
                      <p className="font-body text-sm">
                        Calcule o seu tamanho perfeito
                        <br />
                        em <span className="text-fincut-gold font-semibold">2 minutos</span>{" "}
                        <span className="text-muted-foreground">(sizetech+)</span>
                      </p>
                    </div>
                    <button
                      onClick={() => { onClose(); onOpenSizeTech(); }}
                      className="w-14 bg-fincut-gold flex items-center justify-center hover:bg-fincut-gold/90 transition-colors"
                    >
                      <ChevronRight size={20} className="text-fincut-black" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pb-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-8 flex-1"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-display text-xl font-bold text-fincut-black">
                      Pack personalizado
                    </h2>
                    <span className="bg-fincut-black text-white font-display text-xs font-bold px-3 py-1 tracking-wider">
                      {selectedSize}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    Escolha as suas cores :
                  </p>

                  {/* Color grid */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {colorOptions.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => toggleColor(color.id)}
                        className="text-left"
                      >
                        <div
                          className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                            selectedColors.includes(color.id)
                              ? "border-fincut-gold"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color.image ? undefined : colorHex[color.id] }}
                        >
                          {color.image ? (
                            <img
                              src={color.image}
                              alt={color.label}
                              className="w-full h-full object-contain p-1 bg-fincut-light"
                            />
                          ) : (
                            <div
                              className="w-full h-full"
                              style={{ backgroundColor: colorHex[color.id] }}
                            />
                          )}
                          <div
                            className={`absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                              selectedColors.includes(color.id)
                                ? "bg-fincut-gold text-fincut-black"
                                : "bg-white/80 text-muted-foreground"
                            }`}
                          >
                            <Plus size={12} />
                          </div>
                        </div>
                        <p className="font-body text-[10px] text-fincut-black mt-1">{color.label}</p>
                      </button>
                    ))}
                  </div>

                  {/* Article count */}
                  <p className="font-body text-sm text-fincut-black mb-2">
                    Número de artigos : {selectedColors.length}
                  </p>

                  {/* Price bar */}
                  <div className="mb-4">
                    <div className="h-1.5 bg-muted rounded-full mb-2">
                      <div
                        className="h-full bg-fincut-gold rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (selectedColors.length / 6) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className={`font-body text-xs px-2 py-0.5 border ${
                        selectedColors.length < 2 ? "border-fincut-black text-fincut-black" : "border-muted text-muted-foreground"
                      }`}>
                        28 €/artigo
                      </span>
                      <span className={`font-body text-xs ${
                        selectedColors.length >= 6 ? "text-fincut-gold font-semibold" : "text-muted-foreground"
                      }`}>
                        18 €/artigo
                      </span>
                    </div>
                  </div>

                  {/* Cart slots */}
                  <div className="grid grid-cols-6 gap-1 mb-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-sm border border-muted flex items-center justify-center"
                        style={{
                          backgroundColor: selectedColors[i]
                            ? colorHex[selectedColors[i]]
                            : undefined,
                        }}
                      >
                        {!selectedColors[i] && (
                          <Plus size={12} className="text-muted-foreground/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="px-6 pb-6 mt-auto pt-4">
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  className="w-full h-14 bg-fincut-black text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-fincut-black/90 transition-colors duration-200"
                >
                  SEGUINTE
                </button>
              ) : selectedColors.length < 2 ? (
                <div className="w-full h-14 bg-muted flex items-center justify-center font-display text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  ADICIONE 2 ARTIGOS MÍNIMO
                </div>
              ) : (
                <button
                  onClick={() => onAddToCart(selectedColors, selectedSize)}
                  className="w-full h-14 bg-fincut-black text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-fincut-black/90 transition-colors duration-200"
                >
                  ADICIONAR AO CARRINHO — {selectedColors.length * pricePerArticle(selectedColors.length)} €
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomPackSection = () => {
  const [packBuilderOpen, setPackBuilderOpen] = useState(false);
  const [sizeTechOpen, setSizeTechOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [packInitialStep, setPackInitialStep] = useState(1);
  const [packPreselectedSize, setPackPreselectedSize] = useState<string | undefined>();

  const handleOpenPack = (step = 1, size?: string) => {
    setPackInitialStep(step);
    setPackPreselectedSize(size);
    setPackBuilderOpen(true);
  };

  const handleSizeTechClose = () => {
    setSizeTechOpen(false);
  };

  const handleSizeTechValidate = (size: string) => {
    setSizeTechOpen(false);
    handleOpenPack(2, size);
  };

  const handleAddToCart = (colors: string[], size: string) => {
    const price = pricePerArticle(colors.length);
    setCartItems([{
      name: "Pack personalizado de t-shirts col rond",
      size,
      colors,
      unitPrice: price,
      originalUnitPrice: 28,
      quantity: 1,
    }]);
    setPackBuilderOpen(false);
    setCartOpen(true);
  };

  return (
    <>
      <section className="w-full bg-fincut-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative min-h-[320px] flex items-center">
          <div className="relative z-10 max-w-sm">
            <p className="font-display text-xs font-bold tracking-widest text-fincut-gold uppercase mb-3">
              POUPE MAIS
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-8">
              O seu pack personalizado
              <br />
              para a semana.
            </h2>
            <button
              onClick={() => handleOpenPack(1)}
              className="bg-fincut-gold text-fincut-black font-display text-sm font-bold tracking-widest uppercase px-8 py-4 hover:bg-fincut-gold/90 transition-colors duration-200"
            >
              CRIO O MEU PACK
            </button>
          </div>

          <div className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[500px] h-[280px]">
            {packCards.map((card, i) => (
              <div
                key={i}
                className="absolute w-[160px] bg-white shadow-xl"
                style={{
                  transform: `rotate(${card.rotation})`,
                  top: card.top,
                  left: card.left,
                  zIndex: card.zIndex,
                }}
              >
                <div className="relative border-2 border-dashed border-muted-foreground/30 m-1.5">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-full aspect-square object-contain bg-fincut-light p-2"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 border border-muted-foreground/40 flex items-center justify-center text-muted-foreground/40 text-xs">
                    +
                  </div>
                </div>
                <div className="px-2 py-1.5">
                  <p className="font-body text-[10px] font-semibold text-fincut-black truncate">{card.label}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-fincut-black border border-muted-foreground/20" />
                    <span className="font-body text-[8px] text-muted-foreground">{card.color}</span>
                    <span className="font-body text-[8px] text-muted-foreground ml-auto border border-muted-foreground/30 px-1 rounded-sm">{card.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackBuilderModal
        open={packBuilderOpen}
        onClose={() => setPackBuilderOpen(false)}
        onOpenSizeTech={() => { setPackBuilderOpen(false); setSizeTechOpen(true); }}
        onAddToCart={handleAddToCart}
        initialStep={packInitialStep}
        preselectedSize={packPreselectedSize}
      />
      <SizeTechModal
        open={sizeTechOpen}
        onClose={handleSizeTechClose}
        onValidate={handleSizeTechValidate}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onModifyPack={() => handleOpenPack(2)}
      />
    </>
  );
};

export default CustomPackSection;
