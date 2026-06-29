const PRESS = ["GQ", "ESQUIRE", "MONOCLE", "HIGHSNOBIETY", "L'OFFICIEL", "VOGUE HOMMES", "WALLPAPER*"];

const PressBar = () => {
  return (
    <section className="bg-fincut-black border-y border-secondary-foreground/10 py-7">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <span className="font-display text-[10px] tracking-[0.35em] uppercase text-fincut-gold shrink-0">
          Como visto em
        </span>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-3 flex-1 opacity-70">
          {PRESS.map((p) => (
            <span
              key={p}
              className="font-display text-base md:text-lg font-bold tracking-[0.18em] text-secondary-foreground/80 hover:text-fincut-gold transition-colors"
              style={{ fontVariant: "small-caps" }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressBar;
