"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Car, Wrench, CheckCircle, Sparkles, Zap, Shield, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

const features = [
  { text: "Diagnostic IA intelligent", icon: Sparkles },
  { text: "Estimation instantanée des coûts", icon: Zap },
  { text: "Réseau de garages certifiés", icon: Shield },
  { text: "Historique complet sécurisé", icon: CheckCircle },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth status...");
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        console.log("Auth response status:", response.status);

        if (response.ok) {
          // User is authenticated, redirect to dashboard
          const data = await response.json();
          console.log("User is authenticated:", data.user);
          const role = data.user?.role;

          // Redirect based on role - use window.location for hard redirect
          let redirectUrl = "/dashboard";
          switch (role) {
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
          console.log("Redirecting to:", redirectUrl);
          window.location.href = redirectUrl;
        } else {
          console.log("User is not authenticated");
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Vérification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding with Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/Car-diagnostic-Worthing.jpg')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-between w-full">
          {/* Logo */}
          <div>
            <Link href="/" className="group flex items-center gap-4 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Car className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
                  Fix My Car
                </h1>
                <p className="text-sm text-white/60 tracking-wide uppercase">
                  Diagnostic Intelligent
                </p>
              </div>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-10">
            {/* Badge */}
            <Badge variant="secondary" className="bg-white/10 text-white/90 backdrop-blur-sm border-white/20 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Propulsé par l&apos;Intelligence Artificielle
            </Badge>

            {/* Headline */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Diagnostiquez.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Comprenez.
                </span>
                <br />
                Réparez.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-md font-light">
                Notre IA révolutionne le diagnostic automobile. Décrivez les symptômes,
                obtenez un diagnostic précis en <span className="text-white font-medium">quelques secondes</span>.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20">
                    <feature.icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/90 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm border border-white/10">
                  <Wrench className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">500+</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Garages partenaires</p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">98%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Précision IA</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-white/40 tracking-wide">
            © 2024 Fix My Car · Tous droits réservés
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Car className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Fix My Car
              </h1>
              <p className="text-sm text-muted-foreground">Diagnostic Intelligent</p>
            </div>
          </div>

          <Card className="border border-border/50 shadow-2xl bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-3 pb-6 pt-8">
              <CardTitle className="text-3xl font-bold text-center tracking-tight font-[family-name:var(--font-space-grotesk)]">
                {activeTab === "login" ? (
                  <>
                    Bon retour
                    <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">.</span>
                  </>
                ) : (
                  <>
                    Rejoignez-nous
                    <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">.</span>
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-center text-base">
                {activeTab === "login"
                  ? "Accédez à votre espace personnel"
                  : "Créez votre compte en quelques secondes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-muted/50">
                  <TabsTrigger
                    value="login"
                    className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                  >
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                  >
                    Inscription
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-0">
                  <LoginForm onForgotPassword={() => console.log("Forgot password")} />
                </TabsContent>

                <TabsContent value="register" className="mt-0">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
            En continuant, vous acceptez nos{" "}
            <Link href="/terms" className="font-medium text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors">
              Conditions d&apos;utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="font-medium text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

