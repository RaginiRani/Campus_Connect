import { NextResponse } from "next/server";
import Cafeteria from "@/models/Cafeteria";
import connect from "@/lib/dbConfig";
import { requireAdmin } from "@/lib/requireAdmin";
import Notification from "@/models/Notification";
import User from "@/models/User";



export async function POST(req: Request) {
  try {
    await connect();
    const session = await requireAdmin();

    const body = await req.json();
    const { date, breakfast, lunch, dinner } = body;

    if (!date || !breakfast || !lunch || !dinner) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const menu = await Cafeteria.create({
      date,
      breakfast,
      lunch,
      dinner,
      createdBy: session.user.id,
    });

    const students = await User.find({ role: "student" });

    await Notification.insertMany(
      students.map((u) => ({
        title: "Cafeteria Menu Updated",
        message: `New cafeteria menu is available for ${new Date(date).toDateString()}`,
        type: "cafeteria",
        user: u._id,
        read: false,
        createdAt: new Date(),
      }))
    );



    return NextResponse.json({ message: "Menu added", data: menu }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
}
