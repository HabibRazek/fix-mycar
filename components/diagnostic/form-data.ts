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

// Symptoms extracted from the actual dataset (automotive_faults_aktc_obike_et_al.json)
export const symptoms = [
  // Brake System Symptoms
  { id: "abs_warning_light_on", label: "Voyant ABS allumé" },
  { id: "abs_light_stays_on", label: "Voyant ABS reste allumé" },
  { id: "brake_pedal_pulsation", label: "Pulsation de la pédale de frein" },
  { id: "brake_dragging", label: "Frein qui traîne" },
  { id: "brake_pulling_to_one_side", label: "Frein tire d'un côté" },
  { id: "brake_fluid_leak", label: "Fuite de liquide de frein" },
  { id: "brake_fluid_leaks", label: "Fuites de liquide de frein" },
  { id: "spongy_brake_pedal", label: "Pédale de frein spongieuse" },
  { id: "hard_brake_pedal", label: "Pédale de frein dure" },
  { id: "soft_brake_pedal", label: "Pédale de frein molle" },
  { id: "squealing_brakes", label: "Freins qui grincent" },
  { id: "brake_warning_light_on", label: "Voyant frein allumé" },
  
  // Engine Symptoms
  { id: "check_engine_light_on", label: "Voyant moteur allumé" },
  { id: "engine_overheating", label: "Surchauffe du moteur" },
  { id: "engine_knocking_noise", label: "Bruit de cognement du moteur" },
  { id: "engine_knocking_pinging", label: "Cognement/ping du moteur" },
  { id: "engine_misfires", label: "Ratés du moteur" },
  { id: "engine_hesitates_on_acceleration", label: "Hésitation à l'accélération" },
  { id: "engine_sputters_at_high_speeds", label: "Hoquets à haute vitesse" },
  { id: "engine_cranks_slowly", label: "Démarrage lent" },
  { id: "engine_does_not_crank", label: "Moteur ne démarre pas" },
  { id: "difficulty_starting_engine", label: "Difficulté à démarrer" },
  { id: "decreased_engine_performance", label: "Baisse de performance" },
  { id: "engine_performance_issues", label: "Problèmes de performance" },
  { id: "rough_idle", label: "Ralenti instable" },
  { id: "rough_idling", label: "Ralenti irrégulier" },
  { id: "black_smoke_from_exhaust", label: "Fumée noire du pot d'échappement" },
  { id: "blue_smoke_from_exhaust", label: "Fumée bleue du pot d'échappement" },
  { id: "white_smoke_from_exhaust", label: "Fumée blanche du pot d'échappement" },
  { id: "burning_oil_smell_from_engine_bay", label: "Odeur d'huile brûlée" },
  
  // Transmission Symptoms
  { id: "delayed_shifting", label: "Changement de vitesse retardé" },
  { id: "difficulty_shifting_gears", label: "Difficulté à changer de vitesse" },
  { id: "difficulty_engaging_gears", label: "Difficulté à engager les vitesses" },
  { id: "delay_in_gear_engagement", label: "Retard d'engagement" },
  { id: "transmission_won_t_shift_gears", label: "Boîte ne change pas de vitesse" },
  { id: "erratic_shifting", label: "Changements erratiques" },
  { id: "clunking_noise_when_shifting", label: "Bruit de claquement au changement" },
  { id: "clutch_slipping", label: "Embrayage qui patine" },
  { id: "clutch_pedal_feels_spongy", label: "Pédale d'embrayage spongieuse" },
  { id: "clutch_pedal_feels_loose", label: "Pédale d'embrayage lâche" },
  
  // Cooling System Symptoms
  { id: "coolant_leak", label: "Fuite de liquide de refroidissement" },
  { id: "coolant_leak_under_vehicle", label: "Fuite sous le véhicule" },
  { id: "coolant_leaks_under_the_vehicle", label: "Fuites sous le véhicule" },
  { id: "coolant_leak_near_front_of_engine", label: "Fuite à l'avant du moteur" },
  { id: "coolant_odor_in_cabin", label: "Odeur de liquide de refroidissement" },
  { id: "low_coolant_warning_light", label: "Voyant niveau de liquide bas" },
  { id: "overheating", label: "Surchauffe" },
  
  // AC System Symptoms
  { id: "ac_system_not_cooling", label: "Climatisation ne refroidit pas" },
  { id: "ac_system_not_working", label: "Climatisation ne fonctionne pas" },
  { id: "ac_not_cooling_at_idle", label: "AC ne refroidit pas au ralenti" },
  { id: "no_cold_air_from_vents", label: "Pas d'air froid des bouches" },
  { id: "warm_air_from_ac_vents", label: "Air chaud des bouches AC" },
  { id: "loud_noise_when_ac_is_on", label: "Bruit fort quand AC est allumé" },
  
  // Electrical Symptoms
  { id: "battery_warning_light_on", label: "Voyant batterie allumé" },
  { id: "dim_headlights", label: "Phares faibles" },
  { id: "dim_headlight", label: "Phare faible" },
  { id: "headlight_not_working", label: "Phare ne fonctionne pas" },
  { id: "clicking_sound_when_key_is_turned", label: "Clic à la clé" },
  { id: "clicking_sound_when_starting", label: "Clic au démarrage" },
  { id: "door_lock_not_responding", label: "Verrouillage ne répond pas" },
  { id: "clicking_sound_from_door", label: "Bruit de clic de la portière" },
  
  // Fuel System Symptoms
  { id: "loss_of_power", label: "Perte de puissance" },
  { id: "poor_fuel_economy", label: "Consommation excessive" },
  { id: "gas_cap_warning_light", label: "Voyant bouchon de réservoir" },
  { id: "fuel_smell", label: "Odeur d'essence" },
  { id: "fuel_leak", label: "Fuite de carburant" },
  
  // Steering & Suspension Symptoms
  { id: "hard_steering", label: "Direction dure" },
  { id: "steering_wheel_vibration", label: "Vibration du volant" },
  { id: "clicking_or_popping_noise_when_turning", label: "Clic/pop en tournant" },
  { id: "axle_noise_while_turning", label: "Bruit d'essieu en tournant" },
  { id: "clunking_noise_when_accelerating", label: "Bruit de claquement à l'accélération" },
  { id: "driveline_vibration", label: "Vibration de la transmission" },
  { id: "vibration", label: "Vibrations" },
  { id: "vibration_at_high_speeds", label: "Vibrations à haute vitesse" },
  
  // Other Symptoms
  { id: "low_oil_pressure_warning_light", label: "Voyant pression d'huile basse" },
  { id: "oil_leak", label: "Fuite d'huile" },
  { id: "oil_leaks", label: "Fuites d'huile" },
  { id: "tpms_warning_light_on", label: "Voyant pression pneus" },
  { id: "glow_plug_indicator_light_stays_on", label: "Voyant bougie de préchauffage" },
  { id: "excessive_exhaust_smoke", label: "Fumée excessive" },
  { id: "strange_noise", label: "Bruits étranges" },
];

// Warning lights extracted from the actual dataset
export const warningLightOptions = [
  { id: "check_engine_light_on", label: "Voyant moteur (Check Engine)" },
  { id: "abs_warning_light_on", label: "Voyant ABS" },
  { id: "abs_light_stays_on", label: "Voyant ABS (reste allumé)" },
  { id: "battery_warning_light_on", label: "Voyant batterie" },
  { id: "brake_warning_light_on", label: "Voyant frein" },
  { id: "low_oil_pressure_warning_light", label: "Voyant pression d'huile basse" },
  { id: "low_coolant_warning_light", label: "Voyant niveau de liquide de refroidissement" },
  { id: "tpms_warning_light_on", label: "Voyant pression des pneus (TPMS)" },
  { id: "gas_cap_warning_light", label: "Voyant bouchon de réservoir" },
  { id: "glow_plug_indicator_light_stays_on", label: "Voyant bougie de préchauffage" },
  { id: "dim_headlights", label: "Phares faibles" },
  { id: "headlight_not_working", label: "Phare ne fonctionne pas" },
];

export const years = Array.from({ length: 40 }, (_, i) => (new Date().getFullYear() - i).toString());

