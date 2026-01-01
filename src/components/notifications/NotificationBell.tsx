"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

type Notification = {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  // 🔹 Fetch notifications from server
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (!res.ok) return;

      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔹 Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.filter(n => !n.read).map(n =>
          fetch(`/api/notifications/${n._id}`, { method: "PATCH" })
        )
      );

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const openBell = async () => {
  setOpen(!open);

  if (!open) {
    await fetch("/api/notifications/mark-all-read", {
      method: "PATCH",
    });

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  }
};


  return (
    <div className="relative">
      {/* 🔔 Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={openBell}
        className="relative"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* 📬 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border bg-background shadow-lg z-50">
          <div className="p-3 border-b font-semibold">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No notifications
            </p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <div
                  key={n._id}
                  className={`px-4 py-3 border-b text-sm hover:bg-muted/50 cursor-pointer ${
                    !n.read ? "bg-muted/30" : ""
                  }`}
                >
                  <p className="font-medium">{n.title}</p>
                  <p className="text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
