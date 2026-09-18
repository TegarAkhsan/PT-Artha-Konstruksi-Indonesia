import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import InquiryAdminClient from "./InquiryAdminClient";

export default async function AdminInquiriesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Manajemen Komersial
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          Inbox Pesan Inquiry & Tender
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Pantau seluruh pesan masuk dari calon klien, atur status tindak lanjut, dan
          tambahkan catatan internal tim sales.
        </p>
      </div>

      <InquiryAdminClient initialInquiries={inquiries} />
    </div>
  );
}
