import { useState } from "react";
import { Activity, ArrowUpRight, Bandage, Bone, Check, Hand, Stethoscope, Waves, Zap, type LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { siteContent, type ServiceIcon } from "@/content/siteContent";
import { useLang, useReveal } from "@/lib/site";
import { Plus } from "lucide-react";
import { CtaButtons, SectionHead } from "./Cta";

const icons: Record<ServiceIcon, LucideIcon> = { stethoscope: Stethoscope, activity: Activity, hand: Hand, waves: Waves, bandage: Bandage, bone: Bone, zap: Zap };

export function Services() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);
  const s = active !== null ? siteContent.services[active] : null;
  return (
    <section id="sherbimet" ref={ref} className="section-y bg-muted/60">
      <div className="container-site">
        <SectionHead eyebrow={t({ sq: "Shërbimet tona", en: "Our services" })} title={t({ sq: "Kujdes i menduar për ju", en: "Care designed around you" })} intro={t({ sq: "Çdo trajtim fillon me vlerësim dhe përshtatet me nevojat, dhimbjen dhe qëllimet tuaja.", en: "Every treatment starts with an assessment and is adapted to your needs, pain and goals." })} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.services.map((sv, i) => {
            const Icon = icons[sv.icon];
            return (
              <li key={sv.title.sq} className="reveal" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <button type="button" onClick={() => setActive(i)} className="card-lift group flex h-full w-full flex-col rounded-3xl border border-border bg-card p-7 text-left shadow-soft">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sage-soft text-accent-foreground"><Icon className="size-6" /></span>
                  <h3 className="mt-6 text-xl font-semibold">{t(sv.title)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{t(sv.copy)}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">{t({ sq: "Lexo më shumë", en: "Read more" })}<ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </button>
              </li>
            );
          })}
          <li className="reveal" style={{ transitionDelay: `${(siteContent.services.length % 3) * 90}ms` }}>
            <a href={`https://wa.me/${siteContent.business.whatsappNumber}?text=${encodeURIComponent(t(siteContent.moreServices.waMessage))}`} target="_blank" rel="noreferrer" className="card-lift group flex h-full w-full flex-col rounded-3xl border border-border bg-card p-7 text-left shadow-soft">
              <span className="grid size-12 place-items-center rounded-2xl bg-sage-soft text-accent-foreground"><Plus className="size-6" /></span>
              <h3 className="mt-6 text-xl font-semibold">{t(siteContent.moreServices.title)}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{t(siteContent.moreServices.copy)}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">WhatsApp<ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </a>
          </li>
        </ul>
      </div>
      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl p-0 sm:max-w-lg">
          {s && (
            <>
              <img src={s.image} alt="" className="aspect-[16/9] w-full rounded-t-3xl object-cover" loading="lazy" />
              <div className="p-6 sm:p-8">
                <DialogTitle className="font-display text-2xl font-semibold">{t(s.title)}</DialogTitle>
                <DialogDescription className="mt-3 text-base leading-7 text-muted-foreground">{t(s.details)}</DialogDescription>
                <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-accent-foreground" />{t({ sq: "Termini caktohet me WhatsApp ose telefon.", en: "Booked via WhatsApp or phone." })}</p>
                <div className="mt-6"><CtaButtons service={t(s.title)} /></div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function Conditions() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <SectionHead eyebrow={t({ sq: "Çfarë trajtojmë", en: "Conditions we treat" })} title={t({ sq: "Problemet më të shpeshta që na sjellin pacientët", en: "The most common reasons patients come to us" })} />
        <ul className="reveal flex flex-wrap gap-3">
          {siteContent.conditions.map((c) => (
            <li key={c.sq} className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold shadow-soft"><span className="mr-2 inline-block size-2 rounded-full bg-sage" />{t(c)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
