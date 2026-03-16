import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SizeTechModal from "./SizeTechModal";
import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtBlack from "@/assets/tshirt-black.png";
import pullBlack from "@/assets/pull-black.png";
import { motion, AnimatePresence } from "framer-motion";

const packCards = [
  { image: tshirtNavy, label: "T-shirt Col rond", color: "Azul", size: "S", rotation: "-6deg", top: "10%", left: "38%", zIndex: 1 },
  { image: tshirtBlack, label: "Produit à choisir", color: "AU CHOIX", size: "AU CHOIX", rotation: "3deg", top: "5%", left: "52%", zIndex: 2 },
  { image: tshirtBlack, label: "Produit à choisir", color: "AU CHOIX", size: "AU CHOIX", rotation: "8deg", top: "0%", left: "60%", zIndex: 0 },
  { image: pullBlack, label: "Pull", color: "noir", size: "S", rotation: "12deg", top: "8%", left: "68%", zIndex: 1 },
];

const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const PackBuilderModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [selectedSize, setSelectedSize] = useState("M");

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
            className="h-full w-full max-w-md bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <button
                onClick={onClose}
                className="flex items-center gap-1 font-body text-sm text-fincut-black hover:opacity-70 transition-opacity"
              >
                <ChevronLeft size={16} />
                Sair
              </button>
              <span className="bg-fincut-gold text-fincut-black font-display text-xs font-bold px-3 py-1 tracking-wider">
                PackBuilder+
              </span>
            </div>

            {/* Progress bar */}
            <div className="px-6 mb-6">
              <div className="h-0.5 bg-muted rounded-full">
                <div className="h-full w-1/3 bg-fincut-black rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-8">
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
                <button className="w-14 bg-fincut-gold flex items-center justify-center hover:bg-fincut-gold/90 transition-colors">
                  <ChevronRight size={20} className="text-fincut-black" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomPackSection = () => {
  const [packBuilderOpen, setPackBuilderOpen] = useState(false);

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
              onClick={() => setPackBuilderOpen(true)}
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

      <PackBuilderModal open={packBuilderOpen} onClose={() => setPackBuilderOpen(false)} />
    </>
  );
};

export default CustomPackSection;
