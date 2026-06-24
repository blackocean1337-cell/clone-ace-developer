import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const IntellectualPropertyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Intellectual Property Rights
        </h1>

        <object
          data="https://www.9-bill.com/index/legal"
          style={{ width: "100%", minHeight: "1200px" }}
        />
      </main>

      <SiteFooter />
    </div>
  );
};

export default IntellectualPropertyPage;
