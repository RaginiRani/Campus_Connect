"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Menu = {
  _id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export default function AdminCafeteriaPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/cafeteria");
      const data = await res.json();
      setMenus(data.data || []);
    } catch (err) {
      toast.error("Failed to fetch menus");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `/api/admin/cafeteria/${editingId}` : "/api/admin/cafeteria";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, breakfast, lunch, dinner }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed");
        return;
      }

      toast.success(editingId ? "Menu updated" : "Menu added");

      setDate("");
      setBreakfast("");
      setLunch("");
      setDinner("");
      setEditingId(null);

      fetchMenus();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditingId(menu._id);
    setDate(menu.date.split("T")[0]);
    setBreakfast(menu.breakfast);
    setLunch(menu.lunch);
    setDinner(menu.dinner);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu?")) return;

    try {
      const res = await fetch(`/api/admin/cafeteria/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to delete");
        return;
      }
      toast.success("Menu deleted");
      fetchMenus();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">{editingId ? "Edit Menu" : "Add Menu"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border p-2 rounded"/>
        <input type="text" placeholder="Breakfast" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} required className="w-full border p-2 rounded"/>
        <input type="text" placeholder="Lunch" value={lunch} onChange={(e) => setLunch(e.target.value)} required className="w-full border p-2 rounded"/>
        <input type="text" placeholder="Dinner" value={dinner} onChange={(e) => setDinner(e.target.value)} required className="w-full border p-2 rounded"/>
        <button disabled={loading} className="w-full py-2 bg-black text-white rounded disabled:opacity-50">
          {loading ? "Processing..." : editingId ? "Update Menu" : "Add Menu"}
        </button>
      </form>

      <h2 className="text-xl font-semibold">Existing Menus</h2>
      {menus.length === 0 ? <p>No menus added yet.</p> : (
        <ul className="space-y-3">
          {menus.map(menu => (
            <li key={menu._id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{new Date(menu.date).toLocaleDateString()}</p>
                <p className="text-sm">🍳 {menu.breakfast} | 🍴 {menu.lunch} | 🌙 {menu.dinner}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(menu)} className="text-sm underline text-blue-600">Edit</button>
                <button onClick={() => handleDelete(menu._id)} className="text-sm underline text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
