import connect from "@/lib/dbConfig";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "student") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { semester } = await req.json();

  if (!semester || semester < 1 || semester > 8) {
    return NextResponse.json({ message: "Invalid semester" }, { status: 400 });
  }

  await connect();

  await User.findByIdAndUpdate(session.user.id, { semester });

  return NextResponse.json({ success: true });
}
