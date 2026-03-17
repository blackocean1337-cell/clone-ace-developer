import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import HeroSection from "@/components/fincut/HeroSection";
import IconiqueSection from "@/components/fincut/IconiqueSection";
import IconiqueSection2 from "@/components/fincut/IconiqueSection2";
import VestiaireSection from "@/components/fincut/VestiaireSection";
import PackSection from "@/components/fincut/PackSection";
import CustomPackSection from "@/components/fincut/CustomPackSection";
import CustomerPhotos from "@/components/fincut/CustomerPhotos";
import CustomerPhotos2 from "@/components/fincut/CustomerPhotos2";
import ReviewsSection from "@/components/fincut/ReviewsSection";
import TimelineSection from "@/components/fincut/TimelineSection";
import SiteFooter from "@/components/fincut/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <HeroSection />
      <IconiqueSection2 />
      <IconiqueSection />
      <CustomPackSection />
      <CustomerPhotos />
      <VestiaireSection />
      <PackSection />
      <CustomerPhotos2 />
      <ReviewsSection />
      <TimelineSection />
      <SiteFooter />
    </div>
  );
};

export default Index;
