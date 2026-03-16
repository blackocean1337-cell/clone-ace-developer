import { useState } from "react";
import { ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-fincut-black border-b border-fincut-slate/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <a href="#" className="font-display text-xl font-extrabold tracking-[0.25em] text-secondary-foreground uppercase">
          FINCUT
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#iconique" className="font-body text-sm text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            O Icónico
          </a>
          <button className="font-body text-sm text-secondary-foreground hover:text-fincut-gold transition-colors duration-200 flex items-center gap-1">
            Produtos <ChevronDown size={14} />
          </button>
          <a href="#histoire" className="font-body text-sm text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            A nossa história
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            <User size={20} />
          </button>
          <button className="relative text-secondary-foreground hover:text-fincut-gold transition-colors duration-200">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-fincut-gold text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
          <button className="md:hidden text-secondary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-fincut-black border-t border-fincut-slate/30 px-4 py-6 space-y-4">
          <a href="#iconique" className="block font-body text-sm text-secondary-foreground">O Icónico</a>
          <a href="#vestiaire" className="block font-body text-sm text-secondary-foreground">Produtos</a>
          <a href="#histoire" className="block font-body text-sm text-secondary-foreground">A nossa história</a>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
