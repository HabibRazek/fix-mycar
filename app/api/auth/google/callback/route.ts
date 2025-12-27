import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Build redirect URI from the request URL
    const requestUrl = new URL(request.url);
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    console.log("Google Callback - Redirect URI:", redirectUri);

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Google OAuth error:", error);
      return NextResponse.redirect(new URL("/login?error=google_auth_failed", baseUrl));
    }

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=no_code", baseUrl));
    }

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      return NextResponse.redirect(new URL("/login?error=token_exchange_failed", baseUrl));
    }

    const tokens: GoogleTokenResponse = await tokenResponse.json();

    // Get user info from Google
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    if (!userInfoResponse.ok) {
      console.error("Failed to get user info");
      return NextResponse.redirect(new URL("/login?error=user_info_failed", baseUrl));
    }

    const googleUser: GoogleUserInfo = await userInfoResponse.json();

    // Log Google user info for debugging
    console.log("Google user info:", {
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email.toLowerCase() },
    });

    if (!user) {
      // Create new user with Google account
      user = await prisma.user.create({
        data: {
          email: googleUser.email.toLowerCase(),
          name: googleUser.name,
          passwordHash: "", // No password for OAuth users
          role: "OWNER",
          emailVerified: googleUser.verified_email ? new Date() : null,
          image: googleUser.picture || null,
        },
      });
      console.log("Created new user with image:", user.image);
    } else {
      // Update existing user with Google info
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          image: googleUser.picture || user.image,
          emailVerified: googleUser.verified_email ? new Date() : user.emailVerified,
        },
      });
      console.log("Updated user with image:", user.image);
    }

    // Create session
    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Redirect based on role
    let redirectUrl = "/dashboard";
    switch (user.role) {
      case "ADMIN":
        redirectUrl = "/admin";
        break;
      case "MECHANIC":
        redirectUrl = "/mechanic";
        break;
      case "INSURER":
        redirectUrl = "/insurer";
        break;
    }

    return NextResponse.redirect(new URL(redirectUrl, baseUrl));
  } catch (error) {
    console.error("Google callback error:", error);
    return NextResponse.redirect(new URL("/login?error=callback_failed", request.url));
  }
}

