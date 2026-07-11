import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "../data/catalog";
import { useSeo } from "../lib/useSeo";

export function ContactPage(): JSX.Element {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");

  useSeo({
    title: "Contact | Atlas Auto Parts",
    description:
      "Contactez Atlas Auto Parts pour vérifier une référence, demander un devis ou commander une pièce auto avec livraison.",
    canonicalPath: "/contact",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const whatsappMessage = `Bonjour, je m'appelle ${name}. Véhicule: ${vehicle}. Demande: ${message}`;
    window.location.href = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  }

  return (
    <main>
      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-signal">Contact</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-ink md:text-5xl">Vérifier une pièce avant commande.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Le formulaire prépare un message WhatsApp clair avec le véhicule et la demande du client.
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
              <Mail className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" />
              <a className="font-bold transition hover:text-signal" href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" />
              <a className="font-bold transition hover:text-signal" href={`https://wa.me/${contactInfo.whatsapp}`}>
                WhatsApp commande
              </a>
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
              Demande
              <textarea
                className="min-h-36 rounded border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Référence, pièce recherchée, ville de livraison..."
                required
              />
            </label>
          </div>
          <button
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-emerald-600 px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-emerald-700"
            type="submit"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Envoyer sur WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}
