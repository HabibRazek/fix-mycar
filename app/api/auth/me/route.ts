import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// Disable caching for this route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      const response = NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      return response;
    }

    const response = NextResponse.json({ user }, { status: 200 });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

