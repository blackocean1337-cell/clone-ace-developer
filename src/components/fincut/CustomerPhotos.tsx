import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import reviewPhoto1 from "@/assets/review-photo-1.png";
import reviewPhoto2 from "@/assets/review-photo-2.png";
import reviewPhoto3 from "@/assets/review-photo-3.png";
import reviewPhoto4 from "@/assets/review-photo-4.png";
import reviewPhoto5 from "@/assets/review-photo-5.png";
import reviewPhoto6 from "@/assets/review-photo-6.webp";
import reviewPhoto7 from "@/assets/review-photo-7.png";

const photos = [
  { image: reviewPhoto1, label: "A camiseta icónica" },
  { image: reviewPhoto2, label: "A camiseta icónica" },
  { image: reviewPhoto3, label: "A camiseta icónica" },
  { image: reviewPhoto4, label: "A camiseta icónica" },
  { image: reviewPhoto5, label: "A camiseta icónica" },
  { image: reviewPhoto6, label: "A camiseta icónica" },
  { image: reviewPhoto7, label: "A camiseta icónica" },
];

const CustomerPhotos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          As vossas fotos (Obrigado!)
        </h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-2 border border-border hover:bg-muted transition-colors">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 border border-border hover:bg-muted transition-colors">
            <ChevronRight size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
          {photos.map((p, i) => (
            <a
              key={i}
              href="#"
              className="group relative flex-shrink-0 w-[260px] sm:w-[300px] overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.label}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 flex items-end justify-between">
                <p className="font-body text-sm text-white">{p.label}</p>
                <p className="font-body text-sm text-white underline underline-offset-2">Descobrir</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotos;
