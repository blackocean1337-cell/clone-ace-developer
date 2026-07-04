import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const CompanyInfoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Informação da Empresa
        </h1>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
          A MRTUGA é uma marca de vestuário masculino operada pela BlackOcean Limited. Desenhamos peças essenciais, de corte cuidado e materiais duradouros, disponibilizadas diretamente ao consumidor através de mrtuga.co.
        </p>

        <div className="border-t border-border pt-8">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">
            Identificação da Empresa
          </h2>
          <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>BlackOcean Limited</p>
            <p>N.º de Registo Comercial (Hong Kong): 78436447</p>
            <p>Sede registada: Unit 1603, 16/F, The L. Plaza, 367–375 Queen's Road Central, Sheung Wan, Hong Kong</p>
            <p>
              Email:{" "}
              <a href="mailto:info@mrtuga.com" className="text-foreground underline underline-offset-4">
                info@mrtuga.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CompanyInfoPage;
