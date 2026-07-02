import { useEffect, useRef } from "react";

const reviews = [
  { title: "Nada a dizer 5 estrelas ❤️👌 encomenda recebida...", text: "Nada a dizer 5 estrelas ❤️👌encomenda recebida há 4 dias muito satisfeito 😌", author: "izu muhamad", date: "30/06/2026" },
  { title: "As melhores t-shirts que já usei...", text: "As melhores t-shirts que já usei até hoje. Já fiz 2 encomendas de 3 t-shirts cada. E não vou parar por aqui. Assentam perfeitamente, entram bem num chino ou jogger. Uma pérola", author: "Guinel ByGuinel", date: "29/06/2026" },
  { title: "Ao Topo", text: "Ao TopoQualidade presente", author: "Amaury", date: "29/06/2026" },
  { title: "Bela qualidade", text: "Bela qualidade Tamanho bem idêntico ao site", author: "Emmanuelle Gautier", date: "29/06/2026" },
  { title: "Tudo estava perfeito", text: "Tudo estava perfeito", author: "Maxime Lapotre", date: "03/10/2026" },
  { title: "T-shirt muito bem cortada!", text: "T-shirt muito bem cortada!!! Envio rápido!!! Nada a apontar. Muito bom, continuem assim.", author: "Correa", date: "03/09/2026" },
  { title: "Produto perfeito", text: "Produto perfeito. Preço muito atractivo, sobretudo em promoção. Obrigado por melhorar os prazos de entrega.", author: "Alioss", date: "03/09/2026" },
  { title: "Está tudo ótimo", text: "Está tudo ótimo! O corte, a promoção aplicada, a qualidade do produto e o prazo de entrega. Comunicação fácil também", author: "Stéphane Crozier", date: "03/09/2026" },
  { title: "Excelente!", text: "Excelente quando se faz o pedido.", author: "Anthony", date: "03/09/2026" },
  { title: "Sempre satisfeito", text: "Sempre satisfeito com os produtos MRTUGA: os cortes valorizam o corpo!", author: "Xavier", date: "12/03/2026" },
];

// Trustpilot green filled star square (5 squares in a row with white star inside)
const GreenStars = ({ size = 20 }: { size?: number }) => (
  <div className="flex gap-[2px]">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        style={{ width: size, height: size, backgroundColor: "#00b67a" }}
        className="flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" style={{ width: size * 0.62, height: size * 0.62 }} className="fill-white">
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
    let speed = 1.2;

    const step = () => {
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      el.scrollLeft += speed;
      animationId = requestAnimationFrame(step);
    };
    animationId = requestAnimationFrame(step);

    const pause = () => { speed = 0; };
    const resume = () => { speed = 1.2; };
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
    <section className="bg-background pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header — Trustpilot left, rating right */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-[6px]">
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-foreground">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-serif text-[20px] leading-none text-foreground">Trustpilot</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="font-serif text-[18px] leading-none text-foreground">4.5</span>
            <GreenStars size={22} />
            <span className="font-body text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
              Baseado em 8564 avaliações
            </span>
          </div>
        </div>

        {/* Infinite carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden scrollbar-hide"
        >
          {doubled.map((r, i) => (
            <div
              key={i}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 bg-[#f2f2f2] rounded-[4px] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <GreenStars size={20} />
                  <span className="font-serif italic text-[13px] text-muted-foreground">{r.date}</span>
                </div>
                <h3 className="font-serif text-[20px] leading-[1.2] text-foreground mb-3 line-clamp-2">
                  {r.title}
                </h3>
                <p className="font-body text-[14px] text-muted-foreground leading-[1.5] line-clamp-5">
                  {r.text}
                </p>
              </div>
              <p className="font-body text-[13px] text-muted-foreground mt-6">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
