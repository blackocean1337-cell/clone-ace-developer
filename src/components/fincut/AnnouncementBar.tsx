const AnnouncementBar = () => {
  return (
    <div className="bg-fincut-black py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-body text-xs tracking-widest text-secondary-foreground mx-8">
            Hoje a Fincut reinventa-se
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
