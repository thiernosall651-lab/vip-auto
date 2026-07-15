import { Link } from "@tanstack/react-router";
import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { contactInfo } from "../data/catalog";
import { useAppointment } from "../lib/appointment";

export function Footer(): JSX.Element {
  const { openAppointment } = useAppointment();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <img
            className="h-16 w-auto md:h-20"
            src="/images/logo-vip.png"
            alt="VIP AUTO — Pièces auto, entretien, performance"
            width="760"
            height="364"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            Centre d'entretien automobile à Dakar depuis 2020 : vidange, freinage, filtres, diagnostic et petites
            réparations, réalisés par des mécaniciens qualifiés.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded bg-signal px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            onClick={() => openAppointment()}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre rendez-vous
          </button>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-normal text-white">Liens rapides</h2>
          <ul className="mt-5 grid gap-3 text-sm text-slate-300">
            <li>
              <Link className="transition hover:text-white" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/shop">
                Boutique
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/about">
                À propos
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-normal text-white">Contact</h2>
          <ul className="mt-5 grid gap-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-amber-300" aria-hidden="true" />
              <span>
                {contactInfo.address}, {contactInfo.city}, {contactInfo.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-amber-300" aria-hidden="true" />
              <a className="transition hover:text-white" href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-amber-300" aria-hidden="true" />
              <a
                className="transition hover:text-white"
                href={`tel:${contactInfo.phoneSecondary.replace(/\s/g, "")}`}
              >
                {contactInfo.phoneSecondary}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 VIP AUTO. Tous droits réservés.
      </div>
    </footer>
  );
}
