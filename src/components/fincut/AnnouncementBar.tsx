import { useEffect, useRef, useState } from "react";

type Slide = {
  text: string;
  strong: string;
  bg: string;
  fg: string;
  href?: string;
};

const SLIDES: Slide[] = [
  {
    text: "É verão de saldos! -15% adicionais ao subscrever a nossa ",
    strong: "newsletter ❯",
    bg: "#fff746",
    fg: "#000000",
  },
  {
    text: "Envio grátis em Portugal Continental acima de 55€ - ",
    strong: "Descobrir ❯",
    bg: "#000000",
    fg: "#ffffff",
    href: "/products/t-shirt-tech",
  },
];

const AnnouncementBar = () => {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const prev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIdx((i) => (i + 1) % SLIDES.length);

  return (
    <div className="relative text-white overflow-hidden">
      <button
        aria-label="Anterior"
        onClick={prev}
        type="button"
        className="absolute left-2 xl:left-5 top-1/2 -translate-y-1/2 z-[1] p-1 opacity-70 hover:opacity-100 transition-opacity"
        style={{ color: SLIDES[idx].fg }}
      >
        <svg
          className="w-[18px] h-[18px]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {SLIDES.map((s, i) => {
          const content = (
            <>
              {s.text}
              <strong className="font-bold">{s.strong}</strong>
            </>
          );
          const cls =
            "w-full flex-shrink-0 text-center px-8 py-[15px] text-[14px] leading-[110%] block";
          return s.href ? (
            <a
              key={i}
              href={s.href}
              className={cls}
              style={{ backgroundColor: s.bg, color: s.fg }}
            >
              {content}
            </a>
          ) : (
            <div
              key={i}
              className={cls}
              style={{ backgroundColor: s.bg, color: s.fg }}
            >
              {content}
            </div>
          );
        })}
      </div>

      <button
        aria-label="Seguinte"
        onClick={next}
        type="button"
        className="absolute right-2 xl:right-5 top-1/2 -translate-y-1/2 z-[1] p-1 opacity-70 hover:opacity-100 transition-opacity"
        style={{ color: SLIDES[idx].fg }}
      >
        <svg
          className="w-[18px] h-[18px]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;
