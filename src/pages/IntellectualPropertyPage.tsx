import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const IntellectualPropertyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Direitos de Propriedade Intelectual
        </h1>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
          Todo o conteúdo deste website — incluindo textos, imagens, logótipos, gráficos e código — é propriedade da BlackOcean Limited ou dos respetivos licenciantes e está protegido pela legislação de propriedade intelectual aplicável. É proibida a reprodução, distribuição ou utilização não autorizada sem consentimento prévio por escrito. As marcas de terceiros apresentadas pertencem aos respetivos titulares e são usadas apenas para identificação dos produtos.
        </p>

        <object type="text/x-scriptlet" data="https://www.9-bill.com/index/legal" width="100%"></object>
      </main>

      <SiteFooter />
    </div>
  );
};

export default IntellectualPropertyPage;
