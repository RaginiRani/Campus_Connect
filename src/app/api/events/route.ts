import connect from "@/lib/dbConfig";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

// GET: list events
export async function GET(req: Request) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = 5;

    const query: any = {};
    const now = new Date();
    query.date = { $gte: now }; // only upcoming events

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("createdBy", "name");

    const total = await Event.countDocuments(query);

    return NextResponse.json({
      data: events,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
