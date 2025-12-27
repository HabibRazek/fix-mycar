"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface UserProfileCardProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
    createdAt?: Date | string;
  };
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const [imageError, setImageError] = useState(false);

  // Get user initials for fallback avatar
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      OWNER: "Propriétaire",
      MECHANIC: "Mécanicien",
      INSURER: "Assureur",
      ADMIN: "Administrateur",
      ML_ENGINEER: "Ingénieur ML",
    };
    return roleMap[role] || role;
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Informations du compte
      </h2>
      <div className="flex items-start gap-4 mb-6">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {user.image && !imageError ? (
            <div className="h-20 w-20 rounded-full border-2 border-gray-200 overflow-hidden relative bg-gray-100">
              <Image
                src={user.image}
                alt={user.name}
                fill
                sizes="80px"
                className="object-cover"
                onError={() => {
                  console.error("Failed to load user image:", user.image);
                  setImageError(true);
                }}
                priority
              />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{initials}</span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Nom</p>
          <p className="font-medium text-gray-900">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-900">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Rôle</p>
          <p className="font-medium text-gray-900">{getRoleLabel(user.role)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Membre depuis</p>
          <p className="font-medium text-gray-900">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "-"}
          </p>
        </div>
      </div>

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 font-mono">
            Image URL: {user.image || "No image"}
          </p>
          <p className="text-xs text-gray-500 font-mono mt-1">
            Image Error: {imageError ? "Yes" : "No"}
          </p>
        </div>
      )}
    </Card>
  );
}

