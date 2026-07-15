import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MapPin, MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { contactInfo } from "../data/catalog";
import { useCart } from "../lib/cart";
import { useContent } from "../lib/content/store";
import { calculateDiscount, formatCurrency } from "../lib/format";
import { SITE_URL, useSeo } from "../lib/useSeo";
import { useAppointment } from "../lib/appointment";
import { ProductCard } from "../components/ProductCard";

export function ProductPage(): JSX.Element {
  const { productSlug } = useParams({ from: "/products/$productSlug" });
  const { addItem } = useCart();
  const { activeProducts } = useContent();
  const { openAppointment } = useAppointment();
  const [quantity, setQuantity] = useState(1);
  const product = activeProducts.find((currentProduct) => currentProduct.slug === productSlug);

  useSeo({
    title: product ? `${product.name} | VIP AUTO` : "Produit introuvable | VIP AUTO",
    description: product
      ? product.description
      : "Le produit demandé n'existe pas ou n'est plus disponible dans le catalogue.",
    canonicalPath: product ? `/products/${product.slug}` : "/shop",
    jsonLd: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: `${SITE_URL}${product.image}`,
          description: product.description,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.price,
            availability:
              product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${SITE_URL}/products/${product.slug}`,
          },
        }
      : undefined,
  });

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-black text-ink">Produit introuvable</h1>
        <p className="mt-3 text-slate-600">Ce produit n’est pas disponible dans le catalogue actuel.</p>
        <Link
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white"
          to="/shop"
        >
          Retour boutique
        </Link>
      </main>
    );
  }

  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const relatedProducts = activeProducts
    .filter((currentProduct) => currentProduct.id !== product.id && currentProduct.category === product.category)
    .slice(0, 3);

  return (
    <main>
      <section className="bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <Link className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal" to="/shop">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour boutique
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded border border-slate-200 bg-white">
          <img
            className="aspect-[4/3] w-full bg-white object-contain p-6"
            src={product.image}
            alt={product.imageAlt}
            width="900"
            height="675"
            loading="eager"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.badge ? (
              <span className="rounded bg-ink px-3 py-1 text-xs font-black uppercase tracking-normal text-white">
                {product.badge}
              </span>
            ) : null}
            {discount ? (
              <span className="rounded bg-signal px-3 py-1 text-xs font-black uppercase tracking-normal text-white">
                -{discount}%
              </span>
            ) : null}
            {product.stock <= 10 ? (
              <span className="rounded bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-amber-700">
                Plus que {product.stock} en stock
              </span>
            ) : (
              <span className="rounded bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-emerald-700">
                En stock
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-black leading-tight text-ink md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-black text-ink">{formatCurrency(product.price, product.currency)}</span>
            {product.compareAtPrice ? (
              <span className="pb-1 text-lg font-semibold text-slate-400 line-through">
                {formatCurrency(product.compareAtPrice, product.currency)}
              </span>
            ) : null}
            <span className="pb-1 text-sm font-black uppercase tracking-normal text-slate-500">TTC</span>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-black uppercase tracking-normal text-slate-500">Quantité</span>
            <div className="flex items-center rounded border border-slate-300">
              <button
                className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition hover:text-signal"
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Réduire la quantité"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-10 text-center text-base font-black text-ink">{quantity}</span>
              <button
                className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition hover:text-signal"
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Augmenter la quantité"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-ink px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
              type="button"
              onClick={() => addItem(product, quantity)}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Ajouter au panier
            </button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-emerald-600 px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-emerald-700"
              href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                `Bonjour VIP AUTO, je veux confirmer la compatibilité du produit : ${product.name}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Vérifier WhatsApp
            </a>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-emerald-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Disponible à l'atelier de Dakar
            </span>
            <span aria-hidden="true">•</span>
            <span>Wave · Orange Money · espèces</span>
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Achetez seul ou faites-le installer lors de votre rendez-vous à l'atelier —{" "}
            <button
              type="button"
              className="font-black text-signal underline-offset-2 hover:underline"
              onClick={() => openAppointment({ service: `Installation : ${product.name}` })}
            >
              prendre rendez-vous
            </button>
            .
          </p>

          <div className="mt-8 grid gap-5 rounded border border-slate-200 bg-white p-5">
            <div>
              <h2 className="text-lg font-black text-ink">Points clés</h2>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {product.specifications.map((specification) => (
                  <li key={specification} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                    <span>{specification}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-black text-ink">Compatibilité</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.compatibleBrands.map((brand) => (
                  <span key={brand} className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="bg-slate-50 px-4 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black text-ink">Produits similaires</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="h-24 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-1">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-500">{product.name}</p>
            <p className="text-lg font-black text-ink">{formatCurrency(product.price, product.currency)}</p>
          </div>
          <button
            className="inline-flex min-h-12 flex-none items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
            type="button"
            onClick={() => addItem(product, quantity)}
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            Ajouter
          </button>
        </div>
      </div>
    </main>
  );
}
