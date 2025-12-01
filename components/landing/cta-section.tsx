import Link from "next/link";
import { ArrowRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 rounded-3xl p-12 md:p-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
              <Car className="h-8 w-8 text-white" />
            </div>

            {/* Content */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Prêt à diagnostiquer votre véhicule ?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Rejoignez plus de 50 000 automobilistes qui font confiance à Fix My Car pour entretenir leurs véhicules.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>

            {/* Trust Text */}
            <p className="mt-8 text-white/60 text-sm">
              Essai gratuit • Aucune carte de crédit requise • Annulation à tout moment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

