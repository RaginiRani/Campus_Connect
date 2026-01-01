"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
  subject: string;
  fileUrl: string;
  semester: number;
  description?: string;
}

export default function StudentNotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // wait for session

    // redirect if semester not set
    if (!session?.user?.semester) {
      router.push("/dashboard/profile");
      return;
    }

    // fetch notes for this student
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        // filter notes by student's semester
        const semesterNotes = data.data?.filter(
          (note: Note) => note.semester === session.user.semester
        ) || [];
        setNotes(semesterNotes);
      } catch (err) {
        console.error(err);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [session, status, router]);

  if (status === "loading" || loading) return <p>Loading...</p>;

  return (
    <>
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes available for your semester</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note._id} className="border p-3 rounded">
              <p className="font-semibold">{note.title}</p>
              <p className="text-sm text-gray-600">{note.subject}</p>
              {note.description && (
                <p className="text-sm text-gray-500">{note.description}</p>
              )}
              <a
                href={note.fileUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
    
  );
}
