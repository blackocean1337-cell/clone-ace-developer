import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[500px] flex items-end overflow-hidden">
      <img
        src={heroBg}
        alt="T-shirt MRTUGA"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-fincut-black/80 via-fincut-black/30 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight max-w-lg"
        >
          A T-shirt que se adapta à sua morfologia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-body text-sm sm:text-base text-fincut-gray mt-3"
        >
          Finalmente! A t-shirt que lhe fica bem.
        </motion.p>
        <motion.a
          href="#iconique"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-block mt-6 px-6 py-3 border border-fincut-gold text-fincut-gold font-display text-xs font-semibold tracking-widest uppercase hover:bg-fincut-gold hover:text-primary-foreground transition-all duration-200"
        >
          Descubra o nosso bestseller
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
