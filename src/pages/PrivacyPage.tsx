import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: null,
    content: `A presente Política de Privacidade descreve a forma como as suas informações pessoais são recolhidas, utilizadas e partilhadas quando visita content: `A presente Política de Privacidade descreve a forma como as suas informações pessoais são recolhidas, utilizadas e partilhadas quando visita mrtuga.co (o "Site") ou quando efetua uma compra no mesmo.`, ou quando efetua uma compra no mesmo.`,
  },
  {
    title: "Informações pessoais recolhidas",
    content: `Quando visita o Site, recolhemos automaticamente determinadas informações sobre o seu dispositivo, incluindo informações sobre o seu navegador web, o seu endereço IP, o seu fuso horário e alguns dos cookies instalados no seu dispositivo.\n\nAlém disso, quando navega no Site, recolhemos informações sobre as páginas web ou produtos individuais que consulta, os websites ou os termos de pesquisa que o trouxeram ao Site, bem como informações sobre a forma como interage com o Site.\n\nQuando efetua ou tenta efetuar uma compra através do Site, recolhemos determinadas informações sobre si, incluindo o seu nome, morada de faturação, morada de envio, informações de pagamento, endereço de e-mail e número de telefone.`,
  },
  {
    title: "Ficheiros de testemunho (Cookies)",
    content: `Segue-se uma lista de ficheiros de testemunho que utilizamos:\n\n• _session_id: identificador único de sessão, permite armazenar as informações relativas à sua sessão.\n• _shopify_visit: nenhum dado retido, persiste durante 30 minutos desde a última visita.\n• _shopify_uniq: nenhum dado retido, expira à meia-noite do dia seguinte.\n• cart: identificador único, persiste durante 2 semanas, armazena a informação relativa ao seu carrinho de compras.\n• _secure_session_id: identificador único de sessão.\n• storefront_digest: identificador único, utilizado para saber se o visitante atual tem acesso.`,
  },
  {
    title: "Como utilizamos as suas informações pessoais?",
    content: `Regra geral, utilizamos as Informações sobre a encomenda que recolhemos para processar qualquer encomenda efetuada através do Site (incluindo o processamento das suas informações de pagamento, a organização do envio da sua encomenda e o fornecimento de faturas e/ou confirmações de encomenda).\n\nAlém disso, utilizamos estas Informações sobre a encomenda para:\n\n• Comunicar consigo\n• Avaliar fraudes ou riscos potenciais\n• Fornecer-lhe informações ou publicidade sobre os nossos produtos ou serviços\n\nUtilizamos as Informações sobre o dispositivo para avaliar fraudes ou riscos potenciais e, de forma mais geral, para melhorar e otimizar o nosso Site.`,
  },
  {
    title: "Partilha das suas informações pessoais",
    content: `Partilhamos as suas Informações pessoais com terceiros que nos ajudam a utilizá-las para os fins descritos anteriormente. Por exemplo, utilizamos a Shopify para alojar a nossa loja online. Também utilizamos o Google Analytics para melhor compreender como os nossos clientes utilizam o Site.\n\nPoderemos igualmente partilhar as suas Informações pessoais para cumprir as leis e regulamentações aplicáveis, responder a uma intimação, a um mandado de busca ou a qualquer outro pedido legal de informações que recebamos, ou para proteger os nossos direitos.`,
  },
  {
    title: "Publicidade comportamental",
    content: `Utilizamos as suas Informações pessoais para lhe propor publicidade direcionada ou mensagens de marketing que, segundo acreditamos, poderão ser do seu interesse.\n\nPode recusar a publicidade direcionada aqui:\n\n• Facebook: https://www.facebook.com/settings/?tab=ads\n• Google: https://www.google.com/settings/ads/anonymous\n• Bing: https://about.ads.microsoft.com/pt-pt/recursos/politicas/anuncios-personalizados`,
  },
  {
    title: "Não rastrear",
    content: `Tenha em atenção que não alteramos a recolha de dados do nosso Site nem as nossas práticas de utilização quando detetamos um sinal "Não rastrear" no seu navegador.`,
  },
  {
    title: "Os seus direitos",
    content: `Se é residente europeu(eia), tem o direito de acesso às informações pessoais que detemos sobre si e pode solicitar que as mesmas sejam corrigidas, atualizadas ou eliminadas.\n\nSe desejar exercer este direito, por favor contacte-nos através das coordenadas indicadas abaixo.\n\nTenha igualmente em atenção que as suas informações poderão ser transferidas para fora da Europa, incluindo para o Canadá e para os Estados Unidos.`,
  },
  {
    title: "Retenção de dados",
    content: `Quando efetua uma encomenda através do Site, conservamos as Informações sobre a sua encomenda nos nossos registos, salvo e até que nos solicite a sua eliminação.`,
  },
  {
    title: "Alterações",
    content: `Poderemos alterar a presente política de privacidade periodicamente, de forma a refletir, por exemplo, as alterações às nossas práticas ou por outros motivos operacionais, jurídicos ou regulamentares.`,
  },
  {
    title: "Contacte-nos",
    content: `Para saber mais sobre as nossas práticas de privacidade, se tiver questões ou se desejar apresentar uma reclamação, por favor contacte-nos:\n\nPor e-mail: info@mrtuga.com\n\nPor correio: Lisboa, Portugal`,
  },
];

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Política de Privacidade
        </h1>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h2 className="font-display text-lg font-bold text-foreground mb-4">
                  {section.title}
                </h2>
              )}
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

export default PrivacyPage;
