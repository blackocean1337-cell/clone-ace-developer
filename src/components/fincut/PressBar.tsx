const PRESS = [
  { name: "Vogue", className: "italic tracking-[0.05em]" },
  { name: "GQ", className: "tracking-[0.12em]" },
  { name: "Esquire", className: "italic tracking-[0.05em]" },
  { name: "Monocle", className: "tracking-[0.18em] uppercase text-[0.95em]" },
  { name: "Wallpaper*", className: "tracking-[0.12em]" },
  { name: "Highsnobiety", className: "uppercase tracking-[0.22em] text-[0.7em] font-sans-display font-bold" },
  { name: "L'Officiel", className: "italic tracking-[0.05em]" },
];

const PressBar = () => {
  return (
    <section className="bg-fincut-black border-y border-secondary-foreground/10 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-7 md:gap-14">
        <span className="font-sans-display text-[10px] tracking-[0.4em] uppercase text-fincut-gold shrink-0 font-semibold">
          Como visto em
        </span>
        <div className="flex flex-wrap items-baseline justify-center md:justify-between gap-x-12 gap-y-5 flex-1">
          {PRESS.map((p) => (
            <span
              key={p.name}
              className={`font-display text-2xl md:text-3xl font-medium text-secondary-foreground/85 hover:text-fincut-gold transition-colors ${p.className}`}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressBar;
