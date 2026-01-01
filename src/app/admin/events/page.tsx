"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data.data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = editingId ? "PATCH" : "POST";
    const url = editingId
      ? `/api/admin/events/${editingId}`
      : "/api/admin/events";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, date, location }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed");
    } else {
      toast.success(editingId ? "Event updated" : "Event created");
      resetForm();
      fetchEvents();
    }

    setLoading(false);
  };

  const handleEdit = (event: Event) => {
    setEditingId(event._id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.split("T")[0]);
    setLocation(event.location);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    const res = await fetch(`/api/admin/events/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Event deleted");
      fetchEvents();
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        {editingId ? "Edit Event" : "Create Event"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : editingId ? "Update Event" : "Create Event"}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Events</h2>

        <ul className="space-y-3">
          {events.map((event) => (
            <li
              key={event._id}
              className="border p-3 rounded flex justify-between"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">
                  {new Date(event.date).toDateString()} • {event.location}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(event)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
