import { redirect } from "next/navigation";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Get user initials for fallback avatar
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-display font-bold text-xl">Fix My Car</span>
            </div>

            <div className="flex items-center gap-4">
              {/* User Avatar */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{initials}</span>
                </div>
              )}

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <LogoutButton className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

