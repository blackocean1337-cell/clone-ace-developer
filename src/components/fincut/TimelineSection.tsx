import { motion } from "framer-motion";

const events = [
  { date: "fevereiro 2026", title: "Renovação", desc: "A Fincut instala-se nos novos escritórios BrandSystem (700 m²) e integra plenamente o seu ecossistema." },
  { date: "janeiro 2026", title: "Nomeação", desc: "A BrandSystem nomeia Hamdi Haben como Diretor Artístico para redefinir a visão criativa." },
  { date: "dezembro 2025", title: "Tecnologia", desc: "Criação da tecnologia têxtil Sizetech+. Abertura de uma unidade de expedição em França." },
  { date: "novembro 2025", title: "Aquisição", desc: "A BrandSystem adquire a totalidade das participações da Fincut para uma visão de longo prazo." },
  { date: "julho 2023", title: "Lançamento", desc: "Lançamento da t-shirt Fincut — primeira versão." },
  { date: "maio 2023", title: "Génese", desc: "Thomas e Alex fundam a Fincut." },
];

const TimelineSection = () => {
  return (
    <section id="histoire" className="bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">A nossa história</h2>
        <a href="#" className="font-body text-xs text-fincut-gold hover:underline flex items-center gap-1">
          Descobrir →
        </a>
      </div>

      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-10">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-12 sm:pl-16"
            >
              <div className="absolute left-[11px] sm:left-[19px] top-1 w-2.5 h-2.5 bg-fincut-gold rounded-full" />
              <p className="font-body text-[11px] text-fincut-gray uppercase tracking-wider">{e.date}</p>
              <h3 className="font-display text-base font-bold text-foreground mt-1">{e.title}</h3>
              <p className="font-body text-sm text-muted-foreground mt-1 max-w-md">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
