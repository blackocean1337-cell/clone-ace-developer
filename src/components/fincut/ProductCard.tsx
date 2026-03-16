import { motion } from "framer-motion";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  colors?: number;
  darkBg?: boolean;
}

const ProductCard = ({ image, name, price, colors, darkBg = true }: ProductCardProps) => {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group block"
    >
      <div className={`aspect-square overflow-hidden ${darkBg ? 'bg-fincut-charcoal' : 'bg-fincut-light'}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      <div className="mt-3 space-y-1">
        {colors && (
          <span className="font-body text-[10px] tracking-wider text-fincut-gray uppercase">
            +{colors} coloris
          </span>
        )}
        <h3 className="font-body text-sm font-medium text-foreground">{name}</h3>
        <p className="font-body text-sm text-muted-foreground">jusqu'à : {price}</p>
      </div>
    </motion.a>
  );
};

export default ProductCard;
