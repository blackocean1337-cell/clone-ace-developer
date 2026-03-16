import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeTechModalProps {
  open: boolean;
  onClose: () => void;
}

const bodyTypes = [
  {
    id: "slim",
    label: "Mais estreito",
    svg: (
      <svg viewBox="0 0 80 100" className="w-full h-full text-muted-foreground/40">
        <ellipse cx="40" cy="18" rx="12" ry="15" fill="currentColor" />
        <path d="M28 36 C28 33 33 30 40 30 C47 30 52 33 52 36 L54 65 C54 67 52 68 50 68 L30 68 C28 68 26 67 26 65 Z" fill="currentColor" />
        <rect x="30" y="68" width="10" height="28" rx="4" fill="currentColor" />
        <rect x="42" y="68" width="10" height="28" rx="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "normal",
    label: "Normal",
    svg: (
      <svg viewBox="0 0 80 100" className="w-full h-full text-muted-foreground/40">
        <ellipse cx="40" cy="18" rx="13" ry="15" fill="currentColor" />
        <path d="M25 36 C25 33 31 30 40 30 C49 30 55 33 55 36 L57 65 C57 67 55 68 53 68 L27 68 C25 68 23 67 23 65 Z" fill="currentColor" />
        <rect x="28" y="68" width="11" height="28" rx="4" fill="currentColor" />
        <rect x="42" y="68" width="11" height="28" rx="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "large",
    label: "Mais largo",
    svg: (
      <svg viewBox="0 0 80 100" className="w-full h-full text-muted-foreground/40">
        <ellipse cx="40" cy="18" rx="14" ry="15" fill="currentColor" />
        <path d="M20 36 C20 33 28 30 40 30 C52 30 60 33 60 36 L62 65 C62 67 60 68 58 68 L22 68 C20 68 18 67 18 65 Z" fill="currentColor" />
        <rect x="25" y="68" width="13" height="28" rx="5" fill="currentColor" />
        <rect x="42" y="68" width="13" height="28" rx="5" fill="currentColor" />
      </svg>
    ),
  },
];

const bellyTypes = [
  {
    id: "flat",
    label: "Mais plano",
    svg: (
      <svg viewBox="0 0 80 100" className="w-full h-full text-muted-foreground/40">
        <path d="M25 10 C25 8 30 5 40 5 C50 5 55 8 55 10 L56 70 C56 72 54 74 52 74 L28 74 C26 74 24 72 24 70 Z" fill="currentColor" />
        <line x1="35" y1="25" x2="45" y2="25" stroke="white" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "normal",
    label: "Normal",
    svg: (
      <svg viewBox="0 0 80 100" className="w-full h-full text-muted-foreground/40">
        <path d="M25 10 C25 8 30 5 40 5 C50 5 55 8 55 10 L58 70 C58 72 56 74 54 74 L26 74 C24 74 22 72 22 70 Z" fill="currentColor" />
        <ellipse cx="40" cy="50" rx="12" ry="8" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "round",
    label: "Mais redondo",
    svg: (
      <svg viewBox="0 0 80 100" className="w-full h-full text-muted-foreground/40">
        <path d="M22 10 C22 8 28 5 40 5 C52 5 58 8 58 10 L62 70 C62 72 60 74 58 74 L22 74 C20 74 18 72 18 70 Z" fill="currentColor" />
        <ellipse cx="40" cy="48" rx="16" ry="14" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
];

const SizeTechModal = ({ open, onClose }: SizeTechModalProps) => {
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(18);
  const [heightUnit, setHeightUnit] = useState<"CM" | "IN">("CM");
  const [weightUnit, setWeightUnit] = useState<"KG" | "LBS">("KG");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedBellyType, setSelectedBellyType] = useState("");

  const handleClose = () => {
    onClose();
    setStep(1);
    setSelectedBodyType("");
    setSelectedBellyType("");
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
                onClick={step === 1 ? handleClose : () => setStep(1)}
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
                <div
                  className="h-full bg-fincut-black rounded-full transition-all duration-300"
                  style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                />
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 flex-1"
                >
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
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fincut-gold [&::-webkit-slider-thumb]:border-0"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--fincut-gold)) ${((height - (heightUnit === "CM" ? 140 : 55)) / ((heightUnit === "CM" ? 220 : 87) - (heightUnit === "CM" ? 140 : 55))) * 100}%, hsl(var(--muted)) ${((height - (heightUnit === "CM" ? 140 : 55)) / ((heightUnit === "CM" ? 220 : 87) - (heightUnit === "CM" ? 140 : 55))) * 100}%)`
                      }}
                    />
                    <div className="flex gap-2 mt-2">
                      {(["CM", "IN"] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => { setHeightUnit(u); setHeight(u === "CM" ? 175 : 69); }}
                          className={`font-body text-xs font-medium ${heightUnit === u ? "text-fincut-black" : "text-muted-foreground"}`}
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
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fincut-gold [&::-webkit-slider-thumb]:border-0"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--fincut-gold)) ${((weight - (weightUnit === "KG" ? 40 : 88)) / ((weightUnit === "KG" ? 150 : 330) - (weightUnit === "KG" ? 40 : 88))) * 100}%, hsl(var(--muted)) ${((weight - (weightUnit === "KG" ? 40 : 88)) / ((weightUnit === "KG" ? 150 : 330) - (weightUnit === "KG" ? 40 : 88))) * 100}%)`
                      }}
                    />
                    <div className="flex gap-2 mt-2">
                      {(["KG", "LBS"] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => { setWeightUnit(u); setWeight(u === "KG" ? 70 : 154); }}
                          className={`font-body text-xs font-medium ${weightUnit === u ? "text-fincut-black" : "text-muted-foreground"}`}
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
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fincut-gold [&::-webkit-slider-thumb]:border-0"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--fincut-gold)) ${((age - 14) / (80 - 14)) * 100}%, hsl(var(--muted)) ${((age - 14) / (80 - 14)) * 100}%)`
                      }}
                    />
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 flex-1"
                >
                  <h2 className="font-display text-xl font-bold text-fincut-black mb-6">
                    Que peito se parece com o seu?
                  </h2>

                  {/* Chest silhouette */}
                  <div className="flex justify-center mb-8">
                    <div className="w-56 h-44">
                      <svg viewBox="0 0 200 140" className="w-full h-full">
                        <defs>
                          <radialGradient id="chestGrad" cx="50%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#e8e8e8" />
                            <stop offset="100%" stopColor="#d0d0d0" />
                          </radialGradient>
                        </defs>
                        <ellipse cx="100" cy="20" rx="22" ry="20" fill="url(#chestGrad)" />
                        <path d="M55 42 C55 38 72 34 100 34 C128 34 145 38 145 42 L150 130 C150 135 145 140 140 140 L60 140 C55 140 50 135 50 130 Z" fill="url(#chestGrad)" />
                        <path d="M55 42 L30 55 C25 58 22 62 22 68 L22 90" stroke="#d0d0d0" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M145 42 L170 55 C175 58 178 62 178 68 L178 90" stroke="#d0d0d0" strokeWidth="8" fill="none" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Body type options */}
                  <div className="space-y-0">
                    {bodyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedBodyType(type.id)}
                        className={`w-full flex items-center gap-4 py-4 border-b border-muted transition-colors ${
                          selectedBodyType === type.id ? "bg-muted/30" : "hover:bg-muted/20"
                        }`}
                      >
                        <div className="w-12 h-12 flex-shrink-0">
                          {type.svg}
                        </div>
                        <span className="font-body text-sm font-medium text-fincut-black flex-1 text-left">
                          {type.label}
                        </span>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : step === 3 ? (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 flex-1"
                >
                  <h2 className="font-display text-xl font-bold text-fincut-black mb-6">
                    Que barriga se parece com a sua?
                  </h2>

                  {/* Belly silhouette */}
                  <div className="flex justify-center mb-8">
                    <div className="w-56 h-44">
                      <svg viewBox="0 0 200 140" className="w-full h-full">
                        <defs>
                          <radialGradient id="bellyGrad" cx="50%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#e8e8e8" />
                            <stop offset="100%" stopColor="#d0d0d0" />
                          </radialGradient>
                        </defs>
                        <path d="M60 10 C60 5 75 0 100 0 C125 0 140 5 140 10 L145 100 C145 110 135 120 125 120 L75 120 C65 120 55 110 55 100 Z" fill="url(#bellyGrad)" />
                        <path d="M60 10 L35 20 C28 24 25 30 25 38 L25 60" stroke="#d0d0d0" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M140 10 L165 20 C172 24 175 30 175 38 L175 60" stroke="#d0d0d0" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <ellipse cx="100" cy="70" rx="25" ry="4" fill="#d8d8d8" opacity="0.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Belly type options */}
                  <div className="space-y-0">
                    {bellyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedBellyType(type.id)}
                        className={`w-full flex items-center gap-4 py-4 border-b border-muted transition-colors ${
                          selectedBellyType === type.id ? "bg-muted/30" : "hover:bg-muted/20"
                        }`}
                      >
                        <div className="w-12 h-12 flex-shrink-0">
                          {type.svg}
                        </div>
                        <span className="font-body text-sm font-medium text-fincut-black flex-1 text-left">
                          {type.label}
                        </span>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Footer button */}
            <div className="px-6 pb-6 mt-auto pt-4">
              <button
                onClick={() => {
                  if (step === 1) setStep(2);
                  else if (step === 2) setStep(3);
                  else handleClose();
                }}
                className="w-full h-14 bg-fincut-black text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-fincut-black/90 transition-colors duration-200"
              >
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
