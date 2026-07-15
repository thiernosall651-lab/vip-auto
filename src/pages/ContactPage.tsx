import { FormEvent, useState } from "react";
import { CalendarCheck, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "../data/catalog";
import { useSeo } from "../lib/useSeo";
import { useAppointment } from "../lib/appointment";
import { whatsappUrl } from "../lib/whatsapp";

export function ContactPage(): JSX.Element {
  const { openAppointment } = useAppointment();
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");

  useSeo({
    title: "Contact & rendez-vous | VIP AUTO Dakar",
    description:
      "Contactez VIP AUTO à Dakar pour prendre rendez-vous, demander un devis d'entretien ou un conseil. Réponse rapide sur WhatsApp.",
    canonicalPath: "/contact",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const whatsappMessage = `Bonjour VIP AUTO, je souhaite prendre rendez-vous.\nNom : ${name}\nVéhicule : ${vehicle}\nBesoin : ${message}`;
    window.open(whatsappUrl(whatsappMessage), "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-signal">Contact</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-ink md:text-5xl">
            Prendre rendez-vous ou nous contacter.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Décrivez votre besoin : nous vous confirmons le créneau et le devis sur WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-ink">Coordonnées</h2>
          <ul className="mt-6 grid gap-5 text-sm text-slate-700">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" />
              <span>
                {contactInfo.address}, {contactInfo.city}, {contactInfo.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" />
              <a className="font-bold transition hover:text-signal" href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" />
              <a
                className="font-bold transition hover:text-signal"
                href={`tel:${contactInfo.phoneSecondary.replace(/\s/g, "")}`}
              >
                {contactInfo.phoneSecondary}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" />
              <button
                type="button"
                className="text-left font-bold transition hover:text-signal"
                onClick={() => openAppointment()}
              >
                Prendre rendez-vous sur WhatsApp
              </button>
            </li>
          </ul>
          <a
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
            href={contactInfo.mapUrl}
          >
            Ouvrir Google Maps
          </a>
        </div>

        <form className="rounded border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-ink">
              Nom complet
              <input
                className="min-h-12 rounded border border-slate-300 px-4 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Véhicule
              <input
                className="min-h-12 rounded border border-slate-300 px-4 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                placeholder="Ex: Mercedes Classe C 2018"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Décrivez votre besoin
              <textarea
                className="min-h-36 rounded border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Service souhaité, symptômes, kilométrage, ville..."
                required
              />
            </label>
          </div>
          <button
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-emerald-600 px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-emerald-700 active:scale-[0.98]"
            type="submit"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre rendez-vous
          </button>
        </form>
      </section>
    </main>
  );
}
