"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Bell, BookOpen, Calendar, Coffee } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import clsx from "clsx";
import LogoutButton from "@/components/logoutButton";

const navItems = [
  { name: "Notes", href: "/dashboard/notes", icon: BookOpen },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Cafeteria", href: "/cafeteria", icon: Coffee },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/dashboard" className="text-xl font-bold text-cyan-400">
            CampusConnect
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 text-sm transition",
                    active
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}

            {/* Notification Bell */}
            <NotificationBell />

            {/* Logout */}
            <LogoutButton/>
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
