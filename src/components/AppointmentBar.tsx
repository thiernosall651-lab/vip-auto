import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import { useAppointment } from "../lib/appointment";
import { useContent } from "../lib/content/store";

// Hero-overlap quick action: pick a service + vehicle and open the booking modal.
export function AppointmentBar(): JSX.Element {
  const { content } = useContent();
  const { openAppointment } = useAppointment();
  const [service, setService] = useState("");
  const [vehicle, setVehicle] = useState("");

  return (
    <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
      <div className="rounded border border-slate-200 bg-white p-4 shadow-soft md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="grid gap-2 text-sm font-bold text-ink">
            Service souhaité
            <select
              className="min-h-12 rounded border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <option value="">Choisir un service</option>
              {content.services.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-ink">
            Votre véhicule
            <input
              className="min-h-12 rounded border border-slate-300 bg-white px-3 text-sm font-normal text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
              placeholder="Ex: Peugeot 208 2018"
            />
          </label>

          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 active:scale-[0.98]"
            onClick={() => openAppointment({ service, model: vehicle })}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre rendez-vous
          </button>
        </div>
        <p className="mt-3 text-xs font-semibold text-slate-500">
          Réponse rapide sur WhatsApp · Devis clair avant toute intervention
        </p>
      </div>
    </section>
  );
}
