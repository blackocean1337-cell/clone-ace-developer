import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtBlack from "@/assets/tshirt-black.png";
import pullBlack from "@/assets/pull-black.png";

const packCards = [
  { image: tshirtNavy, label: "T-shirt Col rond", color: "Azul", size: "S", rotation: "-6deg", top: "10%", left: "38%", zIndex: 1 },
  { image: tshirtBlack, label: "Produit à choisir", color: "AU CHOIX", size: "AU CHOIX", rotation: "3deg", top: "5%", left: "52%", zIndex: 2 },
  { image: tshirtBlack, label: "Produit à choisir", color: "AU CHOIX", size: "AU CHOIX", rotation: "8deg", top: "0%", left: "60%", zIndex: 0 },
  { image: pullBlack, label: "Pull", color: "noir", size: "S", rotation: "12deg", top: "8%", left: "68%", zIndex: 1 },
];

const CustomPackSection = () => {
  return (
    <section className="w-full bg-fincut-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative min-h-[320px] flex items-center">
        {/* Left text */}
        <div className="relative z-10 max-w-sm">
          <p className="font-display text-xs font-bold tracking-widest text-fincut-gold uppercase mb-3">
            POUPE MAIS
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-8">
            O seu pack personalizado
            <br />
            para a semana.
          </h2>
          <button className="bg-fincut-gold text-fincut-black font-display text-sm font-bold tracking-widest uppercase px-8 py-4 hover:bg-fincut-gold/90 transition-colors duration-200">
            CRIO O MEU PACK
          </button>
        </div>

        {/* Right: scattered product cards */}
        <div className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[500px] h-[280px]">
          {packCards.map((card, i) => (
            <div
              key={i}
              className="absolute w-[160px] bg-white shadow-xl"
              style={{
                transform: `rotate(${card.rotation})`,
                top: card.top,
                left: card.left,
                zIndex: card.zIndex,
              }}
            >
              <div className="relative border-2 border-dashed border-muted-foreground/30 m-1.5">
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full aspect-square object-contain bg-fincut-light p-2"
                />
                <div className="absolute top-1 right-1 w-5 h-5 border border-muted-foreground/40 flex items-center justify-center text-muted-foreground/40 text-xs">
                  +
                </div>
              </div>
              <div className="px-2 py-1.5">
                <p className="font-body text-[10px] font-semibold text-fincut-black truncate">{card.label}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fincut-black border border-muted-foreground/20" />
                  <span className="font-body text-[8px] text-muted-foreground">{card.color}</span>
                  <span className="font-body text-[8px] text-muted-foreground ml-auto border border-muted-foreground/30 px-1 rounded-sm">{card.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomPackSection;
