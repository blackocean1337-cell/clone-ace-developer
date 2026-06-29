import { motion } from "framer-motion";

const EDITORIAL_IMG =
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1800&q=85";

const EditorialFeature = () => {
  return (
    <section className="bg-fincut-black text-secondary-foreground py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={EDITORIAL_IMG}
              alt="A obsessão pelo detalhe — MRTUGA"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden lg:block bg-fincut-gold text-primary-foreground px-5 py-3">
            <span className="font-display text-[10px] font-bold tracking-[0.3em] uppercase">Feito em Portugal</span>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-fincut-gold" />
            <span className="font-display text-[11px] tracking-[0.4em] uppercase text-fincut-gold">A Obsessão</span>
          </div>

          <h2 className="font-display font-black leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)] mb-8">
            Dois anos<br />
            de prototipagem.<br />
            <span className="italic font-light text-secondary-foreground/70">Um único corte.</span>
          </h2>

          <p className="font-body text-secondary-foreground/70 leading-relaxed mb-6">
            Trabalhámos com mestres alfaiates do norte de Portugal para reinventar o essencial.
            Cada costura é fechada com remate francês. Cada gola é tricotada à parte e cosida sem distorção.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-10 border-t border-secondary-foreground/15 pt-8">
            {[
              ["220g/m²", "Gramagem"],
              ["8", "Morfologias"],
              ["50+", "Lavagens"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-display text-2xl font-bold tracking-tight">{k}</div>
                <div className="font-body text-[10px] tracking-[0.2em] uppercase text-secondary-foreground/50 mt-1">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialFeature;
