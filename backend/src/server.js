import app from './app.js';
import config from './config/index.js';
import prisma from './config/database.js';

const PORT = config.port;

// Auto-seed database if empty
async function checkAndSeedDatabase() {
  try {
    const count = await prisma.visa_packages.count();
    if (count === 0) {
      console.log('📦 Database is empty, seeding...');
      
      const packages = [
        { country: "United Arab Emirates", slug: "dubai-tourist-visa", type: "Tourist", cost: 17500, isPopular: true },
        { country: "Thailand", slug: "thailand-tourist-visa", type: "Tourist", cost: 8500, isPopular: true },
        { country: "Malaysia", slug: "malaysia-tourist-visa", type: "Tourist", cost: 5500, isPopular: true },
        { country: "Singapore", slug: "singapore-tourist-visa", type: "Tourist", cost: 9500, isPopular: true },
        { country: "India", slug: "india-tourist-visa", type: "Tourist", cost: 3500, isPopular: false },
        { country: "United Arab Emirates", slug: "dubai-business-visa", type: "Business", cost: 25000, isPopular: true },
        { country: "Saudi Arabia", slug: "saudi-business-visa", type: "Business", cost: 22000, isPopular: false },
        { country: "United Kingdom", slug: "uk-student-visa", type: "Student", cost: 45000, isPopular: true },
        { country: "Canada", slug: "canada-student-visa", type: "Student", cost: 50000, isPopular: true },
        { country: "Australia", slug: "australia-work-visa", type: "Work Permit", cost: 65000, isPopular: true },
        { country: "Germany", slug: "germany-work-visa", type: "Work Permit", cost: 55000, isPopular: false },
        { country: "Japan", slug: "japan-tourist-visa", type: "Tourist", cost: 12000, isPopular: true },
      ];

      for (const pkg of packages) {
        const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
        await prisma.visa_packages.create({
          data: {
            id: id,
            country: pkg.country,
            slug: pkg.slug,
            type: pkg.type,
            description: `${pkg.type} visa for ${pkg.country}`,
            duration: "30 Days",
            processingTime: "5-7 Days",
            cost: pkg.cost,
            validity: "60 Days",
            entryType: "Single Entry",
            requirements: ["Valid Passport", "Recent Photo"],
            documents: { mandatory: ["Passport", "Photo"] },
            applicationProcess: ["Submit documents", "Processing", "Receive visa"],
            faqs: [],
            imageUrl: `/images/${pkg.slug}.jpg`,
            isPopular: pkg.isPopular,
            updatedAt: new Date()
          }
        });
      }
      
      const newCount = await prisma.visa_packages.count();
      console.log(`✅ Seeded ${newCount} visa packages!`);
    } else {
      console.log(`✅ Database already has ${count} visa packages`);
    }
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Start server
const server = app.listen(PORT, async () => {
  console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🌍 Rio International Travel Agency API       ║
║                                                ║
║   Environment: ${config.nodeEnv.toUpperCase().padEnd(34)}║
║   Port: ${PORT.toString().padEnd(40)}║
║   URL: ${config.apiUrl.padEnd(41)}║
║                                                ║
╚════════════════════════════════════════════════╝
  `);
  
  // Auto-seed database after server starts
  await checkAndSeedDatabase();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
    console.log('✅ Process terminated');
    process.exit(0);
  });
});
