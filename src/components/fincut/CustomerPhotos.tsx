import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import reviewPhoto1 from "@/assets/review-photo-1.png";
import reviewPhoto2 from "@/assets/review-photo-2.png";
import reviewPhoto3 from "@/assets/review-photo-3.png";
import reviewPhoto4 from "@/assets/review-photo-4.png";
import reviewPhoto5 from "@/assets/review-photo-5.png";
import reviewPhoto6 from "@/assets/review-photo-6.webp";
import reviewPhoto7 from "@/assets/review-photo-7.png";

const photos = [
  { image: reviewPhoto1, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { image: reviewPhoto2, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { image: reviewPhoto3, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { image: reviewPhoto4, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { image: reviewPhoto5, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { image: reviewPhoto6, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { image: reviewPhoto7, label: "A t-shirt Icónica", slug: "t-shirt-tech" },
];

const CustomerPhotos = () => {
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
    el.scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1440px] mx-auto pl-5 lg:pl-20 mb-[60px] lg:mb-[80px]">
      <div className="flex justify-between items-center mb-[20px] pr-5 lg:pr-20">
        <h2 className="text-gray-900 text-[14px] xl:text-[18px] leading-[110%]">
          As vossas fotos (Obrigado!)
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

      <div className="overflow-hidden -mr-5 lg:-mr-20">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide"
          style={{ gap: "20px", scrollSnapType: "x mandatory" }}
        >
          {photos.map((p, i) => (
            <div
              key={i}
              className="min-w-0 flex-shrink-0"
              style={{ width: "240px", scrollSnapAlign: "start" }}
            >
              <Link
                to={`/products/${p.slug}`}
                className="block group relative overflow-hidden rounded-[6px] xl:w-[300px] w-[240px]"
              >
                <div className="relative aspect-[3/4] bg-[#f2f2f2] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-[16px] flex items-end justify-between text-white">
                    <p className="text-[13px] xl:text-[14px] leading-[110%]">
                      {p.label}
                    </p>
                    <p className="text-[13px] xl:text-[14px] leading-[110%] underline underline-offset-2">
                      Descobrir
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotos;
