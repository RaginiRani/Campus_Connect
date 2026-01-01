import connect from "@/lib/dbConfig";
import { requireAdmin } from "@/lib/requireAdmin";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await requireAdmin();
    await connect();

    const body = await req.json();
    const { title, description, date, location } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create event
    await Event.create({
      title,
      description,
      date,
      location,
      createdBy: session.user.id,
    });

    // Fetch all students
    const users = await User.find({ role: "student" });

    // Create notifications for all students
    await Notification.insertMany(
      users.map((u) => ({
        title: "New Event Added",
        message: `${title} has been scheduled`,
        type: "event",
        user: u._id,       // assign to student
        read: false,
        createdAt: new Date(),
      }))
    );

    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }
}
