const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { username: 'pampam' }, include: { profile: true } });
  if (!user || !user.profile) {
    console.log('User pampam or profile not found');
    return;
  }

  const profileId = user.profile.id;

  const exps = [
    {
      profileId,
      title: "Web develoment",
      company: "Freelance",
      location: "Malang",
      startYear: "2021",
      endYear: null,
      isCurrent: true,
      description: "Saya menyediakan layanan pembuatan webstie maupun situs sesuai dengan kebutuhan client"
    },
    {
      profileId,
      title: "Admin Rental",
      company: "Gumirent",
      location: "Bali",
      startYear: "2025",
      endYear: "2026",
      isCurrent: false,
      description: "Saya bertugas untuk menerima dan memanage reservasi dari customer dan di teruskan kepada oprator garasi serta mendata seluruh mobil yang masuk dan keluar"
    },
    {
      profileId,
      title: "Runner",
      company: "Discova",
      location: "Bali",
      startYear: "2025",
      endYear: "2025",
      isCurrent: false,
      description: "Tugas utama saya adalah memanage dan memberi tugas serta jadwal kepada driver founder"
    },
    {
      profileId,
      title: "Driver",
      company: "Discova",
      location: "Bali",
      startYear: "2023",
      endYear: "2025",
      isCurrent: false,
      description: "Mengendarai mobil untuk mengantar tamu/tourist untuk liburan dan perjalanan"
    },
    {
      profileId,
      title: "Cleaning Service",
      company: "Part Time",
      location: "Bali",
      startYear: "2023",
      endYear: "2024",
      isCurrent: false,
      description: "Melayani jasa cleaning service panggilan untuk kost, rumah, maupun villa di area Bali"
    },
    {
      profileId,
      title: "Bussines Consultan",
      company: "PT. BestProfit Future",
      location: "Malang",
      startYear: "2020",
      endYear: "2022",
      isCurrent: false,
      description: "Bertanggung jawab mengelola keungan dan investasi dana nasabah"
    }
  ];

  await prisma.workExperience.deleteMany({ where: { profileId } });
  
  for (const exp of exps) {
    await prisma.workExperience.create({ data: exp });
  }

  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
