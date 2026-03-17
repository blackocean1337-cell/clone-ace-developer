import { useState } from "react";

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-fincut-black text-secondary-foreground">
      {/* Top links section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Contato */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5">Contato</h4>
            <ul className="space-y-3 font-body text-sm text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Acompanhe meu pedido</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Contacte-nos</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Avaliações de clientes</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Perguntas frequentes</a></li>
            </ul>
          </div>

          {/* Contacte-nos */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5">Contacte-nos</h4>
            <p className="font-body text-sm text-fincut-gray leading-relaxed">
              Nossa equipe está disponível de segunda a sábado, das 9h às 22h.<br />
              contact@fincutmen.com
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5">Categorias</h4>
            <ul className="space-y-3 font-body text-sm text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">A camiseta icónica</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">A camiseta com decote em V</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Polo</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">A camiseta de manga comprida</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">O suéter</a></li>
            </ul>
          </div>

          {/* Informação */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5">Informação</h4>
            <ul className="space-y-3 font-body text-sm text-fincut-gray">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Condições gerais de venda e utilização</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Política de entrega</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Política de reembolso</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors underline">Aviso Legal</a></li>
            </ul>
          </div>

          {/* Junte-se ao FinClub */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5">Junte-se ao FinClub</h4>
            <p className="font-body text-sm text-fincut-gray leading-relaxed mb-4">
              Ao ingressar no FinClub você tem acesso prévio aos nossos novos produtos, ofertas exclusivas e muito mais!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent border border-fincut-gray/40 px-4 py-3 text-sm font-body text-secondary-foreground placeholder:text-fincut-gray focus:outline-none focus:border-primary" />
              
              <button className="bg-primary text-primary-foreground px-4 py-3 font-bold text-lg hover:bg-fincut-gold-hover transition-colors">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Giant FINCUT logo */}
      <div className="w-full overflow-hidden px-6 lg:px-8">
        <h2 className="font-display font-black text-secondary-foreground text-[18vw] leading-[0.85] tracking-tighter select-none text-center">
          FINCUT
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="text-center mb-3">
          <p className="font-display text-xs font-bold text-secondary-foreground mb-3">Nós aceitamos</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["American Express", "Apple Pay", "CB", "Mastercard", "PayPal", "Shop Pay", "Visa", "Klarna"].map((name) =>
            <div key={name} className="w-10 h-6 bg-secondary-foreground rounded-sm flex items-center justify-center">
                <span className="text-[6px] font-bold text-fincut-black">{name.slice(0, 4)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4">
          <p className="font-body text-[11px] text-fincut-gray">2026© Todos os direitos reservados</p>
          <p className="font-body text-[11px] text-fincut-gray">Feito com Brandsystem</p>
        </div>
      </div>
    </footer>);

};

export default SiteFooter;