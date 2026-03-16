import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  { title: "Produits de grande qualité", text: "Produits de grande qualité, j'ai pu bénéficier d'une ristourne très intéressante sur 6 t-shirts.", author: "Hervé A.", date: "15/03/2026" },
  { title: "Superbe t-Shirt", text: "Superbe t-Shirt, matière très agréable à porter et très bien taillé. J'en ai racheté plusieurs fois.", author: "Fabrice", date: "15/03/2026" },
  { title: "Au top !", text: "Tee-shirt de très bonne qualité, expédition rapide et soignée. Le SAV est réactif et à l'écoute.", author: "Lasserre", date: "13/03/2026" },
  { title: "Tee-shirt de dingue !!!", text: "J'ai commandé un pack de 4 tee-shirts noir et c'est encore mieux que ce que je pensais.", author: "Arthur R.", date: "11/03/2026" },
  { title: "Excellente coupe", text: "Excellente coupe, matière ne bouge pas au lavage, j'en suis à ma deuxième commande.", author: "Anthony M.", date: "09/03/2026" },
  { title: "Client régulier", text: "Comme d'habitude je suis enchanté par la coupe et la qualité. Fincut est mon t-shirt de référence.", author: "François G.", date: "06/03/2026" },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className="fill-fincut-gold text-fincut-gold" />
    ))}
  </div>
);

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="bg-fincut-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Trustpilot header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          <span className="font-display text-lg font-bold text-secondary-foreground">Trustpilot</span>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-secondary-foreground">4.5</span>
            <Stars />
          </div>
          <span className="font-body text-xs text-fincut-gray">Basé sur 6709 avis</span>
        </div>

        {/* Carousel controls */}
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={() => scroll("left")} className="p-2 border border-fincut-slate hover:border-secondary-foreground transition-colors duration-200">
            <ChevronLeft size={18} className="text-secondary-foreground" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 border border-fincut-slate hover:border-secondary-foreground transition-colors duration-200">
            <ChevronRight size={18} className="text-secondary-foreground" />
          </button>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {reviews.map((r, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 border border-fincut-slate p-5 space-y-3">
              <Stars />
              <p className="font-body text-[11px] text-fincut-gray">{r.date}</p>
              <h3 className="font-display text-sm font-bold text-secondary-foreground">{r.title}</h3>
              <p className="font-body text-xs text-fincut-gray leading-relaxed">{r.text}</p>
              <p className="font-body text-xs text-secondary-foreground font-medium">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
