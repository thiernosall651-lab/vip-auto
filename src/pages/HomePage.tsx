import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarCheck, ClipboardCheck, ShieldCheck, Star, Wallet, Wrench } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { categories, guarantees } from "../data/catalog";
import { useContent } from "../lib/content/store";
import { serviceIcons } from "../lib/serviceIcons";
import { useAppointment } from "../lib/appointment";
import { useSeo } from "../lib/useSeo";
import { AppointmentBar } from "../components/AppointmentBar";
import { BrandCarousel } from "../components/BrandCarousel";
import { OilBrandStrip } from "../components/OilBrandStrip";
import { PremiumOilBrands } from "../components/PremiumOilBrands";
import { RecommendedOils } from "../components/RecommendedOils";
import { SectionHeader } from "../components/SectionHeader";

const guaranteeIcons = [ShieldCheck, ClipboardCheck, BadgeCheck, Wallet];
const journeySteps = [
  {
    icon: CalendarCheck,
    step: "1",
    title: "Prenez rendez-vous",
    text: "Choisissez votre service et réservez sur WhatsApp en quelques secondes.",
  },
  {
    icon: ClipboardCheck,
    step: "2",
    title: "Diagnostic & devis",
    text: "Nous inspectons votre véhicule et validons un devis clair avant toute intervention.",
  },
  {
    icon: Wrench,
    step: "3",
    title: "Intervention & paiement",
    text: "Nos mécaniciens réalisent la prestation ; vous payez à l'atelier (espèces, Wave, Orange Money).",
  },
];

export function HomePage(): JSX.Element {
  const { content } = useContent();
  const { openAppointment } = useAppointment();
  const { hero, services, reviews } = content;
  const averageRating = (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const heroImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (heroImageRef.current) {
      heroImageRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
  }

  useSeo({
    title: "Vidange & entretien auto à Dakar | VIP AUTO",
    description:
      "VIP AUTO, centre d'entretien auto à Dakar depuis 2020 : vidange (Castrol, Valvoline, Shell Helix, TotalEnergies), freinage, plaquettes, filtres, batterie, climatisation et diagnostic moteur. Rendez-vous sur WhatsApp.",
    canonicalPath: "/",
  });

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img
            ref={heroImageRef}
            className="h-full w-full object-cover opacity-45"
            src={hero.image}
            alt="Mécanicien VIP Auto en intervention sur un moteur au capot ouvert dans l'atelier de Dakar"
            width="1600"
            height="1000"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-center gap-8 px-4 pb-24 pt-16 md:min-h-[680px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded bg-white/10 px-3 py-1 text-sm font-black uppercase tracking-normal text-amber-300">
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 active:scale-[0.98]"
                onClick={() => openAppointment()}
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {hero.primaryCtaLabel}
              </button>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-white/40 px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-white hover:text-ink"
                to="/services"
              >
                <Wrench className="h-4 w-4" aria-hidden="true" />
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AppointmentBar />

      <section id="services" className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Nos services"
            title="L'entretien complet de votre véhicule"
            description="De la vidange au diagnostic, nous prenons soin de votre voiture — avec un devis clair avant chaque intervention."
          />
          <Link
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal"
            to="/services"
          >
            Tous les services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.id] ?? Wrench;

            return (
              <article
                key={service.id}
                className="flex h-full flex-col rounded border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <Icon className="h-8 w-8 text-signal" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal transition hover:text-red-700"
                  onClick={() => openAppointment({ service: service.name })}
                >
                  Prendre rendez-vous
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            eyebrow="Nos engagements"
            title="Pourquoi choisir VIP AUTO"
            description="Un atelier de confiance à Dakar : mécaniciens qualifiés, devis transparent, pièces de qualité et paiement à l'atelier."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((guarantee, index) => {
              const Icon = guaranteeIcons[index] ?? ShieldCheck;

              return (
                <article key={guarantee.title} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="h-8 w-8 text-signal" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black text-ink">{guarantee.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guarantee.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader
          eyebrow="Comment ça marche"
          title="Votre rendez-vous en 3 étapes"
          description="Un parcours simple, du rendez-vous au paiement à l'atelier."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {journeySteps.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.step}
                className="relative overflow-hidden rounded border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-4 top-2 text-5xl font-black text-slate-100">{item.step}</span>
                <Icon className="h-8 w-8 text-signal" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-amber-300">Avis clients</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Ils nous font confiance.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Des automobilistes à Dakar et dans tout le Sénégal confient l'entretien de leur véhicule à VIP AUTO, avec
              un suivi personnalisé sur WhatsApp.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-1 text-amber-300" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-bold text-white">
                {averageRating}/5 · {reviews.length} avis clients
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded border border-white/10 bg-white/5 p-5">
                <div className="flex gap-1 text-amber-300" aria-label={`${review.rating} étoiles sur 5`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-200">“{review.quote}”</p>
                <p className="mt-4 text-sm font-black text-white">{review.name}</p>
                <p className="text-xs font-semibold uppercase tracking-normal text-slate-400">{review.city}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Boutique"
              title="Les pièces que nous utilisons à l'atelier"
              description="Huiles, filtres et pièces sélectionnés pour leur fiabilité, disponibles à l'achat et installés lors de votre rendez-vous."
            />
            <Link
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal"
              to="/shop"
            >
              Voir la boutique
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article key={category.id} className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                <img
                  className="aspect-[4/3] w-full bg-white object-contain p-4"
                  src={category.image}
                  alt={category.imageAlt}
                  loading="lazy"
                  width="500"
                  height="375"
                />
                <div className="p-4">
                  <h3 className="text-lg font-black text-ink">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                  <Link
                    className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal"
                    to="/shop"
                    search={{ category: category.id }}
                  >
                    Voir plus
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecommendedOils />

      <PremiumOilBrands />

      <OilBrandStrip />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded border border-slate-200 bg-ink px-6 py-10 text-center text-white md:px-10 md:py-14">
          <h2 className="text-2xl font-black md:text-4xl">Votre voiture a besoin d'un entretien ?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-300">
            Prenez rendez-vous dès aujourd'hui. Nous confirmons le créneau et le devis sur WhatsApp.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 active:scale-[0.98]"
              onClick={() => openAppointment()}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Prendre rendez-vous
            </button>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-white/40 px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-white hover:text-ink"
              to="/services"
            >
              Voir nos services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-10">
        <p className="px-4 text-center text-sm font-black uppercase tracking-normal text-slate-500">
          Nous entretenons toutes les marques à Dakar
        </p>
        <p className="mx-auto mt-2 max-w-3xl px-4 text-center text-sm leading-6 text-slate-400">
          Toyota, Hyundai, Kia, Nissan, Mercedes-Benz, Renault, Peugeot, Mitsubishi, Volkswagen et Ford — les
          véhicules les plus courants au Sénégal comme les autres marques essence et diesel.
        </p>
        <div className="mt-5">
          <BrandCarousel />
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 rounded border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-signal">Newsletter</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Conseils d'entretien et offres.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Recevez nos conseils d'entretien et nos offres directement par email.
            </p>
          </div>
          {newsletterSubmitted ? (
            <p className="inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              Merci ! Votre inscription est bien enregistrée.
            </p>
          ) : (
            <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleNewsletterSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                className="min-h-12 rounded border border-slate-300 px-4 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                type="email"
                placeholder="votre@email.com"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                required
              />
              <button
                className="inline-flex min-h-12 items-center justify-center rounded bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
                type="submit"
              >
                S’inscrire
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
