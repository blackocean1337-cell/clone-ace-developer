const MESSAGE = "Hoje a MRTUGA reinventa-se";
const REPEAT = 8;

const AnnouncementBar = () => {
  const items = [...Array(REPEAT)].map((_, i) => (
    <span key={i} className="font-body text-xs tracking-widest text-secondary-foreground mx-8 shrink-0">
      {MESSAGE}
    </span>
  ));

  return (
    <div className="bg-fincut-black py-2 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {items}
        {items.map((el, i) => (
          <span key={`dup-${i}`} className="font-body text-xs tracking-widest text-secondary-foreground mx-8 shrink-0">
            {MESSAGE}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
