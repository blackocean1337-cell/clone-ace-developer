import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const sections = [
  {
    title: "Retours",
    content: `Notre politique dure 30 jours. Si plus de 30 jours se sont écoulés depuis la réception de votre article, nous ne pouvons malheureusement offrir ni remboursement ni échange.\n\nPour pouvoir être retourné, votre article doit être inutilisé et dans l'état où vous l'avez reçu. Il doit aussi être dans son emballage d'origine.\n\nPour compléter votre retour, nous exigeons un reçu ou une preuve d'achat. Ne retournez pas votre achat au fabricant.`,
  },
  {
    title: "Remboursements",
    content: `Une fois votre retour reçu et inspecté, nous vous adresserons un e-mail pour vous indiquer que nous avons reçu l'article retourné. Nous vous préciserons également si votre remboursement est approuvé ou refusé.\n\nS'il est approuvé, votre remboursement est alors traité et votre carte de crédit ou moyen de paiement initial se voit crédité(e) automatiquement dans un délai de quelques jours.`,
  },
  {
    title: "Remboursements retardés ou manquants",
    content: `Si vous n'avez pas encore reçu de remboursement :\n\n• Revérifiez d'abord votre compte bancaire\n• Contactez la société émettrice de votre carte de crédit, car il se peut que l'affichage officiel de votre remboursement prenne un peu de temps\n• Contactez votre banque. L'affichage d'un remboursement est souvent précédé d'un délai de traitement\n\nSi vous avez effectué toutes ces démarches et que vous n'avez toujours pas reçu votre remboursement, contactez-nous à contact@fincutmen.com.`,
  },
  {
    title: "Articles soldés ou en promotion",
    content: `Seuls les articles à prix normal sont remboursables. Malheureusement, les articles soldés ou en promotion ne le sont pas.`,
  },
  {
    title: "Échanges",
    content: `Nous ne remplaçons que les articles initialement défectueux ou endommagés. Si vous devez remplacer le vôtre par le même article, adressez-nous un e-mail à contact@fincutmen.com.`,
  },
  {
    title: "Cadeaux",
    content: `Si l'article a été marqué comme cadeau au moment de l'achat et s'il vous a été expédié directement, vous recevrez un crédit cadeau d'une valeur équivalente à celle de l'article retourné. Une fois l'article retourné reçu, un bon cadeau vous sera envoyé par voie postale.\n\nSi l'article n'a pas été marqué comme cadeau au moment de l'achat, ou si la personne à l'origine du cadeau s'est fait envoyer la commande dans le but de vous la remettre plus tard, c'est à elle que nous adresserons le remboursement.`,
  },
  {
    title: "Expédition des retours",
    content: `Les coûts d'expédition liés au retour de votre article sont à votre charge. Ils ne sont pas remboursables. Si vous recevez un remboursement, le coût d'expédition du retour en sera déduit.\n\nSelon l'endroit où vous vivez, le délai de réception de votre produit échangé peut varier.\n\nSi vous expédiez un article d'une valeur supérieure à 75 €, nous vous recommandons d'utiliser un service de suivi d'expédition ou de faire assurer votre envoi. Nous ne garantissons pas que nous recevrons l'article retourné.`,
  },
];

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Politique de remboursement
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
