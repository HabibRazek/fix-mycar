import { getCurrentUser } from "@/lib/auth";
import { Car, Wrench, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const stats = [
    { label: "Véhicules", value: "3", icon: Car, color: "bg-blue-500" },
    { label: "Diagnostics", value: "12", icon: Wrench, color: "bg-emerald-500" },
    { label: "Rapports", value: "8", icon: FileText, color: "bg-purple-500" },
    { label: "Score santé", value: "85%", icon: TrendingUp, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold font-display">
          Bienvenue, {user?.name} ! 👋
        </h1>
        <p className="mt-2 text-blue-100">
          Voici un aperçu de votre tableau de bord Fix My Car.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
            <Car className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
            <span className="font-medium text-gray-700 group-hover:text-blue-600">
              Ajouter un véhicule
            </span>
          </button>
          <Link href="/diagnostic" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <Wrench className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
            <span className="font-medium text-gray-700 group-hover:text-emerald-600">
              Nouveau diagnostic
            </span>
          </Link>
          <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <FileText className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
            <span className="font-medium text-gray-700 group-hover:text-purple-600">
              Voir les rapports
            </span>
          </button>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du compte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nom</p>
            <p className="font-medium text-gray-900">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Rôle</p>
            <p className="font-medium text-gray-900">
              {user?.role === "OWNER" && "Propriétaire"}
              {user?.role === "MECHANIC" && "Mécanicien"}
              {user?.role === "INSURER" && "Assureur"}
              {user?.role === "ADMIN" && "Administrateur"}
              {user?.role === "ML_ENGINEER" && "Ingénieur ML"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Membre depuis</p>
            <p className="font-medium text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

