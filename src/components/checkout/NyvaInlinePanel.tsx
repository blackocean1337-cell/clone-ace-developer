import { useEffect } from "react";
import { Lock } from "lucide-react";

interface Props {
  embedUrl: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NyvaInlinePanel({ embedUrl, onSuccess, onCancel }: Props) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.source === "nyva-embed" && data.type === "nyva:checkout:complete") {
        onSuccess?.();
        return;
      }
      const type = (data.type || data.event || "").toString().toLowerCase();
      if (type.includes("success") || type.includes("paid") || type.includes("complete")) {
        onSuccess?.();
      }
      if (type === "close" || type === "cancel") {
        onCancel?.();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onSuccess, onCancel]);

  return (
    <div className="mt-3 rounded-lg border border-muted bg-[#fafafa] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-white border-b text-[11px] font-semibold text-muted-foreground">
        <Lock size={12} /> PAGAMENTO SEGURO
      </div>
      <iframe
        src={embedUrl}
        title="NYVA Checkout"
        allow="payment *; fullscreen *; publickey-credentials-get *; clipboard-write"
        className="w-full border-0 block bg-white"
        style={{ minHeight: 620 }}
      />
    </div>
  );
}
