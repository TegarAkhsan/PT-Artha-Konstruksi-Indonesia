import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const {
      companyName,
      slogan,
      description,
      address,
      phone,
      whatsapp,
      email,
      experienceYears,
      completedProjects,
      professionalStaff,
      corporateClients,
    } = body;

    const updated = await prisma.companyProfile.upsert({
      where: { id: "default" },
      update: {
        companyName,
        slogan,
        description,
        address,
        phone,
        whatsapp,
        email,
        experienceYears: parseInt(experienceYears, 10),
        completedProjects: parseInt(completedProjects, 10),
        professionalStaff: parseInt(professionalStaff, 10),
        corporateClients: parseInt(corporateClients, 10),
      },
      create: {
        id: "default",
        companyName,
        slogan,
        description,
        address,
        phone,
        whatsapp,
        email,
        experienceYears: parseInt(experienceYears, 10),
        completedProjects: parseInt(completedProjects, 10),
        professionalStaff: parseInt(professionalStaff, 10),
        corporateClients: parseInt(corporateClients, 10),
      },
    });

    return NextResponse.json({ message: "Pengaturan berhasil diperbarui", profile: updated });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ message: "Gagal menyimpan pengaturan" }, { status: 500 });
  }
}
