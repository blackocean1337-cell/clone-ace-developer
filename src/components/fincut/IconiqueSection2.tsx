import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { iconiqueProducts } from "@/data/products";

const IconiqueSection2 = () => {
  // Only t-shirt Iconique color variants for the paired carousel on the left
  const cards = iconiqueProducts.filter((p) =>
    ["t-shirt-tech", "t-shirt-blanc", "t-shirt-navy", "t-shirt-kaki", "t-shirt-cinzento"].includes(p.slug)
  );
  const pairs: typeof cards[] = [];
  for (let i = 0; i < cards.length; i += 2) pairs.push(cards.slice(i, i + 2));

  const [page, setPage] = useState(0);
  const totalPages = pairs.length;

  const openPack = () => {
    window.dispatchEvent(new CustomEvent("open-pack-builder"));
  };

  const packCards = [
    // back-left: blue t-shirt
    { img: cards.find((c) => c.slug === "t-shirt-navy")?.cardImage, name: "T-shirt Col-rond", colorName: "AZUL", hex: "#4a6a8a", size: "M", rotate: -10, x: -18, y: 12, z: 1, placeholder: false },
    // middle: placeholder "+"
    { img: null, name: "Produto a escolher", colorName: "AO GOSTO", hex: "#e5e5e5", size: "AO GOSTO", rotate: -2, x: 5, y: -6, z: 2, placeholder: true },
    // front-right: black t-shirt
    { img: cards.find((c) => c.slug === "t-shirt-tech")?.cardImage, name: "T-shirt Col-rond", colorName: "PRETO", hex: "#000000", size: "S", rotate: 8, x: 28, y: -18, z: 3, placeholder: false },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-5 lg:px-20 mb-[60px] lg:mb-[80px]">
      <h2 className="leading-[110%] mb-[10px] lg:mb-[20px] font-serif text-[20px] lg:text-[24px] text-gray-900">
        A Icónica
      </h2>
      <p className="text-[14px] leading-[110%] mb-[20px] text-gray-900">
        Mais de 1 milhão de t-shirts vendidas
      </p>

      {/* Mobile: horizontal scroll of cards + pack */}
      <div className="lg:hidden -mr-5">
        <div
          className="flex overflow-x-auto scrollbar-hide gap-[12px] pr-5"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cards.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className="block flex-shrink-0 w-[75vw] max-w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative overflow-hidden aspect-square rounded-[6px] bg-[#f2f2f2]">
                <img
                  src={p.cardImage}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute right-[16px] bottom-[16px] text-[11px] leading-[110%] text-gray-900 uppercase">
                  +{p.colors.length} CORES
                </span>
              </div>
              <p className="mt-[14px] text-[14px] leading-[110%] text-gray-900 uppercase">
                {p.name}
              </p>
              <p className="mt-[8px] leading-[110%]">
                <span className="text-[11px] text-gray-400">desde: </span>
                <span className="text-[14px] text-gray-900">{p.priceLabel}</span>
              </p>
            </Link>
          ))}
          {/* Pack card at end */}
          <div
            className="flex-shrink-0 w-[75vw] max-w-[300px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden aspect-square rounded-[6px] bg-gray-900 p-[20px] flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#facc15] text-gray-900 text-[11px] uppercase p-[6px] leading-[110%] mb-[12px]">
                  Até -35%
                </span>
                <h3 className="text-[16px] font-serif leading-[110%] text-white">
                  Componha o seu pack 100% personalizado
                </h3>
              </div>
              <button
                onClick={openPack}
                className="cursor-pointer bg-[#facc15] hover:bg-[#facc15]/90 uppercase text-gray-900 text-[13px] rounded-[6px] py-[12px] px-[14px] leading-[110%] inline-flex items-center justify-center transition-colors w-fit"
              >
                Crio o meu pack
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: 2 cols — left carousel of pairs, right pack card */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-[20px] lg:items-start">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pairs.map((pair, i) => (
                <div key={i} className="w-full flex-shrink-0 grid grid-cols-2 gap-[20px]">
                  {pair.map((p) => (
                    <Link key={p.slug} to={`/products/${p.slug}`} className="block">
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={p.cardImage}
                          alt={p.name}
                          loading="lazy"
                          className="rounded-[6px] w-full h-full object-cover"
                        />
                        <span className="absolute right-[20px] bottom-[20px] text-[11px] leading-[110%] text-gray-900">
                          +{p.colors.length} CORES
                        </span>
                      </div>
                      <p className="mt-[20px] text-[18px] leading-[110%] text-gray-900 uppercase">
                        {p.name}
                      </p>
                      <p className="mt-[8px] text-[14px] leading-[110%] text-gray-400">
                        {p.colors[0]?.name}
                      </p>
                      <p className="mt-[6px]">
                        <span className="text-[14px] text-gray-400">desde: </span>
                        <span className="text-[18px] text-gray-900">{p.priceLabel}</span>
                      </p>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Arrows */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{ paddingBottom: "calc((100% - 20px) / 2)" }}
          >
            <button
              type="button"
              aria-label="Anterior"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="absolute top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] rounded-full bg-white border border-gray-200 flex items-center justify-center transition-[opacity,border-color] duration-200 hover:border-gray-900 disabled:opacity-0 disabled:pointer-events-none cursor-pointer left-[10px] pointer-events-auto"
            >
              <ChevronLeft className="w-[20px] h-[20px] text-gray-900" />
            </button>
            <button
              type="button"
              aria-label="Seguinte"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="absolute top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] rounded-full bg-white border border-gray-200 flex items-center justify-center transition-[opacity,border-color] duration-200 hover:border-gray-900 disabled:opacity-0 disabled:pointer-events-none cursor-pointer right-[10px] pointer-events-auto"
            >
              <ChevronRight className="w-[20px] h-[20px] text-gray-900" />
            </button>
          </div>
        </div>

        {/* Pack card — replicated 1:1 from Fincut */}
        <div className="relative rounded-[6px] bg-[#0a0a0a] px-[30px] pt-[30px] pb-[50px] overflow-hidden aspect-[2.05/1]">
          <div className="relative z-10 h-full flex flex-col justify-between max-w-[52%]">
            <div>
              <span className="inline-block bg-[#facc15] text-gray-900 text-[12px] uppercase px-[8px] py-[6px] leading-[110%] mb-[15px] rounded-[2px] font-medium tracking-wide">
                Até -35%
              </span>
              <h2 className="text-[20px] xl:text-[24px] font-serif leading-[115%] text-white">
                Componha o seu pack 100% personalizado
              </h2>
              <p className="mt-[12px] text-[13px] xl:text-[14px] leading-[140%] text-gray-400 max-w-[360px]">
                O seu pack à medida em poucos cliques, escolha as cores, quanto mais artigos juntar, maior o desconto.
              </p>
            </div>
            <button
              onClick={openPack}
              className="cursor-pointer bg-[#facc15] hover:bg-[#facc15]/90 uppercase text-gray-900 text-[13px] xl:text-[14px] font-medium rounded-[6px] py-[14px] px-[20px] leading-[110%] inline-flex items-center justify-center transition-colors w-fit tracking-wide"
            >
              Crio o meu pack
            </button>
          </div>

          {/* Decorative polaroid stack — mimics Fincut mini product cards */}
          <div className="absolute right-[20px] xl:right-[40px] top-1/2 -translate-y-1/2 w-[45%] h-[85%] pointer-events-none">
            {packCards.map((c, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-[42%] bg-white rounded-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] p-[8px]"
                style={{
                  transform: `translate(-50%, -50%) translate(${c.x}px, ${c.y}px) rotate(${c.rotate}deg)`,
                  zIndex: c.z,
                }}
              >
                <div className="w-full aspect-square bg-[#f5f5f5] rounded-[2px] overflow-hidden flex items-center justify-center">
                  {c.img && (
                    <img src={c.img} alt="" className="w-full h-full object-contain" />
                  )}
                </div>
                <div className="mt-[6px] px-[2px]">
                  <p className="text-[7px] xl:text-[8px] font-serif leading-[110%] text-gray-900 truncate">
                    {c.name}
                  </p>
                  <div className="flex items-center justify-between mt-[3px] gap-[4px]">
                    <div className="flex items-center gap-[3px] min-w-0">
                      <span
                        className="w-[6px] h-[6px] rounded-full border border-gray-300 flex-shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[6px] xl:text-[7px] text-gray-500 uppercase truncate">
                        {c.colorName}
                      </span>
                    </div>
                    <span className="text-[6px] xl:text-[7px] text-gray-700 border border-gray-300 rounded-[2px] px-[3px] py-[1px] flex-shrink-0">
                      {c.size}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconiqueSection2;
