import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "../data/catalog";

export function Footer(): JSX.Element {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-auto"
              src="/images/logo-vip.webp"
              alt="Logo VIP AUTO"
              width="240"
              height="160"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="text-lg font-black uppercase">{contactInfo.companyName}</p>
              <p className="text-sm text-slate-400">Pièces automobiles • Entretien • Performance</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            VIP AUTO, boutique spécialisée dans les pièces auto premium, l'entretien et les services mécaniques à
            {" "}
            {contactInfo.city}, {contactInfo.country}. Compatibilité vérifiée avant chaque expédition.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-normal text-slate-400">
            Fondateur : {contactInfo.founder}
          </p>
          <a
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            href={`https://wa.me/${contactInfo.whatsapp}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Commander sur WhatsApp
          </a>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-normal text-white">Liens rapides</h3>
          <ul className="mt-3 grid text-sm text-slate-300">
            <li>
              <Link className="inline-flex min-h-[44px] items-center transition hover:text-white" to="/shop">
                Boutique
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-[44px] items-center transition hover:text-white" to="/about">
                À propos
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-[44px] items-center transition hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-normal text-white">Contact</h3>
          <ul className="mt-3 grid gap-1 text-sm text-slate-300">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 flex-none text-signal" aria-hidden="true" />
              <span className="py-2">
                {contactInfo.address}, {contactInfo.city}, {contactInfo.country}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 flex-none text-signal" aria-hidden="true" />
              <a
                className="inline-flex min-h-[44px] items-center transition hover:text-white"
                href={`mailto:${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 flex-none text-signal" aria-hidden="true" />
              <a
                className="inline-flex min-h-[44px] items-center transition hover:text-white"
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              >
                {contactInfo.phone}
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
