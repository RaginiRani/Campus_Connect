"use client";

import { useSession } from "next-auth/react";
import { Calendar, BookOpen, Coffee, Bell } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "My Notes",
    desc: "Access and manage your notes",
    href: "/dashboard/notes",
    icon: BookOpen,
  },
  {
    title: "Events",
    desc: "Upcoming college events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Cafeteria",
    desc: "Today’s menu & schedule",
    href: "/cafeteria",
    icon: Coffee,
  },
  {
    title: "Notifications",
    desc: "Important alerts & updates",
    href: "/dashboard",
    icon: Bell,
  },
];

export default function StudentDashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Welcome, {session?.user?.name}
        </h1>
        <p className="text-gray-400">
          Role: {session?.user?.role}
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            className="group rounded-xl border border-white/10 bg-white/5 p-6 cursor-pointer transition-shadow shadow-sm hover:shadow-lg"
          >
            <card.icon className="mb-4 h-8 w-8 text-cyan-400" />
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 ">
        <h2 className="text-xl font-semibold mb-2">📌 Student Hub</h2>
        <p className="text-gray-400 text-sm">
          CampusConnect helps you stay organized with notes, events,
          cafeteria updates, and real-time notifications — all in one place.
        </p>

        <p className="text-gray-400 p-2">
          It is a comprehensive organizational platform designed for students.
        </p>
      </div>
    </div>
  );
}
