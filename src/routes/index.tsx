import { createFileRoute } from "@tanstack/react-router";
import { siteContent } from "@/content/siteContent";
import { getRequestOrigin } from "@/lib/origin.functions";
import { LangProvider } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Hero, About } from "@/components/site/HeroAbout";
import { Services, Conditions } from "@/components/site/Services";
import { Booking } from "@/components/site/Booking";
import { FloatingWhatsApp } from "@/components/site/Cta";
import { Why, Credentials, FirstVisit, Gallery, Team, Testimonials, Social, Faq, Contact, Footer } from "@/components/site/Sections";

const title = "ATLAS Fizioterapi — Fizioterapi në Viti, Kosovë";
const description = "Fizioterapi, rehabilitim, terapi manuale dhe trajtim me Shockwave në Viti. Rezervoni terminin në WhatsApp ose me telefon: 045 207 056.";

const dayCodes: Record<string, string> = { "hën": "Mo", "mar": "Tu", "mër": "We", "enj": "Th", "pre": "Fr", "sht": "Sa", "die": "Su" };
/** Builds schema.org openingHours (e.g. "Mo-Sa 08:00-18:00") from siteContent.business.hours. */
function openingHours() {
  return siteContent.business.hours
    .map((h) => {
      const days = h.days.sq.toLowerCase().split(/[–-]/).map((d) => dayCodes[d.trim().slice(0, 3)]).filter(Boolean).join("-");
      return days ? `${days} ${h.time.replace("–", "-")}` : "";
    })
    .filter(Boolean);
}

function buildJsonLd(origin: string) {
  const b = siteContent.business;
  const hours = openingHours();
  return {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    name: b.name,
    url: `${origin}/`,
    image: `${origin}${siteContent.images.hero}`,
    telephone: "+383 45 207 056",
    address: { "@type": "PostalAddress", streetAddress: b.address.street, addressLocality: b.address.city, addressCountry: "XK" },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: b.mapLink,
    ...(hours.length ? { openingHours: hours } : {}),
    sameAs: [siteContent.socials.instagram.url, siteContent.socials.facebook.url],
  };
}

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "";
    const image = `${origin}${siteContent.images.hero}`;
    return {
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
      ...(origin ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(buildJsonLd(origin)) }],
    };
  },
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
