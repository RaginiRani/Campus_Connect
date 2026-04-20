"use client";

import { useSession, signOut } from "next-auth/react";
import { BookOpen, Calendar, Coffee, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Manage Notes",
    desc: "Upload, edit and delete notes",
    href: "/admin/notes",
    icon: BookOpen,
  },
  {
    title: "Manage Events",
    desc: "Create and update events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Cafeteria Menu",
    desc: "Update daily menus",
    href: "/admin/cafeteria",
    icon: Coffee,
  },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-10 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {session?.user?.name}
          </h1>
          <p className="text-gray-400">
            Role: {session?.user?.role}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Link key={card.title} href={card.href}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-lg"
            >
              <card.icon className="mb-4 h-8 w-8 text-cyan-400" />
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{card.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}