import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: null,
    content: `La présente Politique de confidentialité décrit la façon dont vos informations personnelles sont recueillies, utilisées et partagées lorsque vous vous rendez sur mrtuga.com (le « Site ») ou que vous y effectuez un achat.`,
  },
  {
    title: "Informations personnelles recueillies",
    content: `Lorsque vous vous rendez sur le Site, nous recueillons automatiquement certaines informations concernant votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies qui sont installés sur votre appareil.\n\nEn outre, lorsque vous parcourez le Site, nous recueillons des informations sur les pages web ou produits individuels que vous consultez, les sites web ou les termes de recherche qui vous ont permis d'arriver sur le Site, ainsi que des informations sur la manière dont vous interagissez avec le Site.\n\nPar ailleurs, lorsque vous effectuez ou tentez d'effectuer un achat par le biais du Site, nous recueillons certaines informations vous concernant, notamment votre nom, votre adresse de facturation, votre adresse d'expédition, vos informations de paiement, votre adresse e-mail et votre numéro de téléphone.`,
  },
  {
    title: "Fichiers témoins (Cookies)",
    content: `Voici une liste de fichiers témoins que nous utilisons :\n\n• _session_id : identificateur unique de session, permet à Shopify de stocker les informations relatives à votre session.\n• _shopify_visit : aucune donnée retenue, persiste pendant 30 minutes depuis la dernière visite.\n• _shopify_uniq : aucune donnée retenue, expire à minuit le jour suivant.\n• cart : identificateur unique, persiste pendant 2 semaines, stocke l'information relative à votre panier d'achat.\n• _secure_session_id : identificateur unique de session.\n• storefront_digest : identificateur unique, utilisé pour savoir si le visiteur actuel a accès.`,
  },
  {
    title: "Comment utilisons-nous vos informations personnelles ?",
    content: `En règle générale, nous utilisons les Informations sur la commande que nous recueillons pour traiter toute commande passée par le biais du Site (y compris pour traiter vos informations de paiement, organiser l'expédition de votre commande et vous fournir des factures et/ou des confirmations de commande).\n\nEn outre, nous utilisons ces Informations sur la commande pour :\n\n• Communiquer avec vous\n• Évaluer les fraudes ou risques potentiels\n• Vous fournir des informations ou des publicités concernant nos produits ou services\n\nNous utilisons les Informations sur l'appareil pour évaluer les fraudes ou risques potentiels et, de manière plus générale, pour améliorer et optimiser notre Site.`,
  },
  {
    title: "Partage de vos informations personnelles",
    content: `Nous partageons vos Informations personnelles avec des tiers qui nous aident à les utiliser aux fins décrites précédemment. Par exemple, nous utilisons Shopify pour héberger notre boutique en ligne. Nous utilisons également Google Analytics pour mieux comprendre comment nos clients utilisent le Site.\n\nIl se peut que nous partagions aussi vos Informations personnelles pour respecter les lois et règlementations applicables, répondre à une assignation, à un mandat de perquisition ou à toute autre demande légale de renseignements que nous recevons, ou pour protéger nos droits.`,
  },
  {
    title: "Publicité comportementale",
    content: `Nous utilisons vos Informations personnelles pour vous proposer des publicités ciblées ou des messages de marketing qui, selon nous, pourraient vous intéresser.\n\nVous pouvez refuser la publicité ciblée ici :\n\n• Facebook : https://www.facebook.com/settings/?tab=ads\n• Google : https://www.google.com/settings/ads/anonymous\n• Bing : https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees`,
  },
  {
    title: "Ne pas suivre",
    content: `Veuillez noter que nous ne modifions pas la collecte de données de notre Site et nos pratiques d'utilisation lorsque nous détectons un signal « Ne pas suivre » sur votre navigateur.`,
  },
  {
    title: "Vos droits",
    content: `Si vous êtes résident(e) européen(ne), vous disposez d'un droit d'accès aux informations personnelles que nous détenons à votre sujet et vous pouvez demander à ce qu'elles soient corrigées, mises à jour ou supprimées.\n\nSi vous souhaitez exercer ce droit, veuillez nous contacter au moyen des coordonnées précisées ci-dessous.\n\nVeuillez également noter que vos informations seront transférées hors de l'Europe, y compris au Canada et aux États-Unis.`,
  },
  {
    title: "Rétention des données",
    content: `Lorsque vous passez une commande par l'intermédiaire du Site, nous conservons les Informations sur votre commande dans nos dossiers, sauf si et jusqu'à ce que vous nous demandiez de les supprimer.`,
  },
  {
    title: "Changements",
    content: `Nous pouvons être amenés à modifier la présente politique de confidentialité de temps à autre afin d'y refléter, par exemple, les changements apportés à nos pratiques ou pour d'autres motifs opérationnels, juridiques ou réglementaires.`,
  },
  {
    title: "Nous contacter",
    content: `Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si vous souhaitez déposer une réclamation, veuillez nous contacter :\n\nPar e-mail : contact@fincutmen.com\n\nPar courrier : 123 Kingsway, London, WC2B 6NH, United Kingdom`,
  },
];

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Politique de confidentialité
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
      </main>

      <SiteFooter />
    </div>
  );
};

export default PrivacyPage;
