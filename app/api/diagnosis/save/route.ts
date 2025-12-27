import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Handle both snake_case (from backend) and camelCase formats
    const {
      // Form data
      brand,
      model,
      year,
      carType,
      fuelType,
      transmission,
      mileage,
      problemCategory,
      problemSeverity,
      problemDuration,
      problemFrequency,
      symptoms,
      warningLights,
      warning_lights_input, // Also check snake_case
      problemDescription,
      recentMaintenance,
      additionalNotes,
      // Prediction results - handle both formats
      category,
      diagnosis,
      partInvolved,
      part_involved, // Also check snake_case
      severity,
      urgency,
      repairAction,
      repair_action, // Also check snake_case
      estimatedCostMin,
      estimated_cost_min, // Also check snake_case
      estimatedCostMax,
      estimated_cost_max, // Also check snake_case
      confidence,
    } = body;

    // Normalize field names (prefer camelCase, fallback to snake_case)
    const normalizedPartInvolved = partInvolved || part_involved || "";
    const normalizedRepairAction = repairAction || repair_action || "";
    const normalizedCostMin = estimatedCostMin || estimated_cost_min || 0;
    const normalizedCostMax = estimatedCostMax || estimated_cost_max || 0;
    const normalizedWarningLights = warningLights || warning_lights_input || [];

    // Validate required fields
    if (!brand || !model || !year) {
      return NextResponse.json(
        { error: "Les informations du véhicule (marque, modèle, année) sont requises" },
        { status: 400 }
      );
    }

    if (!category || !diagnosis) {
      return NextResponse.json(
        { error: "Les résultats de prédiction sont incomplets" },
        { status: 400 }
      );
    }

    // Find or create vehicle
    let vehicle;
    try {
      vehicle = await prisma.vehicle.findFirst({
        where: {
          userId: user.id,
          brand: brand || "",
          model: model || "",
          year: year || "",
        },
      });

      if (!vehicle) {
        vehicle = await prisma.vehicle.create({
          data: {
            userId: user.id,
            brand: brand || "",
            model: model || "",
            year: year || "",
            carType: carType || "",
            fuelType: fuelType || "",
            transmission: transmission || "",
            mileage: mileage || "",
          },
        });
      } else {
        // Update mileage if provided
        if (mileage) {
          vehicle = await prisma.vehicle.update({
            where: { id: vehicle.id },
            data: { mileage },
          });
        }
      }
    } catch (vehicleError) {
      console.error("Error with vehicle:", vehicleError);
      return NextResponse.json(
        { error: "Erreur lors de la gestion du véhicule" },
        { status: 500 }
      );
    }

    // Save diagnosis
    const savedDiagnosis = await prisma.diagnosis.create({
      data: {
        userId: user.id,
        vehicleId: vehicle.id,
        problemCategory: problemCategory || "",
        problemSeverity: problemSeverity || "",
        problemDuration: problemDuration || "",
        problemFrequency: problemFrequency || "",
        symptoms: Array.isArray(symptoms) ? symptoms : [],
        warningLights: Array.isArray(normalizedWarningLights) ? normalizedWarningLights : [],
        problemDescription: problemDescription || "",
        recentMaintenance: recentMaintenance || null,
        additionalNotes: additionalNotes || null,
        category: category || "",
        diagnosis: diagnosis || "",
        partInvolved: normalizedPartInvolved,
        severity: severity || "moderate",
        urgency: urgency || "medium",
        repairAction: normalizedRepairAction,
        estimatedCostMin: parseFloat(String(normalizedCostMin)) || 0,
        estimatedCostMax: parseFloat(String(normalizedCostMax)) || 0,
        confidence: parseFloat(String(confidence)) || 0,
        vehicleBrand: brand || "",
        vehicleModel: model || "",
        vehicleYear: year || "",
        vehicleMileage: mileage || "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        diagnosis: savedDiagnosis,
        vehicle: vehicle,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save diagnosis error:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : "Une erreur est survenue lors de la sauvegarde")
      : "Une erreur est survenue lors de la sauvegarde";
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

