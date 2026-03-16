import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import timeline1 from "@/assets/timeline-1.jpg";
import timeline2 from "@/assets/timeline-2.jpg";
import timeline3 from "@/assets/timeline-3.jpg";
import timeline4 from "@/assets/timeline-4.jpg";
import timeline5 from "@/assets/timeline-5.jpg";
import timeline6 from "@/assets/timeline-6.jpg";
import timeline7 from "@/assets/timeline-7.jpg";
import timeline8 from "@/assets/timeline-8.jpg";
import timeline9 from "@/assets/timeline-9.jpg";

const events = [
  { date: "FEVEREIRO DE 2026", title: "Renovação", desc: "A Fincut instala-se nos novos escritórios da BrandSystem (700 m²) e integra plenamente o seu ecossistema: equipas, conhecimentos e ferramentas.", image: timeline1 },
  { date: "JANEIRO DE 2026", title: "Nomeação", desc: "BrandSystem nomeia Hamdi Haben Diretor Artístico para redefinir a visão criativa e estratégica da Fincut.", image: timeline2 },
  { date: "DEZEMBRO DE 2025", title: "Tecnologia", desc: "Criação da tecnologia têxtil Sizetech+. Abertura de uma unidade marítima em França dedicada à Europa.", image: timeline3 },
  { date: "NOVEMBRO DE 2025", title: "Aquisição", desc: "A BrandSystem adquire a totalidade das participações da Fincut para uma visão de longo prazo.", image: timeline4 },
  { date: "SETEMBRO DE 2025", title: "Produção", desc: "Nova linha de produção têxtil com tecidos premium e acabamentos de alta qualidade.", image: timeline5 },
  { date: "JULHO DE 2024", title: "Expansão", desc: "Abertura do centro de expedição europeu para uma entrega mais rápida em toda a Europa.", image: timeline7 },
  { date: "MARÇO DE 2024", title: "Campanha", desc: "Primeira campanha fotográfica profissional com modelos reais vestindo a coleção icónica.", image: timeline8 },
  { date: "JULHO DE 2023", title: "Lançamento", desc: "Lançamento da t-shirt Fincut — primeira versão do produto icónico.", image: timeline6 },
  { date: "MAIO DE 2023", title: "Génese", desc: "Thomas e Alex fundam a Fincut com a ambição de reinventar a t-shirt masculina.", image: timeline9 },
];

const TimelineSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <section id="histoire" className="bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">A nossa história</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-2 border border-border hover:border-foreground transition-colors duration-200">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll("right")} className="p-2 border border-border hover:border-foreground transition-colors duration-200">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Date labels row */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 min-w-max pb-1">
          {events.map((e, i) => (
            <div key={i} className="w-[300px] sm:w-[360px] flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-[11px] tracking-wider text-muted-foreground whitespace-nowrap">
                  {e.date}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="group cursor-pointer">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mt-4">{e.title}</h3>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
