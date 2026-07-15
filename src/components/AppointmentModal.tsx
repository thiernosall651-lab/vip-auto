import { CalendarCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppointment } from "../lib/appointment";
import { useContent } from "../lib/content/store";
import { whatsappUrl } from "../lib/whatsapp";

type AppointmentForm = {
  fullName: string;
  phone: string;
  whatsapp: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  service: string;
  problem: string;
  drivable: string;
  date: string;
  time: string;
};

const emptyForm: AppointmentForm = {
  fullName: "",
  phone: "",
  whatsapp: "",
  brand: "",
  model: "",
  year: "",
  mileage: "",
  service: "",
  problem: "",
  drivable: "",
  date: "",
  time: "",
};

const fieldClass =
  "min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100";
const labelClass = "grid gap-1.5 text-xs font-black uppercase tracking-normal text-slate-500";

function buildMessage(form: AppointmentForm): string {
  return [
    "🔧 Nouvelle demande de rendez-vous — VIP AUTO",
    "",
    `👤 Client : ${form.fullName}`,
    `📞 Téléphone : ${form.phone}`,
    `💬 WhatsApp : ${form.whatsapp}`,
    "",
    `🚗 Véhicule : ${form.brand} ${form.model} (${form.year})`,
    form.mileage ? `🛣️ Kilométrage : ${form.mileage} km` : "",
    `🔧 Service souhaité : ${form.service}`,
    `🚦 Véhicule roulant : ${form.drivable}`,
    "",
    "📝 Problème :",
    form.problem,
    "",
    `📅 Créneau souhaité : ${form.date}${form.time ? ` à ${form.time}` : ""}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function AppointmentModal(): JSX.Element | null {
  const { isOpen, prefill, closeAppointment } = useAppointment();
  const { content } = useContent();
  const [form, setForm] = useState<AppointmentForm>(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...emptyForm, service: prefill.service ?? "", brand: prefill.brand ?? "", model: prefill.model ?? "" });
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, prefill]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        closeAppointment();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeAppointment]);

  if (!isOpen) {
    return null;
  }

  function update<K extends keyof AppointmentForm>(key: K, value: AppointmentForm[K]): void {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    window.open(whatsappUrl(buildMessage(form)), "_blank", "noopener,noreferrer");
    closeAppointment();
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Prendre rendez-vous">
      <button className="fixed inset-0 bg-black/50" type="button" onClick={closeAppointment} aria-label="Fermer" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 my-4 w-full max-w-2xl rounded-lg border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-signal">Rendez-vous</p>
            <h2 className="mt-1 text-xl font-black text-ink">Décrivez votre besoin</h2>
            <p className="mt-1 text-sm text-slate-500">Nous préparons votre passage à l'atelier avant votre arrivée.</p>
          </div>
          <button
            type="button"
            onClick={closeAppointment}
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded border border-slate-200 text-ink transition hover:border-signal hover:text-signal"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <label className={labelClass}>
            Nom complet
            <input className={fieldClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
          </label>
          <label className={labelClass}>
            Téléphone
            <input className={fieldClass} type="tel" inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </label>
          <label className={labelClass}>
            Numéro WhatsApp
            <input className={fieldClass} type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} required />
          </label>
          <label className={labelClass}>
            Marque du véhicule
            <input className={fieldClass} list="appointment-brands" value={form.brand} onChange={(e) => update("brand", e.target.value)} required />
            <datalist id="appointment-brands">
              {content.brands.map((brand) => (
                <option key={brand.id} value={brand.name} />
              ))}
            </datalist>
          </label>
          <label className={labelClass}>
            Modèle
            <input className={fieldClass} value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Ex : Classe C" required />
          </label>
          <label className={labelClass}>
            Année
            <input className={fieldClass} inputMode="numeric" value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="Ex : 2018" required />
          </label>
          <label className={labelClass}>
            Kilométrage
            <input className={fieldClass} inputMode="numeric" value={form.mileage} onChange={(e) => update("mileage", e.target.value)} placeholder="Ex : 120000" />
          </label>
          <label className={labelClass}>
            Service souhaité
            <select className={fieldClass} value={form.service} onChange={(e) => update("service", e.target.value)} required>
              <option value="">Choisir…</option>
              {content.services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
              <option value="Autre / à préciser">Autre / à préciser</option>
            </select>
          </label>

          <div className="sm:col-span-2">
            <label className={labelClass}>
              Décrivez le problème <span className="text-signal">*</span>
              <textarea
                className={`${fieldClass} min-h-24 py-2`}
                value={form.problem}
                onChange={(e) => update("problem", e.target.value)}
                placeholder="Bruit, voyant allumé, fumée, comportement anormal…"
                required
              />
            </label>
          </div>

          <div className="sm:col-span-2">
            <span className={labelClass}>Le véhicule roule-t-il encore ?</span>
            <div className="mt-2 flex gap-4">
              {["Oui", "Non"].map((option) => (
                <label key={option} className="inline-flex items-center gap-2 text-sm font-bold text-ink">
                  <input
                    type="radio"
                    name="drivable"
                    className="h-4 w-4 accent-signal"
                    checked={form.drivable === option}
                    onChange={() => update("drivable", option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <label className={labelClass}>
            Date souhaitée
            <input className={fieldClass} type="date" value={form.date} onChange={(e) => update("date", e.target.value)} required />
          </label>
          <label className={labelClass}>
            Heure souhaitée
            <input className={fieldClass} type="time" value={form.time} onChange={(e) => update("time", e.target.value)} required />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 p-5">
          <button
            type="button"
            onClick={closeAppointment}
            className="inline-flex min-h-11 items-center justify-center rounded border border-slate-300 px-5 text-sm font-black uppercase tracking-normal text-ink transition hover:border-signal hover:text-signal"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-emerald-600 px-5 text-sm font-black uppercase tracking-normal text-white transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Envoyer sur WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
