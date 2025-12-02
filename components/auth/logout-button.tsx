"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Force a hard navigation to clear any cached state
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "Déconnexion..." : "Déconnexion"}
    </button>
  );
}

