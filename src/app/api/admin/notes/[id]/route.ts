import connect from "@/lib/dbConfig";
import { requireAdmin } from "@/lib/requireAdmin";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  await requireAdmin();
  await connect();

  // unwrap params if it's a Promise
  const { id } = "then" in params ? await params : params;

  const body = await req.json();
  const note = await Note.findByIdAndUpdate(id, body, { new: true });

  if (!note) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  await requireAdmin();
  await connect();

  // unwrap params if it's a Promise
  const { id } = "then" in params ? await params : params;

  const deleted = await Note.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
