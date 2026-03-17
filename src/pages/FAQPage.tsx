import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = { q: string; a: string };

type FAQSection = {
  title: string;
  items: FAQItem[];
};

const faqSections: FAQSection[] = [
  {
    title: "Entregas & Devoluções",
    items: [
      {
        q: "Quanto tempo demora a entrega?",
        a: "As encomendas são preparadas e expedidas em 24h (dias úteis).\n\nOs prazos de entrega estimados:\nPortugal:\n• CTT Expresso (entrega ao domicílio): 1 a 3 dias\n• Ponto de recolha: 3 a 5 dias\n\nBrasil:\n• Entrega ao domicílio: 5 a 10 dias\n\nPara entregas internacionais, os prazos e custos podem variar consoante o país de destino. Uma estimativa precisa ser-lhe-á proposta durante o checkout.",
      },
      {
        q: "A MRTUGA oferece entrega gratuita?",
        a: "Sim, a entrega é gratuita automaticamente em ponto de recolha a partir de 55€ de compra. A entrega ao domicílio está disponível como opção paga, para entrega em 72h.",
      },
      {
        q: "Como acompanhar a minha encomenda?",
        a: "Assim que a sua encomenda for expedida, receberá um e-mail da nossa parte, bem como um e-mail do nosso transportador, com um link de acompanhamento.\nPode também acompanhar a sua encomenda a qualquer momento clicando aqui.\nOu diretamente no site dos nossos parceiros de entrega.",
      },
      {
        q: "Para onde enviam?",
        a: "Atualmente enviamos as nossas encomendas para Portugal, Brasil, França, Suíça, Bélgica e Luxemburgo.",
      },
    ],
  },
  {
    title: "Produtos & Tamanhos",
    items: [
      {
        q: "Como encontrar o meu tamanho?",
        a: "Graças à nossa tecnologia inovadora SizeTech+, pode encontrar o seu tamanho em poucos cliques, com uma fiabilidade de 97,4%, validada em mais de 100 000 clientes. Simples, rápido e preciso!",
      },
      {
        q: "O meu produto apresenta um defeito:",
        a: "Apesar de todos os controlos efetuados, um defeito pode excecionalmente aparecer em certos produtos.\nSe for esse o caso, não se preocupe: contacte o nosso serviço pós-venda em contact@mrtuga.com indicando o seu número de encomenda e, se possível, uma foto do defeito.\nA nossa equipa fará o necessário para lhe oferecer uma solução rápida.",
      },
      {
        q: "Encomendei dois produtos iguais e não são exatamente idênticos",
        a: "Os nossos produtos são confecionados a partir de matérias têxteis que podem reagir de forma diferente segundo a cor, a tintura e as etapas de fabrico. Apesar de padrões de produção rigorosos, ligeiras diferenças de medida podem excecionalmente aparecer entre duas peças do mesmo modelo.\nNo entanto, se a diferença lhe parecer importante ou se o produto não lhe convém, convidamo-lo a contactar a nossa equipa para proceder a uma troca ou devolução: contact@mrtuga.com.",
      },
    ],
  },
  {
    title: "Modificações e cancelamentos",
    items: [
      {
        q: "Posso modificar ou cancelar a minha encomenda?",
        a: "Sim, é possível se nos contactar rapidamente em contact@mrtuga.com.\nAs nossas equipas preparam e expedem as encomendas com a maior brevidade.\nUma vez a encomenda expedida, é infelizmente tarde demais para a modificar ou cancelar.",
      },
    ],
  },
  {
    title: "Devoluções",
    items: [
      {
        q: "Como pedir uma troca?",
        a: "Se deseja pedir uma troca, basta contactar a nossa equipa SAV em contact@mrtuga.com indicando o seu número de encomenda e o motivo do seu pedido.\nA nossa equipa responderá em 24 a 48 horas com as primeiras instruções.\nSerá depois convidado a seguir os passos da nossa plataforma de devolução para finalizar o seu pedido de troca.",
      },
      {
        q: "Como pedir um reembolso?",
        a: "Se deseja pedir um reembolso, basta contactar a nossa equipa SAV em contact@mrtuga.com indicando o seu número de encomenda e o motivo do seu pedido.\nA nossa equipa responderá em 24 a 48 horas com as primeiras instruções.\nSerá depois convidado a seguir os passos da nossa plataforma de devolução e a selecionar a opção reembolso na plataforma de pagamento.",
      },
    ],
  },
  {
    title: "Instruções de cuidado",
    items: [
      {
        q: "Como lavar os meus artigos?",
        a: "Para preservar o corte, a suavidade e a resistência das suas peças, recomendamos seguir estes conselhos de cuidado:\n• Lavagem à máquina a frio\n• Lavar com cores semelhantes\n• Secagem a plano ou a baixa temperatura (um ligeiro encolhimento pode ocorrer na máquina de secar)\nPode também pendurar a sua roupa para secar, mas isso pode causar um ligeiro estiramento do tecido.\nAo respeitar estas recomendações, os seus artigos conservarão a sua aparência e qualidade ao longo do tempo.",
      },
      {
        q: "Posso serigrafar os meus artigos MRTUGA?",
        a: "Sim, as nossas t-shirts podem ser utilizadas para serigrafia ou qualquer outra forma de personalização.\nTenha em atenção que qualquer impressão ou modificação aplicada ao produto anula a sua autenticidade original e torna o artigo inelegível para a nossa política de garantia.",
      },
    ],
  },
  {
    title: "Reduções e códigos promocionais",
    items: [
      {
        q: "Onde posso aplicar o meu código de redução?",
        a: "Pode aplicar o seu código de redução diretamente no seu carrinho ou durante a etapa de pagamento, no campo previsto para esse efeito, antes de finalizar a sua encomenda.",
      },
      {
        q: "Esqueci-me de usar o meu código promo, como fazer?",
        a: "Não se preocupe! Se se esqueceu de usar o seu código promo durante a sua encomenda, basta contactar a nossa equipa SAV em contact@fincutmen.com.\nApós verificação, enviar-lhe-emos um vale para utilizar na sua próxima encomenda.",
      },
      {
        q: "O meu código promo não funciona, podem ajudar-me?",
        a: "Convidamo-lo primeiro a atualizar a página e a tentar novamente aplicar o seu código de redução.\nSe o problema persistir, por favor contacte a nossa equipa em contact@fincutmen.com para que possamos ajudá-lo.",
      },
    ],
  },
  {
    title: "Cartões presente",
    items: [
      {
        q: "Os cartões presente são válidos por muito tempo?",
        a: "Sim, todos os nossos cartões presente são válidos durante 365 dias a partir da data de compra.",
      },
      {
        q: "Existe um mínimo de compra para usar um cartão presente?",
        a: "Não, não há nenhum mínimo de compra necessário.",
      },
      {
        q: "Posso trocar um cartão presente por dinheiro?",
        a: "Não, os cartões presente não são trocáveis nem reembolsáveis.",
      },
      {
        q: "Oferecem cartões presente físicos?",
        a: "Não, oferecemos apenas cartões presente digitais, enviados por email.",
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        {/* Page header */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Perguntas frequentes
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-16 max-w-2xl">
          Encontre as respostas às perguntas mais frequentes. Se não encontrar a resposta à sua pergunta, não hesite em contactar-nos.
        </p>

        {/* FAQ Sections */}
        {faqSections.map((section, idx) => (
          <div key={idx} className="mb-16">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-8">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {section.items.map((item, i) => (
                <Accordion key={i} type="single" collapsible>
                  <AccordionItem value={`item-${i}`} className="border-b border-border">
                    <AccordionTrigger className="font-body text-sm text-foreground font-medium py-5 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <h3 className="font-display text-lg font-bold text-foreground mb-2">
            Não encontrou a sua resposta?
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6">
            A nossa equipa está aqui para o ajudar. Contacte-nos e responderemos com a maior brevidade.
          </p>
          <a
            href="mailto:contact@fincutmen.com"
            className="inline-block border-2 border-foreground px-8 py-3 font-display text-xs font-bold tracking-[0.15em] text-foreground uppercase hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            CONTACTAR-NOS
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default FAQPage;
