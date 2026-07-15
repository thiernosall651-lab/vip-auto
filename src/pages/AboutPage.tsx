import { CalendarCheck, Car, ClipboardCheck, Wrench } from "lucide-react";
import { useAppointment } from "../lib/appointment";
import { useSeo } from "../lib/useSeo";

const values = [
  { icon: CalendarCheck, title: "Depuis 2020", text: "Un atelier de confiance installé à Dakar depuis plus de quatre ans." },
  { icon: Wrench, title: "Mécaniciens qualifiés", text: "Une équipe expérimentée pour l'entretien de toutes les marques." },
  { icon: ClipboardCheck, title: "Devis transparent", text: "Un prix clair et validé avec vous avant toute intervention." },
  { icon: Car, title: "Toutes marques", text: "Nous entretenons les véhicules essence et diesel, toutes marques confondues." },
];

export function AboutPage(): JSX.Element {
  const { openAppointment } = useAppointment();

  useSeo({
    title: "À propos | VIP AUTO Dakar",
    description:
      "VIP AUTO, centre d'entretien automobile fondé par Malik à Dakar en 2020 : mécaniciens qualifiés, devis transparent et travail soigné.",
    canonicalPath: "/about",
  });

  return (
    <main>
      <section className="bg-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-normal text-amber-300">À propos</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            Le garage de confiance des automobilistes dakarois.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Fondé par Malik en 2020 à Dakar, VIP AUTO est un centre d'entretien automobile de proximité. Notre équipe
            prend soin de votre véhicule avec sérieux, transparence et le sens du détail.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <img
          className="rounded border border-slate-200 object-cover shadow-sm"
          src="/images/mali-auto.webp"
          alt="Mécanicien VIP AUTO réalisant une vidange d'huile moteur dans l'atelier de Dakar"
          width="900"
          height="650"
          loading="lazy"
        />
        <div>
          <h2 className="text-3xl font-black leading-tight text-ink">Notre histoire</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            VIP AUTO est né de la volonté de Malik d'offrir aux Dakarois un entretien automobile fiable et honnête.
            Depuis 2020, notre atelier de Liberté 6, à Dakar, accompagne particuliers et professionnels pour la
            vidange, le freinage, les filtres, le diagnostic et les petites réparations mécaniques.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Notre mission est simple : garder votre voiture en bon état, avec un devis clair avant chaque intervention
            et des pièces de qualité. Pas de mauvaise surprise, juste un travail bien fait.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 active:scale-[0.98]"
            onClick={() => openAppointment()}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre rendez-vous
          </button>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((item) => {
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
