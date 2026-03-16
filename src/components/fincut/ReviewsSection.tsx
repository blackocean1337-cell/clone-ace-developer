import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { title: "Produtos de ótima qualidade.", text: "Produtos de ótima qualidade.", author: "PICCINOTTI Daniel", date: "14/03/2026" },
  { title: "Tudo correu perfeitamente", text: "Tudo correu perfeitamente", author: "Renaud Witmeur", date: "14/03/2026" },
  { title: "No topo", text: "No topo, tipo dab...", author: "Milette", date: "14/03/2026" },
  { title: "Camiseta bem cortada", text: "Camiseta bem cortada, material agradável. Prazos de entrega corretos.", author: "Érico", date: "13/03/2026" },
  { title: "T-shirt soberba", text: "T-shirt soberba, material muito agradável de vestir e muito bem cortada.", author: "Fabrice", date: "15/03/2026" },
  { title: "Excelente!", text: "T-shirt de muito boa qualidade, envio rápido e cuidado.", author: "Lasserre", date: "13/03/2026" },
];

const TrustpilotStars = ({ count = 5, size = "sm" }: { count?: number; size?: "sm" | "md" }) => {
  const h = size === "md" ? "h-5" : "h-4";
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`${h} aspect-square bg-[#00b67a] flex items-center justify-center`}>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-white">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#00b67a]">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-display text-xl font-bold text-foreground">Trustpilot</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-foreground">4.5</span>
            <TrustpilotStars count={5} size="md" />
            <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">BASEADO EM 6709 NOTAR</span>
          </div>
        </div>

        {/* Reviews carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 bg-muted p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <TrustpilotStars />
                    <span className="font-body text-[11px] text-muted-foreground">{r.date}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-1">{r.title}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
                <p className="font-body text-xs text-foreground font-medium mt-6">{r.author}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
