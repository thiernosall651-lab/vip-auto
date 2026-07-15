// "Malik Auto" — knowledge engine for the VIP AUTO assistant.
// Deterministic, offline, and safe: it never invents a specific repair and always
// steers uncertain cases toward a workshop inspection + booking. This is a clean
// seam — swap getAssistantReply() for a Claude-backed endpoint later without
// touching the widget UI.

export type AssistantReply = {
  text: string;
  suggestBooking?: boolean;
  service?: string;
  quickReplies?: string[];
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function has(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

const defaultQuickReplies = ["Freins", "Vidange / huile", "Batterie", "Voyant moteur", "Prendre rendez-vous"];

export const assistantGreeting: AssistantReply = {
  text: "Bonjour 👋 je suis Malik Auto, l'assistant de VIP AUTO à Dakar. Décrivez-moi le souci de votre voiture (bruit, voyant, freinage, démarrage…) et je vous oriente vers la bonne solution.",
  quickReplies: defaultQuickReplies,
};

export function getAssistantReply(input: string): AssistantReply {
  const text = normalize(input);

  if (has(text, ["bonjour", "salut", "bonsoir", "coucou", "cava", "ca va"])) {
    return {
      text: "Bonjour ! Ravi de vous aider. Quel est le problème ou l'entretien dont votre véhicule a besoin ?",
      quickReplies: defaultQuickReplies,
    };
  }

  if (has(text, ["merci", "cool", "parfait", "super"])) {
    return {
      text: "Avec plaisir 🙏 Souhaitez-vous que je vous aide à prendre rendez-vous à l'atelier ?",
      suggestBooking: true,
      quickReplies: ["Prendre rendez-vous", "J'ai une autre question"],
    };
  }

  if (has(text, ["frein", "plaquette", "disque", "freiner", "grince", "grincement", "pedale"])) {
    return {
      text: "Un problème de freinage doit être pris au sérieux. Les causes fréquentes : plaquettes usées (grincement), disques voilés (vibrations à la pédale) ou niveau de liquide de frein bas. Je ne peux pas conclure à distance — nos mécaniciens contrôlent plaquettes, disques et étriers, puis réalisent un essai de freinage.",
      suggestBooking: true,
      service: "Plaquettes & freinage",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["vidange", "huile", "niveau huile", "moteur sec", "lubrifiant"])) {
    return {
      text: "Pour la vidange, on choisit l'huile selon votre moteur et le climat de Dakar. Nous recommandons des huiles synthétiques premium comme Castrol EDGE (5W-30/5W-40) ou Valvoline SynPower, qui tiennent bien la chaleur et protègent le moteur. On remplace aussi le filtre à huile à chaque vidange.",
      suggestBooking: true,
      service: "Vidange & huile moteur",
      quickReplies: ["Quelle huile pour ma voiture ?", "Prendre rendez-vous"],
    };
  }

  if (has(text, ["quelle huile", "recommande", "castrol", "valvoline", "5w30", "5w40", "10w40", "grade"])) {
    return {
      text: "Le bon grade dépend de votre moteur (essence/diesel), de son âge et des préconisations constructeur. En général : Castrol EDGE ou Valvoline SynPower (5W-30/5W-40) pour les moteurs récents ; Valvoline MaxLife (10W-40) pour les moteurs à fort kilométrage. Donnez-moi la marque, le modèle et l'année et nous confirmons la référence exacte à l'atelier.",
      suggestBooking: true,
      service: "Vidange & huile moteur",
      quickReplies: ["Prendre rendez-vous", "Autre question"],
    };
  }

  if (has(text, ["batterie", "demarre pas", "demarrage", "ne demarre", "demarrer", "starter"])) {
    return {
      text: "Un démarrage difficile vient souvent d'une batterie faible ou en fin de vie, de cosses oxydées ou de l'alternateur. Nous testons la batterie et l'alternateur sur place et remplaçons la batterie si nécessaire, sans attendre.",
      suggestBooking: true,
      service: "Batterie & démarrage",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["voyant", "temoin", "check engine", "moteur allume", "lumiere tableau"])) {
    return {
      text: "Un voyant allumé mérite un diagnostic électronique pour lire les codes défauts et éviter d'aggraver la panne. Je préfère ne pas deviner la cause : nous branchons la valise, identifions l'origine et vous proposons un devis clair avant toute intervention.",
      suggestBooking: true,
      service: "Inspection & diagnostic mécanique",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["fumee", "fume", "echappement"])) {
    return {
      text: "La couleur de la fumée oriente le diagnostic : blanche (souvent liquide de refroidissement), bleue (huile qui brûle), noire (mélange trop riche). Ce sont des pistes, pas un diagnostic ferme — une inspection à l'atelier est recommandée pour confirmer et éviter d'endommager le moteur.",
      suggestBooking: true,
      service: "Inspection & diagnostic mécanique",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["suspension", "amortisseur", "direction", "volant", "cahot", "bosse", "rotule", "tient pas la route"])) {
    return {
      text: "Des bruits sur les bosses, un volant qui vibre ou une voiture qui « flotte » signalent souvent des amortisseurs, rotules ou une direction à contrôler. Nous inspectons la suspension, la direction et les trains roulants pour une conduite sûre.",
      suggestBooking: true,
      service: "Suspension & direction",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["filtre", "air", "habitacle", "clim", "climatisation", "odeur"])) {
    return {
      text: "Une perte de performance ou de mauvaises odeurs dans l'habitacle viennent souvent de filtres encrassés (air, habitacle) ou d'une clim à entretenir. Nous remplaçons vos filtres pour un moteur qui respire et un habitacle plus sain.",
      suggestBooking: true,
      service: "Filtres huile, air & habitacle",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["chauffe", "surchauffe", "temperature", "refroidissement", "radiateur"])) {
    return {
      text: "Une surchauffe peut endommager gravement le moteur : arrêtez-vous si l'aiguille est dans le rouge. Les causes possibles : niveau de liquide bas, fuite, thermostat ou pompe à eau. Une inspection rapide à l'atelier est vivement conseillée.",
      suggestBooking: true,
      service: "Inspection & diagnostic mécanique",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["bruit", "claque", "cogne", "cliquetis", "vibration"])) {
    return {
      text: "Un bruit anormal a de nombreuses origines possibles (freins, suspension, courroie, moteur). Pour ne pas vous induire en erreur, le mieux est une inspection mécanique : nous localisons la source et vous expliquons ce qu'il faut faire.",
      suggestBooking: true,
      service: "Inspection & diagnostic mécanique",
      quickReplies: ["Prendre rendez-vous", "Autre problème"],
    };
  }

  if (has(text, ["entretien", "revision", "carnet", "kilometrage", "prochaine"])) {
    return {
      text: "Un entretien préventif régulier (selon le carnet et le kilométrage) évite les grosses réparations : vidange, filtres, freins, niveaux et points de sécurité. Donnez-moi votre kilométrage et je vous indique les points à vérifier.",
      suggestBooking: true,
      service: "Entretien préventif",
      quickReplies: ["Prendre rendez-vous", "Autre question"],
    };
  }

  if (has(text, ["prix", "tarif", "combien", "cout", "devis"])) {
    return {
      text: "Le tarif dépend du véhicule et de l'intervention. Chez VIP AUTO, vous recevez toujours un devis clair et validé avant toute intervention — aucune mauvaise surprise. Prenez rendez-vous et nous établissons le devis après diagnostic.",
      suggestBooking: true,
      quickReplies: ["Prendre rendez-vous", "Autre question"],
    };
  }

  if (has(text, ["rendez", "rdv", "reserver", "reservation", "prendre"])) {
    return {
      text: "Parfait, je vous ouvre le formulaire de rendez-vous. Renseignez votre véhicule et le souci, et l'atelier prépare votre passage.",
      suggestBooking: true,
    };
  }

  if (has(text, ["adresse", "ou etes", "ou est", "localisation", "horaire", "ouvert", "situe"])) {
    return {
      text: "VIP AUTO se trouve à Liberté 6, Dakar. Le plus simple est de prendre rendez-vous : nous confirmons le créneau et le devis sur WhatsApp.",
      suggestBooking: true,
      quickReplies: ["Prendre rendez-vous", "Autre question"],
    };
  }

  return {
    text: "Je veux être sûr de bien vous orienter sans deviner. Pouvez-vous préciser le symptôme (bruit, voyant, freinage, démarrage, fumée…) ? Dans le doute, une inspection à l'atelier permet un diagnostic fiable et un devis clair.",
    suggestBooking: true,
    service: "Inspection & diagnostic mécanique",
    quickReplies: defaultQuickReplies,
  };
}
