import { motion } from "framer-motion";

const HERO_IMG = "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=2000&q=85";

const HeroSection = () => {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-fincut-black">
      {/* Background image */}
      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        src={HERO_IMG}
        alt="MRTUGA — A T-shirt Icónica"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      {/* Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      {/* Eyebrow top */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 lg:px-12 pt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-secondary-foreground/80">
          <span className="font-display text-[10px] tracking-[0.35em] uppercase">Coleção FW · 2026</span>
          <span className="hidden md:inline font-display text-[10px] tracking-[0.35em] uppercase">Lisboa — Porto — Paris</span>
          <span className="font-display text-[10px] tracking-[0.35em] uppercase text-fincut-gold">N°001</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-12 flex flex-col justify-end pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-fincut-gold" />
            <span className="font-display text-[11px] tracking-[0.4em] uppercase text-fincut-gold">O Essencial Redefinido</span>
          </div>

          <h1 className="font-display font-black text-secondary-foreground leading-[0.92] tracking-[-0.02em] text-[clamp(2.75rem,7vw,6.25rem)]">
            A T-shirt<br />
            que veste<br />
            <span className="italic font-light">qualquer homem.</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-secondary-foreground/75 mt-7 max-w-xl leading-relaxed">
            Algodão de fibra longa. Corte trabalhado em 8 morfologias. Produzida em Portugal, sem coleções efémeras.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <motion.a
              href="/products/t-shirt-tech"
              whileHover={{ y: -2 }}
              className="inline-flex items-center justify-center gap-3 bg-fincut-gold text-primary-foreground px-9 py-4 font-display text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-fincut-gold-hover transition-colors"
            >
              Descobrir a Icónica
              <span aria-hidden>→</span>
            </motion.a>
            <a
              href="#iconique-2"
              className="inline-flex items-center justify-center gap-3 border border-secondary-foreground/30 text-secondary-foreground px-9 py-4 font-display text-[11px] font-bold tracking-[0.25em] uppercase hover:border-fincut-gold hover:text-fincut-gold transition-colors"
            >
              Ver a Coleção
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-secondary-foreground/10 bg-black/40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-secondary-foreground">
          {[
            ["1.2M+", "T-shirts vendidas"],
            ["4.8/5", "Trustpilot · 6 709 reviews"],
            ["48h", "Entrega em Portugal"],
            ["100%", "Algodão certificado OEKO-TEX"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight">{k}</span>
              <span className="font-body text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-secondary-foreground/60">{v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
