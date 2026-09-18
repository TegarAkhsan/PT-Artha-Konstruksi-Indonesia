import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "HR")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ message: "ID dan status wajib diisi" }, { status: 400 });
    }

    const updated = await prisma.applicant.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ message: "Status pelamar berhasil diperbarui", applicant: updated });
  } catch (error: any) {
    console.error("Error updating applicant:", error);
    return NextResponse.json({ message: "Gagal memperbarui status pelamar" }, { status: 500 });
  }
}
