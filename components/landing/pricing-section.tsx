import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratuit",
    price: "0",
    currency: "TND",
    period: "/mois",
    description: "Parfait pour commencer",
    features: [
      "3 diagnostics par mois",
      "Rapport basique",
      "Historique 30 jours",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    price: "35",
    currency: "TND",
    period: "/mois",
    description: "Pour les automobilistes actifs",
    features: [
      "Diagnostics illimités",
      "Rapports détaillés avec photos",
      "Historique complet",
      "Estimations de coûts",
      "Support prioritaire",
      "Accès aux garages partenaires",
    ],
    cta: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    name: "Garage",
    price: "165",
    currency: "TND",
    period: "/mois",
    description: "Solution professionnelle",
    features: [
      "Tout du plan Pro",
      "Multi-utilisateurs",
      "API access",
      "Dashboard analytics",
      "Gestion des clients",
      "Support dédié 24/7",
      "Formation incluse",
    ],
    cta: "Contacter les ventes",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Tarifs
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Un plan pour chaque besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Commencez gratuitement, évoluez selon vos besoins. Annulez à tout moment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-xl shadow-blue-500/10 scale-105"
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-sm font-medium shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    Plus populaire
                  </div>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-display font-bold text-gray-900">{plan.price}</span>
                  <span className="text-2xl font-semibold text-gray-700">{plan.currency}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/login" className="block">
                <Button
                  className={`w-full h-12 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

