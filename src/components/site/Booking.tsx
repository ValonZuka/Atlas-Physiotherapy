import { useEffect, useState } from "react";
import { CheckCheck, ClipboardList, MessageCircle, CalendarCheck } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useLang, useReveal } from "@/lib/site";
import { CtaButtons, SectionHead } from "./Cta";
import { WhatsAppIcon } from "./icons";

const MSG = { sq: "Përshëndetje, dua të rezervoj një termin për Fizioterapi të mërkurën pas orës 16:00.", en: "Hello, I'd like to book a Physiotherapy appointment on Wednesday after 4 pm." };
const REPLY = { sq: "Përshëndetje! Termini juaj është konfirmuar për të mërkurën në 16:30. Ju presim! ✅", en: "Hi! Your appointment is confirmed for Wednesday at 4:30 pm. See you then! ✅" };

/** Looping WhatsApp-style chat. step: 0 typing, 1 sent, 2 reply */
function PhoneDemo() {
  const { t, lang } = useLang();
  const full = t(MSG);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(full.length);
      setPhase(2);
      return;
    }
    let c = 0;
    let timer: number;
    const run = () => {
      setPhase(0); setChars(0); c = 0;
      const type = () => {
        c++; setChars(c);
        if (c < full.length) timer = window.setTimeout(type, 38);
        else timer = window.setTimeout(() => { setPhase(1); timer = window.setTimeout(() => { setPhase(2); timer = window.setTimeout(run, 4200); }, 1400); }, 500);
      };
      timer = window.setTimeout(type, 700);
    };
    run();
    return () => window.clearTimeout(timer);
  }, [full, lang]);

  return (
    <div className="mx-auto w-[280px] rounded-[2.6rem] bg-brand-deep p-3 shadow-lift sm:w-[300px]" aria-hidden="true">
      <div className="overflow-hidden rounded-[2rem] bg-muted">
        <div className="flex items-center gap-3 bg-brand-deep px-4 pb-3 pt-5 text-primary-foreground">
          <span className="grid size-9 place-items-center rounded-full bg-primary-foreground/15 font-bold">+</span>
          <span className="text-sm"><strong className="block">ATLAS Fizioterapi</strong><small className="opacity-70">online</small></span>
        </div>
        <div className="flex h-[340px] flex-col justify-end gap-2 p-3 text-[13px] leading-5">
          {phase >= 1 && (
            <div className="bubble-in ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-sage-soft px-3 py-2 text-foreground shadow-soft">
              {full}
              <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[10px] text-primary">16:02 <CheckCheck className="size-3" /></span>
            </div>
          )}
          {phase === 2 && (
            <div className="bubble-in mr-auto max-w-[85%] rounded-2xl rounded-bl-md bg-card px-3 py-2 text-foreground shadow-soft">{t(REPLY)}</div>
          )}
        </div>
        <div className="flex items-center gap-2 border-t border-border bg-card p-2.5">
          <div className="min-h-9 flex-1 rounded-2xl bg-muted px-3 py-2 text-[12px] leading-4 text-foreground">
            {phase === 0 ? <>{full.slice(0, chars)}<span className="caret">|</span></> : <span className="text-muted-foreground">…</span>}
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-whatsapp text-brand-deep"><WhatsAppIcon className="size-4" /></span>
        </div>
      </div>
    </div>
  );
}

function DecorativeCalendar() {
  return (
    <div className="pointer-events-none absolute -left-4 top-10 hidden w-36 rotate-[-6deg] rounded-2xl bg-card p-3 opacity-90 shadow-lift md:block" aria-hidden="true">
      <div className="mb-2 h-2 w-14 rounded bg-primary/70" />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }).map((_, i) => <span key={i} className={`aspect-square rounded ${i === 16 ? "bg-sage" : "bg-muted"}`} />)}
      </div>
    </div>
  );
}

export function Booking() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  const steps = [
    { icon: ClipboardList, title: { sq: "Zgjidhni shërbimin", en: "Choose your service" }, copy: { sq: "Shikoni shërbimet tona dhe zgjidhni atë që ju nevojitet.", en: "Browse our services and pick the one you need." } },
    { icon: MessageCircle, title: { sq: "Na shkruani në WhatsApp", en: "Message us on WhatsApp" }, copy: { sq: "Na tregoni ditën dhe orën e dëshiruar — ose na telefononi.", en: "Tell us your preferred day and time — or give us a call." } },
    { icon: CalendarCheck, title: { sq: "Merrni konfirmimin", en: "Get confirmation" }, copy: { sq: "Ju konfirmojmë terminin me mesazh. Kaq e thjeshtë.", en: "We confirm your appointment by message. That simple." } },
  ];
  return (
    <section id="rezervo" ref={ref} className="section-y bg-deep text-primary-foreground">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead light eyebrow={t({ sq: "Rezervimi", en: "Booking" })} title={t({ sq: "Si të rezervoni termin", en: "How to book an appointment" })} intro={t({ sq: "Terminet caktohen vetëm përmes WhatsApp ose telefonit. Nuk ka rezervim online — ju përgjigjemi personalisht.", en: "Appointments are arranged only via WhatsApp or phone. There's no online booking — we reply to you personally." })} />
          <ol className="mt-10 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title.sq} className="reveal flex gap-4" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10 text-sage"><s.icon className="size-5" /><span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-sage text-[11px] font-bold text-brand-deep">{i + 1}</span></span>
                <div><h3 className="font-sans text-lg font-semibold">{t(s.title)}</h3><p className="text-sm leading-6 text-primary-foreground/70">{t(s.copy)}</p></div>
              </li>
            ))}
          </ol>
          <div className="reveal mt-10"><CtaButtons light /></div>
        </div>
        <div className="reveal relative">
          <DecorativeCalendar />
          {siteContent.bookingVideoUrl ? (
            <video src={siteContent.bookingVideoUrl} autoPlay muted loop playsInline className="mx-auto w-[300px] rounded-[2.6rem] shadow-lift" />
          ) : (
            <PhoneDemo />
          )}
          <p className="mt-5 text-center text-xs text-primary-foreground/60">{t({ sq: "Shembull ilustrues i një bisede në WhatsApp", en: "Illustrative example of a WhatsApp chat" })}</p>
        </div>
      </div>
    </section>
  );
}
