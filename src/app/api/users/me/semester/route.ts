import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connect from "@/lib/dbConfig";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  await connect();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { semester } = body;
  if (!semester || semester < 1 || semester > 8) {
    return NextResponse.json({ message: "Invalid semester" }, { status: 400 });
  }

  await User.findByIdAndUpdate(session.user.id, { semester });
  return NextResponse.json({ message: "Semester updated successfully" });
}
