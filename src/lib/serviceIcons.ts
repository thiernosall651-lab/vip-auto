import {
  BatteryCharging,
  Cog,
  Disc3,
  Droplets,
  Filter,
  Gauge,
  LifeBuoy,
  Lightbulb,
  Repeat,
  Snowflake,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Icon per service id — shared by the homepage "Nos services" section and the Services page.
export const serviceIcons: Record<string, LucideIcon> = {
  vidange: Droplets,
  "transmission-auto": Repeat,
  freinage: Disc3,
  filtres: Filter,
  batterie: BatteryCharging,
  "suspension-direction": LifeBuoy,
  climatisation: Snowflake,
  "eclairage-led": Lightbulb,
  diagnostic: Gauge,
  "entretien-preventif": Cog,
  reparations: Wrench,
};
