import { useEffect, useRef } from "react";

const reviews = [
  { title: "Tudo estava perfeito", text: "Tudo estava perfeito", author: "Maxime Lapotre", date: "03/10/2026" },
  { title: "Camiseta muito bem cortada!", text: "Camiseta muito bem cortada!!! Envio rápido!!! Não há nada do que reclamar. Muito bem e continue assim.", author: "Correa", date: "03/09/2026" },
  { title: "Produto perfeito", text: "Produto perfeito. Preço muito atraente, especialmente na promoção. Obrigado por melhorar os prazos de entrega.", author: "Alioss", date: "03/09/2026" },
  { title: "Tudo é ótimo", text: "Está tudo ótimo! O corte, a promoção aplicada, a qualidade do produto e o prazo de entrega. Comunicação fácil também", author: "Stephane Crozier", date: "03/09/2026" },
  { title: "Excelente!", text: "Excelente quando se faz o pedido.", author: "Anthony", date: "03/09/2026" },
  { title: "Sempre satisfeito", text: "Sempre satisfeito com os produtos Fincut: os cortes destacam o corpo!", author: "Xavier", date: "12/03/2026" },
  { title: "NÍQUEL!", text: "Ras, tudo correu bem e seus compromissos foram cumpridos. Mal posso esperar para levar minhas compras.", author: "Carbono", date: "12/03/2026" },
  { title: "Para mim a marca Fincut é a melhor...", text: "Para mim a marca Fincut é a melhor camiseta", author: "Thierry", date: "12/03/2026" },
];

const TrustpilotStars = () => (
  <div className="flex gap-px">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-[20px] h-[20px] bg-[#191919] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    ))}
  </div>
);

const HeaderStars = () => (
  <div className="flex gap-px">
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationId: number;
    let speed = 0.5;

    const step = () => {
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      el.scrollLeft += speed;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const pause = () => { speed = 0; };
    const resume = () => { speed = 0.5; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const doubled = [...reviews, ...reviews];

  return (
    <section className="bg-background py-14 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-display text-lg font-bold text-foreground">Trustpilot</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-foreground">4.5</span>
            <HeaderStars />
            <span className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">BASEADO EM 6709 NOTAR</span>
          </div>
        </div>

        {/* Infinite loop carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden scrollbar-hide"
        >
          {doubled.map((r, i) => (
            <div
              key={i}
              className="min-w-[300px] sm:min-w-[340px] flex-shrink-0 border border-border p-6 flex flex-col justify-between"
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
      </div>
    </section>
  );
};

export default ReviewsSection;
