import { getCurrentUser } from "@/lib/auth";
import { Car, Wrench, FileText } from "lucide-react";
import Link from "next/link";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { DiagnosticsChart } from "@/components/dashboard/charts/diagnostics-chart";
import { IssuesChart } from "@/components/dashboard/charts/issues-chart";
import { VehicleHealthChart } from "@/components/dashboard/charts/vehicle-health-chart";
import { CostAnalysisChart } from "@/components/dashboard/charts/cost-analysis-chart";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";

export default async function DashboardPage() {
  const user = await getCurrentUser();

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

      {/* Dynamic Stats Grid */}
      <DashboardStats />

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DiagnosticsChart />
        <IssuesChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleHealthChart />
        <CostAnalysisChart />
      </div>

      {/* User Profile Card */}
      <UserProfileCard
        user={{
          name: user?.name || "",
          email: user?.email || "",
          role: user?.role || "",
          image: user?.image,
          createdAt: user?.createdAt,
        }}
      />
    </div>
  );
}

