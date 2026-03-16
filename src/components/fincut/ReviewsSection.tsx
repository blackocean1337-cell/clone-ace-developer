import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { title: "Sempre satisfeito com os produtos...", text: "Sempre satisfeito com os produtos Fincut: os cortes destacam o corpo!", author: "Xavier", date: "12/03/2026" },
  { title: "NÍQUEL!", text: "Ras, tudo correu bem e seus compromissos foram cumpridos. Mal posso esperar para levar minhas compras.", author: "Carbono", date: "12/03/2026" },
  { title: "Este é o quarto pedido da Fincut com 25...", text: "Este é o 4o pedido da Fincut com 25 camisetas de todas as cores, em uma palavra perfeito!!!!!!!", author: "Alain Littardi", date: "12/03/2026" },
  { title: "Para mim a marca Fincut é a melhor...", text: "Para mim a marca Fincut é a melhor camiseta", author: "Thierry", date: "12/03/2026" },
  { title: "Tudo correu perfeitamente", text: "Tudo correu perfeitamente", author: "Renaud Witmeur", date: "14/03/2026" },
  { title: "Produtos de ótima qualidade.", text: "Produtos de ótima qualidade.", author: "PICCINOTTI Daniel", date: "14/03/2026" },
  { title: "Bons produtos", text: "Velocidade de processamento de pedidos. Produtos qualitativos", author: "Denis GUIOT", date: "12/03/2026" },
  { title: "Camiseta bem cortada", text: "Camiseta bem cortada, material agradável. Prazos de entrega corretos.", author: "Érico", date: "13/03/2026" },
];

const TrustpilotStars = () => (
  <div className="flex gap-px">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-[20px] h-[20px] bg-[#00b67a] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    ))}
  </div>
);

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-display text-lg font-bold text-foreground">Trustpilot</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-foreground">4.5</span>
            <TrustpilotStars />
            <span className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">BASEADO EM 6709 NOTAR</span>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background shadow border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[310px] flex-shrink-0 bg-muted rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <TrustpilotStars />
                    <span className="font-body text-[11px] text-muted-foreground">{r.date}</span>
                  </div>
                  <h3 className="font-display text-[15px] font-bold text-foreground mb-2 leading-snug">{r.title}</h3>
                  <p className="font-body text-[13px] text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
                <p className="font-body text-[13px] text-foreground font-medium mt-8">{r.author}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background shadow border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
