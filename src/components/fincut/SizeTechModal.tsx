import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeTechModalProps {
  open: boolean;
  onClose: () => void;
}

const SizeTechModal = ({ open, onClose }: SizeTechModalProps) => {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(18);
  const [heightUnit, setHeightUnit] = useState<"CM" | "IN">("CM");
  const [weightUnit, setWeightUnit] = useState<"KG" | "LBS">("KG");

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
                onClick={onClose}
                className="flex items-center gap-1 font-body text-sm text-fincut-black hover:opacity-70 transition-opacity"
              >
                <ChevronLeft size={16} />
                Voltar
              </button>
              <span className="bg-fincut-gold text-fincut-black font-display text-xs font-bold px-3 py-1 tracking-wider">
                Sizetech+
              </span>
            </div>

            {/* Progress bar */}
            <div className="px-6 mb-8">
              <div className="h-0.5 bg-muted rounded-full">
                <div className="h-full w-1/4 bg-fincut-black rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 flex-1">
              <h2 className="font-display text-xl font-bold text-fincut-black mb-2">
                Preencha as suas informações
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
                Será guiado passo a passo para encontrar o seu tamanho
                perfeito. Em apenas 3 etapas, obterá uma recomendação personalizada.
              </p>

              {/* Height */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm font-medium text-fincut-black">Altura</span>
                  <span className="font-body text-sm text-fincut-black">
                    {height} <span className="text-muted-foreground">{heightUnit}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={heightUnit === "CM" ? 140 : 55}
                  max={heightUnit === "CM" ? 220 : 87}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-fincut-gold bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fincut-gold [&::-webkit-slider-thumb]:border-0"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--fincut-gold)) ${((height - (heightUnit === "CM" ? 140 : 55)) / ((heightUnit === "CM" ? 220 : 87) - (heightUnit === "CM" ? 140 : 55))) * 100}%, hsl(var(--muted)) ${((height - (heightUnit === "CM" ? 140 : 55)) / ((heightUnit === "CM" ? 220 : 87) - (heightUnit === "CM" ? 140 : 55))) * 100}%)`
                  }}
                />
                <div className="flex gap-2 mt-2">
                  {(["CM", "IN"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => {
                        setHeightUnit(u);
                        setHeight(u === "CM" ? 175 : 69);
                      }}
                      className={`font-body text-xs font-medium ${
                        heightUnit === u ? "text-fincut-black" : "text-muted-foreground"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm font-medium text-fincut-black">Peso</span>
                  <span className="font-body text-sm text-fincut-black">
                    {weight} <span className="text-muted-foreground">{weightUnit}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={weightUnit === "KG" ? 40 : 88}
                  max={weightUnit === "KG" ? 150 : 330}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-fincut-gold bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fincut-gold [&::-webkit-slider-thumb]:border-0"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--fincut-gold)) ${((weight - (weightUnit === "KG" ? 40 : 88)) / ((weightUnit === "KG" ? 150 : 330) - (weightUnit === "KG" ? 40 : 88))) * 100}%, hsl(var(--muted)) ${((weight - (weightUnit === "KG" ? 40 : 88)) / ((weightUnit === "KG" ? 150 : 330) - (weightUnit === "KG" ? 40 : 88))) * 100}%)`
                  }}
                />
                <div className="flex gap-2 mt-2">
                  {(["KG", "LBS"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => {
                        setWeightUnit(u);
                        setWeight(u === "KG" ? 70 : 154);
                      }}
                      className={`font-body text-xs font-medium ${
                        weightUnit === u ? "text-fincut-black" : "text-muted-foreground"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm font-medium text-fincut-black">
                    Idade <span className="text-muted-foreground font-normal">(facultativo)</span>
                  </span>
                  <span className="font-body text-sm text-fincut-black">
                    {age} <span className="text-muted-foreground">Anos</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={14}
                  max={80}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-fincut-gold bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fincut-gold [&::-webkit-slider-thumb]:border-0"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--fincut-gold)) ${((age - 14) / (80 - 14)) * 100}%, hsl(var(--muted)) ${((age - 14) / (80 - 14)) * 100}%)`
                  }}
                />
              </div>
            </div>

            {/* Footer button */}
            <div className="px-6 pb-6 mt-auto">
              <button className="w-full h-14 bg-fincut-black text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-fincut-black/90 transition-colors duration-200">
                SEGUINTE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeTechModal;
