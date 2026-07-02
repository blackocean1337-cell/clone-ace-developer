import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { vestiaireProducts } from "@/data/products";

const VestiaireSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 380;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1440px] mx-auto pl-5 xl:pl-20 mb-[60px] xl:mb-[80px]">
      <div className="flex justify-between items-center mb-[20px] pr-5 xl:pr-20">
        <h2 className="text-gray-900 text-[14px] xl:text-[18px] leading-[110%]">
          O seu vestuário
        </h2>
        <div className="flex gap-[10px]">
          <button
            onClick={() => scroll("left")}
            disabled={!canPrev}
            className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] flex items-center justify-center cursor-pointer transition-opacity disabled:opacity-25"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canNext}
            className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] flex items-center justify-center cursor-pointer transition-opacity disabled:opacity-25"
            aria-label="Seguinte"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mr-5 xl:-mr-20">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hidden"
          style={{ gap: "20px", scrollSnapType: "x mandatory" }}
        >
          {vestiaireProducts.map((p) => (
            <div
              key={p.slug}
              className="min-w-0 flex-shrink-0"
              style={{ width: "288px", scrollSnapAlign: "start" }}
            >
              <div className="xl:w-[360px] w-[288px]">
                <Link to={`/products/${p.slug}`} className="block group">
                  <div className="relative mb-[20px] overflow-hidden aspect-square bg-[#f2f2f2] rounded-[6px]">
                    <img
                      src={p.cardImage}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute right-[20px] bottom-[20px] text-[11px] leading-[110%] text-gray-900 uppercase">
                      +{p.colors.length} CORES
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <p className="text-gray-900 text-[14px] xl:text-[16px] leading-[110%] underline">
                      {p.name}
                    </p>
                    <p className="text-[14px] xl:text-[16px] leading-[110%] flex-shrink-0 ml-[20px]">
                      <span className="text-gray-400">desde: </span>
                      <span className="text-gray-900">{p.priceLabel}</span>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VestiaireSection;
