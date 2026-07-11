import { Link } from "@tanstack/react-router";
import { ArrowRight, CreditCard, PackageCheck, ShieldCheck, Star, Truck, Wrench } from "lucide-react";
import { categories, guarantees, products, reviews, vehicleBrands } from "../data/catalog";
import { useSeo } from "../lib/useSeo";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/SectionHeader";
import { VehicleFinder } from "../components/VehicleFinder";

const guaranteeIcons = [ShieldCheck, PackageCheck, Truck, CreditCard];

export function HomePage(): JSX.Element {
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 3);
  const featuredProducts = products.filter((product) => product.isFeatured);

  useSeo({
    title: "Atlas Auto Parts | Pièces auto premium avec livraison rapide",
    description:
      "Commandez vos pièces auto, huiles, batteries et produits d'entretien avec compatibilité vérifiée, paiement à la livraison et support WhatsApp.",
    canonicalPath: "/",
  });

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-45"
            src="/images/hero-workshop.webp"
            alt="Atelier automobile premium avec pièces et outils de diagnostic"
            width="1600"
            height="1000"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-center gap-8 px-4 pb-24 pt-16 md:min-h-[680px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded bg-white/10 px-3 py-1 text-sm font-black uppercase tracking-normal text-amber-300">
              Livraison 24h Casablanca · 48h grandes villes
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Pièces auto fiables, références vérifiées, commande rapide.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Une boutique premium pour vendre huiles, batteries, freinage et pièces compatibles avec un parcours simple
              sur mobile.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700"
                to="/shop"
              >
                Voir la boutique
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-white/40 px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-white hover:text-ink"
                href="tel:+212522502573"
              >
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Vérifier une pièce
              </a>
            </div>
          </div>
        </div>
      </section>

      <VehicleFinder />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Meilleures ventes"
            title="Produits prêts à commander"
            description="Une sélection courte pour lancer la boutique, avec prix TTC, stock et compatibilité véhicule."
          />
          <Link className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal" to="/shop">
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

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            eyebrow="Catégories"
            title="Navigation claire pour les clients mobiles"
            description="Les catégories prioritaires accélèrent la décision et limitent les recherches inutiles."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article key={category.id} className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                <img
                  className="aspect-[4/3] w-full object-cover"
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

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader
          eyebrow="Garanties"
          title="Les éléments qui rassurent avant l’achat"
          description="Une boutique de pièces auto doit réduire le risque perçu : compatibilité, livraison, paiement et conseil."
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
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-amber-300">Avis clients</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Preuve sociale intégrée dès le MVP.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Les avis visibles aident à convertir les visiteurs qui commandent depuis mobile et ne connaissent pas encore
              la boutique.
            </p>
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

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Produits exclusifs"
            title="Catalogue extensible"
            description="La structure permet d’ajouter références OEM, variantes, stocks et prix multi-devises."
          />
          <Link className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal" to="/shop">
            Explorer
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4" aria-label="Marques compatibles">
          {vehicleBrands.map((brand) => (
            <span
              key={brand.id}
              className="min-w-fit rounded border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black uppercase tracking-normal text-slate-600"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 rounded border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-signal">Newsletter</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Recevoir les arrivages et promotions.</h2>
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
              className="min-h-12 rounded border border-slate-300 px-4 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              type="email"
              placeholder="votre@email.com"
              required
            />
            <button
              className="inline-flex min-h-12 items-center justify-center rounded bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
              type="submit"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
