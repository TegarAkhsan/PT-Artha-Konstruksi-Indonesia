import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "CONTENT_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      client,
      location,
      year,
      value,
      category,
      description,
      scopeOfWork,
      status,
      featured,
      thumbnail,
    } = body;

    if (!title || !client || !location || !year || !description || !thumbnail) {
      return NextResponse.json(
        { message: "Mohon lengkapi seluruh field wajib (*)" },
        { status: 400 }
      );
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(Math.random() * 1000);

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        client,
        location,
        year: parseInt(year, 10),
        value: value || null,
        category: category || "Building Construction",
        description,
        scopeOfWork: scopeOfWork || "Pekerjaan Struktur & Arsitektur",
        status: status || "Completed",
        featured: !!featured,
        thumbnail,
      },
    });

    return NextResponse.json({ message: "Proyek berhasil ditambahkan", project }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ message: "Gagal menyimpan proyek" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "CONTENT_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID wajib disertakan" }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Proyek berhasil dihapus" });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ message: "Gagal menghapus proyek" }, { status: 500 });
  }
}
