"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Wrench,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

const menuItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Diagnostic",
    href: "/diagnostic",
    icon: Wrench,
  },
  {
    title: "Véhicules",
    href: "/dashboard/vehicles",
    icon: Car,
  },
  {
    title: "Rapports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get user initials for fallback avatar
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">FM</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-gray-900">
                Fix My Car
              </span>
              <p className="text-xs text-gray-500">Tableau de bord</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {user.image && !imageError ? (
                <div className="h-10 w-10 rounded-full border-2 border-gray-200 overflow-hidden relative flex-shrink-0 bg-gray-100">
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={() => {
                      console.error("Failed to load user image:", user.image);
                      setImageError(true);
                    }}
                    priority
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {initials}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-500/20"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      <Icon
                        className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`}
                      />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={async () => {
                const response = await fetch("/api/auth/logout", {
                  method: "POST",
                });
                if (response.ok) {
                  window.location.href = "/login";
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

