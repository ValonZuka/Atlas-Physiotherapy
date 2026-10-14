import { Phone } from "lucide-react";
import { siteContent, ui } from "@/content/siteContent";
import { useLang, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function CtaButtons({ service, light = false }: { service?: string; light?: boolean }) {
  const { t, lang } = useLang();
  return (
    <div className="flex flex-wrap gap-3">
      <a href={waLink(lang, service)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-brand-deep shadow-soft transition-transform hover:-translate-y-0.5">
        <WhatsAppIcon className="size-5" />{t(ui.bookWa)}
      </a>
      <a href={siteContent.business.phoneHref} className={`inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-semibold transition-colors ${light ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" : "border-border bg-card text-foreground hover:border-primary hover:text-primary"}`}>
        <Phone className="size-4" />{t(ui.call)} · {siteContent.business.phoneDisplay}
      </a>
    </div>
  );
}

export function FloatingWhatsApp() {
  const { t, lang } = useLang();
  return (
    <a href={waLink(lang)} target="_blank" rel="noreferrer" aria-label={t(ui.bookWa)} className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-brand-deep shadow-lift transition-transform hover:scale-105 md:hidden">
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

export function SectionHead({ eyebrow, title, intro, center = false, light = false }: { eyebrow: string; title: string; intro?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${light ? "text-sage" : ""}`}><span className="size-1.5 rounded-full bg-sage" />{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl ${light ? "text-primary-foreground" : ""}`}>{title}</h2>
      {intro && <p className={`mt-5 text-base leading-7 sm:text-lg ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{intro}</p>}
    </div>
  );
}
