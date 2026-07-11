import { CheckCircle2, ShieldCheck, Truck, Users } from "lucide-react";
import { useSeo } from "../lib/useSeo";

export function AboutPage(): JSX.Element {
  useSeo({
    title: "À propos | VIP AUTO",
    description:
      "VIP AUTO à Dakar, fondée par Malick Sall : pièces auto contrôlées, conseil professionnel et commande simple par WhatsApp.",
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
            Fondée par Malick Sall à Dakar, VIP AUTO propose des pièces auto premium et un accompagnement fiable :
            catalogue clair, compatibilité vérifiée et commande simple.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <img
          className="rounded border border-slate-200 object-cover shadow-sm"
          src="/images/about-counter.webp"
          srcSet="/images/about-counter-sm.webp 500w, /images/about-counter.webp 1000w"
          sizes="(min-width: 1024px) 45vw, 90vw"
          alt="Comptoir de boutique automobile avec pièces préparées pour livraison"
          width="900"
          height="650"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2 className="text-3xl font-black leading-tight text-ink">Notre engagement</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Proposer des pièces contrôlées, un conseil humain et une préparation de commande soignée pour éviter les
            erreurs de compatibilité et vous faire gagner du temps.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "Confiance", text: "Garanties claires, avis clients et stock affiché en toute transparence." },
              { icon: Truck, title: "Livraison", text: "Livraison rapide selon la ville et la disponibilité." },
              { icon: Users, title: "Conseil", text: "Conseil humain avant l'achat, par téléphone ou WhatsApp." },
              { icon: CheckCircle2, title: "Simplicité", text: "Commande simple, paiement à la livraison et prix TTC affichés." },
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
