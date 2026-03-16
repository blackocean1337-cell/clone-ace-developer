import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vestiaireProducts } from "@/data/products";
import ProductCard from "./ProductCard";

const VestiaireSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return null;






















};

export default VestiaireSection;