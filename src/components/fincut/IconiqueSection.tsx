import { iconiqueProducts } from "@/data/products";
import ProductCard from "./ProductCard";

const colorLabels: Record<string, string> = {
  "t-shirt-tech": "Preto",
  "t-shirt-blanc": "Branco",
  "t-shirt-navy": "Azul Marinho",
  "t-shirt-kaki": "Caqui",
};

const IconiqueSection = () => {
  return (
    <section id="iconique" className="bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">O Icónico</h2>
      <p className="font-body text-sm text-muted-foreground mt-1">Mais de 1 milhão de t-shirts vendidas</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        {iconiqueProducts.map((p) => (
          <ProductCard
            key={p.slug}
            image={p.cardImage}
            name={`${p.name} — ${colorLabels[p.slug] || ""}`}
            price={p.priceLabel}
            darkBg={true}
            slug={p.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default IconiqueSection;
