const HERO_DESKTOP = "https://cdn.shopify.com/s/files/1/0773/6472/4060/files/BANNERFDP2.jpg?v=1780982471";
const HERO_MOBILE = "https://cdn.shopify.com/s/files/1/0773/6472/4060/files/BANNERMOBILEFDP2.jpg?v=1780982561";

const HeroSection = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-[30px] xl:mb-[40px]">
      <div className="relative w-full h-[380px] md:h-[440px] overflow-hidden">
        <picture className="block w-full h-full">
          <source media="(min-width: 768px)" srcSet={HERO_DESKTOP} />
          <img
            src={HERO_MOBILE}
            alt="A t-shirt que se adapta à sua morfologia"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            style={{ objectPosition: "center center" }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/20 z-[1]" />
        <div className="absolute inset-0 flex items-end z-10 text-white">
          <div className="w-full max-w-[1440px] mx-auto px-5 lg:px-20 py-[40px]">
            <div className="max-w-xl">
              <h1 className="text-gray-100 mb-[20px] xl:mb-[26px] font-serif text-[24px] xl:text-[48px] whitespace-pre-line leading-[110%]">
                A t-shirt que se adapta à sua morfologia
              </h1>
              <p className="text-[14px] xl:text-[16px] leading-[110%]">
                Finalmente! A t-shirt que lhe assenta na perfeição.
              </p>
              <a
                className="uppercase inline-block mt-[20px] xl:mt-[26px] py-[16px] px-[10px] xl:p-[20px] bg-[#facc15] text-gray-900 rounded-[6px] text-[14px] xl:text-[18px] leading-[110%]"
                href="/products/t-shirt-tech"
              >
                Descubra o nosso bestseller
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
