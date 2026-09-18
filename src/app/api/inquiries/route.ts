import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, subject, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "Mohon lengkapi seluruh kolom bertanda bintang (*)" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        company: company || null,
        email,
        phone,
        subject: subject || "Konsultasi Umum Proyek",
        message,
        status: "New",
      },
    });

    return NextResponse.json(
      { message: "Inquiry berhasil disimpan", inquiryId: inquiry.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
