import { CheckCircle2, ShieldCheck, Truck, Users } from "lucide-react";
import { useSeo } from "../lib/useSeo";

export function AboutPage(): JSX.Element {
  useSeo({
    title: "À propos | VIP AUTO",
    description:
      "Découvrez VIP AUTO à Casablanca, fondée par Malick : pièces contrôlées, conseil humain et expérience e-commerce mobile-first.",
    canonicalPath: "/about",
  });

  return (
    <main>
      <section className="bg-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-normal text-signal">À propos</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-6xl">
            VIP AUTO, une boutique auto pensée pour la confiance.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Fondée par Malick à Casablanca, VIP AUTO réunit les fondamentaux d’une boutique de pièces auto performante :
            catalogue clair, preuve sociale, recherche véhicule et commande simple depuis mobile.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <img
          className="rounded border border-slate-200 object-cover shadow-sm"
          src="/images/about-counter.webp"
          alt="Comptoir de boutique automobile avec pièces préparées pour livraison"
          width="900"
          height="650"
          loading="lazy"
        />
        <div>
          <h2 className="text-3xl font-black leading-tight text-ink">Objectif business</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Transformer une présence locale en canal de vente moderne, capable de recevoir des demandes, rassurer les clients
            et préparer les commandes avec moins d’erreurs de compatibilité.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "Confiance", text: "Garanties, avis, stock et conditions visibles." },
              { icon: Truck, title: "Livraison", text: "Promesse claire selon ville et disponibilité." },
              { icon: Users, title: "Conseil", text: "Support humain avant paiement." },
              { icon: CheckCircle2, title: "Conversion", text: "CTA WhatsApp, panier court et prix TTC." },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="h-7 w-7 text-signal" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-black text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
