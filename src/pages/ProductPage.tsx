import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Truck, Star, Ruler, Droplets, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import ReviewsSection from "@/components/fincut/ReviewsSection";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";
import BeforeAfterSection from "@/components/fincut/BeforeAfterSection";
import CustomPackSection from "@/components/fincut/CustomPackSection";
import SizeTechModal from "@/components/fincut/SizeTechModal";
import { getProductBySlug } from "@/data/products";

const featureIcons = [Ruler, Droplets, Award];

const reviews = [
  { author: "Hervé A.", title: "Produtos de grande qualidade", text: "Produtos de grande qualidade, consegui beneficiar de um desconto muito interessante. As t-shirts são impecáveis.", date: "15/03/2026" },
  { author: "Fabrice", title: "T-shirt soberba", text: "T-shirt soberba, material muito agradável de vestir e muito bem cortada. Já comprei várias vezes.", date: "15/03/2026" },
  { author: "R F", title: "Muito bom produto", text: "Muito bom produto. Entrega rápida.", date: "15/03/2026" },
  { author: "Catherine R.", title: "Excelente produto que cumpre promessas!", text: "Excelente produto que cumpre promessas!", date: "15/03/2026" },
  { author: "Daniel P.", title: "Mercadoria de muito boa qualidade", text: "Mercadoria de muito boa qualidade.", date: "14/03/2026" },
  { author: "Renaud W.", title: "Tudo correu na perfeição", text: "Tudo correu na perfeição.", date: "14/03/2026" },
  { author: "Milette", title: "No topo", text: "No topo, como sempre…", date: "14/03/2026" },
  { author: "Eric", title: "T-shirt bem cortada", text: "T-shirt bem cortada, material agradável. Prazos de entrega corretos.", date: "13/03/2026" },
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("unite");
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [countdown, setCountdown] = useState({ hours: 13, minutes: 39 });
  const [sizeTechOpen, setSizeTechOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || "");
      setSelectedSize(product.sizes[0] || "");
      setSelectedImage(0);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.minutes === 0) {
          if (prev.hours === 0) return prev;
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return { ...prev, minutes: prev.minutes - 1 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!product) return <Navigate to="/" replace />;

  const quantityOptions = [
    { id: "unite", label: "UNIDADE", price: `${product.price} €`, sublabel: null, badge: null },
    { id: "pack2", label: "PACK DE 2", price: `${product.price} €/unidade`, sublabel: "Entrega grátis", badge: null },
    { id: "pack3", label: "PACK DE 3", price: `${Math.round(product.price * 0.89)} €/unidade`, sublabel: "Entrega grátis", badge: null },
    { id: "pack4", label: "PACK DE 4", price: `${(product.price * 0.79).toFixed(2).replace(".", ",")} €/unidade`, sublabel: "Entrega grátis", badge: "MAIS VENDIDO" },
    { id: "custom", label: "Componha o seu pack", price: null, sublabel: "Até 18 €/t-shirts", badge: null },
  ];

  const accordionSections = [
    {
      id: "description",
      title: "Descrição",
      content: (
        <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
          {product.description.map((p, i) => (
            <p key={i} className={i === 0 ? "font-semibold text-foreground" : ""}>{p}</p>
          ))}
        </div>
      ),
    },
    {
      id: "materials",
      title: "Materiais e Cuidados",
      content: (
        <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">Materiais e Fabricação:</p>
          <ul className="space-y-1">
            {product.materials.map((m, i) => <li key={i}>• {m}</li>)}
          </ul>
          <p className="font-semibold text-foreground mt-4">Cuidados:</p>
          {product.care.map((c, i) => <p key={i}>{c}</p>)}
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Entrega e Devoluções",
      content: (
        <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
          <p>Os prazos de entrega padrão ao domicílio são de <strong className="text-foreground">2 a 3 dias úteis</strong>.</p>
          <p>Para entregas em <strong className="text-foreground">ponto de recolha</strong>, os prazos são de <strong className="text-foreground">3 a 5 dias úteis</strong>.</p>
          <p>Tem <strong className="text-foreground">30 dias</strong> após a receção para efetuar uma devolução ou troca.</p>
          <p>Os custos de devolução ficam a cargo do cliente.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-6 font-body text-xs tracking-wider text-muted-foreground uppercase">
          <Link to="/" className="hover:text-foreground transition-colors">{product.category}</Link>
          <span className="mx-1">/</span>
          <span>{product.collar}</span>
          <span className="mx-1">/</span>
          <span className="underline text-foreground">Unidade</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-20 flex-shrink-0 max-h-[600px] overflow-y-auto scrollbar-hide">
              {product.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 border overflow-hidden transition-all duration-200 flex-shrink-0 ${
                    selectedImage === i
                      ? "border-foreground"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img src={img} alt={`Vista ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-fincut-light overflow-hidden aspect-square max-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.galleryImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <button
                onClick={() => setSelectedImage(i => Math.max(0, i - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 flex items-center justify-center lg:hidden"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setSelectedImage(i => Math.min(product.galleryImages.length - 1, i + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 flex items-center justify-center lg:hidden"
              >
                <ChevronRight size={16} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                {product.galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === i ? "bg-foreground" : "bg-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <span className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {product.priceLabel}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#00b67a] text-white px-2 py-1 text-xs font-bold flex items-center gap-1 rounded-sm">
                    4.5 <Star size={12} fill="white" />
                  </span>
                  <div className="font-body text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">TRUSTPILOT</span>
                    <br />
                    BASEADO EM 6709 AVALIAÇÕES
                  </div>
                </div>

                <span className="border border-foreground px-3 py-1 font-display text-xs font-bold tracking-wider uppercase">
                  {product.badge}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 py-2">
              {product.features.map((f, i) => {
                const Icon = featureIcons[i] || Award;
                return (
                  <div key={i} className="flex items-center gap-3 font-body text-sm text-foreground">
                    <Icon size={18} className="text-muted-foreground flex-shrink-0" />
                    {f}
                  </div>
                );
              })}
            </div>

            {/* Quantity selector */}
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                Selecione a sua quantidade:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quantityOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedQuantity(opt.id)}
                    className={`relative border px-3 py-3 text-center transition-all duration-200 ${
                      selectedQuantity === opt.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    {opt.badge && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-fincut-gold text-primary-foreground text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider whitespace-nowrap">
                        {opt.badge}
                      </span>
                    )}
                    <span className="font-display text-xs font-bold tracking-wider block">
                      {opt.label}
                    </span>
                    {opt.sublabel && (
                      <span className={`text-[10px] block mt-0.5 ${
                        selectedQuantity === opt.id ? "text-background/70" : "text-muted-foreground"
                      }`}>
                        {opt.sublabel}
                      </span>
                    )}
                    {opt.price && (
                      <span className={`text-xs font-semibold block mt-0.5 ${
                        opt.id === "pack4" && selectedQuantity !== opt.id ? "text-fincut-gold" : ""
                      }`}>
                        {opt.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                Escolha a sua cor: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === c.name
                        ? "border-foreground scale-110"
                        : "border-transparent hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                Escolha o seu tamanho:
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-12 border font-body text-sm font-medium transition-all duration-200 ${
                      selectedSize === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-muted-foreground text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => setSizeTechOpen(true)}
                  className="h-12 border border-border hover:border-muted-foreground font-body text-xs text-muted-foreground transition-all duration-200 relative col-span-2 sm:col-span-1"
                >
                  <span className="absolute -top-2 right-1 bg-fincut-gold text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 tracking-wider">
                    SIZETECH+
                  </span>
                  Definir tamanho
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button className="w-full h-14 bg-foreground text-background font-display text-sm font-bold tracking-widest uppercase hover:bg-foreground/90 transition-colors duration-200 flex items-center justify-center gap-2">
              ADICIONAR AO CARRINHO
              <span className="text-muted-foreground/60">|</span>
              {product.priceLabel}
            </button>

            {/* Delivery info */}
            <div className="flex items-start gap-3 py-3 border-t border-border">
              <Truck size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="font-body text-xs text-muted-foreground">
                Entrega estimada <strong className="text-foreground">QUINTA-FEIRA 19 MARÇO</strong>.
                <br />
                Encomende nas próximas{" "}
                <span className="text-fincut-gold font-semibold">
                  {countdown.hours}h{String(countdown.minutes).padStart(2, "0")}min
                </span>
                .
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FAQ Accordions - full width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {accordionSections.map((section, idx) => (
            <div key={section.id} className={`border-b border-border ${accordionSections.length % 2 !== 0 && idx === accordionSections.length - 1 ? "md:col-span-2 md:max-w-[50%] md:mx-auto" : ""}`}>
              <button
                onClick={() => setOpenAccordion(openAccordion === section.id ? null : section.id)}
                className="w-full flex items-center justify-between py-5 font-display text-base font-semibold text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                {section.title}
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${
                    openAccordion === section.id ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>
              <AnimatePresence>
                {openAccordion === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5">{section.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Section */}
      <BeforeAfterSection />

      {/* Custom Pack Section */}
      <CustomPackSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <p className="font-display text-lg font-bold text-foreground mb-1">
            Alfaiate de todos os corpos para todos os momentos
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">
            Junte-se a milhares de homens que escolheram adotar a Fincut no dia a dia para um estilo cuidado e um conforto incomparável.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="font-body text-sm font-semibold text-foreground">Trustpilot</span>
          <span className="bg-[#00b67a] text-white px-2 py-0.5 text-xs font-bold rounded-sm">4.5</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map(i => (
              <Star key={i} size={16} fill="#00b67a" className="text-[#00b67a]" />
            ))}
            <Star size={16} fill="#00b67a" className="text-[#00b67a] opacity-50" />
          </div>
          <span className="font-body text-xs text-muted-foreground">Baseado em 6709 avaliações</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="border border-border p-5 space-y-2 hover:border-muted-foreground transition-colors duration-200"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={14} fill="#00b67a" className="text-[#00b67a]" />
                ))}
              </div>
              <p className="font-body text-[10px] text-muted-foreground">{review.date}</p>
              <p className="font-body text-sm font-semibold text-foreground">{review.title}</p>
              <p className="font-body text-xs text-muted-foreground line-clamp-3">{review.text}</p>
              <p className="font-body text-xs font-medium text-foreground">{review.author}</p>
            </div>
          ))}
        </div>
      </section>

      <SizeTechModal open={sizeTechOpen} onClose={() => setSizeTechOpen(false)} />
      <SiteFooter />
    </div>
  );
};

export default ProductPage;
