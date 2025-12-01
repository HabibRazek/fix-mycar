import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST() {
  try {
    await deleteSession();
    // Redirect to login page after logout
    return NextResponse.redirect(new URL("/login", process.env.BETTER_AUTH_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la déconnexion" },
      { status: 500 }
    );
  }
}

