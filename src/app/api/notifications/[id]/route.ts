import { NextResponse } from "next/server";
import connect from "@/lib/dbConfig";
import Notification from "@/models/Notification";

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  await connect();

  await Notification.findByIdAndUpdate(context.params.id, {
    read: true,
  });

  return NextResponse.json({ success: true });
}
