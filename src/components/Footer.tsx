import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "../data/catalog";

export function Footer(): JSX.Element {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded bg-signal text-lg font-black">AP</span>
            <div>
              <p className="text-lg font-black uppercase">Atlas Auto Parts</p>
              <p className="text-sm text-slate-300">Pièces auto premium au Maroc</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            Boutique spécialisée dans les pièces auto, l'entretien premium et la vérification de compatibilité avant
            expédition.
          </p>
          <a
            className="mt-6 inline-flex items-center gap-2 rounded bg-signal px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            href={`https://wa.me/${contactInfo.whatsapp}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Commander sur WhatsApp
          </a>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-normal text-white">Liens rapides</h2>
          <ul className="mt-5 grid gap-3 text-sm text-slate-300">
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
            <li>
              <a className="transition hover:text-white" href="/robots.txt">
                Robots.txt
              </a>
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
              <Mail className="mt-0.5 h-4 w-4 flex-none text-amber-300" aria-hidden="true" />
              <a className="transition hover:text-white" href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-amber-300" aria-hidden="true" />
              <a className="transition hover:text-white" href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                {contactInfo.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 Atlas Auto Parts. Tous droits réservés.
      </div>
    </footer>
  );
}
