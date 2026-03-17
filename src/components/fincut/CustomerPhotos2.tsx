import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import reviewPhoto1 from "@/assets/review-photo-1.png";
import reviewPhoto2 from "@/assets/review-photo-2.png";
import reviewPhoto3 from "@/assets/review-photo-3.png";
import reviewPhoto4 from "@/assets/review-photo-4.png";
import reviewPhoto5 from "@/assets/review-photo-5.png";
import reviewPhoto6 from "@/assets/review-photo-6.webp";
import reviewPhoto7 from "@/assets/review-photo-7.png";

const photos = [
{ image: reviewPhoto1, label: "A camiseta icónica" },
{ image: reviewPhoto2, label: "A camiseta icónica" },
{ image: reviewPhoto3, label: "A camiseta icónica" },
{ image: reviewPhoto4, label: "A camiseta icónica" },
{ image: reviewPhoto5, label: "A camiseta icónica" },
{ image: reviewPhoto6, label: "A camiseta icónica" },
{ image: reviewPhoto7, label: "A camiseta icónica" }];


const CustomerPhotos2 = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return null;
};

export default CustomerPhotos2;