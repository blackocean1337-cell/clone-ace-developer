import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import checkoutLogo from "@/assets/checkout-logo.png";

interface Props {
  embedUrl: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function NyvaEmbedOverlay({ embedUrl, onClose, onSuccess }: Props) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      // Official NYVA event
      if (data.source === "nyva-embed" && data.type === "nyva:checkout:complete") {
        onSuccess?.();
        return;
      }
      const type = (data.type || data.event || "").toString().toLowerCase();
      if (type.includes("success") || type.includes("paid") || type.includes("complete")) {
        onSuccess?.();
      }
      if (type === "close" || type === "cancel") {
        onClose();
      }
    };
    window.addEventListener("message", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("message", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col"
    >
      <div className="border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <img src={checkoutLogo} alt="Mister Tuga" className="h-10 object-contain" />
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Lock size={14} /> PAGAMENTO SEGURO
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#fafafa]">
        <iframe
          src={embedUrl}
          title="NYVA Checkout"
          allow="payment *; clipboard-write"
          className="w-full h-full border-0 block"
        />
      </div>
    </motion.div>
  );
}
