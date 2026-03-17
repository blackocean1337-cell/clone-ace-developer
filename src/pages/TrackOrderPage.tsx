import { useState } from "react";
import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder – no backend
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Acompanhe a sua encomenda
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-12 max-w-lg">
          Acompanhe o seu pacote em tempo real. Introduza o seu número de encomenda e o seu endereço de email para consultar o estado da sua entrega.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-3">
              Número de encomenda
            </label>
            <input
              type="text"
              placeholder="#1001"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full bg-transparent border-b border-border px-0 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-3">
              Endereço de email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border px-0 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-foreground text-background font-display text-sm font-bold tracking-[0.15em] uppercase py-4 hover:opacity-90 transition-opacity"
          >
            SEGUIR
          </button>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
};

export default TrackOrderPage;
