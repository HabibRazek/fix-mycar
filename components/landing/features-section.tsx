import { 
  Cpu, 
  Car, 
  FileText, 
  Wrench, 
  TrendingUp, 
  Shield,
  Clock,
  CreditCard
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Diagnostic IA avancé",
    description: "Notre algorithme analyse les symptômes et identifie les problèmes avec une précision de 98%.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Car,
    title: "Historique véhicule",
    description: "Suivez tous les diagnostics et réparations de vos véhicules en un seul endroit.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FileText,
    title: "Rapports détaillés",
    description: "Recevez des rapports complets avec photos, descriptions et recommandations.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Wrench,
    title: "Réseau de garages",
    description: "Connectez-vous avec plus de 500 garages certifiés près de chez vous.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Estimations précises",
    description: "Obtenez des estimations de coûts transparentes avant toute réparation.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Garantie qualité",
    description: "Toutes les réparations sont garanties par nos garages partenaires.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Clock,
    title: "Gain de temps",
    description: "Diagnostiquez votre véhicule en 2 minutes sans vous déplacer.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: CreditCard,
    title: "Paiement flexible",
    description: "Payez en plusieurs fois ou utilisez notre système de crédit auto.",
    color: "from-indigo-500 to-indigo-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète pour diagnostiquer, réparer et entretenir votre véhicule en toute sérénité.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

