import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Truck, Star, Ruler, Droplets, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";
import { getProductBySlug } from "@/data/products";

const featureIcons = [Ruler, Droplets, Award];

const reviews = [
  { author: "Hervé A.", title: "Produits de grande qualité", text: "Produits de grande qualité, j'ai pu bénéficier d'une ristourne très intéressante. Les t-shirts sont impeccables.", date: "15/03/2026" },
  { author: "Fabrice", title: "Superbe t-Shirt", text: "Superbe t-Shirt, matière très agréable à porter et très bien taillé. J'en ai racheté plusieurs fois.", date: "15/03/2026" },
  { author: "R F", title: "Très bon produit", text: "Très bon produit. Livraison rapide.", date: "15/03/2026" },
  { author: "Catherine R.", title: "Super produit qui tient ses promesses!", text: "Super produit qui tient ses promesses!", date: "15/03/2026" },
  { author: "Daniel P.", title: "Marchandise de très bonne qualité", text: "Marchandise de très bonne qualité.", date: "14/03/2026" },
  { author: "Renaud W.", title: "Tout s'est parfaitement déroulé", text: "Tout s'est parfaitement déroulé.", date: "14/03/2026" },
  { author: "Milette", title: "Au top", text: "Au top, comme dab…", date: "14/03/2026" },
  { author: "Eric", title: "Tee-shirt bien coupé", text: "Tee-shirt bien coupé, matière agréable. Délais de livraison correcte.", date: "13/03/2026" },
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
    { id: "unite", label: "UNITÉ", price: `${product.price} €`, sublabel: null, badge: null },
    { id: "pack2", label: "PACK DE 2", price: `${product.price} €/unité`, sublabel: "Livraison offerte", badge: null },
    { id: "pack3", label: "PACK DE 3", price: `${Math.round(product.price * 0.89)} €/unité`, sublabel: "Livraison offerte", badge: null },
    { id: "pack4", label: "PACK DE 4", price: `${(product.price * 0.79).toFixed(2).replace(".", ",")} €/unité`, sublabel: "Livraison offerte", badge: "MEILLEURE VENTE" },
    { id: "custom", label: "Composez votre pack", price: null, sublabel: "Jusqu'à 18 €/t-shirts", badge: null },
  ];

  const accordionSections = [
    {
      id: "description",
      title: "Description",
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
      title: "Matériaux & Entretien",
      content: (
        <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">Matières & Fabrication :</p>
          <ul className="space-y-1">
            {product.materials.map((m, i) => <li key={i}>• {m}</li>)}
          </ul>
          <p className="font-semibold text-foreground mt-4">Entretien :</p>
          {product.care.map((c, i) => <p key={i}>{c}</p>)}
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Livraison & Retours",
      content: (
        <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
          <p>Les délais de livraison standard à domicile sont de <strong className="text-foreground">2 à 3 jours ouvrés</strong>.</p>
          <p>Pour les livraisons en <strong className="text-foreground">point relais</strong>, les délais sont de <strong className="text-foreground">3 à 5 jours ouvrés</strong>.</p>
          <p>Vous disposez de <strong className="text-foreground">30 jours</strong> après réception pour effectuer un retour ou un échange.</p>
          <p>Les frais de retour sont à la charge du client.</p>
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
          <span className="underline text-foreground">Unité</span>
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
                  <img src={img} alt={`Vue ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-fincut-light overflow-hidden aspect-[3/4]">
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
                    BASÉ SUR 6709 AVIS
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
                Sélectionnez votre quantité :
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
                Choisissez votre couleur : <span className="font-normal">{selectedColor}</span>
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
                Choisissez votre taille :
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
                <button className="h-12 border border-border hover:border-muted-foreground font-body text-xs text-muted-foreground transition-all duration-200 relative col-span-2 sm:col-span-1">
                  <span className="absolute -top-2 right-1 bg-fincut-gold text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 tracking-wider">
                    SIZETECH+
                  </span>
                  Définir ma taille
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button className="w-full h-14 bg-foreground text-background font-display text-sm font-bold tracking-widest uppercase hover:bg-foreground/90 transition-colors duration-200 flex items-center justify-center gap-2">
              AJOUTER AU PANIER
              <span className="text-muted-foreground/60">|</span>
              {product.priceLabel}
            </button>

            {/* Delivery info */}
            <div className="flex items-start gap-3 py-3 border-t border-border">
              <Truck size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="font-body text-xs text-muted-foreground">
                Livraison estimée le <strong className="text-foreground">JEUDI 19 MARS</strong>.
                <br />
                Commandez dans les{" "}
                <span className="text-fincut-gold font-semibold">
                  {countdown.hours}h{String(countdown.minutes).padStart(2, "0")}min
                </span>
                .
              </div>
            </div>

            {/* Accordion */}
            <div className="border-t border-border">
              {accordionSections.map(section => (
                <div key={section.id} className="border-b border-border">
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === section.id ? null : section.id)
                    }
                    className="w-full flex items-center justify-between py-4 font-display text-sm font-semibold text-foreground"
                  >
                    {section.title}
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === section.id ? "rotate-90" : ""
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
                        <div className="pb-4">{section.content}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trustpilot Reviews */}
        <section className="mt-20">
          <div className="text-center mb-8">
            <p className="font-display text-lg font-bold text-foreground mb-1">
              Tailleur de tous les corps pour tous les moments
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">
              Rejoignez des milliers d'hommes qui ont choisi d'adopter Fincut au quotidien pour un style soigné et un confort incomparable.
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
            <span className="font-body text-xs text-muted-foreground">Basé sur 6709 avis</span>
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
      </main>

      <SiteFooter />
    </div>
  );
};

export default ProductPage;
