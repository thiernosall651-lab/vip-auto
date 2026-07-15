import { Link } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2, Wrench } from "lucide-react";
import { useAppointment } from "../lib/appointment";
import { useContent } from "../lib/content/store";
import { serviceIcons } from "../lib/serviceIcons";
import { useSeo } from "../lib/useSeo";

export function ServicesPage(): JSX.Element {
  const { content } = useContent();
  const { openAppointment } = useAppointment();

  useSeo({
    title: "Services d'entretien & réparation auto à Dakar | VIP AUTO",
    description:
      "Vidange, plaquettes et freinage, filtres, batterie, climatisation, diagnostic moteur et réparations mécaniques légères à Dakar. Prenez rendez-vous sur WhatsApp chez VIP AUTO.",
    canonicalPath: "/services",
  });

  return (
    <main>
      <section className="bg-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-normal text-amber-300">Nos services</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            L'entretien complet de votre voiture, à Dakar.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Un atelier où des mécaniciens qualifiés prennent soin de votre véhicule : vidange, freinage, filtres,
            batterie, suspension, diagnostic et petites réparations — avec un devis clair avant chaque intervention.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 active:scale-[0.98]"
            onClick={() => openAppointment()}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre rendez-vous
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => {
            const Icon = serviceIcons[service.id] ?? Wrench;

            return (
              <article
                key={service.id}
                className="flex h-full flex-col rounded border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <Icon className="h-9 w-9 text-signal" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-black text-ink">{service.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                <ul className="mt-4 grid flex-1 gap-2 text-sm text-slate-600">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal transition hover:text-red-700"
                  onClick={() => openAppointment({ service: service.name })}
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Réserver ce service
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl rounded border border-slate-200 bg-white p-6 text-center shadow-sm md:p-10">
          <h2 className="text-2xl font-black text-ink md:text-3xl">Besoin d'un conseil avant de réserver ?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Décrivez-nous le problème ou le besoin de votre véhicule. Nous vous confirmons le créneau et le devis sur
            WhatsApp.
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-slate-300 px-6 py-3 text-sm font-black uppercase tracking-normal text-ink transition hover:border-signal hover:text-signal"
              to="/contact"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
