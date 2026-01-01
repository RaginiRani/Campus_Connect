import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await requireAdmin();

        return NextResponse.json({
            message: "Admin access verified",
        });
    } catch (error) {
        return NextResponse.json(
            {message: "Forbidden"},
            {status: 403}
        );
    }
}