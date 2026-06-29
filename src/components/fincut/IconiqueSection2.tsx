import { iconiqueProducts } from "@/data/products";
import ProductCard from "./ProductCard";

const IconiqueSection2 = () => {
  return (
    <section id="iconique-2" className="bg-background py-20 lg:py-28 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-fincut-gold" />
              <span className="font-display text-[11px] tracking-[0.4em] uppercase text-fincut-gold">N°001 — Bestsellers</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[0.95] tracking-[-0.02em]">
              O Icónico.
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-md">
              Mais de 1,2 milhão de t-shirts vendidas. O essencial reescrito para todas as morfologias.
            </p>
          </div>
          <a
            href="/products/t-shirt-tech"
            className="hidden md:inline-flex items-center gap-2 font-display text-[11px] font-bold tracking-[0.25em] uppercase text-foreground border-b border-foreground pb-1 hover:text-fincut-gold hover:border-fincut-gold transition-colors"
          >
            Ver todos →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {iconiqueProducts.map((p) => (
            <ProductCard
              key={p.slug}
              image={p.cardImage}
              name={p.name}
              price={p.priceLabel}
              darkBg={false}
              slug={p.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconiqueSection2;
