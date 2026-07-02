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

  const decorativeImage = cards[0]?.cardImage;

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

        {/* Pack card */}
        <div className="relative rounded-[6px] bg-[#001f4d] p-[30px] overflow-hidden aspect-[2.05/1]">
          <div className="relative z-10 h-full flex flex-col justify-between max-w-[55%]">
            <div>
              <span className="inline-block bg-[#facc15] text-gray-900 text-[12px] uppercase px-[8px] py-[6px] leading-[110%] mb-[15px] rounded-[2px] font-medium">
                Até -35%
              </span>
              <h2 className="text-[20px] xl:text-[22px] font-serif leading-[110%] text-white">
                Componha o seu pack 100% personalizado
              </h2>
              <p className="mt-[12px] text-[13px] xl:text-[14px] leading-[140%] text-gray-300">
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
          {decorativeImage && (
            <img
              src={decorativeImage}
              alt="Pack personalizado"
              className="absolute right-[20px] top-1/2 -translate-y-1/2 h-[80%] max-w-[45%] object-contain object-right opacity-95 pointer-events-none"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default IconiqueSection2;
