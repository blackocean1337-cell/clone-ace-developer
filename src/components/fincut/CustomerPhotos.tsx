import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import photo1 from "@/assets/customer-photo-1.jpg";
import photo2 from "@/assets/customer-photo-2.jpg";
import photo3 from "@/assets/customer-photo-3.jpg";

const photos = [
  { image: photo1, label: "A t-shirt Icónica" },
  { image: photo2, label: "A t-shirt Icónica" },
  { image: photo3, label: "A t-shirt Icónica" },
  { image: photo1, label: "A t-shirt Icónica" },
  { image: photo2, label: "A t-shirt Icónica" },
];

const CustomerPhotos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">As vossas fotos (Obrigado!)</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-2 border border-border hover:border-foreground transition-colors duration-200">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll("right")} className="p-2 border border-border hover:border-foreground transition-colors duration-200">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {photos.map((p, i) => (
          <a key={i} href="#" className="group min-w-[200px] sm:min-w-[260px] flex-shrink-0 relative overflow-hidden">
            <img src={p.image} alt={p.label} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-200" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fincut-black/80 to-transparent p-4">
              <p className="font-body text-xs text-secondary-foreground">{p.label}</p>
              <p className="font-body text-xs text-fincut-gold mt-1">Descobrir</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CustomerPhotos;
