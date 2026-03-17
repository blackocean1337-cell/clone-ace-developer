const tshirtBlack = "/lovable-uploads/dd6d21cb-9655-4120-bc20-560351fcf99d.png";
import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtKaki from "@/assets/tshirt-kaki.png";
import poloBlack from "@/assets/polo-black.png";
import tshirtVneck from "@/assets/tshirt-vneck.png";
import tshirtLongsleeve from "@/assets/tshirt-longsleeve.png";
import pullBlack from "@/assets/pull-black.png";

import productBlackFront from "@/assets/product-black-front.jpg";
import productModel1 from "@/assets/product-model-1.jpg";
import productWhiteBack from "@/assets/product-white-back.jpg";
import productModel2 from "@/assets/product-model-2.jpg";
import productBlackBack from "@/assets/product-black-back.jpg";
import productNavy from "@/assets/product-navy.jpg";
import productKaki from "@/assets/product-kaki.jpg";
import productWhiteFront from "@/assets/product-white-front.png";

export interface Product {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  category: string;
  collar: string;
  badge: string;
  cardImage: string;
  galleryImages: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  description: string[];
  materials: string[];
  care: string[];
}

const defaultColors = [
  { name: "Preto", hex: "#1a1a1a" },
  { name: "Branco", hex: "#f5f5f0" },
  { name: "Azul marinho", hex: "#2c3e6b" },
  { name: "Caqui", hex: "#5c6b4e" },
  { name: "Cinzento", hex: "#9b9b9b" },
  { name: "Vermelho", hex: "#c0392b" },
  { name: "Bordô", hex: "#6b2d3e" },
  { name: "Azul claro", hex: "#8fa8c8" },
  { name: "Salmão", hex: "#d4816b" },
  { name: "Mostarda", hex: "#d4a53c" },
  { name: "Turquesa", hex: "#8fcac0" },
];

const defaultSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const defaultFeatures = [
  "Adapta-se à sua morfologia",
  "Suave e respirável para o conforto diário",
  "A T-shirt que o valoriza",
];

const defaultDescription = [
  "O icónico, aperfeiçoado.",
  "Um corte ajustado, perfeitamente dominado. Cai na perfeição, estrutura a silhueta e adapta-se naturalmente a todas as morfologias.",
  "Oferece uma suavidade notável, um aspeto impecável e uma resistência duradoura. A etiqueta interior impressa substitui as clássicas, para um conforto sem qualquer irritação.",
  "Um essencial absoluto. Intemporal. Indispensável.",
];

const defaultMaterials = [
  "72% algodão penteado, 28% Sorona®",
  "Adapta-se à sua morfologia",
  "Tecido suave, resistente",
  "Etiqueta impressa",
];

const defaultCare = [
  "Recomendamos uma lavagem a frio e secagem ao ar, ou a baixa temperatura na máquina.",
  "Um ligeiro encolhimento de cerca de 5% pode ocorrer na secagem em máquina.",
];

const defaultGallery = [
  productBlackFront,
  productModel1,
  productWhiteBack,
  productModel2,
  productBlackBack,
  productNavy,
  productKaki,
  productWhiteFront,
];

export const products: Product[] = [
  {
    slug: "t-shirt-tech",
    name: "A t-shirt Icónica.",
    price: 18,
    priceLabel: "18 €",
    category: "T-shirt",
    collar: "Gola redonda",
    badge: "ICÓNICA",
    cardImage: "/lovable-uploads/dd6d21cb-9655-4120-bc20-560351fcf99d.png",
    galleryImages: defaultGallery,
    colors: defaultColors,
    sizes: defaultSizes,
    features: defaultFeatures,
    description: defaultDescription,
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-blanc",
    name: "A t-shirt Icónica.",
    price: 18,
    priceLabel: "18 €",
    category: "T-shirt",
    collar: "Gola redonda",
    badge: "ICÓNICA",
    cardImage: tshirtWhite,
    galleryImages: [productWhiteFront, productWhiteBack, productModel1, productModel2],
    colors: defaultColors,
    sizes: defaultSizes,
    features: defaultFeatures,
    description: defaultDescription,
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-navy",
    name: "A t-shirt Icónica.",
    price: 18,
    priceLabel: "18 €",
    category: "T-shirt",
    collar: "Gola redonda",
    badge: "ICÓNICA",
    cardImage: tshirtNavy,
    galleryImages: [productNavy, productModel1, productModel2, productBlackBack],
    colors: defaultColors,
    sizes: defaultSizes,
    features: defaultFeatures,
    description: defaultDescription,
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-kaki",
    name: "A t-shirt Icónica.",
    price: 18,
    priceLabel: "18 €",
    category: "T-shirt",
    collar: "Gola redonda",
    badge: "ICÓNICA",
    cardImage: tshirtKaki,
    galleryImages: [productKaki, productModel1, productModel2, productBlackBack],
    colors: defaultColors,
    sizes: defaultSizes,
    features: defaultFeatures,
    description: defaultDescription,
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "polo",
    name: "O Polo",
    price: 35,
    priceLabel: "35 €",
    category: "Polo",
    collar: "Gola polo",
    badge: "ESSENCIAL",
    cardImage: poloBlack,
    galleryImages: [productBlackFront, productModel1, productBlackBack],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#f5f5f0" },
      { name: "Azul marinho", hex: "#2c3e6b" },
    ],
    sizes: defaultSizes,
    features: [
      "Corte ajustado e elegante",
      "Tecido piqué suave e respirável",
      "O polo que estrutura a sua silhueta",
    ],
    description: [
      "O polo reinventado.",
      "Um corte ajustado, perfeitamente dominado. A gola traz um toque de elegância mantendo um espírito descontraído.",
      "Tecido piqué de alta qualidade, suave ao toque e resistente ao longo do tempo.",
      "Um essencial para todas as ocasiões.",
    ],
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-col-v",
    name: "A t-shirt gola V",
    price: 18,
    priceLabel: "18 €",
    category: "T-shirt",
    collar: "Gola V",
    badge: "ESSENCIAL",
    cardImage: tshirtVneck,
    galleryImages: [productBlackFront, productModel1, productModel2, productBlackBack],
    colors: defaultColors,
    sizes: defaultSizes,
    features: defaultFeatures,
    description: [
      "A gola V icónica.",
      "Um corte ajustado com uma gola em V elegante que alonga a silhueta e traz um toque de requinte.",
      "A mesma qualidade de tecido da nossa t-shirt icónica, com o conforto que já conhece.",
      "Um básico indispensável.",
    ],
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-manches-longues",
    name: "A t-shirt Manga Comprida",
    price: 35,
    priceLabel: "35 €",
    category: "T-shirt",
    collar: "Gola redonda",
    badge: "ESSENCIAL",
    cardImage: tshirtLongsleeve,
    galleryImages: [productBlackFront, productModel1, productModel2, productBlackBack],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#f5f5f0" },
      { name: "Azul marinho", hex: "#2c3e6b" },
      { name: "Caqui", hex: "#5c6b4e" },
      { name: "Cinzento", hex: "#9b9b9b" },
    ],
    sizes: defaultSizes,
    features: [
      "Adapta-se à sua morfologia",
      "Suave e respirável para o conforto diário",
      "Manga comprida para todas as estações",
    ],
    description: [
      "A manga comprida essencial.",
      "O mesmo corte ajustado da nossa icónica, em versão manga comprida para mais versatilidade.",
      "Perfeita para a meia-estação ou para usar por baixo de um casaco.",
      "Um indispensável durante todo o ano.",
    ],
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "pull",
    name: "A Camisola",
    price: 55,
    priceLabel: "55 €",
    category: "Camisola",
    collar: "Gola redonda",
    badge: "PREMIUM",
    cardImage: pullBlack,
    galleryImages: [productBlackFront, productModel1, productBlackBack],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul marinho", hex: "#2c3e6b" },
      { name: "Cinzento", hex: "#9b9b9b" },
    ],
    sizes: defaultSizes,
    features: [
      "Malha fina e elegante",
      "Calor sem volume supérfluo",
      "A camisola que acompanha todos os seus looks",
    ],
    description: [
      "A camisola essencial.",
      "Uma malha fina e cerrada que traz calor e elegância sem volume desnecessário.",
      "Corte ajustado fiel ao ADN MRTUGA, para uma silhueta estruturada.",
      "Perfeita sozinha ou em camadas.",
    ],
    materials: [
      "50% lã merino, 50% acrílico",
      "Malha fina e cerrada",
      "Resistente ao borboto",
      "Etiqueta impressa",
    ],
    care: [
      "Lavagem a 30°C recomendada. Secagem ao ar.",
      "Não passar a ferro diretamente sobre o tecido.",
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const iconiqueProducts = products.filter((p) =>
  ["t-shirt-tech", "t-shirt-blanc", "t-shirt-navy", "t-shirt-kaki"].includes(p.slug)
);

export const vestiaireProducts = products.filter((p) =>
  ["t-shirt-tech", "polo", "t-shirt-col-v", "t-shirt-manches-longues", "pull"].includes(p.slug)
);
