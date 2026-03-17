import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: "Aperçu",
    content: `Ce site web est exploité par FT LTD. Partout sur le site, nous employons les termes « nous », « notre » et « nos » en référence à FT LTD. Ce site web, y compris l'ensemble des informations, outils et services auquel il donne accès, est offert par FT LTD à l'utilisateur que vous êtes, à condition que vous acceptiez la totalité des modalités, conditions, politiques et avis stipulés ici.\n\nEn visitant notre site et/ou en achetant quelque chose auprès de notre entreprise, vous prenez part à notre « Service » et acceptez d'être lié(e) par les modalités et conditions suivantes (« Conditions générales », « Conditions d'utilisation »), y compris par les modalités, conditions et politiques mentionnées aux présentes et/ou accessibles en hyperlien.\n\nVeuillez lire attentivement les présentes Conditions d'utilisation avant d'accéder à notre site web et de l'utiliser. En accédant à une quelconque partie du Site ou en l'utilisant, vous acceptez d'être lié(e) par les présentes Conditions d'utilisation.\n\nNotre boutique est hébergée sur Shopify Inc. Cette société nous fournit la plateforme e-commerce en ligne qui nous permet de vous vendre nos produits et services.`,
  },
  {
    title: "Section 1 – Conditions d'utilisation de la boutique en ligne",
    content: `En acceptant les présentes Conditions d'utilisation, vous déclarez avoir atteint ou dépassé l'âge de la majorité dans votre région, province ou État et nous avoir donné l'autorisation de permettre à toute personne mineure à votre charge d'utiliser ce site.\n\nVous ne devez en aucune façon utiliser nos produits à des fins illégales ou non autorisées, ni violer des lois de votre juridiction lorsque vous utilisez le Service.\n\nVous ne devez pas transmettre de vers informatique, de virus ou tout code de nature destructrice.\n\nUne infraction ou une violation de n'importe laquelle des Conditions entraînera la résiliation immédiate de vos Services.`,
  },
  {
    title: "Section 2 – Conditions générales",
    content: `Nous nous réservons le droit de refuser de servir quelqu'un à tout moment et pour quelque raison que ce soit.\n\nVous comprenez que votre contenu (à l'exception des informations relatives à votre carte de crédit) peut être transféré sans chiffrement. Les informations de votre carte de crédit sont toujours chiffrées lors de leur transfert sur les réseaux.\n\nVous acceptez de ne pas reproduire, dupliquer, copier, vendre, revendre ou exploiter toute partie du Service sans notre autorisation écrite expresse.`,
  },
  {
    title: "Section 3 – Exactitude, exhaustivité et actualité des informations",
    content: `Nous ne saurions être tenus responsables si les informations proposées sur ce site sont inexactes, incomplètes ou caduques. Le contenu de ce site est fourni à titre d'information générale uniquement.\n\nCe site peut contenir certaines données historiques. Par définition, les données historiques ne sont pas actuelles et sont fournies uniquement à titre de référence.`,
  },
  {
    title: "Section 4 – Modifications du service et des prix",
    content: `Les prix de nos produits sont modifiables sans préavis.\n\nNous nous réservons le droit de modifier ou de mettre fin au Service (ou à une quelconque partie de celui-ci) à tout moment et sans préavis.`,
  },
  {
    title: "Section 5 – Produits ou services",
    content: `Il est possible que certains produits ou services ne soient disponibles qu'en ligne à travers le site web. Il se peut que les quantités de ces produits ou services soient limitées.\n\nNous nous sommes efforcés de présenter aussi précisément que possible les couleurs et images des produits figurant sur la boutique. Nous ne pouvons cependant pas garantir la précision d'affichage des couleurs sur l'écran de votre ordinateur.`,
  },
  {
    title: "Section 6 – Exactitude de la facturation",
    content: `Nous nous réservons le droit de refuser toute commande que vous passez auprès de nous. Nous pouvons, à notre seule discrétion, limiter ou annuler les quantités achetées par personne, par foyer ou par commande.\n\nVous acceptez de fournir des informations d'achat et de compte actuelles, complètes et exactes pour tous les achats effectués dans notre boutique.`,
  },
  {
    title: "Section 7 – Outils facultatifs",
    content: `Nous sommes susceptibles de vous fournir l'accès à des outils tiers que nous ne surveillons, ne contrôlons et ne gérons pas. Vous reconnaissez et acceptez que nous vous fournissons l'accès à ces outils « tels quels » et « sous réserve de disponibilité ».`,
  },
  {
    title: "Section 8 – Liens de tiers",
    content: `Certains contenus, produits et services accessibles via notre Service peuvent inclure des éléments provenant de tiers. Les liens de tiers sur ce site peuvent vous rediriger vers des sites web de tiers qui ne sont pas affiliés à nous.`,
  },
  {
    title: "Section 9 – Commentaires et soumissions",
    content: `Si vous soumettez des contenus spécifiques, vous nous accordez le droit de modifier, copier, publier, distribuer, traduire et utiliser dans quelque média que ce soit tous les commentaires que vous nous transmettez.`,
  },
  {
    title: "Section 10 – Informations personnelles",
    content: `La transmission de vos informations personnelles sur notre boutique est régie par notre Politique de confidentialité.`,
  },
  {
    title: "Section 11 – Erreurs, inexactitudes et omissions",
    content: `Il se peut qu'il y ait parfois, sur notre site ou dans le Service, des informations contenant des erreurs typographiques, des inexactitudes ou des omissions. Nous nous réservons le droit de corriger toute erreur à tout moment et sans préavis.`,
  },
  {
    title: "Section 12 – Utilisations interdites",
    content: `Il vous est interdit d'utiliser le site ou son contenu :\n\n• À des fins illégales\n• Pour inciter des tiers à réaliser des actes illégaux\n• Pour enfreindre toute réglementation ou loi\n• Pour transgresser nos droits de propriété intellectuelle\n• Pour harceler, maltraiter ou discriminer quiconque\n• Pour soumettre des renseignements faux ou trompeurs\n• Pour transmettre des virus ou tout code malveillant`,
  },
  {
    title: "Section 13 – Exclusion de garanties",
    content: `Nous ne garantissons pas que votre utilisation de notre Service sera ininterrompue, sécurisée, sans délai ou sans erreur. Le Service est fourni « tel quel » et « sous réserve de disponibilité ».`,
  },
  {
    title: "Section 14 – Indemnisation",
    content: `Vous acceptez d'indemniser et de tenir FT LTD quittes de toute réclamation émise par un quelconque tiers consécutivement à votre violation des présentes Conditions d'utilisation.`,
  },
  {
    title: "Section 15 – Dissociabilité",
    content: `Dans le cas où une disposition des présentes Conditions d'utilisation est jugée illégale ou inapplicable, cette disposition sera néanmoins applicable dans la pleine mesure permise par la loi.`,
  },
  {
    title: "Section 16 – Résiliation",
    content: `Les présentes Conditions d'utilisation resteront en vigueur jusqu'à ce qu'elles soient résiliées par vous ou par nous. Vous pouvez résilier ces Conditions d'utilisation à tout moment en cessant d'utiliser notre site.`,
  },
  {
    title: "Section 17 – Intégralité de l'accord",
    content: `Les présentes Conditions d'utilisation constituent l'intégralité de l'entente et de l'accord entre vous et nous, et régissent votre utilisation du Service.`,
  },
  {
    title: "Section 18 – Loi applicable",
    content: `Les présentes Conditions d'utilisation sont régies et interprétées en vertu des lois de 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ.`,
  },
  {
    title: "Section 19 – Modifications",
    content: `Nous nous réservons le droit de mettre à jour, modifier ou remplacer toute partie des présentes Conditions d'utilisation en publiant lesdites mises à jour sur notre site web.`,
  },
  {
    title: "Section 20 – Coordonnées",
    content: `Les questions relatives aux Conditions d'utilisation doivent nous être envoyées à contact@mrtuga.com.`,
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Conditions Générales de Vente et d'Utilisation
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

export default TermsPage;
