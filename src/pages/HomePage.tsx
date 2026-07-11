import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CreditCard,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { categories, contactInfo, guarantees, products, reviews } from "../data/catalog";
import { useSeo } from "../lib/useSeo";
import { BrandShowcase } from "../components/BrandShowcase";
import { CatalogShowcase } from "../components/CatalogShowcase";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/SectionHeader";
import { VehicleFinder } from "../components/VehicleFinder";

const guaranteeIcons = [ShieldCheck, PackageCheck, Truck, CreditCard];
const phoneHref = `tel:${contactInfo.phone.replace(/\s/g, "")}`;
const whatsappHref = `https://wa.me/${contactInfo.whatsapp}`;

const heroStats = [
  { value: "23+", label: "Familles de pièces" },
  { value: "24h", label: "Livraison Casablanca" },
  { value: "100%", label: "Compatibilité vérifiée" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Compatibilité vérifiée" },
  { icon: Truck, label: "Livraison rapide" },
  { icon: CreditCard, label: "Paiement à la livraison" },
];

export function HomePage(): JSX.Element {
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 3);
  const featuredProducts = products.filter((product) => product.isFeatured);

  useSeo({
    title: "VIP AUTO | Pièces auto premium & entretien à Casablanca",
    description:
      "VIP AUTO à Casablanca : pièces auto premium, huiles, freinage, batteries, éclairage et services mécaniques. Compatibilité vérifiée, paiement à la livraison et conseil WhatsApp.",
    canonicalPath: "/",
  });

  return (
    <main className="bg-white">
      {/* ============================ HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        {/* Soft gradient accents — decorative only, behind content, never over text */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950" />
          <div className="absolute right-[-15%] top-[-10%] h-[420px] w-[420px] rounded-full bg-signal/20 blur-[130px]" />
          <div className="absolute bottom-[-25%] left-[-10%] h-[360px] w-[360px] rounded-full bg-signal/10 blur-[130px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 lg:grid-cols-2 lg:items-stretch lg:gap-14 lg:px-8 lg:pb-32 lg:pt-24">
          {/* Left column — content */}
          <div className="flex animate-fade-up flex-col lg:justify-center">
            <img
              className="h-11 w-auto self-start drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] sm:h-14 lg:h-16"
              src="/images/logo-vip.png"
              alt="Logo VIP AUTO"
              width="220"
              height="80"
              loading="eager"
            />

            <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-neutral-200 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              Casablanca, Maroc · Livraison 24h
            </span>

            <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
              L'excellence automobile, <span className="text-signal">pièce par pièce.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
              Pièces d'origine, huiles premium, freinage, batteries, éclairage et services mécaniques. VIP AUTO vérifie
              chaque référence avant expédition.
            </p>

            {/* CTA buttons — full width on mobile, inline from sm */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white shadow-[0_16px_40px_-12px_rgba(220,38,38,0.6)] transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:w-auto"
                to="/shop"
              >
                Découvrir la boutique
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:w-auto"
                href={whatsappHref}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-white hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:w-auto"
                href={phoneHref}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Appeler
              </a>
            </div>

            {/* Trust badges */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-300 sm:gap-x-6 sm:text-sm">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <li key={badge.label} className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 flex-none text-signal" aria-hidden="true" />
                    {badge.label}
                  </li>
                );
              })}
            </ul>

            {/* Statistics — below the buttons */}
            <dl className="mt-7 grid grid-cols-3 gap-2.5 sm:max-w-lg sm:gap-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-2.5 py-3.5 text-center sm:px-3 sm:py-4 sm:text-left"
                >
                  <dt className="text-xl font-black text-white sm:text-3xl">{stat.value}</dt>
                  <dd className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-wide text-neutral-400 sm:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column — hero image with small floating info cards */}
          <div className="relative w-full animate-fade-in lg:h-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50 sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <img
                className="h-full w-full object-cover"
                src="/images/hero-workshop.webp"
                alt="Showroom automobile VIP AUTO avec véhicule premium sous éclairage d'atelier"
                width="1600"
                height="1200"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/20" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>

            {/* Floating rating card — large screens only to avoid any mobile overlap */}
            <div className="absolute right-4 top-4 hidden items-center gap-3 rounded-2xl border border-white/15 bg-neutral-950/70 px-4 py-3 backdrop-blur-md lg:flex">
              <span className="text-2xl font-black text-white">4.9</span>
              <div>
                <div className="flex gap-0.5 text-amber" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-200">Avis clients</span>
              </div>
            </div>

            {/* Floating delivery card — overhangs into the column gutter, large screens only */}
            <div className="absolute bottom-6 left-4 hidden items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-neutral-900 shadow-xl lg:-left-6 lg:flex">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                <Truck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-black leading-none">Livraison 24h</p>
                <p className="mt-1 text-xs font-semibold text-steel">Casablanca &amp; grandes villes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VEHICLE FINDER ===================== */}
      <VehicleFinder />

      {/* ===================== BEST SELLERS ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Meilleures ventes"
            title="Produits prêts à commander"
            description="Une sélection courte avec prix TTC, stock et compatibilité véhicule pour passer commande sans hésiter."
          />
          <Link
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal"
            to="/shop"
          >
            Tous les produits
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===================== UNIVERS (image categories) ===================== */}
      <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Univers"
            title="Navigation claire pour les clients mobiles"
            description="Les univers prioritaires accélèrent la décision et limitent les recherches inutiles."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <article
                key={category.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <img
                  className="aspect-[4/3] w-full object-cover"
                  src={category.image}
                  alt={category.imageAlt}
                  loading="lazy"
                  width="500"
                  height="375"
                />
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-black text-ink">{category.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{category.description}</p>
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

      {/* ===================== FULL CATALOG ===================== */}
      <CatalogShowcase />

      {/* ===================== WHY VIP AUTO ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <SectionHeader
          eyebrow="Pourquoi VIP AUTO"
          title="Pourquoi choisir VIP AUTO ?"
          description="Une boutique de pièces auto doit réduire le risque perçu : compatibilité, livraison, paiement et conseil professionnel."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((guarantee, index) => {
            const Icon = guaranteeIcons[index] ?? ShieldCheck;

            return (
              <article
                key={guarantee.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10 text-signal">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black text-ink">{guarantee.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{guarantee.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===================== REVIEWS ===================== */}
      <section className="bg-ink py-14 text-white sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-signal">Avis clients</p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight md:text-4xl">
              La confiance de nos clients au quotidien.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Les avis visibles aident à convertir les visiteurs qui commandent depuis mobile et découvrent VIP AUTO.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex gap-1 text-amber" aria-label={`${review.rating} étoiles sur 5`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-200">“{review.quote}”</p>
                <p className="mt-4 text-sm font-black text-white">{review.name}</p>
                <p className="text-xs font-semibold uppercase tracking-normal text-neutral-400">{review.city}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS ===================== */}
      <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Produits en vedette"
              title="Catalogue extensible"
              description="La structure permet d'ajouter références OEM, variantes, stocks et prix multi-devises."
            />
            <Link
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal"
              to="/shop"
            >
              Explorer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BRANDS ===================== */}
      <BrandShowcase />

      {/* ===================== NEWSLETTER ===================== */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-signal">Newsletter</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Recevoir les arrivages et promotions VIP AUTO.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Un bloc prêt à connecter à Brevo, Mailchimp ou une automation maison.
            </p>
          </div>
          <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="sr-only" htmlFor="newsletter-email">
              Adresse email
            </label>
            <input
              id="newsletter-email"
              className="min-h-12 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              type="email"
              placeholder="votre@email.com"
              required
            />
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
              type="submit"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
