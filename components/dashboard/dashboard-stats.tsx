"use client";

import { useEffect, useState } from "react";
import { Car, Wrench, FileText, TrendingUp, Loader2, TrendingDown, Minus } from "lucide-react";

interface DashboardStats {
  vehicles: number;
  diagnostics: number;
  reports: number;
  healthScore: number;
  // Trend data
  vehiclesChange?: number;
  diagnosticsChange?: number;
  reportsChange?: number;
  healthScoreChange?: number;
}

const statsConfig = [
  {
    label: "Véhicules",
    key: "vehicles" as keyof DashboardStats,
    trendKey: "vehiclesChange" as keyof DashboardStats,
    icon: Car,
    color: "bg-blue-500",
  },
  {
    label: "Diagnostics",
    key: "diagnostics" as keyof DashboardStats,
    trendKey: "diagnosticsChange" as keyof DashboardStats,
    icon: Wrench,
    color: "bg-emerald-500",
  },
  {
    label: "Rapports",
    key: "reports" as keyof DashboardStats,
    trendKey: "reportsChange" as keyof DashboardStats,
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    label: "Score santé",
    key: "healthScore" as keyof DashboardStats,
    trendKey: "healthScoreChange" as keyof DashboardStats,
    icon: TrendingUp,
    color: "bg-orange-500",
    format: (value: number) => `${Math.round(value)}%`,
  },
];

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch("/api/dashboard/stats", {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || errorData.details || `HTTP ${response.status}: Failed to fetch stats`);
        }

        const data = await response.json();
        
        if (data.success && data.stats) {
          setStats(data.stats);
        } else {
          throw new Error(data.error || "Format de réponse invalide");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        const errorMessage = err instanceof Error 
          ? err.message 
          : "Erreur lors du chargement des statistiques";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    
    // Listen for diagnosis saved event to refresh immediately
    const handleDiagnosisSaved = () => {
      fetchStats();
    };
    window.addEventListener('diagnosis-saved', handleDiagnosisSaved);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('diagnosis-saved', handleDiagnosisSaved);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">...</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">{error || "Erreur inconnue"}</p>
      </div>
    );
  }

  const getTrendIcon = (change?: number) => {
    if (change === undefined || change === 0) return null;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getTrendColor = (change?: number) => {
    if (change === undefined || change === 0) return "text-gray-500";
    if (change > 0) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        const value = stats[stat.key];
        const trend = stats[stat.trendKey] as number | undefined;
        const displayValue = stat.format
          ? stat.format(value as number)
          : value.toString();

        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`h-12 w-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
              {trend !== undefined && trend !== 0 && (
                <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
                  {getTrendIcon(trend)}
                  <span className="text-xs font-semibold">
                    {trend > 0 ? "+" : ""}{trend}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

