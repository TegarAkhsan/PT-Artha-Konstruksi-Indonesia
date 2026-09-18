import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, internalNotes } = body;

    if (!id) {
      return NextResponse.json({ message: "ID wajib diisi" }, { status: 400 });
    }

    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(internalNotes !== undefined ? { internalNotes } : {}),
      },
    });

    return NextResponse.json({ message: "Inquiry berhasil diperbarui", inquiry: updated });
  } catch (error: any) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ message: "Gagal memperbarui inquiry" }, { status: 500 });
  }
}
