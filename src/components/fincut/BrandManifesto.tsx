import { motion } from "framer-motion";
import { Ruler, Scissors, Shirt, Heart, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Ruler,
    title: "Corte perfeito",
    desc: "Cada peça é desenhada para se adaptar a todos os tipos de corpo.",
  },
  {
    icon: Scissors,
    title: "Melhor projetado",
    desc: "Padrões repensados do zero para um ajuste sem compromissos.",
  },
  {
    icon: Shirt,
    title: "Qualidade premium",
    desc: "Tecidos selecionados para conforto e durabilidade excecionais.",
  },
  {
    icon: Users,
    title: "Para todos",
    desc: "Do S ao 4XL, vestimos todos os homens sem exceção.",
  },
  {
    icon: Heart,
    title: "Feito com paixão",
    desc: "Cada detalhe é pensado por uma equipa que ama o que faz.",
  },
  {
    icon: Globe,
    title: "Alcance global",
    desc: "De Portugal para o mundo, a revolução do essencial masculino.",
  },
];

const BrandManifesto = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Brand statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
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

        {/* Measuring tape visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-20"
        >
          <div className="relative w-full max-w-lg">
            <div className="bg-foreground rounded-xl overflow-hidden p-6 flex items-center gap-6">
              <div className="flex-shrink-0 bg-muted/20 rounded-lg p-4">
                <Ruler className="w-10 h-10 text-background" />
              </div>
              <div className="flex-1">
                <p className="font-display text-background text-lg font-bold mb-2">62cm</p>
                <div className="flex items-end gap-[3px] h-8">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[2px] rounded-full"
                      style={{
                        height: `${Math.random() * 60 + 40}%`,
                        backgroundColor:
                          i % 10 === 0
                            ? "hsl(var(--fincut-gold))"
                            : "hsl(var(--muted-foreground) / 0.4)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Shadow glow */}
            <div className="absolute -inset-2 bg-foreground/10 rounded-2xl blur-xl -z-10" />
          </div>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border border-border rounded-xl p-6 hover:border-foreground/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {v.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandManifesto;
