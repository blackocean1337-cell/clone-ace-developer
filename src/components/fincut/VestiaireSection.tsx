import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vestiaireProducts } from "@/data/products";
import ProductCard from "./ProductCard";

const VestiaireSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section id="vestiaire" className="bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Votre vestiaire</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-2 border border-border hover:border-foreground transition-colors duration-200">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll("right")} className="p-2 border border-border hover:border-foreground transition-colors duration-200">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4">
        {vestiaireProducts.map((p) => (
          <div key={p.slug} className="min-w-[200px] sm:min-w-[240px] flex-shrink-0">
            <ProductCard image={p.cardImage} name={p.name} price={p.priceLabel} darkBg slug={p.slug} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VestiaireSection;
