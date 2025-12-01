import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Propriétaire d'une Renault Clio",
    image: "/testimonials/user1.jpg",
    content: "J'avais un bruit étrange au niveau du moteur. En 2 minutes, Fix My Car m'a donné un diagnostic précis. Le garage a confirmé exactement ce que l'IA avait détecté !",
    rating: 5,
  },
  {
    name: "Pierre Martin",
    role: "Propriétaire d'une Peugeot 308",
    image: "/testimonials/user2.jpg",
    content: "Service incroyable ! J'ai économisé plus de 300€ grâce aux estimations transparentes. Je recommande à tous les automobilistes.",
    rating: 5,
  },
  {
    name: "Sophie Bernard",
    role: "Propriétaire d'une BMW X3",
    image: "/testimonials/user3.jpg",
    content: "En tant que femme, j'avais peur de me faire arnaquer au garage. Avec Fix My Car, j'arrive préparée et je sais exactement ce qui doit être fait.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4 backdrop-blur-sm">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Plus de 50 000 automobilistes nous font confiance pour diagnostiquer leurs véhicules.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="h-10 w-10 text-blue-400/50 mb-6" />

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 border-2 border-gray-900"
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">+50K utilisateurs actifs</span>
          </div>
          <div className="h-6 w-px bg-gray-700" />
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-400">4.9/5 sur 10 000+ avis</span>
          </div>
        </div>
      </div>
    </section>
  );
}

