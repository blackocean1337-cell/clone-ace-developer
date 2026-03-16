import { motion } from "framer-motion";

const events = [
  { date: "février 2026", title: "Renouveau", desc: "Fincut s'installe au sein des nouveaux bureaux BrandSystem (700 m²) et intègre pleinement son écosystème." },
  { date: "janvier 2026", title: "Nomination", desc: "BrandSystem nomme Hamdi Haben Directeur Artistique pour redéfinir la vision créative." },
  { date: "décembre 2025", title: "Technologie", desc: "Création de la technologie textile Sizetech+. Ouverture d'une unité d'expédition en France." },
  { date: "novembre 2025", title: "Acquisition", desc: "BrandSystem acquiert l'intégralité des parts de Fincut pour une vision long terme." },
  { date: "juillet 2023", title: "Lancement", desc: "Lancement du t-shirt Fincut — première version." },
  { date: "mai 2023", title: "Genèse", desc: "Thomas et Alex fondent Fincut." },
];

const TimelineSection = () => {
  return (
    <section id="histoire" className="bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Notre histoire</h2>
        <a href="#" className="font-body text-xs text-fincut-gold hover:underline flex items-center gap-1">
          Découvrir →
        </a>
      </div>

      <div className="relative">
        {/* Timeline line */}
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
              {/* Dot */}
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
