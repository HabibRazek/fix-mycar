"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Car, Wrench, Shield, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserRole } from "@/types/auth";

// Google Icon Component
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// Facebook Icon Component
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  role: z.nativeEnum(UserRole),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// Role configuration with icons and labels
const roleConfig = {
  [UserRole.OWNER]: {
    icon: Car,
    label: "Particulier",
    description: "Propriétaire de véhicule"
  },
  [UserRole.MECHANIC]: {
    icon: Wrench,
    label: "Mécanicien",
    description: "Professionnel auto"
  },
  [UserRole.INSURER]: {
    icon: Shield,
    label: "Assureur",
    description: "Expert assurance"
  },
  [UserRole.ADMIN]: { icon: Shield, label: "Admin", description: "" },
  [UserRole.ML_ENGINEER]: { icon: Shield, label: "ML", description: "" },
};

// Only show these roles for public registration
const publicRoles = [UserRole.OWNER, UserRole.MECHANIC, UserRole.INSURER];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.OWNER,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Une erreur est survenue");
        return;
      }

      // Success!
      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 2000);

    } catch (err) {
      console.error("Register error:", err);
      setError("Une erreur de connexion est survenue");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSocialSignup(provider: "google" | "facebook") {
    setSocialLoading(provider);

    if (provider === "google") {
      // Redirect to Google OAuth endpoint (same as login - will create account if needed)
      window.location.href = "/api/auth/google";
    } else if (provider === "facebook") {
      // TODO: Implement Facebook signup
      console.log("Facebook signup not implemented yet");
      setSocialLoading(null);
    }
  }

  // Show success message
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-center">Compte créé avec succès !</h3>
        <p className="text-muted-foreground text-center text-sm">
          Redirection vers la page de connexion...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      {/* Social Signup Buttons - Side by Side */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 font-medium bg-background hover:bg-muted/50 border-muted-foreground/20 hover:border-muted-foreground/40 transition-all duration-200"
          onClick={() => handleSocialSignup("google")}
          disabled={socialLoading !== null}
        >
          {socialLoading === "google" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <GoogleIcon className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Google</span>
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-11 font-medium bg-background hover:bg-[#1877F2]/5 border-muted-foreground/20 hover:border-[#1877F2]/50 transition-all duration-200"
          onClick={() => handleSocialSignup("facebook")}
          disabled={socialLoading !== null}
        >
          {socialLoading === "facebook" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <FacebookIcon className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Facebook</span>
            </>
          )}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted-foreground/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-4 text-muted-foreground font-medium tracking-wider">
            ou
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name & Email in grid on larger screens */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium tracking-wide">Nom complet</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Jean Dupont"
                      className="pl-11 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background transition-all"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium tracking-wide">Email</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="vous@exemple.com"
                      type="email"
                      className="pl-11 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background transition-all"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Role Selection */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium tracking-wide">Vous êtes</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-3">
                  {publicRoles.map((role) => {
                    const config = roleConfig[role];
                    const IconComponent = config.icon;
                    const isSelected = field.value === role;

                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => field.onChange(role)}
                        className={`
                          relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
                          ${isSelected
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                            : 'border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30'
                          }
                        `}
                      >
                        <div className={`
                          flex h-10 w-10 items-center justify-center rounded-lg transition-colors
                          ${isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className={`text-sm font-semibold tracking-wide ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {config.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Password Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium tracking-wide">Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className="pl-11 pr-12 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background transition-all"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted/50 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium tracking-wide">Confirmer</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-11 pr-12 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background transition-all"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted/50 rounded-lg"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Création en cours...
            </>
          ) : (
            "Créer mon compte"
          )}
        </Button>
        </form>
      </Form>
    </div>
  );
}

