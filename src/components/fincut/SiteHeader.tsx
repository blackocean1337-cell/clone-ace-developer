import { useState, useRef, useEffect } from "react";
import { ShoppingBag, User, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import packImage from "@/assets/pack-image.jpg";

const productLinks = [
  { label: "A t-shirt Icónica", slug: "t-shirt-tech" },
  { label: "A t-shirt gola V", slug: "t-shirt-col-v" },
  { label: "O Polo", slug: "polo" },
  { label: "A t-shirt Manga Comprida", slug: "t-shirt-manches-longues" },
  { label: "A Camisola", slug: "pull" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    if (productsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productsOpen]);

  return (
    <header className="sticky top-0 z-50 bg-fincut-black border-b border-fincut-slate/30" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link to="/" className="font-display text-xl font-extrabold tracking-[0.25em] text-secondary-foreground uppercase">
          FINCUT
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#iconique" className="font-body text-sm text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            O Icónico
          </a>
          <button
            onClick={() => setProductsOpen(!productsOpen)}
            className="font-body text-sm text-secondary-foreground hover:text-fincut-gold transition-colors duration-200 flex items-center gap-1"
          >
            Produtos {productsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <a href="#histoire" className="font-body text-sm text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            A nossa história
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            <User size={20} />
          </button>
          <button
            onClick={openCart}
            className="relative text-secondary-foreground hover:text-fincut-gold transition-colors duration-200"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-fincut-gold text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden text-secondary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {productsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block absolute left-0 right-0 bg-white border-b border-border shadow-lg z-40"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-16">
              {/* Left columns */}
              <div className="flex gap-16">
                <div>
                  <h4 className="font-body text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-4">
                    A NOSSA SELEÇÃO
                  </h4>
                </div>
                <div>
                  <h4 className="font-body text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-4">
                    OS NOSSOS PRODUTOS
                  </h4>
                  <ul className="space-y-3">
                    {productLinks.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/products/${p.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className="font-body text-sm text-fincut-black hover:text-fincut-gold transition-colors duration-200"
                        >
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Pack CTA */}
              <div className="flex-1 bg-fincut-light rounded-sm overflow-hidden flex items-center">
                <div className="px-8 py-6 flex-1">
                  <h3 className="font-display text-xl font-bold text-fincut-black leading-tight mb-6">
                    Componha o seu pack
                    <br />
                    100% personalizado
                  </h3>
                  <button
                    onClick={() => {
                      setProductsOpen(false);
                      window.dispatchEvent(new Event("open-pack-builder"));
                    }}
                    className="inline-block border-2 border-fincut-black px-6 py-3 font-display text-xs font-bold tracking-[0.15em] text-fincut-black uppercase hover:bg-fincut-black hover:text-white transition-colors duration-200"
                  >
                    CRIO O MEU PACK
                  </button>
                </div>
                <div className="w-[280px] h-full flex-shrink-0">
                  <img src={packImage} alt="Pack personalizado" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-fincut-black border-t border-fincut-slate/30 px-4 py-6 space-y-4">
          <a href="#iconique" className="block font-body text-sm text-secondary-foreground">O Icónico</a>
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="block font-body text-sm text-secondary-foreground flex items-center gap-1"
            >
              Produtos {productsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {productsOpen && (
              <ul className="mt-3 ml-4 space-y-3">
                {productLinks.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/products/${p.slug}`}
                      onClick={() => { setProductsOpen(false); setMobileOpen(false); }}
                      className="font-body text-sm text-secondary-foreground/80 hover:text-fincut-gold transition-colors"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href="#histoire" className="block font-body text-sm text-secondary-foreground">A nossa história</a>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
