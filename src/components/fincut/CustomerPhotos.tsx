import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import photo1 from "@/assets/customer-photo-1.jpg";
import photo2 from "@/assets/customer-photo-2.jpg";
import photo3 from "@/assets/customer-photo-3.jpg";

const photos = [
  { image: photo1, label: "Le t-shirt Iconique" },
  { image: photo2, label: "Le t-shirt Iconique" },
  { image: photo3, label: "Le t-shirt Iconique" },
  { image: photo1, label: "Le t-shirt Iconique" },
  { image: photo2, label: "Le t-shirt Iconique" },
  { image: photo3, label: "Le t-shirt Iconique" },
  { image: photo1, label: "Le t-shirt Iconique" },
];

const CustomerPhotos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="bg-fincut-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-secondary-foreground">Vos photos (Merci !)</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="p-2 border border-fincut-slate hover:border-secondary-foreground transition-colors duration-200">
              <ChevronLeft size={18} className="text-secondary-foreground" />
            </button>
            <button onClick={() => scroll("right")} className="p-2 border border-fincut-slate hover:border-secondary-foreground transition-colors duration-200">
              <ChevronRight size={18} className="text-secondary-foreground" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {photos.map((p, i) => (
            <a key={i} href="#" className="group min-w-[200px] sm:min-w-[260px] flex-shrink-0 relative overflow-hidden">
              <img src={p.image} alt={p.label} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-200" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fincut-black/80 to-transparent p-4">
                <p className="font-body text-xs text-secondary-foreground">{p.label}</p>
                <p className="font-body text-xs text-fincut-gold mt-1">Découvrir</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotos;
