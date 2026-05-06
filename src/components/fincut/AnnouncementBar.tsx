const MESSAGES = [
  "Envio grátis em encomendas acima de 55€",
  "Entrega em 2-4 dias úteis em Portugal",
  "Pagamento seguro — MB Way & Cartão",
  "30 dias para devolução gratuita",
];

const AnnouncementBar = () => {
  const allItems = [...MESSAGES, ...MESSAGES, ...MESSAGES, ...MESSAGES];
  const renderItems = (keyPrefix: string) =>
    allItems.map((msg, i) => (
      <span key={`${keyPrefix}-${i}`} className="font-body text-xs tracking-widest text-secondary-foreground mx-8 shrink-0 flex items-center gap-2">
        <span className="text-fincut-gold">●</span>
        {msg}
      </span>
    ));

  return (
    <div className="bg-fincut-black py-2 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
};

export default AnnouncementBar;
