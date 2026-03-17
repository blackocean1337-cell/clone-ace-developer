import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/fincut/CartDrawer";
import { useCart } from "@/context/CartContext";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import TrackOrderPage from "./pages/TrackOrderPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import DeliveryPolicyPage from "./pages/DeliveryPolicyPage.tsx";
import RefundPolicyPage from "./pages/RefundPolicyPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const GlobalCartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity } = useCart();
  return (
    <CartDrawer
      open={isOpen}
      onClose={closeCart}
      items={items}
      onUpdateQuantity={updateQuantity}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/historia" element={<HistoryPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/acompanhar-encomenda" element={<TrackOrderPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/politica-entrega" element={<DeliveryPolicyPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <GlobalCartDrawer />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
