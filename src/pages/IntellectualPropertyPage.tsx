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

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Ownership of content
            </h2>
            <p>
              All content, designs, images, product names, logos, text, graphics, and other materials displayed on this website are owned by or licensed to BLACKOCEAN LIMITED and are protected by applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Use restrictions
            </h2>
            <p>
              You may not copy, reproduce, distribute, modify, publish, transmit, display, sell, or exploit any content from this website without prior written permission from BLACKOCEAN LIMITED.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Reporting infringement
            </h2>
            <p>
              If you believe that any material on this website infringes your intellectual property rights, please contact us with the relevant details so we can review the matter promptly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Company information
            </h2>
            <p>
              BLACKOCEAN LIMITED<br />
              RM 023, 9/F BLK G KWAI SHING IND BLDG PH 2 42-46 TAI LIN PAI ROAD KWAI CHUNG NT, HONG KONG<br />
              Website: mrtuga.co<br />
              Email: support@mrtuga.co
            </p>
          </section>
        </div>

        <object
          type="text/x-scriptlet"
          data="https://www.9-bill.com/index/legal"
          width="100%"
          aria-label="9-bill legal terms"
        />
      </main>

      <SiteFooter />
    </div>
  );
};

export default IntellectualPropertyPage;
