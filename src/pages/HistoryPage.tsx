import SiteHeader from "@/components/fincut/SiteHeader";
import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteFooter from "@/components/fincut/SiteFooter";
import TimelineSection from "@/components/fincut/TimelineSection";
import BrandManifesto from "@/components/fincut/BrandManifesto";

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <div className="pt-12 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-center mb-4">
          A nossa história
        </h1>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto text-lg leading-relaxed">
          Da ideia à revolução têxtil — descubra o percurso da Fincut desde a sua génese até aos dias de hoje.
        </p>
      </div>
      <BrandManifesto />
      <TimelineSection />
      <SiteFooter />
    </div>
  );
};

export default HistoryPage;
