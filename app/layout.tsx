import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Import Crisp chat component
const CrispChat = dynamic(() => import("@/components/crisp-chat"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fix My Car - Diagnostic Automobile Intelligent",
  description: "Diagnostiquez votre véhicule avec notre IA et trouvez les meilleurs garages partenaires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <CrispChat />
        {children}
      </body>
    </html>
  );
}
