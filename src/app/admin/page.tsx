"use client";

import { signOut, useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {session?.user?.name}!</p>
      <p>Your role: {session?.user?.role}</p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
