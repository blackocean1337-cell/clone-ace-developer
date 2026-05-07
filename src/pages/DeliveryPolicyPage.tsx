import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: "Prazos de entrega",
    content: `A MRTUGA faz os seus melhores esforços para que a encomenda seja preparada e entregue ao transportador num prazo médio de um (1) a três (3) dias úteis a contar do dia seguinte ao da validação da encomenda pelo Cliente.\n\nOs produtos encomendados pelo Cliente serão entregues na morada comunicada pelo Cliente num prazo indicativo de 10 dias a contar da data de confirmação da encomenda, salvo em caso de período especial (como Natal, Black Friday…).\n\nPara países fora de Portugal, o prazo médio de entrega situa-se entre 5 e 12 dias úteis.\n\nPodem, no entanto, ocorrer atrasos em caso de circunstâncias imprevistas ou por razões ligadas ao local de entrega, e a MRTUGA declina qualquer responsabilidade quanto ao prolongamento dos prazos de entrega por parte do transportador, nomeadamente em caso de perda dos produtos ou de greve.\n\nPara acompanhar a sua encomenda, o cliente deve clicar na ligação enviada por e-mail após a expedição da sua encomenda e clicar no número de rastreamento contido no e-mail de confirmação de expedição que lhe foi enviado.\n\nEm caso de indisponibilidade do produto, a MRTUGA compromete-se a informar o Cliente com a maior brevidade para que o Cliente possa ser reembolsado sem demora e, o mais tardar, nos 30 dias seguintes à confirmação da sua encomenda.\n\nEm caso de prolongamento previsível do prazo de entrega, a MRTUGA compromete-se a informar o Cliente assim que possível e por qualquer meio, para que este possa escolher a manutenção ou o cancelamento total ou parcial da sua encomenda.\n\nA MRTUGA não poderá ser responsabilizada pelas consequências de quaisquer eventos fora do seu controlo, nomeadamente os casos de força maior ou casos fortuitos, que tendam a atrasar ou impedir a entrega do produto encomendado.\n\nEm caso de incumprimento do prazo mencionado acrescido de 14 dias, o Cliente pode cancelar a sua encomenda enviando um e-mail para info@mrtuga.com.\n\nA MRTUGA reserva-se o direito de escolha do transportador e garante o bom encaminhamento dos produtos.\n\nATENÇÃO: se uma encomenda for devolvida ao remetente por não reclamação ou morada de entrega incorreta fornecida pelo Cliente, a MRTUGA reserva-se o direito de faturar novamente os custos de reenvio ao Cliente. Nesta hipótese, se a encomenda for novamente devolvida ao remetente, não será reenviada ao Cliente e o montante correspondente a esta encomenda, incluindo eventuais custos de entrega suplementares, ficará adquirido pela MRTUGA.`,
  },
  {
    title: "Países de entrega",
    content: `A entrega é efetuada em Portugal continental e ilhas, na União Europeia ou internacionalmente, à escolha do Cliente.`,
  },
  {
    title: "Controlo da entrega",
    content: `A MRTUGA garante a conformidade do produto entregue com as características essenciais descritas no site, para uma utilização conforme a sua finalidade.\n\nEm caso de devoluções anormais ou abusivas, a MRTUGA reserva-se o direito de recusar honrar uma encomenda posterior.`,
  },
  {
    title: "Custos de entrega",
    content: `Os custos de envio serão faturados ao preço em vigor no dia da encomenda e podem variar em função do território de entrega e do modo de entrega escolhido pelo Cliente no Site, o que o Cliente reconhece e aceita expressamente.\n\nO Cliente toma conhecimento das modalidades de entrega antes da validação definitiva da sua encomenda.\n\nA MRTUGA não é responsável por taxas e custos de serviços adicionais praticados por determinados países.\n\nOs clientes serão responsáveis por eventuais restrições, direitos, taxas e outros custos cobrados pelo país de destino, antes de efetuar a encomenda. A MRTUGA não será responsável por quaisquer direitos, taxas ou custos aduaneiros em qualquer circunstância.\n\nPara o estrangeiro, se a encomenda chegar ao país e:\n\n• O Cliente recusar a encomenda\n• Nenhuma tentativa de entrega na morada indicada resultar na entrega da encomenda no país de destino\n\nEntão a MRTUGA reserva-se o direito de abandonar a referida encomenda e não será obrigada a qualquer reembolso.`,
  },
];

const DeliveryPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Política de Entrega
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

export default DeliveryPolicyPage;
