const SiteFooter = () => {
  return (
    <footer className="bg-fincut-black border-t border-fincut-slate/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-display text-xs font-bold text-secondary-foreground tracking-widest uppercase mb-4">Fincut</h4>
            <ul className="space-y-2 font-body text-xs text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">A nossa história</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold text-secondary-foreground tracking-widest uppercase mb-4">Produtos</h4>
            <ul className="space-y-2 font-body text-xs text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">A t-shirt Icónica</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">O Polo</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">A Camisola</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold text-secondary-foreground tracking-widest uppercase mb-4">Ajuda</h4>
            <ul className="space-y-2 font-body text-xs text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Entrega</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Devoluções</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold text-secondary-foreground tracking-widest uppercase mb-4">Siga-nos</h4>
            <ul className="space-y-2 font-body text-xs text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Instagram</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">TikTok</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-fincut-slate/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-fincut-gray">© 2026 Fincut. Todos os direitos reservados.</p>
          <div className="flex gap-4 font-body text-[11px] text-fincut-gray">
            <a href="#" className="hover:text-secondary-foreground transition-colors duration-200">CGV</a>
            <a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Avisos legais</a>
            <a href="#" className="hover:text-secondary-foreground transition-colors duration-200">Política de privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
