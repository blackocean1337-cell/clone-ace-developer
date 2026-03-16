import tshirtBlack from "@/assets/tshirt-black.png";
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
  { name: "Noir", hex: "#1a1a1a" },
  { name: "Blanc", hex: "#f5f5f0" },
  { name: "Bleu marine", hex: "#2c3e6b" },
  { name: "Kaki", hex: "#5c6b4e" },
  { name: "Gris", hex: "#9b9b9b" },
  { name: "Rouge", hex: "#c0392b" },
  { name: "Bordeaux", hex: "#6b2d3e" },
  { name: "Bleu ciel", hex: "#8fa8c8" },
  { name: "Saumon", hex: "#d4816b" },
  { name: "Moutarde", hex: "#d4a53c" },
  { name: "Turquoise", hex: "#8fcac0" },
];

const defaultSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const defaultFeatures = [
  "S'adapte à votre morphologie",
  "Doux et respirant pour un confort quotidien",
  "Le T-shirt qui vous met en valeur",
];

const defaultDescription = [
  "L'iconique, perfectionné.",
  "Une coupe ajustée, parfaitement maîtrisée. Il tombe juste, structure la silhouette et s'adapte naturellement à toutes les morphologies.",
  "Il offre une douceur remarquable, une tenue impeccable et une résistance durable. L'étiquette intérieure imprimée remplace les classiques, pour un confort sans la moindre irritation.",
  "Un essentiel absolu. Intemporel. Incontournable.",
];

const defaultMaterials = [
  "72% coton peigné, 28% Sorona®",
  "S'adapte à votre morphologie",
  "Tissu doux, résistant",
  "Étiquette imprimée",
];

const defaultCare = [
  "Nous vous recommandons un lavage à froid et un séchage à plat, ou à basse température en machine.",
  "Un léger rétrécissement d'environ 5% peut survenir au séchage en machine.",
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
    name: "Le t-shirt Iconique",
    price: 28,
    priceLabel: "28 €",
    category: "T-shirt",
    collar: "Col rond",
    badge: "L'ICONIQUE",
    cardImage: tshirtBlack,
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
    name: "Le t-shirt Iconique",
    price: 28,
    priceLabel: "28 €",
    category: "T-shirt",
    collar: "Col rond",
    badge: "L'ICONIQUE",
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
    name: "Le t-shirt Iconique",
    price: 28,
    priceLabel: "28 €",
    category: "T-shirt",
    collar: "Col rond",
    badge: "L'ICONIQUE",
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
    name: "Le t-shirt Iconique",
    price: 28,
    priceLabel: "28 €",
    category: "T-shirt",
    collar: "Col rond",
    badge: "L'ICONIQUE",
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
    name: "Le Polo",
    price: 35,
    priceLabel: "35 €",
    category: "Polo",
    collar: "Col polo",
    badge: "ESSENTIEL",
    cardImage: poloBlack,
    galleryImages: [productBlackFront, productModel1, productBlackBack],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Blanc", hex: "#f5f5f0" },
      { name: "Bleu marine", hex: "#2c3e6b" },
    ],
    sizes: defaultSizes,
    features: [
      "Coupe ajustée et élégante",
      "Tissu piqué doux et respirant",
      "Le polo qui structure votre silhouette",
    ],
    description: [
      "Le polo revisité.",
      "Une coupe ajustée, parfaitement maîtrisée. Le col apporte une touche d'élégance tout en gardant un esprit décontracté.",
      "Tissu piqué de haute qualité, doux au toucher et résistant dans le temps.",
      "Un essentiel pour toutes les occasions.",
    ],
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-col-v",
    name: "Le t-shirt col V",
    price: 28,
    priceLabel: "28 €",
    category: "T-shirt",
    collar: "Col V",
    badge: "ESSENTIEL",
    cardImage: tshirtVneck,
    galleryImages: [productBlackFront, productModel1, productModel2, productBlackBack],
    colors: defaultColors,
    sizes: defaultSizes,
    features: defaultFeatures,
    description: [
      "Le col V iconique.",
      "Une coupe ajustée avec un col en V élégant qui allonge la silhouette et apporte une touche de raffinement.",
      "Même qualité de tissu que notre t-shirt iconique, avec le confort que vous connaissez déjà.",
      "Un basique indispensable.",
    ],
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "t-shirt-manches-longues",
    name: "Le t-shirt Manches Longues",
    price: 35,
    priceLabel: "35 €",
    category: "T-shirt",
    collar: "Col rond",
    badge: "ESSENTIEL",
    cardImage: tshirtLongsleeve,
    galleryImages: [productBlackFront, productModel1, productModel2, productBlackBack],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Blanc", hex: "#f5f5f0" },
      { name: "Bleu marine", hex: "#2c3e6b" },
      { name: "Kaki", hex: "#5c6b4e" },
      { name: "Gris", hex: "#9b9b9b" },
    ],
    sizes: defaultSizes,
    features: [
      "S'adapte à votre morphologie",
      "Doux et respirant pour un confort quotidien",
      "Manches longues pour toutes les saisons",
    ],
    description: [
      "Le manches longues essentiel.",
      "La même coupe ajustée que notre iconique, en version manches longues pour plus de polyvalence.",
      "Parfait pour la mi-saison ou en superposition sous une veste.",
      "Un indispensable toute l'année.",
    ],
    materials: defaultMaterials,
    care: defaultCare,
  },
  {
    slug: "pull",
    name: "Le Pull",
    price: 55,
    priceLabel: "55 €",
    category: "Pull",
    collar: "Col rond",
    badge: "PREMIUM",
    cardImage: pullBlack,
    galleryImages: [productBlackFront, productModel1, productBlackBack],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu marine", hex: "#2c3e6b" },
      { name: "Gris", hex: "#9b9b9b" },
    ],
    sizes: defaultSizes,
    features: [
      "Maille fine et élégante",
      "Chaleur sans volume superflu",
      "Le pull qui accompagne toutes vos tenues",
    ],
    description: [
      "Le pull essentiel.",
      "Une maille fine et serrée qui apporte chaleur et élégance sans volume inutile.",
      "Coupe ajustée fidèle à l'ADN Fincut, pour une silhouette structurée.",
      "Parfait seul ou en superposition.",
    ],
    materials: [
      "50% laine mérinos, 50% acrylique",
      "Maille fine et serrée",
      "Résistant au boulochage",
      "Étiquette imprimée",
    ],
    care: [
      "Lavage à 30°C recommandé. Séchage à plat.",
      "Ne pas repasser directement sur le tissu.",
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

// Products for the Iconique section (4 color variants)
export const iconiqueProducts = products.filter((p) =>
  ["t-shirt-tech", "t-shirt-blanc", "t-shirt-navy", "t-shirt-kaki"].includes(p.slug)
);

// Products for the Vestiaire section
export const vestiaireProducts = products.filter((p) =>
  ["t-shirt-tech", "polo", "t-shirt-col-v", "t-shirt-manches-longues", "pull"].includes(p.slug)
);
