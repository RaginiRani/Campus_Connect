import { NextResponse } from "next/server";
import Cafeteria from "@/models/Cafeteria";
import connect from "@/lib/dbConfig";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    await connect();
    await requireAdmin();

    const updatedMenu = await Cafeteria.findByIdAndUpdate(id, body, { new: true });

    if (!updatedMenu) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu updated", data: updatedMenu });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await connect();
    await requireAdmin();

    const deletedMenu = await Cafeteria.findByIdAndDelete(id);

    if (!deletedMenu) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu deleted", data: deletedMenu });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
