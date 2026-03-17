import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: "Délais de livraison",
    content: `Fincut réalise ses meilleurs efforts pour que la commande soit préparée et remise au transporteur dans un délai moyen d'un (1) à trois (3) jours ouvrables à compter du jour suivant celui de la validation par le Client de sa commande.\n\nLes produits commandés par le Client seront livrés à l'adresse communiquée par le Client dans un délai indicatif de 10 jours à compter de la date de confirmation de commande, hormis en cas de période particulière (telle que Noël, Black Friday…).\n\nPour les pays hors France, le délai moyen de livraison est compris entre 5 et 12 jours ouvrables.\n\nDes retards peuvent néanmoins se produire en cas de circonstances imprévues ou pour des raisons liées au lieu de livraison et Fincut décline toute responsabilité quant à l'allongement des délais de livraison du fait du transporteur, notamment en cas de perte des produits ou de grève.\n\nPour suivre sa commande, le client doit cliquer sur le lien envoyé par e-mail suite à l'expédition de sa commande et cliquer sur le numéro de suivi contenu dans l'email de confirmation d'expédition lui ayant été adressé.\n\nEn cas d'indisponibilité du produit, Fincut s'engage à informer le Client dans les meilleurs délais afin que le Client puisse être remboursé sans délai et au plus tard dans les 30 jours suivant la confirmation de sa commande.\n\nEn cas d'allongement prévisible du délai de livraison, Fincut s'engage à en informer le Client dès que possible et par tout moyen afin que celui-ci puisse alors choisir le maintien ou l'annulation totale ou partielle de sa commande.\n\nFincut ne saurait être tenue pour responsable des conséquences de tous événements échappant à sa volonté, notamment les cas de force majeure ou cas fortuits, qui tendraient à retarder ou empêcher la livraison du produit commandé.\n\nEn cas de non-respect du délai mentionné majoré de 14 jours, le Client peut annuler sa commande par l'envoi d'un e-mail à l'adresse contact@fincutmen.com.\n\nFincut se réserve le choix du transporteur et garantit le bon acheminement des produits.\n\nATTENTION : si un colis est retourné à l'expéditeur pour non-réclamation ou mauvaise adresse de livraison fournie par le Client, Fincut se réserve le droit de facturer à nouveau les frais de réexpédition au Client. Dans cette hypothèse, si le colis est de nouveau renvoyé à l'expéditeur, il ne sera plus renvoyé au Client et le montant correspondant à cette commande, y compris les frais de livraison supplémentaires éventuels, restera acquis à la société Fincut.`,
  },
  {
    title: "Pays livrés",
    content: `La livraison est effectuée en France métropolitaine, en Union Européenne ou à l'international au choix du Client.`,
  },
  {
    title: "Contrôle de la livraison",
    content: `Fincut garantit la conformité du produit livré aux caractéristiques essentielles décrites sur le site et ce pour un usage conforme à sa destination.\n\nEn cas de retours anormaux ou abusifs, Fincut se réserve le droit de refuser d'honorer une commande ultérieure.`,
  },
  {
    title: "Frais de livraison",
    content: `Les frais de port seront facturés au tarif en vigueur au jour de la commande et peuvent varier en fonction du territoire de livraison et du mode de livraison choisi par le Client sur le Site, ce que le Client reconnaît et accepte expressément.\n\nLe Client prend connaissance des modalités de livraison avant validation définitive de sa commande.\n\nFincut n'est pas responsable des taxes et frais de services supplémentaires pratiqués par certains pays.\n\nLes clients seront tenus responsables d'éventuelles restrictions, droits, taxes et autres frais perçus par le pays de destination, avant de passer commande. Fincut ne sera pas responsable de tous droits, taxes ou frais de douane dus en toutes circonstances.\n\nPour l'étranger, si la commande arrive dans le pays et que :\n\n• Le Client refuse le colis\n• Aucune tentative de livraison à l'adresse indiquée n'aboutit dans le pays de destination pour livrer le colis\n\nAlors Fincut se réserve le droit d'abandonner le dit-colis et ne sera pas tenue à un quelconque remboursement.`,
  },
];

const DeliveryPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Politique de livraison
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
