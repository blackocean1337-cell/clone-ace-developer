const reviews = [
  { title: "Nada a dizer 5 estrelas ❤️👌", text: "Nada a dizer 5 estrelas ❤️👌 encomenda recebida há 4 dias muito satisfeito 😌", author: "Izu Muhamad", date: "01/07/2026" },
  { title: "As melhores t-shirts que já usei", text: "As melhores t-shirts que já usei até hoje. Já fiz 2 encomendas de 3 t-shirts cada. E não vou parar por aqui. Assentam perfeitamente, entram bem num chino ou jogger. Uma pérola.", author: "Guinel ByGuinel", date: "29/06/2026" },
  { title: "Ao topo", text: "Ao topo. Qualidade presente.", author: "Amaury", date: "29/06/2026" },
  { title: "Bela qualidade", text: "Bela qualidade. Tamanho bem idêntico ao site.", author: "Emmanuelle Gautier", date: "29/06/2026" },
  { title: "Tudo estava perfeito", text: "Tudo estava perfeito.", author: "Maxime Lapotre", date: "28/06/2026" },
  { title: "T-shirt muito bem cortada!", text: "T-shirt muito bem cortada!!! Envio rápido!!! Nada a apontar. Muito bom, continuem assim.", author: "Correa", date: "27/06/2026" },
  { title: "Produto perfeito", text: "Produto perfeito. Preço muito atractivo, sobretudo em promoção. Obrigado por melhorar os prazos de entrega.", author: "Alioss", date: "27/06/2026" },
  { title: "Está tudo ótimo", text: "Está tudo ótimo! O corte, a promoção aplicada, a qualidade do produto e o prazo de entrega. Comunicação fácil também.", author: "Stéphane Crozier", date: "26/06/2026" },
  { title: "Excelente!", text: "Excelente quando se faz o pedido.", author: "Anthony", date: "26/06/2026" },
  { title: "Sempre satisfeito", text: "Sempre satisfeito com os produtos MRTUGA: os cortes valorizam o corpo!", author: "Xavier", date: "25/06/2026" },
];

// Trustpilot green square stars (5 filled squares with white star)
const Stars = ({ className = "h-[14px] xl:h-[16px]" }: { className?: string }) => (
  <div className={`flex gap-[2px] ${className}`} style={{ height: undefined }}>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-full aspect-square flex items-center justify-center" style={{ backgroundColor: "#00b67a" }}>
        <svg viewBox="0 0 24 24" className="fill-white w-[62%] h-[62%]">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    ))}
  </div>
);

const TrustpilotLogo = () => (
  <div className="flex items-center gap-[6px] w-[80px] xl:w-[100px]">
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] xl:w-[22px] xl:h-[22px] fill-[#00b67a]">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
    <span className="font-serif text-[14px] xl:text-[18px] leading-[110%] text-gray-900">Trustpilot</span>
  </div>
);

const ReviewsSection = () => {
  const doubled = [...reviews, ...reviews];

  return (
    <section id="trustpilot" className="mb-[30px] xl:mb-[80px] px-5 xl:px-20 pt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-[20px]">
        <TrustpilotLogo />
        <div className="flex items-center gap-[10px]">
          <p className="font-serif text-[14px] xl:text-[18px] text-gray-900 leading-[110%]">4.5</p>
          <Stars />
          <p className="uppercase text-[11px] xl:text-[14px] text-gray-400 leading-[110%]">Baseado em 8564 avaliações</p>
        </div>
      </div>

      {/* Marquee carousel */}
      <div className="overflow-hidden relative -mr-5 xl:-mr-20 group">
        <div
          className="flex gap-[20px] fincut-marquee"
          style={{ width: "max-content" }}
        >
          {doubled.map((r, i) => (
            <div key={i} className="w-[288px] xl:w-[360px] shrink-0">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="bg-gray-100 p-[20px] h-full flex flex-col min-h-[150px] xl:min-h-[230px] hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center mb-[20px]">
                  <Stars />
                  <p className="text-[11px] text-gray-400 leading-[110%]">{r.date}</p>
                </div>
                <h3 className="font-serif text-[18px] xl:text-[20px] text-gray-900 mb-[20px] leading-[110%]">{r.title}</h3>
                <p className="text-[14px] xl:text-[16px] text-gray-400 flex-1 mb-[20px] leading-[110%]">{r.text}</p>
                <p className="text-[14px] text-gray-900 leading-[110%]">{r.author}</p>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fincut-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .fincut-marquee {
          animation: fincut-marquee 120s linear infinite;
        }
        .group:hover .fincut-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;
