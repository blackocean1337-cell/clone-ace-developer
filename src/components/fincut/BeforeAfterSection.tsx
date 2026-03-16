import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Shirt } from "lucide-react";
import beforeFit from "@/assets/before-fit.jpg";
import afterFit from "@/assets/after-fit.jpg";

const morphologies = [
  { id: "slim", label: "MAGRO" },
  { id: "medium", label: "MÉDIO" },
  { id: "large", label: "LARGO" },
];

const BeforeAfterSection = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedMorphology, setSelectedMorphology] = useState("medium");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updateSlider(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <section className="w-full bg-fincut-charcoal">
      {/* Before/After Slider */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[2.4/1] overflow-hidden cursor-col-resize select-none"
        onClick={(e) => updateSlider(e.clientX)}
        onMouseDown={(e) => { isDragging.current = true; updateSlider(e.clientX); }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={(e) => { isDragging.current = true; updateSlider(e.touches[0].clientX); }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After image (full background) */}
        <img
          src={afterFit}
          alt="Depois"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeFit}
            alt="Antes"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth || 1000}px`, maxWidth: "none" }}
          />
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 font-display text-sm font-semibold text-white/80 tracking-wider">
          Antes
        </span>
        <span className="absolute top-4 right-4 font-display text-sm font-semibold text-white/80 tracking-wider">
          Depois
        </span>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/70 cursor-col-resize z-10"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40">
            <ChevronLeft size={12} className="text-white -mr-1" />
            <ChevronRight size={12} className="text-white -ml-1" />
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-fincut-charcoal to-transparent" />
      </div>

      {/* Morphology selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="font-body text-sm text-muted-foreground mb-3">A sua morfologia:</p>
        <div className="grid grid-cols-3 gap-3">
          {morphologies.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMorphology(m.id)}
              className={`flex items-center justify-center gap-2 py-3 rounded-sm font-display text-xs font-bold tracking-widest transition-all duration-200 ${
                selectedMorphology === m.id
                  ? "bg-muted text-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <Shirt size={16} />
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
