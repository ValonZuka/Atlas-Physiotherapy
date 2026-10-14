import { createFileRoute } from "@tanstack/react-router";
import { siteContent } from "@/content/siteContent";
import { LangProvider } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Hero, About } from "@/components/site/HeroAbout";
import { Services, Conditions } from "@/components/site/Services";
import { Booking } from "@/components/site/Booking";
import { FloatingWhatsApp } from "@/components/site/Cta";
import { Why, Credentials, FirstVisit, Gallery, Team, Testimonials, Social, Faq, Contact, Footer } from "@/components/site/Sections";

const title = "ATLAS Fizioterapi — Fizioterapi në Viti, Kosovë";
const description = "Fizioterapi, rehabilitim, terapi manuale dhe trajtim me Shockwave në Viti. Rezervoni terminin në WhatsApp ose me telefon: 045 207 056.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physiotherapy",
  name: siteContent.business.name,
  telephone: "+383 45 207 056",
  address: { "@type": "PostalAddress", streetAddress: siteContent.business.address.street, addressLocality: siteContent.business.address.city, addressCountry: "XK" },
  sameAs: [siteContent.socials.instagram.url, siteContent.socials.facebook.url],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "sq_AL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Kalo te përmbajtja</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Conditions />
        <Why />
        <Credentials />
        <FirstVisit />
        <Booking />
        <Gallery />
        <Team />
        <Testimonials />
        <Social />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </LangProvider>
  );
}
