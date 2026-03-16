import photo1 from "@/assets/customer-photo-1.jpg";
import photo2 from "@/assets/customer-photo-2.jpg";
import photo3 from "@/assets/customer-photo-3.jpg";

const photos = [
  { image: photo1, label: "A camiseta icónica" },
  { image: photo2, label: "A camiseta icónica" },
  { image: photo3, label: "A camiseta icónica" },
  { image: photo1, label: "A camiseta icónica" },
  { image: photo2, label: "A camiseta icónica" },
  { image: photo3, label: "A camiseta icónica" },
];

const CustomerPhotos = () => {
  const doubled = [...photos, ...photos];

  return (
    <section className="bg-background py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          As vossas fotos (Obrigado!)
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-3 animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((p, i) => (
            <a
              key={i}
              href="#"
              className="group relative flex-shrink-0 w-[220px] sm:w-[260px] overflow-hidden rounded-sm"
            >
              <img
                src={p.image}
                alt={p.label}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 flex items-end justify-between">
                <p className="font-body text-xs text-white">{p.label}</p>
                <p className="font-body text-xs text-fincut-gold underline underline-offset-2">Descobrir</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotos;
