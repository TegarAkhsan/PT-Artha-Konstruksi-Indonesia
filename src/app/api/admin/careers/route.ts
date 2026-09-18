import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "HR")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { title, department, location, type, description, requirements, deadline } = body;

    if (!title || !department || !location || !description || !requirements) {
      return NextResponse.json({ message: "Field wajib belum lengkap" }, { status: 400 });
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(Math.random() * 1000);

    const career = await prisma.career.create({
      data: {
        title,
        slug,
        department,
        location,
        type: type || "Full-time",
        description,
        requirements,
        deadline: deadline ? new Date(deadline) : null,
        isActive: true,
      },
    });

    return NextResponse.json({ message: "Lowongan berhasil diterbitkan", career }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating career:", error);
    return NextResponse.json({ message: "Gagal membuat lowongan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "HR")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID wajib disertakan" }, { status: 400 });
    }

    await prisma.career.delete({ where: { id } });
    return NextResponse.json({ message: "Lowongan berhasil dihapus" });
  } catch (error: any) {
    console.error("Error deleting career:", error);
    return NextResponse.json({ message: "Gagal menghapus lowongan" }, { status: 500 });
  }
}
