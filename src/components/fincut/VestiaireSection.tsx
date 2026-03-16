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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground tracking-tight text-center mb-2">O Vestiário</h2>
        <p className="font-body text-sm text-muted-foreground text-center mb-8">Completa o teu estilo</p>
        <div className="relative">
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
            {vestiaireProducts.map((product) => (
              <div key={product.id} className="w-[260px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
};

export default VestiaireSection;