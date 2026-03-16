import tshirtBlack from "@/assets/tshirt-black.png";
import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtKaki from "@/assets/tshirt-kaki.png";
import ProductCard from "./ProductCard";

const products = [
  { image: tshirtBlack, name: "Le t-shirt Iconique", color: "Noir", price: "18 €" },
  { image: tshirtWhite, name: "Le t-shirt Iconique", color: "Blanc", price: "18 €" },
  { image: tshirtNavy, name: "Le t-shirt Iconique", color: "Marine", price: "18 €" },
  { image: tshirtKaki, name: "Le t-shirt Iconique", color: "Kaki", price: "18 €" },
];

const IconiqueSection = () => {
  return (
    <section id="iconique" className="bg-fincut-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-secondary-foreground">L'iconique</h2>
        <p className="font-body text-sm text-fincut-gray mt-1">Plus d'1 million de t-shirts vendus</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {products.map((p, i) => (
            <ProductCard
              key={i}
              image={p.image}
              name={`${p.name} — ${p.color}`}
              price={p.price}
              colors={i === 0 ? 11 : undefined}
              darkBg
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconiqueSection;
