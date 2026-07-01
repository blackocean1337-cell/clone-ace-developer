import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const IconiqueSection2 = () => {
  const preto = products.find((p) => p.slug === "t-shirt-tech");
  const branco = products.find((p) => p.slug === "t-shirt-blanc");
  if (!preto || !branco) return null;

  const openPackBuilder = () => {
    window.dispatchEvent(new CustomEvent("open-pack-builder"));
  };

  const Card = ({ image, slug, color }: { image: string; slug: string; color: string }) => (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link to={`/products/${slug}`} className="group block">
        <div className="aspect-square overflow-hidden bg-fincut-light">
          <img
            src={image}
            alt={`A t-shirt Icónica ${color}`}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200 bg-background"
            loading="lazy"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-body text-sm font-medium uppercase tracking-wide text-foreground">
            A T-SHIRT ICÓNICA
          </h3>
          <p className="font-body text-xs text-muted-foreground">{color}</p>
          <p className="font-body text-sm text-muted-foreground">desde : 33,90 €</p>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section id="iconique-2" className="bg-background py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Mobile: 1 col hero card. Desktop: 2 products + wide pack card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="md:col-span-1">
          <Card image={preto.cardImage} slug={preto.slug} color="Preto" />
        </div>
        <div className="hidden md:block md:col-span-1">
          <Card image={branco.cardImage} slug={branco.slug} color="Branco" />
        </div>

        {/* Pack builder promo card */}
        <div className="md:col-span-2">
          <div className="relative h-full aspect-square md:aspect-auto md:min-h-[420px] bg-fincut-charcoal rounded-sm overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-[#FACC15] text-black font-body text-[11px] font-bold tracking-wider px-2 py-1">
                ATÉ -35%
              </span>
              <h3 className="font-display text-white text-2xl sm:text-3xl font-bold mt-4 leading-tight max-w-md">
                Compõe o teu pack 100% personalizado
              </h3>
              <p className="font-body text-white/70 text-sm mt-3 max-w-md leading-relaxed">
                O teu pack à medida em poucos cliques. Escolhe as cores — quantos mais artigos, maior o desconto.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={openPackBuilder}
                className="bg-[#FACC15] hover:bg-[#eab308] text-black font-body font-bold text-sm tracking-wider px-6 py-3 transition-colors"
              >
                CRIAR O MEU PACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconiqueSection2;
