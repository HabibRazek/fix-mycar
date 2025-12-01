import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentification - Fix My Car",
  description: "Connectez-vous ou créez un compte pour accéder à Fix My Car",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

