import connect from "@/lib/dbConfig";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connect();

  const url = new URL(req.url);
  const semester = Number(url.searchParams.get("semester")); // get semester from query

  const query: any = {};
  if (semester) query.semester = semester;

  const notes = await Note.find(query).sort({ semester: 1, title: 1 });

  return NextResponse.json({ data: notes });
}
