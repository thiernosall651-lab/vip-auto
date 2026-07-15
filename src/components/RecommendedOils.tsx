import { CalendarCheck, Droplets } from "lucide-react";
import { useAppointment } from "../lib/appointment";
import { useContent } from "../lib/content/store";
import { SectionHeader } from "./SectionHeader";

export function RecommendedOils(): JSX.Element | null {
  const { content } = useContent();
  const { openAppointment } = useAppointment();

  if (content.recommendedOils.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Huiles recommandées"
          title="Les huiles que les professionnels recommandent"
          description="Nous utilisons des huiles synthétiques premium — Castrol et Valvoline — pour leur tenue à la chaleur et leur protection du moteur, idéales pour les conditions de conduite à Dakar."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.recommendedOils.map((oil) => (
            <article
              key={oil.id}
              className="flex h-full flex-col rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              style={{ minHeight: 520 }}
            >
              <div className="flex h-64 items-center justify-center overflow-hidden bg-white">
                {oil.image ? (
                  <img
                    src={oil.image}
                    alt={oil.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-50">
                    <Droplets className="h-10 w-10 text-slate-400" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-signal">{oil.brand}</p>
                    <h3 className="mt-1 text-lg font-black leading-snug text-ink">{oil.name}</h3>
                    <p className="mt-0.5 text-sm font-bold text-slate-500">{oil.grade}</p>
                  </div>
                  {oil.badge ? (
                    <span className="rounded bg-amber-50 px-2 py-1 text-xs font-black uppercase tracking-normal text-amber-700">
                      {oil.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{oil.description}</p>

                <button
                  type="button"
                  onClick={() => openAppointment({ service: "Vidange & huile moteur" })}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-signal transition hover:text-red-700"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Réserver une vidange
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
