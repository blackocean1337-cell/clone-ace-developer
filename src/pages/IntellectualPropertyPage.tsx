import AnnouncementBar from "@/components/fincut/AnnouncementBar";
import SiteHeader from "@/components/fincut/SiteHeader";
import SiteFooter from "@/components/fincut/SiteFooter";

const IntellectualPropertyPage = () => {
  const rights = [
    "All content on this website, including text, images, product photographs, logos, graphics, layout, design, icons, videos, software, code, and other materials, is owned by or licensed to MRTUGA and/or BLACKOCEAN LIMITED, unless otherwise stated.",
    "The MRTUGA name, website content, product presentation, and visual identity may not be copied, reproduced, modified, distributed, displayed, published, sold, or used for commercial purposes without prior written authorisation.",
    "Customers may access and use this website only for personal, non-commercial shopping and information purposes. Any unauthorised use of the website content may violate copyright, trademark, and other applicable intellectual property laws.",
    "If you believe that any content on this website infringes your intellectual property rights, please contact us with a clear description of the alleged infringement, proof of ownership, the affected URL or material, and your contact details.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          Intellectual Property Rights
        </h1>

        <div className="space-y-8 font-body text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Ownership of content
            </h2>
            <div className="space-y-4">
              {rights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Reporting infringement
            </h2>
            <p>
              Intellectual property notices should be sent to{" "}
              <a href="mailto:support@mrtuga.com" className="text-foreground underline underline-offset-4">
                support@mrtuga.com
              </a>
              . We will review valid notices and take appropriate action where required.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Company information
            </h2>
            <p className="whitespace-pre-line">
              {`BLACKOCEAN LIMITED\nUnit 1603, 16th Floor, The L. Plaza, 367 - 375 Queen's Road Central, Sheung Wan, Hong Kong\nWebsite: www.mrtuga.com\nEmail: support@mrtuga.com`}
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default IntellectualPropertyPage;
