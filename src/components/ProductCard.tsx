import { Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useCart } from "../lib/cart";
import { calculateDiscount, formatCurrency } from "../lib/format";
import type { Product } from "../types/catalog";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const { addItem } = useCart();
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const imageSmall = product.image.replace(/\.webp$/, "-sm.webp");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-transparent transition duration-300 hover:-translate-y-1 hover:border-signal/30 hover:shadow-soft">
      <Link
        to="/products/$productSlug"
        params={{ productSlug: product.slug }}
        className="relative block overflow-hidden bg-neutral-950"
      >
        {discount ? (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-signal px-2.5 py-1 text-xs font-black text-white shadow-lg shadow-signal/30">
            -{discount}%
          </span>
        ) : null}
        {product.badge ? (
          <span className="absolute right-3 top-3 z-10 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-ink shadow-sm ring-1 ring-black/5 backdrop-blur">
            {product.badge}
          </span>
        ) : null}
        <img
          className="aspect-[4/3] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
          src={product.image}
          srcSet={`${imageSmall} 450w, ${product.image} 900w`}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          width="900"
          height="675"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden="true"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          {product.stock > 0 ? "En stock" : "Sur commande"}
        </div>
        <h3 className="mt-3 min-h-14 text-base font-black leading-snug text-ink">
          <Link
            className="transition hover:text-signal"
            to="/products/$productSlug"
            params={{ productSlug: product.slug }}
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>

        <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="text-2xl font-black tracking-tight text-ink">
            {formatCurrency(product.price, product.currency)}
          </span>
          {product.compareAtPrice ? (
            <span className="pb-0.5 text-sm font-semibold text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice, product.currency)}
            </span>
          ) : null}
          <span className="pb-0.5 text-xs font-bold uppercase tracking-wide text-slate-400">TTC</span>
        </div>

        <button
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-black uppercase tracking-wide text-white transition duration-300 hover:bg-signal hover:shadow-lg hover:shadow-signal/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
          type="button"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
