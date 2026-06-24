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

        <div className="w-full">
          <object
            type="text/html"
            data="https://www.9-bill.com/index/legal"
            style={{ width: "100%", height: "1200px", border: 0 }}
            aria-label="Intellectual Property Rights"
          >
            <iframe
              src="https://www.9-bill.com/index/legal"
              style={{ width: "100%", height: "1200px", border: 0 }}
              title="Intellectual Property Rights"
            />
          </object>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default IntellectualPropertyPage;
