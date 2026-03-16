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
import { useCart } from "@/context/CartContext";
import SizeTechModal from "@/components/fincut/SizeTechModal";
import { getProductBySlug } from "@/data/products";
import lifestyleOffice from "@/assets/lifestyle-office.jpg";
import lifestyleGym from "@/assets/lifestyle-gym.jpg";
import lifestyleHome from "@/assets/lifestyle-home.jpg";
import lifestyleStreet from "@/assets/lifestyle-street.jpg";

const lifestyleItems = [
  { image: lifestyleOffice, label: "No escritório" },
  { image: lifestyleGym, label: "Para o quarto" },
  { image: lifestyleHome, label: "Em casa" },
  { image: lifestyleStreet, label: "Todos os dias" },
];

const featureIcons = [Ruler, Droplets, Award];

import reviewPhoto1 from "@/assets/review-photo-1.png";
import reviewPhoto2 from "@/assets/review-photo-2.png";
import reviewPhoto3 from "@/assets/review-photo-3.png";
import reviewPhoto4 from "@/assets/review-photo-4.png";
import reviewPhoto5 from "@/assets/review-photo-5.png";
import reviewPhoto6 from "@/assets/review-photo-6.webp";
import reviewPhoto7 from "@/assets/review-photo-7.png";
import reviewPhoto8 from "@/assets/review-photo-8.jpg";
import reviewPhoto9 from "@/assets/review-photo-9.jpg";
import reviewPhoto10 from "@/assets/review-photo-10.jpg";
import reviewPhoto11 from "@/assets/review-photo-11.jpg";
import reviewPhoto12 from "@/assets/review-photo-12.jpg";
import reviewPhoto13 from "@/assets/review-photo-13.jpg";
import reviewPhoto14 from "@/assets/review-photo-14.jpg";
import reviewPhoto15 from "@/assets/review-photo-15.jpg";
import reviewPhoto16 from "@/assets/review-photo-16.jpg";

const reviews = [
  { author: "Kevin F.", title: "A coupe é incrível", text: "A coupe é incrível, o meu primeiro pack comprado, já estou conquistado e penso comprar mais cores e polos. Os que hesitam, vão de olhos fechados.", date: "20/12/2025", stars: 5, image: reviewPhoto1, article: "Pack 4", verified: true },
  { author: "Vincent R.", title: "Tee shirt simpática", text: "Tee shirt simpática. Infelizmente o XXXL é demasiado grande e o XXL é ligeiramente apertado para mim. De resto boa matéria, sente-se que é qualidade.", date: "07/12/2025", stars: 4, image: reviewPhoto2, article: "3XL", verified: true },
  { author: "Raphael F.", title: "Muito agradável de usar", text: "Muito agradável de usar, valoriza bem.", date: "14/11/2025", stars: 5, image: reviewPhoto3, article: "M / Bordeaux", verified: true },
  { author: "Dylan H.", title: "Perfeito", text: "Perfeito", date: "23/09/2025", stars: 5, image: reviewPhoto4, article: "M", verified: true },
  { author: "Belhacene N.", title: "Perfeito", text: "Perfeito", date: "07/09/2025", stars: 5, image: reviewPhoto5, article: "XL", verified: true },
  { author: "Frederic G.", title: "Corte impecável", text: "Corte impecável e matéria muito agradável de usar", date: "16/08/2025", stars: 5, image: reviewPhoto6, article: "M", verified: true },
  { author: "Marco S.", title: "Qualidade top", text: "Qualidade top, entrega rápida. Recomendo vivamente a todos.", date: "02/08/2025", stars: 5, image: reviewPhoto7, article: "L", verified: true },
  { author: "Hervé A.", title: "Produtos de grande qualidade", text: "Produtos de grande qualidade, consegui beneficiar de um desconto muito interessante. As t-shirts são impecáveis.", date: "15/03/2026", stars: 5, image: reviewPhoto8, article: "Pack 6", verified: true },
  { author: "Fabrice", title: "T-shirt soberba", text: "T-shirt soberba, material muito agradável de vestir e muito bem cortada. Já comprei várias vezes.", date: "15/03/2026", stars: 5, image: reviewPhoto9, article: "M", verified: true },
  { author: "Catherine R.", title: "Excelente produto!", text: "Excelente produto que cumpre promessas!", date: "15/03/2026", stars: 5, image: reviewPhoto10, article: "S", verified: true },
  { author: "Daniel P.", title: "Muito boa qualidade", text: "Mercadoria de muito boa qualidade.", date: "14/03/2026", stars: 5, image: reviewPhoto11, article: "L", verified: true },
  { author: "Renaud W.", title: "Tudo correu na perfeição", text: "Tudo correu na perfeição.", date: "14/03/2026", stars: 5, image: reviewPhoto12, article: "XL", verified: true },
  { author: "Milette", title: "No topo", text: "No topo, como sempre…", date: "14/03/2026", stars: 4, image: reviewPhoto13, article: "M", verified: true },
  { author: "Eric", title: "T-shirt bem cortada", text: "T-shirt bem cortada, material agradável. Prazos de entrega corretos.", date: "13/03/2026", stars: 5, image: reviewPhoto14, article: "2XL", verified: true },
  { author: "Antoine L.", title: "Muito satisfeito", text: "Muito satisfeito com a qualidade e o corte. Material premium que se sente na pele.", date: "10/03/2026", stars: 5, image: reviewPhoto15, article: "M", verified: true },
  { author: "Pierre M.", title: "Recomendo", text: "Comprei 3 packs diferentes, todas as cores são lindas. A qualidade mantém-se lavagem após lavagem.", date: "08/03/2026", stars: 5, image: reviewPhoto16, article: "Pack 3", verified: true },
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
  const { addItem } = useCart();

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
    { id: "pack4", label: "LEVE 9 PAGUE 4", price: `${(product.price * 0.79).toFixed(2).replace(".", ",")} €/unidade`, sublabel: "Entrega grátis", badge: "MAIS VENDIDO" },
    { id: "pack6", label: "LEVE 12 PAGUE 5", price: `${(product.price * 0.69).toFixed(2).replace(".", ",")} €/unidade`, sublabel: "Entrega grátis", badge: "MELHOR PREÇO" },
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
                    onClick={() => {
                      if (opt.id === "custom") {
                        window.dispatchEvent(new Event("open-pack-builder"));
                      } else {
                        setSelectedQuantity(opt.id);
                      }
                    }}
                    className={`relative border px-3 py-3 text-center transition-all duration-200 ${
                      opt.id === "custom"
                        ? "border-foreground bg-foreground text-background"
                        : selectedQuantity === opt.id
                        ? "border-foreground bg-background text-foreground"
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
            <button
              onClick={() => {
                addItem({
                  name: product.name,
                  size: selectedSize,
                  color: selectedColor,
                  unitPrice: product.price,
                  quantity: 1,
                  image: product.cardImage,
                });
              }}
              className="w-full h-14 bg-foreground text-background font-display text-sm font-bold tracking-widest uppercase hover:bg-foreground/90 transition-colors duration-200 flex items-center justify-center gap-2"
            >
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

      {/* Lifestyle Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-xl font-medium text-foreground mb-6">Ele acompanha você</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {lifestyleItems.map((item, i) => (
            <div key={i} className="relative group overflow-hidden rounded-sm">
              <img src={item.image} alt={item.label} className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-8">
                <p className="font-body text-sm text-white">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Pack Section */}
      <CustomPackSection />

      {/* Trustpilot Reviews */}
      <ReviewsSection />

      {/* Big Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            +100.000 homens já carregam Fincut
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={18} fill="#00b67a" className="text-[#00b67a]" />
              ))}
            </div>
            <span className="font-body text-sm font-semibold text-foreground">4.5</span>
            <span className="font-body text-xs text-muted-foreground">| EM 6709 NOTAR</span>
          </div>
        </div>

        {/* Subheader */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map(i => (
                <Star key={i} size={20} fill="#00b67a" className="text-[#00b67a]" />
              ))}
              <Star size={20} fill="#00b67a" className="text-[#00b67a] opacity-40" />
            </div>
            <span className="font-body text-sm text-foreground font-medium">5,325 Avis</span>
          </div>
          <button className="border border-border px-4 py-2 font-body text-sm text-foreground hover:bg-muted transition-colors">
            Escrever um aviso
          </button>
        </div>

        {/* Reviews grid - masonry style */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="break-inside-avoid border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {review.image && (
                <img
                  src={review.image}
                  alt={review.author}
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-body text-sm font-semibold text-foreground">{review.author}</span>
                  {review.verified && (
                    <span className="flex items-center gap-0.5 text-[#00b67a] text-xs">
                      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-[#00b67a]">
                        <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.3 7.7l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L8.6 11l4.3-4.3a1 1 0 0 1 1.4 1.4z" />
                      </svg>
                      Verificado
                    </span>
                  )}
                </div>
                <p className="font-body text-[11px] text-muted-foreground">{review.date}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill={s < review.stars ? "#00b67a" : "#e5e7eb"} className={s < review.stars ? "text-[#00b67a]" : "text-border"} />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">{review.text}</p>
                {review.article && (
                  <div className="pt-2">
                    <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Tipo de artigo:</p>
                    <p className="font-body text-xs text-foreground font-medium">{review.article}</p>
                  </div>
                )}
              </div>
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
