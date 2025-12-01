import { MessageSquare, Cpu, FileCheck, Wrench } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Décrivez les symptômes",
    description: "Indiquez les problèmes que vous rencontrez avec votre véhicule : bruits, voyants, comportements inhabituels...",
    color: "blue",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Analyse IA",
    description: "Notre intelligence artificielle analyse vos descriptions et compare avec des milliers de cas similaires.",
    color: "emerald",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Recevez le diagnostic",
    description: "Obtenez un rapport détaillé avec les causes possibles, la gravité et les estimations de coûts.",
    color: "purple",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Faites réparer",
    description: "Choisissez un garage partenaire, prenez rendez-vous et faites réparer votre véhicule en toute confiance.",
    color: "orange",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  emerald: {
    bg: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  purple: {
    bg: "bg-purple-500",
    light: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
  },
  orange: {
    bg: "bg-orange-500",
    light: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
  },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Simple comme bonjour
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En 4 étapes simples, passez du problème à la solution. Pas de jargon technique, juste des réponses claires.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 via-purple-200 to-orange-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              return (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div className={`${colors.light} rounded-2xl p-6 border ${colors.border} hover:shadow-lg transition-shadow`}>
                    {/* Number Badge */}
                    <div className={`absolute -top-4 left-6 ${colors.bg} text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg`}>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`h-14 w-14 ${colors.bg} rounded-xl flex items-center justify-center mb-5 mt-2 shadow-lg`}>
                      <step.icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-gray-200" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

