import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: "Devoluções",
    content: `A nossa política tem a duração de 30 dias. Se passaram mais de 30 dias desde a receção do seu artigo, infelizmente não podemos oferecer reembolso nem troca.\n\nPara poder ser devolvido, o seu artigo deve estar por utilizar e no estado em que o recebeu. Deve também estar na sua embalagem original.\n\nPara concluir a sua devolução, exigimos um recibo ou comprovativo de compra. Não devolva a sua compra ao fabricante.`,
  },
  {
    title: "Reembolsos",
    content: `Assim que a sua devolução for recebida e inspecionada, enviar-lhe-emos um e-mail para informá-lo de que recebemos o artigo devolvido. Informá-lo-emos igualmente se o seu reembolso foi aprovado ou recusado.\n\nSe for aprovado, o seu reembolso será então processado e o seu cartão de crédito ou meio de pagamento original será creditado automaticamente num prazo de alguns dias.`,
  },
  {
    title: "Reembolsos atrasados ou em falta",
    content: `Se ainda não recebeu o seu reembolso:\n\n• Verifique novamente a sua conta bancária\n• Contacte a entidade emissora do seu cartão de crédito, pois pode demorar algum tempo até que o reembolso seja oficialmente apresentado\n• Contacte o seu banco. A apresentação de um reembolso é frequentemente precedida de um prazo de processamento\n\nSe efetuou todas estas diligências e ainda não recebeu o seu reembolso, contacte-nos em info@mrtuga.com.`,
  },
  {
    title: "Artigos em saldo ou em promoção",
    content: `Apenas os artigos a preço normal são reembolsáveis. Infelizmente, os artigos em saldo ou em promoção não são reembolsáveis.`,
  },
  {
    title: "Trocas",
    content: `Apenas substituímos artigos que apresentem defeito de origem ou que estejam danificados. Se precisar de substituir o seu artigo pelo mesmo, envie-nos um e-mail para info@mrtuga.com.`,
  },
  {
    title: "Presentes",
    content: `Se o artigo foi marcado como presente no momento da compra e lhe foi enviado diretamente, receberá um crédito presente de valor equivalente ao do artigo devolvido. Assim que o artigo devolvido for recebido, ser-lhe-á enviado um vale presente.\n\nSe o artigo não foi marcado como presente no momento da compra, ou se a pessoa que ofereceu o presente fez enviar a encomenda para si própria com o intuito de lha entregar posteriormente, é a essa pessoa que enviaremos o reembolso.`,
  },
  {
    title: "Envio das devoluções",
    content: `Os custos de envio associados à devolução do seu artigo ficam a seu cargo. Não são reembolsáveis. Se receber um reembolso, o custo de envio da devolução será deduzido do mesmo.\n\nConsoante o local onde reside, o prazo de receção do seu produto trocado pode variar.\n\nSe enviar um artigo de valor superior a 75 €, recomendamos que utilize um serviço de rastreamento de envio ou que faça um seguro do seu envio. Não garantimos que receberemos o artigo devolvido.`,
  },
];

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Política de Reembolso
        </h1>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="font-display text-lg font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default RefundPolicyPage;
