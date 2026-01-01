"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [semester, setSemester] = useState<number | "">(
    session?.user?.semester ?? ""
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const saveSemester = async () => {
    if (!semester) return toast.error("Select semester");

    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ semester }),
    });

    if (res.ok) {
      await update(); // refresh session
      toast.success("Semester updated");
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      toast.error("Failed to update");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p className="mb-2"><b>Name:</b> {session?.user?.name}</p>
      <p className="mb-4"><b>Email:</b> {session?.user?.email}</p>

      <label className="block mb-2">Semester</label>
      <select
        value={semester}
        onChange={(e) => setSemester(Number(e.target.value))}
        className="border p-2 w-full rounded"
      >
        <option value="">Select semester</option>
        {[1,2,3,4,5,6,7,8].map(s => (
          <option key={s} value={s}>Semester {s}</option>
        ))}
      </select>

      <button
        onClick={saveSemester}
        disabled={loading}
        className="mt-4 bg-black text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
