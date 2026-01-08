"use client";

import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";

type MenuType = {
  _id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export default function CafeteriaPage() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("/api/cafeteria");
        const data = await res.json();
        setMenus(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Coffee className="h-6 w-6 text-cyan-400" /> Cafeteria Menu
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading cafeteria menus...</p>
      ) : menus.length === 0 ? (
        <p className="text-gray-400">No menu available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition hover:bg-white/10"
            >
              <p className="font-semibold text-gray-200 mb-2">
                📅 {new Date(menu.date).toLocaleDateString()}
              </p>
              <ul className="space-y-1 text-gray-300">
                <li>🍳 Breakfast: {menu.breakfast}</li>
                <li>🍴 Lunch: {menu.lunch}</li>
                <li>🌙 Dinner: {menu.dinner}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
