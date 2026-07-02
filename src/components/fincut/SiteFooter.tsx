import { useState } from "react";
import { ChevronRight, Facebook, Instagram } from "lucide-react";
import mbwayLogo from "@/assets/footer-mbway.png.asset.json";
import visaLogo from "@/assets/footer-visa.png.asset.json";
import mastercardLogo from "@/assets/footer-mastercard.png.asset.json";

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  const linkCls =
    "text-[14px] text-gray-400 underline decoration-1 underline-offset-3 lg:underline-offset-3 leading-[110%]";
  const headingCls = "text-[14px] mb-[20px] leading-[110%] font-normal text-white";

  return (
    <footer className="bg-gray-900 text-white mt-auto px-5 py-10 lg:px-20 lg:pb-[60px] lg:pt-[56px] font-sans">
      <style>{`
        .mrtuga-footer-grid {
          grid-template-areas:
            'logo' 'mobile' 'categories' 'info' 'contact' 'newsletter' 'payment' 'copyright';
        }
        @media (min-width: 1024px) {
          .mrtuga-footer-grid {
            grid-template-areas:
              'logo logo logo logo logo logo'
              'mobile categories info contact newsletter newsletter'
              'bottom bottom bottom bottom bottom bottom';
          }
        }
      `}</style>
      <div className="mrtuga-footer-grid grid gap-[40px] lg:grid-cols-6 lg:gap-x-[20px] lg:gap-y-[40px]">
...
        {/* Logo */}
        <div className="lg:mb-[20px]" style={{ gridArea: "logo" }}>
          <div className="font-display font-black tracking-tighter text-white leading-none text-[48px] lg:text-[40px] lg:w-[220px]">
            MRTUGA
          </div>
        </div>

        {/* Contact */}
        <div style={{ gridArea: "contact" }}>
          <h3 className={headingCls}>Contacte-nos</h3>
          <p className="text-[14px] text-gray-400 inline-block mb-[10px] lg:mb-0 leading-[110%]">
            A nossa equipa está disponível de segunda a sábado, das 9h às 22h.
          </p>
          <a
            href="mailto:support@mrtuga.com"
            className="mt-[10px] text-[14px] text-gray-400 block lg:inline underline decoration-1 underline-offset-3 lg:no-underline leading-[110%]"
          >
            support@mrtuga.com
          </a>
        </div>

        {/* Categories */}
        <div style={{ gridArea: "categories" }}>
          <h3 className={headingCls}>Os nossos produtos</h3>
          <ul className="space-y-[15px] lg:space-y-[20px]">
            <li><a className={linkCls} href="/products/t-shirt-tech">A t-shirt Icónica</a></li>
            <li><a className={linkCls} href="/products/t-shirt-col-v">A t-shirt Gola V</a></li>
            <li><a className={linkCls} href="/products/polo">O Polo</a></li>
            <li><a className={linkCls} href="/products/t-shirt-manches-longues">A t-shirt Manga Comprida</a></li>
            <li><a className={linkCls} href="/products/pull">A Malha</a></li>
          </ul>
        </div>

        {/* Info */}
        <div style={{ gridArea: "info" }}>
          <h3 className={headingCls}>Informações</h3>
          <ul className="space-y-[15px] lg:space-y-[20px]">
            <li><a className={linkCls} href="/termos">Condições gerais de venda</a></li>
            <li><a className={linkCls} href="/privacidade">Política de privacidade</a></li>
            <li><a className={linkCls} href="/politica-entrega">Política de entrega</a></li>
            <li><a className={linkCls} href="/politica-reembolso">Política de reembolso</a></li>
            <li><a className={linkCls} href="/intellectual-property">Direitos de propriedade intelectual</a></li>
          </ul>
        </div>

        {/* Newsletter + Social (desktop visible, mobile visible) */}
        <div style={{ gridArea: "newsletter" }}>
          <h3 className={headingCls}>Junte-se ao MRTUGA Club</h3>
          <p className="text-[14px] text-gray-400 leading-[130%] mb-[16px]">
            Ao juntar-se ao MRTUGA Club tem acesso em primeira mão a novidades, ofertas exclusivas e muito mais!
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative mb-[24px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="O seu e-mail"
              className="w-full bg-transparent border-b border-gray-500 py-[10px] pr-[44px] text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              aria-label="Subscrever"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-[#FACC15] flex items-center justify-center text-gray-900 hover:brightness-95"
            >
              <ChevronRight className="w-[16px] h-[16px]" />
            </button>
          </form>

          <h3 className={headingCls}>Siga-nos</h3>
          <ul className="space-y-[12px]">
            <li>
              <a
                href="https://www.instagram.com/mrtuga.co/"
                className="flex items-center gap-[8px] text-[14px] text-gray-400 hover:text-white transition-colors leading-[110%]"
              >
                <Instagram className="w-[16px] h-[16px] shrink-0" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/mrtuga"
                className="flex items-center gap-[8px] text-[14px] text-gray-400 hover:text-white transition-colors leading-[110%]"
              >
                <Facebook className="w-[16px] h-[16px] shrink-0" />
                <span>Facebook</span>
              </a>
            </li>
          </ul>
        </div>


        {/* Help (mobile grid-area) */}
        <div style={{ gridArea: "mobile" }}>
          <h3 className={headingCls}>Precisa de ajuda?</h3>
          <ul className="space-y-[15px] lg:space-y-[20px]">
            <li><a className={linkCls} href="/acompanhar-encomenda">Acompanhar a minha encomenda</a></li>
            <li><a className={linkCls} href="/avaliacoes">Avaliações de clientes</a></li>
            <li><a className={linkCls} href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Payment mobile */}
        <div className="lg:hidden" style={{ gridArea: "payment" }}>
          <h3 className="text-[14px] mb-[20px] font-normal lg:mb-0 leading-[110%] text-white">
            Pagamento seguro
          </h3>
          <div className="flex flex-wrap items-center gap-[10px] bg-white rounded-[6px] px-[12px] py-[8px] w-fit">
            <img src={mbwayLogo.url} alt="MB WAY" className="h-[22px] w-auto object-contain" />
            <img src={visaLogo.url} alt="Visa" className="h-[16px] w-auto object-contain" />
            <img src={mastercardLogo.url} alt="Mastercard" className="h-[22px] w-auto object-contain" />
          </div>
        </div>

        {/* Copyright mobile */}
        <div
          className="flex justify-between items-center lg:hidden"
          style={{ gridArea: "copyright" }}
        >
          <div className="text-[14px] text-gray-400 whitespace-nowrap leading-[110%]">
            2026© Todos os direitos reservados
          </div>
        </div>

        {/* Bottom desktop bar */}
        <div
          className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-[20px] lg:pt-[48px]"
          style={{ gridArea: "bottom" }}
        >
          <div className="text-[14px] text-gray-400 leading-[110%]">
            2026© Todos os direitos reservados.
          </div>
          <div className="flex flex-col items-center gap-[12px] justify-self-center">
            <h3 className="text-[14px] leading-[110%] text-white">Pagamento seguro</h3>
            <div className="flex items-center gap-[8px]">
              {["MB WAY", "VISA", "MASTERCARD"].map((m) => (
                <span
                  key={m}
                  className="text-[11px] tracking-wide px-[8px] py-[4px] rounded-[4px] bg-white text-gray-900 font-semibold"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
