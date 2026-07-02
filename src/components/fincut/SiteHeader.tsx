import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import packImage from "@/assets/pack-image.jpg";
import mrtugaLogo from "@/assets/mrtuga-logo.png";

const productLinks = [
  { label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { label: "A t-shirt Gola V", slug: "t-shirt-col-v" },
  { label: "O Polo", slug: "polo" },
  { label: "A t-shirt Manga Comprida", slug: "t-shirt-manches-longues" },
  { label: "A Malha", slug: "pull" },
];

// Countdown to a fixed target
const TARGET = new Date();
TARGET.setDate(TARGET.getDate() + 3);
TARGET.setHours(23, 59, 59, 0);

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${d}d : ${h}h : ${m}m : ${s}s`;
};

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const countdown = useCountdown();

  useEffect(() => {
    setProductsOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    if (productsOpen) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [productsOpen]);

  return (
    <header className="sticky top-0 z-[50]" ref={ref}>
      {/* Main bar */}
      <div className="relative flex items-center h-[60px] lg:h-[80px] px-5 xl:px-20 justify-center 2xl:justify-between bg-[#001f4d]">
        {/* Mobile burger */}
        <div className="absolute left-5 flex items-center gap-[10px] xl:hidden">
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="text-white bg-transparent p-0 cursor-pointer"
          >
            {mobileOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </div>

        {/* Logo + countdown */}
        <div className="relative flex items-center">
          <Link to="/" className="flex">
            <img
              src={mrtugaLogo}
              alt="MRTUGA"
              className="block w-[110px] xl:w-[120px]"
            />
          </Link>
          <div className="hidden lg:block absolute left-1/2 top-full -translate-x-1/2 translate-y-[21px] z-[1]">
            <div
              className="flex items-center justify-center bg-primary px-[18px] py-[6px]"
              style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }}
            >
              <span className="text-gray-900 font-bold text-[10px] leading-none tabular-nums whitespace-nowrap">
                {countdown}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden xl:flex xl:gap-5 xl:flex-1 xl:justify-center xl:mx-10 group/nav">
          <div className="group/item">
            <Link
              to="/products/t-shirt-tech"
              className="cursor-pointer whitespace-nowrap flex items-center gap-2.5 relative font-normal leading-[110%] transition-colors duration-200 text-white group-hover/nav:text-white/60 group-hover/item:text-white hover:text-white"
            >
              A t-shirt Icónica
            </Link>
          </div>

          <div className="group/item">
            <div className="static">
              <button
                onClick={() => setProductsOpen((v) => !v)}
                className="cursor-pointer whitespace-nowrap flex items-center gap-2.5 relative font-normal leading-[110%] transition-colors duration-200 bg-transparent border-0 p-0 text-white group-hover/nav:text-white/60 group-hover/item:text-white hover:text-white"
              >
                Produtos
                <div
                  className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Mega menu */}
              <div
                className={`absolute top-full left-0 w-full bg-white rounded-none z-[100] py-[40px] px-[80px] overflow-hidden transition-all duration-200 ${
                  productsOpen
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <div className="flex gap-0 items-start">
                  <div className="flex-shrink-0 whitespace-nowrap xl:pr-[150px]">
                    <p className="mb-[20px] leading-[110%] text-gray-400 uppercase xl:text-[14px]">
                      Os nossos produtos
                    </p>
                    <div className="group">
                      {productLinks.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className={`xl:text-[16px] block py-[10px] last:mb-0 text-base text-gray-900 transition-colors duration-200 group-hover:text-gray-400 hover:!text-gray-900 no-underline leading-[110%] ${
                            location.pathname === `/products/${p.slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 hidden xl:block">
                    <div className="grid gap-[10px] grid-cols-[auto_1fr]">
                      {/* Pack card */}
                      <div className="bg-gray-900 rounded-[6px] flex flex-row items-stretch overflow-hidden py-[20px] px-[30px] gap-[20px]">
                        <div className="flex flex-col justify-between gap-[20px]">
                          <h2 className="xl:max-w-[180px] text-white text-[22px] xl:text-[24px] font-serif leading-[110%]">
                            Componha o seu pack personalizado
                          </h2>
                          <button
                            onClick={() => {
                              setProductsOpen(false);
                              window.dispatchEvent(new Event("open-pack-builder"));
                            }}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors bg-white hover:bg-primary uppercase text-gray-900 text-[14px] xl:text-[18px] h-auto rounded-[6px] py-[16px] px-[10px] xl:p-[20px] leading-[110%] w-fit"
                          >
                            Crio o meu pack
                          </button>
                        </div>
                        <img
                          src={packImage}
                          alt="Pack personalizado"
                          className="w-[180px] h-auto object-cover rounded-[6px] hidden xl:block"
                        />
                      </div>

                      {/* SizeTech card */}
                      <div className="bg-white border border-gray-200 rounded-[6px] flex flex-col justify-between py-[20px] px-[30px] gap-[20px]">
                        <h2 className="text-gray-900 text-[22px] xl:text-[24px] font-serif leading-[110%]">
                          Calcule o seu tamanho com{" "}
                          <span className="inline-block bg-primary px-[8px] py-[2px] rounded-[4px] text-[14px] xl:text-[16px] align-middle font-sans font-semibold">
                            SIZETECH+
                          </span>
                        </h2>
                        <button
                          onClick={() => {
                            setProductsOpen(false);
                            window.dispatchEvent(new Event("open-size-tech"));
                          }}
                          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors bg-gray-900 hover:bg-black text-white uppercase text-[14px] xl:text-[18px] h-auto rounded-[6px] py-[16px] px-[10px] xl:p-[20px] leading-[110%] w-fit"
                        >
                          Encontrar o meu tamanho
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group/item">
            <Link
              to="/historia"
              className="cursor-pointer whitespace-nowrap flex items-center gap-2.5 relative font-normal leading-[110%] transition-colors duration-200 text-white group-hover/nav:text-white/60 group-hover/item:text-white hover:text-white"
            >
              A nossa história
            </Link>
          </div>
        </nav>

        {/* Right icons */}
        <div className="absolute right-5 xl:right-20 flex items-center gap-[18px]">
          <button
            aria-label="Conta"
            className="text-white hover:text-white/70 transition-colors"
          >
            <User className="w-[22px] h-[22px]" />
          </button>
          <button
            aria-label="Carrinho"
            onClick={openCart}
            className="relative text-white hover:text-white/70 transition-colors"
          >
            <svg
              className="w-[22px] h-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-gray-900 text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#001f4d] border-t border-white/10 px-5 py-6 space-y-4">
          <Link
            to="/products/t-shirt-tech"
            onClick={() => setMobileOpen(false)}
            className="block text-[14px] text-white"
          >
            A t-shirt Icónica
          </Link>
          <div>
            <button
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center gap-1 text-[14px] text-white"
            >
              Produtos
              <ChevronDown
                className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {productsOpen && (
              <ul className="mt-3 ml-4 space-y-3">
                {productLinks.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/products/${p.slug}`}
                      onClick={() => {
                        setProductsOpen(false);
                        setMobileOpen(false);
                      }}
                      className="text-[14px] text-white/80"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            to="/historia"
            onClick={() => setMobileOpen(false)}
            className="block text-[14px] text-white"
          >
            A nossa história
          </Link>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
