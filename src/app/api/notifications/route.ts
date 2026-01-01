import { NextResponse } from "next/server";
import connect from "@/lib/dbConfig";
import Notification from "@/models/Notification";

export async function GET() {
  await connect();

  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(20);

  return NextResponse.json({ data: notifications });
}
