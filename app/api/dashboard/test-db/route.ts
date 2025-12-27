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

    const tests: Record<string, any> = {};

    // Test 1: Check if Vehicle model exists
    try {
      const vehicleCount = await prisma.vehicle.count();
      tests.vehicleModel = { success: true, count: vehicleCount };
    } catch (err: any) {
      tests.vehicleModel = { 
        success: false, 
        error: err.message,
        code: err.code 
      };
    }

    // Test 2: Check if Diagnosis model exists
    try {
      const diagnosisCount = await prisma.diagnosis.count();
      tests.diagnosisModel = { success: true, count: diagnosisCount };
    } catch (err: any) {
      tests.diagnosisModel = { 
        success: false, 
        error: err.message,
        code: err.code 
      };
    }

    // Test 3: Check database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      tests.databaseConnection = { success: true };
    } catch (err: any) {
      tests.databaseConnection = { 
        success: false, 
        error: err.message 
      };
    }

    // Test 4: Check user query
    try {
      const userCount = await prisma.user.count({
        where: { id: user.id }
      });
      tests.userQuery = { success: true, count: userCount };
    } catch (err: any) {
      tests.userQuery = { 
        success: false, 
        error: err.message 
      };
    }

    return NextResponse.json({
      success: true,
      tests,
      userId: user.id,
    });
  } catch (error) {
    console.error("Test DB error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Une erreur est survenue",
        details: String(error)
      },
      { status: 500 }
    );
  }
}

