import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BatteryCharging,
  Car,
  CircleDashed,
  Cog,
  Cpu,
  Disc,
  Disc3,
  Droplet,
  Droplets,
  Fan,
  Filter,
  Fuel,
  Lamp,
  Layers,
  LifeBuoy,
  Lightbulb,
  Sparkles,
  Sun,
  Thermometer,
  Waves,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { catalogFamilies } from "../data/catalog";
import { SectionHeader } from "./SectionHeader";

const iconByKey: Record<string, LucideIcon> = {
  Droplet,
  Droplets,
  Cog,
  Thermometer,
  Filter,
  Wind,
  Fan,
  Fuel,
  Zap,
  BatteryCharging,
  Cpu,
  Layers,
  Disc3,
  Waves,
  LifeBuoy,
  Lightbulb,
  Sun,
  Lamp,
  CircleDashed,
  Disc,
  Car,
  Sparkles,
  Wrench,
};

export function CatalogShowcase(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-14 text-white sm:py-16 lg:py-20">
      <div className="bg-metal-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-signal/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Catalogue complet"
          title="Tout pour votre véhicule, au même endroit"
          description="Pièces d'origine, entretien premium et services mécaniques classés par famille pour trouver la bonne référence en un instant."
        />

        <div className="mt-10 grid gap-10 sm:gap-12">
          {catalogFamilies.map((family) => (
            <div key={family.id}>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-signal">{family.eyebrow}</span>
                <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">{family.title}</h3>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {family.items.map((item) => {
                  const Icon = iconByKey[item.icon] ?? Wrench;

                  return (
                    <Link
                      key={item.id}
                      to="/shop"
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-neutral-900 hover:shadow-[0_18px_50px_-12px_rgba(220,38,38,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-white/10 transition group-hover:from-signal/30 group-hover:ring-signal/40 sm:h-12 sm:w-12">
                          <Icon
                            className="h-5 w-5 text-neutral-200 transition group-hover:text-white sm:h-6 sm:w-6"
                            aria-hidden="true"
                          />
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 text-white/30 transition group-hover:text-signal"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="mt-4 text-base font-black leading-snug text-white sm:mt-5 sm:text-lg">
                        {item.name}
                      </h4>
                      <p className="mt-2 hidden text-sm leading-6 text-neutral-400 sm:block">{item.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
