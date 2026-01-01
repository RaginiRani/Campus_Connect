"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call your signup API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2b2d42] to-[#1b1f3b] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 border border-white/10 p-8 rounded-xl shadow-2xl backdrop-blur-md"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 placeholder-gray-300 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 placeholder-gray-300 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 placeholder-gray-300 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-white shadow-lg transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
