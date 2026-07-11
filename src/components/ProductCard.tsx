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

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link to="/products/$productSlug" params={{ productSlug: product.slug }} className="relative block bg-slate-100">
        {discount ? (
          <span className="absolute left-3 top-3 z-10 rounded bg-signal px-2.5 py-1 text-xs font-black text-white">
            -{discount}%
          </span>
        ) : null}
        {product.badge ? (
          <span className="absolute right-3 top-3 z-10 rounded bg-ink px-2.5 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        ) : null}
        <img
          className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          width="640"
          height="480"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-normal text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          {product.stock > 0 ? "En stock" : "Sur commande"}
        </div>
        <h2 className="mt-3 min-h-14 text-base font-black leading-snug text-ink">
          <Link className="transition hover:text-signal" to="/products/$productSlug" params={{ productSlug: product.slug }}>
            {product.name}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>

        <div className="mt-4 flex flex-wrap items-end gap-2">
          <span className="text-xl font-black text-ink">{formatCurrency(product.price, product.currency)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm font-semibold text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice, product.currency)}
            </span>
          ) : null}
          <span className="text-xs font-bold text-slate-500">TTC</span>
        </div>

        <button
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-signal focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2"
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
