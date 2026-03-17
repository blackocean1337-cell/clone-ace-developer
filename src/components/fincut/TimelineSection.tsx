import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import timelineReal1 from "@/assets/timeline-real-1.png";
import timelineReal2 from "@/assets/timeline-real-2.webp";
import timelineReal3 from "@/assets/timeline-real-3.webp";
import timelineReal4 from "@/assets/timeline-real-4.webp";
import timelineReal5 from "@/assets/timeline-real-5.webp";
import timelineReal6 from "@/assets/timeline-real-6.webp";
import timelineReal7 from "@/assets/timeline-real-7.webp";
import timelineReal8 from "@/assets/timeline-real-8.webp";
import timelineReal9 from "@/assets/timeline-real-9.webp";

const events = [
  { date: "FEVEREIRO DE 2026", title: "Renovação", desc: "A MRTUGA instala-se nos novos escritórios da BrandSystem (700 m²) e integra plenamente o seu ecossistema: equipas, conhecimentos e ferramentas.", image: timelineReal1 },
  { date: "JANEIRO DE 2026", title: "Nomeação", desc: "BrandSystem nomeia Hamdi Haben Diretor Artístico para redefinir a visão criativa e estratégica da MRTUGA.", image: "/lovable-uploads/fd939a0e-5444-4f63-bdd9-31596439eda2.png" },
  { date: "DEZEMBRO DE 2025", title: "Tecnologia", desc: "Criação da tecnologia têxtil Sizetech+. Abertura de uma unidade marítima em França dedicada à Europa.", image: timelineReal3 },
  { date: "NOVEMBRO DE 2025", title: "Aquisição", desc: "A BrandSystem adquire a totalidade das participações da MRTUGA para uma visão de longo prazo.", image: timelineReal4 },
  { date: "SETEMBRO DE 2025", title: "Escritórios", desc: "Abertura dos novos escritórios criativos dedicados ao desenvolvimento da marca e do produto.", image: timelineReal5 },
  { date: "JULHO DE 2024", title: "Produto", desc: "Desenvolvimento do corte icónico — a t-shirt que se adapta a todas as morfologias.", image: timelineReal6 },
  { date: "MARÇO DE 2024", title: "Produção", desc: "Nova linha de produção têxtil com tecidos premium e acabamentos de alta qualidade.", image: timelineReal7 },
  { date: "JULHO DE 2023", title: "Lançamento", desc: "Lançamento oficial da marca MRTUGA — primeira versão do produto icónico.", image: "/lovable-uploads/66f36dae-2a71-4910-b57e-f113158fca39.png" },
  { date: "MAIO DE 2023", title: "Génese", desc: "Thomas e Alex fundam a MRTUGA com a ambição de reinventar a t-shirt masculina.", image: "/lovable-uploads/011d36c1-2a4c-4121-a7d1-b9e87eeb29f5.png" }
];


const TimelineSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <section id="histoire" className="bg-background px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-[20px]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">​</h2>
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
          {events.map((e, i) =>
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
                  loading="lazy" />
                
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mt-4">{e.title}</h3>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default TimelineSection;