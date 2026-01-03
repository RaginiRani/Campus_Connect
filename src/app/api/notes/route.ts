import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Note from "@/models/Note";
import connect from "@/lib/dbConfig";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
      console.log("SESSION SEMESTER:", session.user.semester);

    // 🔒 HARD CHECK
    if (!session.user.semester) {
      return NextResponse.json(
        { message: "Semester not set" },
        { status: 403 }
      );
    }

    await connect();

    const notes = await Note.find({
      semester: session.user.semester,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ data: notes });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
