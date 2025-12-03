import { Car, Fuel, Gauge, AlertTriangle, Wrench, Settings, ThermometerSun } from "lucide-react";

export const carBrands = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai",
  "Kia", "Mercedes-Benz", "Nissan", "Opel", "Peugeot", "Renault", "Seat",
  "Skoda", "Toyota", "Volkswagen", "Volvo", "Autre"
];

export const carTypes = [
  { value: "sedan", label: "Berline" },
  { value: "suv", label: "SUV / 4x4" },
  { value: "hatchback", label: "Compacte" },
  { value: "wagon", label: "Break" },
  { value: "coupe", label: "Coupé" },
  { value: "convertible", label: "Cabriolet" },
  { value: "minivan", label: "Monospace" },
  { value: "pickup", label: "Pick-up" },
  { value: "van", label: "Utilitaire" },
];

export const fuelTypes = [
  { value: "gasoline", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Électrique" },
  { value: "hybrid", label: "Hybride" },
  { value: "plugin_hybrid", label: "Hybride rechargeable" },
  { value: "lpg", label: "GPL" },
];

export const transmissionTypes = [
  { value: "manual", label: "Manuelle" },
  { value: "automatic", label: "Automatique" },
  { value: "semi_automatic", label: "Semi-automatique" },
];

export const problemCategories = [
  { value: "engine", label: "Moteur", icon: Settings },
  { value: "brakes", label: "Freins", icon: AlertTriangle },
  { value: "transmission", label: "Transmission / Boîte de vitesses", icon: Settings },
  { value: "electrical", label: "Électrique / Électronique", icon: Gauge },
  { value: "suspension", label: "Suspension / Direction", icon: Car },
  { value: "cooling", label: "Refroidissement", icon: ThermometerSun },
  { value: "fuel_system", label: "Système de carburant", icon: Fuel },
  { value: "other", label: "Autre", icon: Wrench },
];

export const severityLevels = [
  { value: "minor", label: "Mineur", desc: "Gêne légère", color: "bg-green-50 border-green-300 text-green-700" },
  { value: "moderate", label: "Modéré", desc: "Attention requise", color: "bg-yellow-50 border-yellow-300 text-yellow-700" },
  { value: "severe", label: "Sévère", desc: "Réparation urgente", color: "bg-orange-50 border-orange-300 text-orange-700" },
  { value: "critical", label: "Critique", desc: "Danger potentiel", color: "bg-red-50 border-red-300 text-red-700" },
];

export const durationOptions = [
  { value: "just_started", label: "Vient de commencer" },
  { value: "few_days", label: "Quelques jours" },
  { value: "week", label: "Environ une semaine" },
  { value: "few_weeks", label: "Quelques semaines" },
  { value: "month", label: "Environ un mois" },
  { value: "months", label: "Plusieurs mois" },
];

export const frequencyOptions = [
  { value: "constant", label: "Constant (toujours présent)" },
  { value: "frequent", label: "Fréquent (plusieurs fois par jour)" },
  { value: "occasional", label: "Occasionnel (quelques fois par semaine)" },
  { value: "rare", label: "Rare (de temps en temps)" },
  { value: "specific", label: "Dans des conditions spécifiques" },
];

export const symptoms = [
  { id: "strange_noise", label: "Bruits étranges" },
  { id: "vibration", label: "Vibrations anormales" },
  { id: "smoke", label: "Fumée" },
  { id: "smell", label: "Odeurs inhabituelles" },
  { id: "leak", label: "Fuites de liquide" },
  { id: "starting_issues", label: "Difficultés au démarrage" },
  { id: "stalling", label: "Calages fréquents" },
  { id: "power_loss", label: "Perte de puissance" },
  { id: "hard_steering", label: "Direction dure" },
  { id: "braking_issues", label: "Problèmes de freinage" },
  { id: "overheating", label: "Surchauffe" },
  { id: "battery_drain", label: "Batterie se décharge" },
  { id: "rough_idle", label: "Ralenti instable" },
  { id: "gear_issues", label: "Problèmes de vitesses" },
  { id: "fuel_consumption", label: "Consommation excessive" },
];

export const warningLightOptions = [
  { id: "check_engine", label: "Voyant moteur" },
  { id: "oil", label: "Voyant huile" },
  { id: "battery", label: "Voyant batterie" },
  { id: "temperature", label: "Voyant température" },
  { id: "brake", label: "Voyant frein" },
  { id: "abs", label: "Voyant ABS" },
  { id: "airbag", label: "Voyant airbag" },
  { id: "tire_pressure", label: "Voyant pression pneus" },
];

export const years = Array.from({ length: 40 }, (_, i) => (new Date().getFullYear() - i).toString());

