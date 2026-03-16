import { motion } from "framer-motion";
import packImage from "@/assets/pack-image.jpg";

const PackSection = () => {
  return (
    <section className="bg-fincut-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="font-body text-xs tracking-widest text-fincut-gold uppercase mb-2">Poupe mais</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-secondary-foreground">
            O seu pack personalizado para a semana.
          </h2>
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="inline-block mt-6 px-8 py-3 bg-fincut-gold text-primary-foreground font-display text-xs font-semibold tracking-widest uppercase hover:bg-fincut-gold-hover transition-colors duration-200"
          >
            Criar o meu pack
          </motion.a>
        </div>
        <div className="overflow-hidden">
          <img src={packImage} alt="Pack personalizado" className="w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default PackSection;
