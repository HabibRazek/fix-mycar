import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await deleteSession();

    // Check if this is a form submission or API call
    const contentType = request.headers.get("content-type");
    const isFormSubmission = !contentType || !contentType.includes("application/json");

    if (isFormSubmission) {
      // For form submissions, redirect using 303 See Other (proper for POST->GET redirect)
      const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
      return NextResponse.redirect(new URL("/login", baseUrl), { status: 303 });
    }

    // For API calls, return JSON
    return NextResponse.json(
      { success: true, message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la déconnexion" },
      { status: 500 }
    );
  }
}

