import { motion } from "framer-motion";
import historyColors from "@/assets/history-colors.jpeg";
import historyCraft from "@/assets/history-craft.jpeg";

const BrandManifesto = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Brand statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20">
          
          <p className="font-display text-2xl tracking-[0.3em] text-foreground mb-8">
            FINCUT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            Vista todos os homens, todos os tipos de corpo,
            <br className="hidden sm:block" />
            em todas as situações.
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-2">
            A camiseta era óbvia. Um essencial que é muitas vezes negligenciado e que optamos por repensar.
          </p>
          <p className="font-body text-muted-foreground text-base sm:text-lg">
            Melhor projetado. Melhor cortar.
          </p>
        </motion.div>

        {/* Two-column editorial section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left — Colors */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            
            <div className="overflow-hidden rounded-sm mb-6">
              <img
                src={historyColors}
                alt="Gama de cores das t-shirts Fincut"
                className="w-full aspect-[4/3] object-cover" />
              
            </div>
            <p className="font-body text-foreground text-base leading-relaxed mb-4">
              Um corte projetado para todos os homens. Conforto, qualidade, tecnologia, sem concessões.
            </p>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Para lhe oferecer itens básicos atemporais, projetados para seu guarda-roupa e oferecidos pelo preço certo. Para isso, reduzimos intermediários, abandonamos coleções efémeras e optamos por produzir apenas quando há demanda.
            </p>
          </motion.div>

          {/* Right — Craft */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            
            <div className="overflow-hidden rounded-sm mb-6">
              <img
                src={historyCraft}
                alt="Detalhe da produção têxtil Fincut"
                className="w-full aspect-[4/3] object-cover" />
              
            </div>
            <p className="font-body text-foreground text-base leading-relaxed mb-4">
              Por trás dessa simplicidade, meses de pesquisa para testar, testar novamente, eliminar, até encontrar a fórmula certa.
            </p>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Um essencial. Projetado para você. Por muito tempo.
            </p>
          </motion.div>
        </div>

        {/* Video section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            

            
            <p className="font-body text-muted-foreground text-sm leading-relaxed lg:text-right">
              Um essencial. Projetado para você. Por muito tempo.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-sm bg-black">
            <video
              className="w-full aspect-video object-cover"
              controls
              preload="metadata"
              poster="">
              
              <source src="/videos/brand-video.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default BrandManifesto;