"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type NoteType = {
  _id: string;
  title: string;
  subject: string;
  fileUrl: string;
  semester: number;
  description?: string;
};

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState<number>(1);

  // Fetch all notes
  const fetchNotes = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/notes");
      const data = await res.json();
      setNotes(data.data || []);
    } catch {
      toast.error("Failed to fetch notes");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Upload or Edit note
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `/api/admin/notes/${editingId}`
        : "/api/admin/notes";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subject, fileUrl, description, semester }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Operation failed");

      toast.success(editingId ? "Note updated" : "Note uploaded");

      // Reset form
      setTitle("");
      setSubject("");
      setFileUrl("");
      setDescription("");
      setSemester(1);
      setEditingId(null);

      // Refresh notes list
      fetchNotes();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete note
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`/api/admin/notes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Failed to delete");
      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Edit note
  const handleEdit = (note: NoteType) => {
    setEditingId(note._id);
    setTitle(note.title);
    setSubject(note.subject);
    setFileUrl(note.fileUrl);
    setDescription(note.description || "");
    setSemester(note.semester);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* Upload/Edit Form */}
      <div>
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Note" : "Upload Note"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="File URL"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            min={1}
            max={8}
            className="w-full border p-2 rounded"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            required
          />
          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : editingId ? "Update Note" : "Upload Note"}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Uploaded Notes</h2>
        {fetching ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes uploaded</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-sm text-gray-600">
                    {note.subject} | Semester: {note.semester}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    className="text-sm underline"
                  >
                    View
                  </a>
                  <button
                    className="text-sm text-blue-600 underline"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 underline"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
