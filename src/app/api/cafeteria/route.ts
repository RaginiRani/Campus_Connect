import { NextResponse } from "next/server";
import connect from "@/lib/dbConfig";
import Cafeteria from "@/models/Cafeteria";

export async function GET() {
  await connect();

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const menus = await Cafeteria.find({
    date: { $gte: today, $lte: nextWeek },
  }).sort({ date: 1 });

  return NextResponse.json({ data: menus });
}
