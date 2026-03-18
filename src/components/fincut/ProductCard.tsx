import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  colors?: number;
  darkBg?: boolean;
  slug?: string;
}

const ProductCard = ({ image, name, price, colors, darkBg = true, slug }: ProductCardProps) => {
  const Wrapper = slug ? Link : "a";
  const wrapperProps = slug ? { to: `/products/${slug}` } : { href: "#" };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}>
      
      <Wrapper {...wrapperProps as any} className="group block">
        <div className={`aspect-square overflow-hidden ${darkBg ? 'bg-fincut-charcoal' : 'bg-fincut-light'}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200 bg-background"
            loading="lazy" />
          
        </div>
        <div className="mt-3 space-y-1">
          {colors &&
          <span className="font-body text-[10px] tracking-wider text-fincut-gray uppercase">
              +{colors} cores
            </span>
          }
          <h3 className="font-body text-sm font-medium text-foreground">{name}</h3>
          <p className="font-body text-sm text-muted-foreground">até: {price}</p>
        </div>
      </Wrapper>
    </motion.div>);

};

export default ProductCard;