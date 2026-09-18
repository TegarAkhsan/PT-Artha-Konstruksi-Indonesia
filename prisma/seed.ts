import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding PT Artha Konstruksi Indonesia database...");

  // 1. Seed Users
  const passwordHash = await bcrypt.hash("admin123", 10);
  const contentHash = await bcrypt.hash("content123", 10);
  const hrHash = await bcrypt.hash("hr123", 10);

  await prisma.user.upsert({
    where: { email: "admin@arthakonstruksi.co.id" },
    update: {},
    create: {
      name: "Bambang Sudiro, M.T. (Super Admin)",
      email: "admin@arthakonstruksi.co.id",
      password: passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "content@arthakonstruksi.co.id" },
    update: {},
    create: {
      name: "Siti Rahmawati (Corporate Secretary)",
      email: "content@arthakonstruksi.co.id",
      password: contentHash,
      role: "CONTENT_ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "hr@arthakonstruksi.co.id" },
    update: {},
    create: {
      name: "Dimas Pratama, S.Psi. (Talent Acquisition)",
      email: "hr@arthakonstruksi.co.id",
      password: hrHash,
      role: "HR",
    },
  });

  // 2. Seed Company Profile
  await prisma.companyProfile.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      companyName: "PT Artha Konstruksi Indonesia",
      slogan: "Membangun Masa Depan dengan Presisi, Inovasi & Integritas",
      description:
        "PT Artha Konstruksi Indonesia adalah perusahaan kontraktor umum, rekayasa teknik (engineering), dan manajemen konstruksi terkemuka di Indonesia. Berdiri dengan komitmen kuat pada standar kualitas internasional, penerapan K3 (Kesehatan dan Keselamatan Kerja) tanpa kompromi, dan adopsi teknologi Building Information Modeling (BIM) untuk mewujudkan proyek bernilai tinggi bagi klien korporat, BUMN, dan pengembang nasional.",
      address: "Artha Graha Tower Lt. 18, Kawasan SCBD, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190, Indonesia",
      phone: "+62 21 5289 7700",
      whatsapp: "+62 811 8900 770",
      email: "info@arthakonstruksi.co.id",
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257577546531!2d106.80808827586821!3d-6.229735293758368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15152865c6b%3A0xe54dbd19b78864ec!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
      experienceYears: 16,
      completedProjects: 142,
      professionalStaff: 75,
      corporateClients: 38,
      linkedin: "https://linkedin.com/company/artha-konstruksi-indonesia",
      instagram: "https://instagram.com/arthakonstruksi",
      facebook: "https://facebook.com/arthakonstruksi",
      youtube: "https://youtube.com/@arthakonstruksi",
    },
  });

  // 3. Seed Services
  const servicesData = [
    {
      title: "Building Construction",
      slug: "building-construction",
      category: "Construction",
      description: "Pembangunan gedung bertingkat tinggi (high-rise), kawasan perkantoran, perhotelan bintang lima, rumah sakit modern, dan pusat perbelanjaan dengan standar struktur tahan gempa dan efisiensi energi.",
      icon: "Building2",
      scopeOfWork: "Pekerjaan Struktur Bawah (Substructure) & Pondasi Bore Pile\nPekerjaan Struktur Atas (Superstructure) Beton Bertulang & Baja Komposit\nPekerjaan Arsitektural, Facade Curtain Wall, & Interior Finishing\nPengujian Mutu Beton & Non-Destructive Testing (NDT)",
      thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop",
      order: 1,
    },
    {
      title: "Industrial & Plant Construction",
      slug: "industrial-construction",
      category: "Construction",
      description: "Konstruksi fasilitas manufaktur modern, pabrik kimia, hanggar pesawat, pusat logistik & automated warehouse dengan bentang lebar dan beban lantai tinggi.",
      icon: "Factory",
      scopeOfWork: "Struktur Rangka Baja Berat (Heavy Steel Structure)\nPengecoran Lantai Industri Anti-Debu (Floor Hardener & Epoxy Screed)\nInstalasi Utilitas Pabrik, Piping, & Waste Water Treatment Plant (WWTP)\nPemasangan Overhead Crane & Loading Dock Systems",
      thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop",
      order: 2,
    },
    {
      title: "Infrastructure & Heavy Civil",
      slug: "infrastructure",
      category: "Construction",
      description: "Pengembangan infrastruktur vital publik mencakup jembatan bentang panjang, flyover, jalan tol, dermaga pelabuhan, dan jaringan drainase utama perkotaan.",
      icon: "Truck",
      scopeOfWork: "Pekerjaan Tanah Massal (Cut & Fill) & Stabilisasi Lereng\nPancang Girder Beton Prategang (Prestressed Concrete Girder)\nPengecoran Rigid Pavement & Pengaspalan Hotmix\nKonstruksi Box Culvert & Saluran Primer",
      thumbnail: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1200&auto=format&fit=crop",
      order: 3,
    },
    {
      title: "Civil & Structural Engineering",
      slug: "civil-engineering",
      category: "Engineering",
      description: "Kajian geoteknik komprehensif, desain struktur tahan gempa mengacu SNI terbaru, analisis elemen hingga (FEM), dan pemodelan pondasi dalam tanah lunak.",
      icon: "DraftingCompass",
      scopeOfWork: "Analisis Geoteknik & Rekomendasi Sistem Pondasi\nDesain Rekayasa Struktur Beton & Rangka Baja Tahan Gempa\nPerhitungan Beban Dinamis Mesin & Gempa (ETABS & SAP2000)\nAudit Keandalan Struktur (Structural Health Assessment)",
      thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      order: 4,
    },
    {
      title: "Mechanical, Electrical & Plumbing (MEP)",
      slug: "mep-engineering",
      category: "Engineering",
      description: "Rekayasa sistem tata udara (HVAC), distribusi tenaga listrik tegangan menengah/rendah, sistem pemadam kebakaran (hydrant & sprinkler), dan otomasi gedung (BMS).",
      icon: "Cpu",
      scopeOfWork: "Instalasi Gardu Listrik, Trafo, Genset & Distribusi Daya Listrik\nSistem Tata Udara Sentral Chiller & VRV/VRF\nSistem Proteksi Kebakaran Otomatis (Hydrant, Sprinkler, Clean Agent)\nPlumbing, Water Treatment & Sewage Treatment Plant",
      thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      order: 5,
    },
    {
      title: "Project Management & BIM Supervision",
      slug: "project-management",
      category: "Project Management",
      description: "Pengawasan menyeluruh siklus proyek dari perencanaan awal, penjadwalan presisi, pengendalian biaya (Value Engineering), hingga integrasi BIM 4D/5D.",
      icon: "ClipboardCheck",
      scopeOfWork: "Penyusunan Master Schedule & Critical Path Method (CPM)\nPengendalian Biaya & Analisis Value Engineering\nImplementasi BIM 4D (Time Scheduling) & 5D (Cost Estimation)\nAudit Mutu Lapangan & Pelaporan K3 Berkala",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      order: 6,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 4. Seed Projects
  const projectsData = [
    {
      title: "Menara Artha Financial Center",
      slug: "menara-artha-financial-center",
      client: "PT Artha Graha Sentosa Investama",
      location: "SCBD Lot 11, Jakarta Selatan",
      year: 2024,
      value: "Rp 320 Miliar",
      category: "Building Construction",
      description: "Pembangunan gedung perkantoran Grade-A setinggi 36 lantai dengan 4 lantai basement. Gedung ini meraih sertifikasi Green Building Platinum dengan konsumsi energi 30% lebih hemat serta menggunakan teknologi facade curtain wall double glazed low-E glass.",
      scopeOfWork: "Pekerjaan Struktur Bawah Diaphragm Wall & 4 Basement\nPekerjaan Superstruktur Beton Mutu Tinggi fc' 50 MPa\nPekerjaan Arsitektur & Curtain Wall Facade\nIntegrasi Building Management System (BMS)",
      status: "Completed",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Nusantara Logistics Hub & Smart Warehouse",
      slug: "nusantara-logistics-hub",
      client: "Konsorsium Otorita IKN & Mitra Swasta",
      location: "Kawasan Inti Pusat Pemerintahan (KIPP), IKN Nusantara",
      year: 2025,
      value: "Rp 185 Miliar",
      category: "Industrial Construction",
      description: "Pusat distribusi logistik terintegrasi seluas 45.000 m² yang dirancang ramah lingkungan (net-zero ready). Dilengkapi sistem atap panel surya 1.2 MWp dan lantai beton berpresisi tinggi (superflat floor class FM2) untuk automated guided vehicles (AGV).",
      scopeOfWork: "Struktur Baja Bentang Lebar 60 meter tanpa kolom tengah\nPengecoran Lantai Superflat FM2 dengan Laser Screed\nInstalasi Cold Storage -25°C & Dry Storage\nSistem Penampungan Air Hujan (Rainwater Harvesting) 5.000 m³",
      status: "Ongoing",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Cikarang Modern Manufacturing Facility Phase 3",
      slug: "cikarang-modern-manufacturing",
      client: "PT Global Precision Component",
      location: "Kawasan Industri GIIC Deltamas, Cikarang, Jawa Barat",
      year: 2023,
      value: "Rp 145 Miliar",
      category: "Industrial Construction",
      description: "Pabrik perakitan komponen presisi otomotif seluas 32.000 m² dengan cleanroom class 10.000, gardu listrik 5 MVA, dan fasilitas pengolahan limbah industri berstandar lingkungan ketat.",
      scopeOfWork: "Pondasi Spun Pile diameter 500 mm kedalaman 28 meter\nPekerjaan Rangka Baja Berat 1.800 Ton\nInstalasi Cleanroom & Air Handling Unit (AHU) Presisi\nPembangunan Gedung Perkantoran & Fasilitas Penunjang Karyawan",
      status: "Completed",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Jembatan Layang Flyover Sei Mahakam Akses Pelabuhan",
      slug: "flyover-sei-mahakam",
      client: "Dinas Pekerjaan Umum & Tata Ruang Provinsi Kaltim",
      location: "Samarinda - Palaran, Kalimantan Timur",
      year: 2023,
      value: "Rp 210 Miliar",
      category: "Infrastructure",
      description: "Proyek infrastruktur konektivitas pelabuhan sepanjang 1.2 kilometer menggunakan sistem struktur PCI Girder bentang 40 meter dan bore pile diameter 1.200 mm di area tanah aluvial tepi sungai.",
      scopeOfWork: "Bored Piling di atas ponton kerja tepi sungai\nPier Head & Kolom Beton Bertulang 18 Pier\nErection 144 Balok Girder Prategang (Prestressed PCI Girder)\nPengecoran Deck Slab & Pengaspalan Aspal Modifikasi Polimer (PMA)",
      status: "Completed",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Pabrik Petrokimia & Tangki Penyimpanan Bahan Kimia Cilegon",
      slug: "pabrik-petrokimia-cilegon",
      client: "PT Petro Nusa Indah Tbk",
      location: "Kawasan Industri Krakatau, Cilegon, Banten",
      year: 2022,
      value: "Rp 275 Miliar",
      category: "Industrial Construction",
      description: "Pekerjaan sipil dan struktur untuk pabrik pengolahan resin sintetik, pondasi vibrating machinery heavy-duty, pipe rack sepanjang 2.4 km, serta 6 unit tangki bund wall.",
      scopeOfWork: "Pondasi Bored Pile Tahan Sulfat & Lingkungan Laut\nPengecoran Mass Concrete Pondasi Mesin Kompresor Anti-Vibrasi\nPekerjaan Pipe Rack Baja Tahan Api (Fireproofing)\nKonstruksi Bund Wall Beton Kedap Kimia",
      status: "Completed",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Rumah Sakit Graha Medika Prima 9 Lantai",
      slug: "rs-graha-medika-prima",
      client: "PT Medika Husada Sejahtera",
      location: "Bandung, Jawa Barat",
      year: 2024,
      value: "Rp 160 Miliar",
      category: "Building Construction",
      description: "Rumah sakit tipe B berkapasitas 250 tempat tidur dengan 6 ruang operasi bertekanan positif (modular operating theatre), ruang radiologi berlapis timbal (lead shielding), dan penanganan K3 fasilitas kesehatan.",
      scopeOfWork: "Struktur Gedung 9 Lantai Tahan Gempa Kategori Risiko IV\nRuang Operasi Modular Standar Kemenkes RI\nSistem Gas Medis Sentral & Nurse Call\nFasilitas Pengolahan Air Limbah Medis (IPAL Otomatis)",
      status: "Completed",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Dermaga Curah & Pelabuhan Terminal Tanjung Mas",
      slug: "dermaga-tanjung-mas-expansion",
      client: "Badan Usaha Pelabuhan Mandiri",
      location: "Semarang, Jawa Tengah",
      year: 2025,
      value: "Rp 195 Miliar",
      category: "Infrastructure",
      description: "Perpanjangan dermaga sandar kapal sepanjang 350 meter dengan konstruksi dolphin dan trestle baja tahan korosi di lingkungan laut terbuka.",
      scopeOfWork: "Pemancangan Steel Pipe Piles (SPP) diameter 1.000 mm\nPemasangan Katoda Anti-Korosi (Impressed Current Cathodic Protection)\nBeton Mutu Tinggi Marin Berdaya Tahan Penetrasi Klorida\nPemasangan Bollard 100 Ton & Rubber Fender Super Cone",
      status: "Ongoing",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Surabaya Commercial Arcade & Lifestyle Mall",
      slug: "surabaya-commercial-arcade",
      client: "PT Citra Megah Sentosa",
      location: "Surabaya Barat, Jawa Timur",
      year: 2023,
      value: "Rp 135 Miliar",
      category: "Building Construction",
      description: "Kompleks retail modern semi-outdoor 4 lantai dengan konsep arsitektur biophilic, kanopi skylight raksasa, dan area pedestrian ramah pejalan kaki.",
      scopeOfWork: "Pekerjaan Struktur Beton Bertulang & Baja Ringan Atap Kaca\nPekerjaan Landscape, Kolam Reflektif, & Plaza Terbuka\nInstalasi Smart Lighting & Sound System Outdoor\nInterior Finishing Area Koridor & Toilet Mewah",
      status: "Completed",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  for (const p of projectsData) {
    const createdProject = await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });

    // Add gallery items if not exists
    const existingCount = await prisma.projectImage.count({
      where: { projectId: createdProject.id },
    });

    if (existingCount === 0) {
      await prisma.projectImage.createMany({
        data: [
          {
            projectId: createdProject.id,
            url: p.thumbnail,
            caption: "Tampak Perspektif Eksterior Utama",
            order: 1,
          },
          {
            projectId: createdProject.id,
            url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
            caption: "Proses Konstruksi & Pengawasan Mutu Struktur",
            order: 2,
          },
          {
            projectId: createdProject.id,
            url: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop",
            caption: "Detail Rekayasa Teknis & Pekerjaan Lapangan",
            order: 3,
          },
        ],
      });
    }
  }

  // 5. Seed Certifications
  const certsData = [
    {
      title: "ISO 9001:2015 - Sistem Manajemen Mutu",
      issuer: "TÜV NORD Indonesia / UKAS",
      certificateNumber: "01 100 2134988",
      category: "ISO",
      year: 2024,
      validUntil: new Date("2027-08-30"),
      fileUrl: "/docs/sertifikat-iso-9001.pdf",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      order: 1,
    },
    {
      title: "ISO 14001:2015 - Sistem Manajemen Lingkungan",
      issuer: "TÜV NORD Indonesia / UKAS",
      certificateNumber: "01 104 2134989",
      category: "ISO",
      year: 2024,
      validUntil: new Date("2027-08-30"),
      fileUrl: "/docs/sertifikat-iso-14001.pdf",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      order: 2,
    },
    {
      title: "ISO 45001:2018 - Sistem Manajemen K3",
      issuer: "TÜV NORD Indonesia / UKAS",
      certificateNumber: "01 113 2134990",
      category: "ISO",
      year: 2024,
      validUntil: new Date("2027-08-30"),
      fileUrl: "/docs/sertifikat-iso-45001.pdf",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      order: 3,
    },
    {
      title: "Sertifikat Badan Usaha (SBU) Jasa Pelaksana Konstruksi Kualifikasi B2",
      issuer: "Lembaga Pengembangan Jasa Konstruksi (LPJK) - Kementerian PUPR",
      certificateNumber: "0-3171-08-002-1-09-987654",
      category: "Legalitas",
      year: 2023,
      validUntil: new Date("2026-11-15"),
      fileUrl: "/docs/sbu-b2-artha-konstruksi.pdf",
      thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
      order: 4,
    },
    {
      title: "Penghargaan Kecelakaan Nihil (Zero Accident Award) Tingkat Nasional",
      issuer: "Menteri Ketenagakerjaan Republik Indonesia",
      certificateNumber: "KEP.412/MEN/VII/2024",
      category: "Penghargaan",
      year: 2024,
      validUntil: new Date("2025-12-31"),
      fileUrl: "/docs/zero-accident-award-2024.pdf",
      thumbnail: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=600&auto=format&fit=crop",
      order: 5,
    },
  ];

  for (const c of certsData) {
    await prisma.certification.upsert({
      where: { id: `cert-${c.order}` },
      update: c,
      create: { id: `cert-${c.order}`, ...c },
    });
  }

  // 6. Seed Clients & Partners
  const clientsData = [
    { name: "PT Ciputra Development Tbk", logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop", industry: "Property & Real Estate", order: 1 },
    { name: "PT Sinar Mas Land", logoUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=200&auto=format&fit=crop", industry: "Township & Industrial Estate", order: 2 },
    { name: "PT Astra International Property", logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop", industry: "Commercial Development", order: 3 },
    { name: "PT Indofood CBP Sukses Makmur Tbk", logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop", industry: "Food & Beverage Manufacturing", order: 4 },
    { name: "Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR)", logoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop", industry: "Government & Infrastructure", order: 5 },
    { name: "PT Wijaya Karya Rekayasa Konstruksi", logoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200&auto=format&fit=crop", industry: "State-Owned Enterprise", order: 6 },
    { name: "PT Unilever Indonesia Tbk", logoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop", industry: "Consumer Goods & Logistics", order: 7 },
    { name: "Otorita Ibu Kota Nusantara (IKN)", logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop", industry: "Government & New Capital Development", order: 8 },
  ];

  for (const client of clientsData) {
    await prisma.clientPartner.upsert({
      where: { id: `client-${client.order}` },
      update: client,
      create: { id: `client-${client.order}`, ...client },
    });
  }

  // 7. Seed Articles
  const articlesData = [
    {
      title: "PT Artha Konstruksi Indonesia Raih Zero Accident Award 2024 dari Kemenaker RI",
      slug: "artha-konstruksi-raih-zero-accident-award-2024",
      category: "Achievement",
      excerpt: "Pencapaian lebih dari 4.800.000 jam kerja aman tanpa insiden fatal di seluruh proyek konstruksi gedung dan industri nasional membuktikan komitmen mutlak pada standar K3.",
      content: `Pencapaian keselamatan kerja merupakan pilar utama keberhasilan setiap proyek rekayasa dan konstruksi. Pada 14 Agustus 2024, PT Artha Konstruksi Indonesia secara resmi menerima penghargaan bergengsi **Zero Accident Award (Kecelakaan Nihil)** dari Kementerian Ketenagakerjaan Republik Indonesia.\n\nPenghargaan ini diberikan atas keberhasilan manajemen dan seluruh tim lapangan dalam mempertahankan standar Sistem Manajemen K3 (SMK3) dan ISO 45001:2018 dengan total akumulasi lebih dari **4,8 juta jam kerja orang (JKO) aman** tanpa kasus kecelakaan kerja berat atau fatalitas.\n\n"Bagi kami di Artha Konstruksi, keselamatan setiap pekerja, engineer, dan mitra subkontraktor adalah prioritas pertama sebelum produktivitas dan keuntungan. Kami percaya bahwa proyek yang sukses adalah proyek yang diselesaikan tepat waktu, berkualitas tinggi, dan seluruh tim pulang ke rumah dengan selamat," tutur Direktur Utama PT Artha Konstruksi Indonesia dalam sambutannya.\n\nStrategi K3 yang diterapkan mencakup Daily Toolbox Meeting, Safety Induction Digital terintegrasi, Safety Patrol berkala, serta penggunaan sensor cerdas pada alat berat crane dan perancah scaffolding.`,
      thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
      author: "Humas & Corporate Communications",
      publishedAt: new Date("2024-08-20"),
      isPublished: true,
      seoKeywords: "Zero Accident Award, K3 Konstruksi, PT Artha Konstruksi Indonesia, Prestasi Kontraktor, ISO 45001",
    },
    {
      title: "Integrasi Teknologi BIM 5D: Efisiensi Biaya dan Presisi Penjadwalan Proyek Skala Besar",
      slug: "integrasi-teknologi-bim-5d-efisiensi-konstruksi",
      category: "Project Updates",
      excerpt: "Transformasi digital di sektor konstruksi kini bukan sekadar opsi, melainkan kebutuhan mendesak untuk meminimalisasi rework dan mendeteksi benturan desain lebih dini.",
      content: `Penerapan Building Information Modeling (BIM) level 5D di PT Artha Konstruksi Indonesia telah menjadi standar baku pada setiap proyek gedung bertingkat dan fasilitas industri sejak awal tahun 2023.\n\nDengan memadukan visualisasi 3D parametrik, simulasi jadwal 4D (Time), dan kalkulasi estimasi volume biaya 5D (Cost), tim engineer dapat mendeteksi benturan pipa mekanikal-elektrikal (clash detection) terhadap struktur beton balok sebelum pekerjaan di lapangan dimulai.\n\nHal ini berhasil menurunkan tingkat pekerjaan ulang (rework) hingga 65% dan menghemat waktu penyelesaian proyek rata-rata 12% lebih cepat dibanding metode konvensional.\n\nInvestasi pada talenta digital engineer bersertifikasi Autodesk Certified Professional memastikan klien kami mendapatkan transparansi progres dan laporan mutu yang akurat secara real-time.`,
      thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      author: "Divisi Engineering & BIM",
      publishedAt: new Date("2024-09-05"),
      isPublished: true,
      seoKeywords: "BIM 5D Indonesia, Teknologi Konstruksi Modern, Clash Detection, Digital Construction",
    },
    {
      title: "Progres Pembangunan Nusantara Logistics Hub Capai 85%, Siap Operasi Akhir 2025",
      slug: "progres-nusantara-logistics-hub-capai-85-persen",
      category: "Project Updates",
      excerpt: "Fasilitas pergudangan pintar di Kawasan Inti IKN memasuki fase akhir pengecoran lantai superflat dan instalasi modul surya ramah lingkungan.",
      content: `Pembangunan fasilitas pergudangan cerdas Nusantara Logistics Hub yang dipercayakan kepada PT Artha Konstruksi Indonesia saat ini telah menembus progres fisik 85% per September 2025.\n\nSeluruh struktur rangka baja bentang lebar 60 meter telah selesai terpasang secara kokoh. Tim saat ini sedang merampungkan pengecoran lantai berpresisi tinggi kelas FM2 dengan teknologi laser screed buatan Jerman, yang menjadi syarat utama pengoperasian forklift otomatis (AGV).\n\nProyek ini juga menerapkan konsep Green Building dengan pemanfaatan material ramah lingkungan beremisi karbon rendah (low-carbon concrete) serta sistem pemanenan air hujan terpadu untuk kebutuhan operasional gudang.`,
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      author: "Project Management Office IKN",
      publishedAt: new Date("2025-09-01"),
      isPublished: true,
      seoKeywords: "IKN Nusantara, Proyek Gudang Logistik, Konstruksi IKN, Artha Konstruksi IKN",
    },
    {
      title: "Program CSR: Pelatihan Vokasi & Sertifikasi Tukang Bangunan Bersama BLK Komunitas",
      slug: "csr-pelatihan-vokasi-sertifikasi-tenaga-kerja",
      category: "CSR",
      excerpt: "Mendukung peningkatan kompetensi tenaga kerja konstruksi lokal melalui program pelatihan intensif pembesian, perancah, dan keselamatan kerja bersertifikat BNSP.",
      content: `Sebagai wujud tanggung jawab sosial perusahaan (CSR) yang berkelanjutan, PT Artha Konstruksi Indonesia secara rutin menggelar pelatihan vokasi teknik dan sertifikasi gratis bagi tenaga kerja lokal di sekitar area proyek.\n\nSebanyak 120 tenaga kerja telah lulus uji kompetensi Badan Nasional Sertifikasi Profesi (BNSP) untuk bidang pemasangan perancah (scaffolding), pembesian struktur beton, dan juru ukur (surveyor).\n\nLangkah ini sejalan dengan misi perusahaan untuk tidak hanya membangun infrastruktur fisik, tetapi juga membangun kemandirian ekonomi dan keahlian sumber daya manusia Indonesia yang berdaya saing tinggi.`,
      thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop",
      author: "Departemen Hubungan Komunitas & CSR",
      publishedAt: new Date("2024-11-10"),
      isPublished: true,
      seoKeywords: "CSR Konstruksi, Sertifikasi BNSP Tukang, Pemberdayaan Tenaga Kerja Lokal",
    },
  ];

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }

  // 8. Seed Careers
  const careersData = [
    {
      title: "Senior Project Manager (High-Rise & Industrial)",
      slug: "senior-project-manager",
      department: "Project Operations",
      location: "Jakarta & Jawa Barat",
      type: "Full-time",
      description: "Bertanggung jawab memimpin eksekusi proyek gedung bertingkat tinggi atau kawasan industri dari tahap mobilisasi hingga serah terima (handover), mengendalikan biaya, mutu teknis, jadwal CPM, dan keselamatan kerja.",
      requirements: "Pendidikan min. S1 Teknik Sipil dari universitas terkemuka\nPengalaman min. 10 tahun di kontraktor utama (General Contractor), minimal 3 proyek bertingkat tinggi atau pabrik industri\nMemiliki SKA Ahli Madya/Utama Manajemen Proyek Konstruksi (LPJK)\nMahir mengoperasikan Primavera P6 / MS Project dan memahami implementasi BIM\nJiwa kepemimpinan kuat, integritas tinggi, dan kemampuan komunikasi negosiasi prima",
      deadline: new Date("2026-10-31"),
      isActive: true,
    },
    {
      title: "Site Engineering Coordinator (Struktur & Arsitektur)",
      slug: "site-engineering-coordinator",
      department: "Engineering",
      location: "IKN Nusantara / Balikpapan",
      type: "Full-time",
      description: "Mengkoordinasikan penyusunan shop drawing, metode kerja konstruksi (method statement), perhitungan volume pekerjaan (take-off), serta memecahkan kendala teknis bersama konsultan perencana dan pengawas.",
      requirements: "Pendidikan min. S1 Teknik Sipil / Arsitektur\nPengalaman min. 5 tahun pada posisi yang sama di proyek skala besar\nMenguasai AutoCAD, Revit Architecture/Structure, dan ETABS\nMemiliki Sertifikat Keahlian (SKA) Teknik Bangunan Gedung\nBersedia ditempatkan di lokasi proyek IKN Nusantara dengan sistem roster",
      deadline: new Date("2026-10-15"),
      isActive: true,
    },
    {
      title: "QHSE (Quality, Health, Safety, Environment) Officer",
      slug: "qhse-officer",
      department: "Quality & Safety Management",
      location: "Cilegon, Banten",
      type: "Full-time",
      description: "Memastikan seluruh operasional proyek mematuhi regulasi K3 nasional, SMK3 PP 50/2012, dan standar ISO 45001/14001, melakukan investigasi insiden, inspeksi alat berat, dan memimpin safety induction.",
      requirements: "Pendidikan D3/S1 K3, Teknik Lingkungan, atau Teknik Sipil\nMemiliki sertifikasi Ahli K3 Umum Kemenaker yang masih aktif (diutamakan memiliki sertifikat Ahli K3 Konstruksi)\nPengalaman min. 3 tahun di proyek pabrik kimia / heavy civil\nKemampuan komunikasi tegas, disiplin tinggi, dan siap kerja lapangan",
      deadline: new Date("2026-10-20"),
      isActive: true,
    },
    {
      title: "BIM 5D Coordinator / Modeler",
      slug: "bim-coordinator",
      department: "Digital Construction & BIM",
      location: "Kantor Pusat SCBD, Jakarta",
      type: "Full-time",
      description: "Membuat model federasi 3D arsitektur, struktur, dan MEP, melakukan clash detection koordinasi mingguan dengan konsultan, serta mengekstrak volume quantity takeoff (QTO) untuk estimasi biaya.",
      requirements: "Pendidikan D3/S1 Teknik Sipil / Arsitektur / Mekanikal\nPengalaman min. 2-4 tahun aktif menggunakan Autodesk Revit, Navisworks Manage, dan BIM 360/ACC\nMemiliki portofolio pemodelan proyek gedung/industri yang dapat diverifikasi\nMemahami alur kerja ISO 19650 tentang manajemen informasi BIM",
      deadline: new Date("2026-11-15"),
      isActive: true,
    },
  ];

  for (const c of careersData) {
    await prisma.career.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  // 9. Seed Sample Inquiries
  const sampleInquiries = [
    {
      name: "Ir. Hendra Kusuma",
      company: "PT Megah Graha Land",
      email: "hendra.kusuma@megahgraha.co.id",
      phone: "+62 812 8765 4321",
      subject: "Undangan Tender Pembangunan Apartemen 28 Lantai di Serpong",
      message: "Selamat siang tim Artha Konstruksi, kami dari pengembang PT Megah Graha Land bermaksud mengundang perusahaan Anda untuk berpartisipasi dalam tender pekerjaan struktur dan arsitektur proyek apartemen kami di Serpong seluas 42.000 m². Mohon kirimkan company profile lengkap dan portofolio proyek sejenis ke email kami.",
      status: "New",
      internalNotes: "Tender prioritas tinggi. Sudah diforward ke Direktur Komersial untuk review dokumen kualifikasi.",
    },
    {
      name: "Michael Tanuwijaya",
      company: "PT Indo Pangan Sentosa",
      email: "m.tanuwijaya@indopangan.com",
      phone: "+62 811 1234 5678",
      subject: "Konsultasi Konstruksi Pabrik Makanan & Gudang Cold Storage di Surabaya",
      message: "Kami merencanakan ekspansi pabrik pengolahan makanan beku dan cold storage berstandar HACCP di kawasan industri SIER Surabaya. Mohon bantuan untuk sesi diskusi teknis awal mengenai estimasi waktu dan biaya.",
      status: "In_Progress",
      internalNotes: "Tim Estimator sudah menghubungi Pak Michael via WhatsApp. Rapat via Zoom dijadwalkan Jumat jam 14:00.",
    },
  ];

  for (const inq of sampleInquiries) {
    const existing = await prisma.inquiry.findFirst({
      where: { email: inq.email, subject: inq.subject },
    });
    if (!existing) {
      await prisma.inquiry.create({ data: inq });
    }
  }

  console.log("Database seeded successfully with authentic corporate data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
