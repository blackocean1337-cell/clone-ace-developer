import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { title: "Produtos de ótima qualidade.", text: "Produtos de ótima qualidade.", author: "PICCINOTTI Daniel", date: "14/03/2026" },
  { title: "Tudo correu perfeitamente", text: "Tudo correu perfeitamente", author: "Renaud Witmeur", date: "14/03/2026" },
  { title: "No topo", text: "No topo, tipo dab...", author: "Milette", date: "14/03/2026" },
  { title: "Camiseta bem cortada", text: "Camiseta bem cortada, material agradável. Prazos de entrega corretos.", author: "Érico", date: "13/03/2026" },
  { title: "O que dizer que gostamos, não gostamos", text: "O que dizer que gostamos, não gostamos", author: "Bertrand Dulhoste", date: "12/03/2026" },
  { title: "Ótimo como sempre, só um pequeno...", text: "Ótimo como sempre, apenas uma observação rápida para dar um pouco mais de facilidade em camisetas de manga curta, como aquelas de manga comprida", author: "Dominique Souletis", date: "12/03/2026" },
  { title: "Bons produtos", text: "Velocidade de processamento de pedidos. Produtos qualitativos", author: "Denis GUIOT", date: "12/03/2026" },
  { title: "Sempre satisfeito com os produtos...", text: "Sempre satisfeito com os produtos Fincut, os cortes destacam o corpo!", author: "Xavier", date: "12/03/2026" },
];

const TrustpilotStars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-[18px] h-[18px] bg-[#00b67a] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    ))}
  </div>
);

const TrustpilotStarsMd = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-[22px] h-[22px] bg-[#00b67a] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    ))}
  </div>
);

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-display text-xl font-bold text-foreground">Trustpilot</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-foreground">4.5</span>
            <TrustpilotStarsMd />
            <span className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">BASEADO EM 6709 NOTAR</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          <div ref={scrollRef} className="flex gap-0 overflow-x-auto scrollbar-hide">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 border-r border-border bg-muted/50 p-6 flex flex-col justify-between first:border-l"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <TrustpilotStars />
                    <span className="font-body text-[11px] text-muted-foreground">{r.date}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-2 leading-snug">{r.title}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
                <p className="font-body text-xs text-foreground font-medium mt-8">{r.author}</p>
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
