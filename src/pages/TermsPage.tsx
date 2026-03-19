import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: "Visão geral",
    content: `Este website é operado pela MRTUGA. Em todo o site, utilizamos os termos "nós", "nosso" e "nos" em referência à MRTUGA. Este website, incluindo todas as informações, ferramentas e serviços disponíveis, é oferecido pela MRTUGA ao utilizador, desde que aceite a totalidade das modalidades, condições, políticas e avisos aqui estipulados.\n\nAo visitar o nosso site e/ou ao comprar algo da nossa empresa, participa no nosso "Serviço" e aceita ficar vinculado(a) às seguintes modalidades e condições ("Condições Gerais", "Condições de Utilização"), incluindo as modalidades, condições e políticas mencionadas neste documento e/ou acessíveis por hiperligação.\n\nPor favor, leia atentamente as presentes Condições de Utilização antes de aceder e utilizar o nosso website. Ao aceder a qualquer parte do Site ou ao utilizá-lo, aceita ficar vinculado(a) pelas presentes Condições de Utilização.\n\nA nossa loja está alojada na Shopify Inc. Esta empresa fornece-nos a plataforma de e-commerce online que nos permite vender-lhe os nossos produtos e serviços.`,
  },
  {
    title: "Secção 1 – Condições de utilização da loja online",
    content: `Ao aceitar as presentes Condições de Utilização, declara ter atingido ou ultrapassado a maioridade legal na sua região, província ou estado e ter-nos dado autorização para permitir que qualquer pessoa menor a seu cargo utilize este site.\n\nNão deve, de forma alguma, utilizar os nossos produtos para fins ilegais ou não autorizados, nem violar quaisquer leis da sua jurisdição ao utilizar o Serviço.\n\nNão deve transmitir worms informáticos, vírus ou qualquer código de natureza destrutiva.\n\nUma infração ou violação de qualquer uma das Condições resultará na cessação imediata dos seus Serviços.`,
  },
  {
    title: "Secção 2 – Condições gerais",
    content: `Reservamo-nos o direito de recusar servir alguém a qualquer momento e por qualquer motivo.\n\nCompreende que o seu conteúdo (exceto informações relativas ao seu cartão de crédito) pode ser transferido sem encriptação. As informações do seu cartão de crédito são sempre encriptadas durante a transferência nas redes.\n\nAceita não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do Serviço sem a nossa autorização escrita expressa.`,
  },
  {
    title: "Secção 3 – Exatidão, exaustividade e atualidade das informações",
    content: `Não poderemos ser responsabilizados se as informações disponibilizadas neste site forem inexatas, incompletas ou desatualizadas. O conteúdo deste site é fornecido apenas para informação geral.\n\nEste site pode conter determinados dados históricos. Por definição, os dados históricos não são atuais e são fornecidos apenas a título de referência.`,
  },
  {
    title: "Secção 4 – Modificações do serviço e dos preços",
    content: `Os preços dos nossos produtos podem ser alterados sem aviso prévio.\n\nReservamo-nos o direito de modificar ou encerrar o Serviço (ou qualquer parte do mesmo) a qualquer momento e sem aviso prévio.`,
  },
  {
    title: "Secção 5 – Produtos ou serviços",
    content: `É possível que determinados produtos ou serviços estejam disponíveis apenas online através do website. As quantidades destes produtos ou serviços podem ser limitadas.\n\nEsforçámo-nos por apresentar com a maior precisão possível as cores e imagens dos produtos apresentados na loja. No entanto, não podemos garantir a precisão da apresentação das cores no ecrã do seu computador.`,
  },
  {
    title: "Secção 6 – Exatidão da faturação",
    content: `Reservamo-nos o direito de recusar qualquer encomenda que faça junto de nós. Podemos, a nosso exclusivo critério, limitar ou anular as quantidades compradas por pessoa, por agregado familiar ou por encomenda.\n\nAceita fornecer informações de compra e de conta atuais, completas e exatas para todas as compras efetuadas na nossa loja.`,
  },
  {
    title: "Secção 7 – Ferramentas facultativas",
    content: `Podemos fornecer-lhe acesso a ferramentas de terceiros que não monitorizamos, controlamos nem gerimos. Reconhece e aceita que lhe fornecemos acesso a essas ferramentas "tal como estão" e "mediante disponibilidade".`,
  },
  {
    title: "Secção 8 – Ligações de terceiros",
    content: `Determinados conteúdos, produtos e serviços acessíveis através do nosso Serviço podem incluir elementos provenientes de terceiros. As ligações de terceiros neste site podem redirecioná-lo para websites de terceiros que não são afiliados a nós.`,
  },
  {
    title: "Secção 9 – Comentários e submissões",
    content: `Se submeter conteúdos específicos, concede-nos o direito de modificar, copiar, publicar, distribuir, traduzir e utilizar em qualquer meio de comunicação todos os comentários que nos transmitir.`,
  },
  {
    title: "Secção 10 – Informações pessoais",
    content: `A transmissão das suas informações pessoais na nossa loja é regida pela nossa Política de Privacidade.`,
  },
  {
    title: "Secção 11 – Erros, inexatidões e omissões",
    content: `Poderá haver, por vezes, no nosso site ou no Serviço, informações contendo erros tipográficos, inexatidões ou omissões. Reservamo-nos o direito de corrigir qualquer erro a qualquer momento e sem aviso prévio.`,
  },
  {
    title: "Secção 12 – Utilizações proibidas",
    content: `É proibido utilizar o site ou o seu conteúdo:\n\n• Para fins ilegais\n• Para incitar terceiros a realizar atos ilegais\n• Para infringir qualquer regulamentação ou lei\n• Para transgredir os nossos direitos de propriedade intelectual\n• Para assediar, maltratar ou discriminar qualquer pessoa\n• Para submeter informações falsas ou enganosas\n• Para transmitir vírus ou qualquer código malicioso`,
  },
  {
    title: "Secção 13 – Exclusão de garantias",
    content: `Não garantimos que a sua utilização do nosso Serviço será ininterrupta, segura, sem atrasos ou sem erros. O Serviço é fornecido "tal como está" e "mediante disponibilidade".`,
  },
  {
    title: "Secção 14 – Indemnização",
    content: `Aceita indemnizar e isentar a MRTUGA de qualquer reclamação emitida por terceiros decorrente da sua violação das presentes Condições de Utilização.`,
  },
  {
    title: "Secção 15 – Dissociabilidade",
    content: `No caso de uma disposição das presentes Condições de Utilização ser considerada ilegal ou inaplicável, essa disposição será, ainda assim, aplicável na máxima medida permitida pela lei.`,
  },
  {
    title: "Secção 16 – Rescisão",
    content: `As presentes Condições de Utilização permanecerão em vigor até serem rescindidas por si ou por nós. Pode rescindir estas Condições de Utilização a qualquer momento, deixando de utilizar o nosso site.`,
  },
  {
    title: "Secção 17 – Integralidade do acordo",
    content: `As presentes Condições de Utilização constituem a totalidade do entendimento e acordo entre si e nós, e regem a sua utilização do Serviço.`,
  },
  {
    title: "Secção 18 – Lei aplicável",
    content: `As presentes Condições de Utilização são regidas e interpretadas ao abrigo das leis do Reino Unido (UK).`,
  },
  {
    title: "Secção 19 – Alterações",
    content: `Reservamo-nos o direito de atualizar, modificar ou substituir qualquer parte das presentes Condições de Utilização, publicando as referidas atualizações no nosso website.`,
  },
  {
    title: "Secção 20 – Contactos",
    content: `As questões relativas às Condições de Utilização devem ser enviadas para info@mrtuga.com.`,
  },
];



const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Condições Gerais de Venda e Utilização
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

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">
            Informação da Empresa
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {`BLACKOCEAN LIMITED\nUnit 1603, 16th Floor, The L. Plaza, 367 - 375 Queen's Road Central, Sheung Wan, Hong Kong`}
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default TermsPage;
