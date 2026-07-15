import { contactInfo } from "../data/catalog";

// Central WhatsApp link builder. All primary CTAs open WhatsApp (never tel:,
// which triggers FaceTime on macOS) so booking works from every device.
export function whatsappUrl(message: string): string {
  return `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function appointmentUrl(detail?: string): string {
  const base = "Bonjour VIP AUTO, je souhaite prendre rendez-vous";
  return whatsappUrl(detail ? `${base} — ${detail}.` : `${base} pour l'entretien de mon véhicule.`);
}
