import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tshirtBlack from "@/assets/tshirt-black.png";
import poloBlack from "@/assets/polo-black.png";
import tshirtVneck from "@/assets/tshirt-vneck.png";
import tshirtLongsleeve from "@/assets/tshirt-longsleeve.png";
import pullBlack from "@/assets/pull-black.png";
import ProductCard from "./ProductCard";

const products = [
  { image: tshirtBlack, name: "Le t-shirt Iconique", price: "18 €" },
  { image: poloBlack, name: "Le Polo", price: "25 €" },
  { image: tshirtVneck, name: "Le t-shirt col V", price: "18 €" },
  { image: tshirtLongsleeve, name: "Le t-shirt Manches Longues", price: "30 €" },
  { image: pullBlack, name: "Le Pull", price: "55 €" },
];

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
        {products.map((p, i) => (
          <div key={i} className="min-w-[200px] sm:min-w-[240px] flex-shrink-0">
            <ProductCard image={p.image} name={p.name} price={p.price} darkBg />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VestiaireSection;
