"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Book, Calendar, Coffee, Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const features = [
    {
      title: "Notes",
      description: "Access all your lecture notes anytime.",
      icon: Book,
      href: "/dashboard/notes",
    },
    {
      title: "Events",
      description: "Stay updated with college events.",
      icon: Calendar,
      href: "/events",
    },
    {
      title: "Cafeteria Menu",
      description: "Know today’s meals at a glance.",
      icon: Coffee,
      href: "/cafeteria",
    },
    {
      title: "Notifications",
      description: "Never miss important updates.",
      icon: Bell,
      href: "/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2b2d42] text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-b from-[#2b2d42] to-[#1b1f3b]">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          College Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
        >
          Your one-stop platform for notes, events, cafeteria menus, and
          notifications.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Link
            href="/signup"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded font-semibold transition"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-white hover:bg-white hover:text-[#2b2d42] rounded font-semibold transition"
          >
            Sign In
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1b1f3b] p-6 rounded-lg shadow hover:shadow-xl transition cursor-pointer"
            >
              <feature.icon className="h-10 w-10 mb-4 text-cyan-400" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              <Link
                href={feature.href}
                className="mt-4 inline-block text-cyan-400 font-medium hover:underline"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1b1f3b] py-6 mt-auto text-center text-gray-400">
        &copy; 2025 College Hub. Made for students, by students.
      </footer>
    </div>
  );
}
