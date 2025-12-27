import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Get real statistics from database
    // Use try-catch for each query in case tables don't exist yet
    let vehiclesCount = 0;
    let diagnosticsCount = 0;
    let recentDiagnostics: any[] = [];

    try {
      vehiclesCount = await prisma.vehicle.count({
        where: { userId: user.id },
      });
    } catch (err) {
      console.warn("Error counting vehicles (table might not exist):", err);
      vehiclesCount = 0;
    }

    try {
      diagnosticsCount = await prisma.diagnosis.count({
        where: { userId: user.id },
      });
    } catch (err) {
      console.warn("Error counting diagnostics (table might not exist):", err);
      diagnosticsCount = 0;
    }

    // Get recent diagnostics for health score calculation
    try {
      recentDiagnostics = await prisma.diagnosis.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
    } catch (err) {
      console.warn("Error fetching recent diagnostics:", err);
      recentDiagnostics = [];
    }

    // Calculate health score based on:
    // - Number of diagnostics (more = better engagement)
    // - Average confidence of predictions
    // - Severity distribution (fewer critical = better)
    let healthScore = 50; // Base score

    if (diagnosticsCount > 0 && recentDiagnostics.length > 0) {
      const avgConfidence =
        recentDiagnostics.reduce((sum, d) => sum + (d.confidence || 0), 0) /
        recentDiagnostics.length;

      // Count severity distribution
      const severityCounts = recentDiagnostics.reduce(
        (acc, d) => {
          acc[d.severity] = (acc[d.severity] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const criticalCount = severityCounts.critical || 0;
      const severeCount = severityCounts.severe || 0;
      const moderateCount = severityCounts.moderate || 0;
      const minorCount = severityCounts.minor || 0;

      // Calculate score:
      // - Base: 50
      // - +10 for each diagnostic (max +30)
      // - +20 for average confidence (if > 70%)
      // - -5 for each critical issue
      // - -2 for each severe issue
      // - +1 for each minor issue
      healthScore = 50;
      healthScore += Math.min(30, diagnosticsCount * 2);
      healthScore += avgConfidence > 70 ? 20 : avgConfidence > 50 ? 10 : 0;
      healthScore -= criticalCount * 5;
      healthScore -= severeCount * 2;
      healthScore += minorCount * 1;

      // Clamp between 0 and 100
      healthScore = Math.max(0, Math.min(100, healthScore));
    }

    // Reports count (for now, same as diagnostics - can be expanded later)
    const reportsCount = diagnosticsCount;

    // Calculate trends (compare last 7 days vs previous 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    // Recent counts (last 7 days)
    let recentVehicles = 0;
    let recentDiagnosticsCount = 0;
    let previousVehicles = 0;
    let previousDiagnostics = 0;

    try {
      recentVehicles = await prisma.vehicle.count({
        where: {
          userId: user.id,
          createdAt: { gte: sevenDaysAgo },
        },
      });
    } catch (err) {
      console.warn("Error counting recent vehicles:", err);
    }

    try {
      recentDiagnosticsCount = await prisma.diagnosis.count({
        where: {
          userId: user.id,
          createdAt: { gte: sevenDaysAgo },
        },
      });
    } catch (err) {
      console.warn("Error counting recent diagnostics:", err);
    }

    // Previous period counts (7-14 days ago)
    try {
      previousVehicles = await prisma.vehicle.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: fourteenDaysAgo,
            lt: sevenDaysAgo,
          },
        },
      });
    } catch (err) {
      console.warn("Error counting previous vehicles:", err);
    }

    try {
      previousDiagnostics = await prisma.diagnosis.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: fourteenDaysAgo,
            lt: sevenDaysAgo,
          },
        },
      });
    } catch (err) {
      console.warn("Error counting previous diagnostics:", err);
    }

    // Calculate changes
    const vehiclesChange = recentVehicles - previousVehicles;
    const diagnosticsChange = recentDiagnosticsCount - previousDiagnostics;
    const reportsChange = diagnosticsChange; // Reports same as diagnostics for now
    const healthScoreChange = diagnosticsChange > 0 ? 1 : diagnosticsChange < 0 ? -1 : 0;

    const stats = {
      vehicles: vehiclesCount,
      diagnostics: diagnosticsCount,
      reports: reportsCount,
      healthScore: Math.round(healthScore),
      vehiclesChange,
      diagnosticsChange,
      reportsChange,
      healthScoreChange,
    };

    return NextResponse.json(
      {
        success: true,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard stats error:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : "Une erreur est survenue")
      : "Une erreur est survenue";
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

