import connect from "@/lib/dbConfig";
import { requireAdmin } from "@/lib/requireAdmin";
import Note from "@/models/Note";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";
import User from "@/models/User";



/* ================= GET ALL NOTES (ADMIN) ================= */
export async function GET() {
  await requireAdmin();
  await connect();

  const notes = await Note.find().sort({ createdAt: -1 });

  return NextResponse.json({ data: notes });
}

/* ================= CREATE NOTE ================= */
export async function POST(req: Request) {
  const session = await requireAdmin();
  await connect();

  const body = await req.json();
  const { title, subject, fileUrl, description, semester } = body;

  if (!title || !subject || !fileUrl || !semester) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  await Note.create({
    title,
    subject,
    fileUrl,
    description,
    semester,
    uploadedBy: session.user.id,
  });

  const students = await User.find({ role: "student" });

  await Notification.insertMany(
    students.map((u) => ({
      title: "New Notes Uploaded",
      message: `${title} notes are now available`,
      type: "note",
      user: u._id,
      read: false,
      createdAt: new Date(),
    }))
  );


  return NextResponse.json({ success: true });
}
