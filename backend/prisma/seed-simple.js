import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        console.log('🚀 Starting visa package seeding...\n');

        // Clear existing
        console.log('🗑️  Clearing existing visa packages...');
        await prisma.visa_packages.deleteMany({});
        console.log('✅ Cleared\n');

        // Create packages using Prisma ORM (not raw SQL)
        console.log('📦 Creating visa packages...\n');
        
        await prisma.visa_packages.create({
            data: {
                country: "United Arab Emirates",
                slug: "dubai-tourist-visa-30days",
                type: "Tourist",
                description: "30-day Dubai tourist visa with fast processing",
                duration: "30 Days",
                processingTime: "3-7 Days",
                cost: 17500,
                validity: "60 Days",
                entryType: "Single Entry",
                requirements: ["Valid Passport", "Photo", "Travel History"],
                documents: { mandatory: ["Passport", "Photo"] },
                applicationProcess: ["Submit docs", "Processing", "Receive visa"],
                faqs: [{ question: "Duration?", answer: "30 days" }],
                imageUrl: "/images/dubai.jpg",
                isPopular: true
            }
        });
        console.log('✅ UAE Tourist');

        await prisma.visa_packages.create({
            data: {
                country: "Thailand",
                slug: "thailand-tourist-visa-60days",
                type: "Tourist",
                description: "60-day Thailand tourist visa",
                duration: "60 Days",
                processingTime: "5-7 Days",
                cost: 8500,
                validity: "90 Days",
                entryType: "Single Entry",
                requirements: ["Passport", "Photo"],
                documents: { mandatory: ["Passport", "Photo"] },
                applicationProcess: ["Submit", "Process", "Receive"],
                faqs: [],
                imageUrl: "/images/thailand.jpg",
                isPopular: true
            }
        });
        console.log('✅ Thailand Tourist');

        // Add more packages...
        const packages = [
            { country: "Malaysia", slug: "malaysia-tourist-visa", type: "Tourist", cost: 5500, popular: true },
            { country: "Singapore", slug: "singapore-tourist-visa", type: "Tourist", cost: 9500, popular: true },
            { country: "India", slug: "india-tourist-visa", type: "Tourist", cost: 3500, popular: false },
            { country: "United Arab Emirates", slug: "dubai-business-visa", type: "Business", cost: 25000, popular: true },
            { country: "Saudi Arabia", slug: "saudi-business-visa", type: "Business", cost: 22000, popular: false },
            { country: "United Kingdom", slug: "uk-student-visa", type: "Student", cost: 45000, popular: true },
            { country: "Canada", slug: "canada-student-visa", type: "Student", cost: 50000, popular: true },
            { country: "Australia", slug: "australia-work-visa", type: "Work Permit", cost: 65000, popular: true },
        ];

        for (const pkg of packages) {
            await prisma.visa_packages.create({
                data: {
                    country: pkg.country,
                    slug: pkg.slug,
                    type: pkg.type,
                    description: `${pkg.type} visa for ${pkg.country}`,
                    duration: "30 Days",
                    processingTime: "5-7 Days",
                    cost: pkg.cost,
                    validity: "60 Days",
                    entryType: "Single Entry",
                    requirements: ["Passport", "Photo"],
                    documents: { mandatory: ["Passport"] },
                    applicationProcess: ["Apply", "Process", "Approve"],
                    faqs: [],
                    imageUrl: `/images/${pkg.slug}.jpg`,
                    isPopular: pkg.popular
                }
            });
            console.log(`✅ ${pkg.country} ${pkg.type}`);
        }

        const count = await prisma.visa_packages.count();
        console.log(`\n✨ Successfully seeded ${count} visa packages!\n`);

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main().catch(console.error);
