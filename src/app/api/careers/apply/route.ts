import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { careerId, fullName, email, phone, cvFileUrl, portfolioUrl, notes } = body;

    if (!careerId || !fullName || !email || !phone || !cvFileUrl) {
      return NextResponse.json(
        { message: "Mohon lengkapi nama, email, nomor telepon, dan tautan/file CV." },
        { status: 400 }
      );
    }

    const applicant = await prisma.applicant.create({
      data: {
        careerId,
        fullName,
        email,
        phone,
        cvFileUrl,
        portfolioUrl: portfolioUrl || null,
        notes: notes || null,
        status: "Applied",
      },
    });

    return NextResponse.json(
      { message: "Lamaran berhasil dikirimkan!", applicantId: applicant.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating applicant:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan sistem saat memproses lamaran." },
      { status: 500 }
    );
  }
}
