"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

type EventType = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events?page=1", { cache: "no-store" });
        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Calendar className="h-6 w-6 text-cyan-400" /> College Events
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-400">No upcoming events</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
              <p className="text-gray-300 text-sm">{event.description}</p>
              <p className="text-gray-400 text-sm mt-2">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm">📍 {event.location}</p>
              <Link
                href={`/events/${event._id}`}
                className="mt-3 inline-block text-cyan-400 font-medium hover:underline text-sm"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
