import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const visaPackages = [
    // TOURIST VISAS
    {
        country: "Thailand",
        slug: "thailand-tourist-visa",
        type: "Tourist Visa",
        description: "Thailand offers a vibrant culture and beautiful beaches. 60 days stay with straightforward e-Visa process for Bangladeshi citizens.",
        duration: "60 Days",
        processingTime: "5-7 Working Days",
        cost: 4500.0,
        validity: "90 Days",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport (6 months validity)",
            "Recent Photos (3.5 x 4.5 cm, white background)",
            "Bank Statement (last 6 months, min balance 60,000 BDT)",
            "Bank Solvency Certificate",
            "Confirmed Return Air Ticket",
            "Hotel Booking / Accommodation Proof",
            "Profession Proof (NOC / Trade License)"
        ],
        documents: {
            mandatory: [
                "Original Passport",
                "2 Recent Photos",
                "Bank Statement & Solvency",
                "Visiting Card"
            ],
            optional: [
                "Marriage Certificate (if traveling with spouse)",
                "Student ID (if student)"
            ]
        },
        applicationProcess: [
            "Submit required documents to our office",
            "We process the e-Visa application",
            "Receive Payment Info Summary",
            "Payment made to Thai Embassy bank account",
            "Receive e-Visa via email"
        ],
        faqs: [
            {
                question: "Is visa on arrival available?",
                answer: "No, Bangladeshi citizens must obtain a visa before traveling."
            },
            {
                question: "Can I extend my stay?",
                answer: "Yes, the 60-day tourist visa can often be extended for another 30 days."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200",
        isPopular: true
    },
    {
        country: "Malaysia",
        slug: "malaysia-evisa",
        type: "Tourist eVisa",
        description: "Experience the diverse culture of Malaysia. An eVisa is mandatory for Bangladeshi tourists.",
        duration: "30 Days",
        processingTime: "3-5 Working Days",
        cost: 5500.0, // approx BDT total
        validity: "90 Days",
        entryType: "Single Entry",
        requirements: [
            "Passport (6 months validity)",
            "Photo (35x50mm, white background, matte)",
            "Bank Statement & Solvency (min 100,000 BDT)",
            "Return Flight Ticket",
            "Hotel Booking"
        ],
        documents: {
            mandatory: [
                "Passport Scan",
                "Photo Soft Copy",
                "Bank Documents",
                "Ticket & Hotel Details"
            ]
        },
        applicationProcess: [
            "Submit documents",
            "Online application submission",
            "Approval within 3-5 days",
            "Print eVisa for travel"
        ],
        faqs: [
            {
                question: "Is this a sticker visa?",
                answer: "No, this is an electronic visa (eVisa)."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
        isPopular: true
    },
    {
        country: "Singapore",
        slug: "singapore-tourist-visa",
        type: "Tourist Visa",
        description: "Visit the Garden City. Visa application must be done via an authorized agent or local sponsor.",
        duration: "30 Days",
        processingTime: "5-7 Working Days",
        cost: 5500.0,
        validity: "9 Weeks (typically)",
        entryType: "Multiple Entry",
        requirements: [
            "Passport (6 months validity)",
            "Photo (Matte finish, white background)",
            "Bank Statement (6 months)",
            "Solvency Certificate",
            "NOC / Trade License",
            "Vaccination Certificate",
            "Invitation Letter (if any)"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Bank Details", "Profession Proof"],
            additional: ["Letter of Introduction (LOI) helps"]
        },
        applicationProcess: [
            "Submit documents to agent",
            "Agent submits to Singapore High Commission",
            "Process takes 5-7 working days",
            "Receive e-Visa PDF"
        ],
        faqs: [
            {
                question: "Is interview required?",
                answer: "Usually no, but the High Commission may request one."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
        isPopular: true
    },
    {
        country: "United Arab Emirates",
        slug: "dubai-tourist-visa",
        type: "Tourist Visa",
        description: "Explore Dubai and UAE. eVisa is processed via airlines or agencies.",
        duration: "30 Days",
        processingTime: "3-5 Working Days",
        cost: 16000.0,
        validity: "60 Days",
        entryType: "Single Entry",
        requirements: [
            "Passport Bio Page Scan",
            "Photo (White background)",
            "National ID / Birth Certificate"
        ],
        documents: {
            mandatory: ["Passport Scan", "Photo", "NID/BC"]
        },
        applicationProcess: [
            "Apply online/via agent",
            "Pay fees",
            "Receive Electronic Visa"
        ],
        faqs: [
            {
                question: "Is bank statement required?",
                answer: "Generally not for standard tourist visa via agency, but required for 5-year visa."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
        isPopular: true
    },
    {
        country: "Turkey",
        slug: "turkey-guide-visa",
        type: "Sticker Visa / eVisa",
        description: "Bridge between East and West. eVisa available ONLY if you have valid US/UK/Schengen visa.",
        duration: "Variable",
        processingTime: "10-15 Working Days (Sticker)",
        cost: 15000.0,
        validity: "180 Days",
        entryType: "Single Entry",
        requirements: [
            "Passport",
            "Biometric Photo (5x6 cm)",
            "Bank Statement & Solvency",
            "NOC / Trade License",
            "Travel Insurance",
            "Hotel & Flight Booking"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Financials", "Insurance", "Bookings"]
        },
        applicationProcess: [
            "Submit to Visa Application Center",
            "Biometrics enrollment",
            "Wait for Embassy decision"
        ],
        faqs: [
            {
                question: "Can I get eVisa?",
                answer: "Only if you hold a valid US, UK, Ireland, or Schengen visa."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
        isPopular: false
    },
    {
        country: "United States",
        slug: "usa-tourist-visa",
        type: "B1/B2 Visa",
        description: "Standard visitor visa for tourism and business.",
        duration: "5 Years",
        processingTime: "Variable (Interview dependent)",
        cost: 23000.0, // approx fee
        validity: "5 Years",
        entryType: "Multiple Entry",
        requirements: [
            "DS-160 Confirmation",
            "Passport",
            "Photo (2x2 inch)",
            "Interview Appointment",
            "Evidence of Funds",
            "Proof of ties to home country"
        ],
        documents: {
            mandatory: ["DS-160", "Passport", "Appointment Letter"],
            proof: ["Bank Statements", "Property Documents", "Job Letter"]
        },
        applicationProcess: [
            "Fill DS-160 Online",
            "Pay Application Fee",
            "Schedule Interview",
            "Attend Interview at Embassy"
        ],
        faqs: [
            {
                question: "Is interview mandatory?",
                answer: "Yes, for almost all applicants."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200",
        isPopular: false
    },
    {
        country: "United Kingdom",
        slug: "uk-tourist-visa",
        type: "Standard Visitor Visa",
        description: "Visit England, Scotland, Wales, and Northern Ireland.",
        duration: "6 Months",
        processingTime: "15 Working Days",
        cost: 18000.0, // Base fee approx
        validity: "6 Months",
        entryType: "Multiple Entry",
        requirements: [
            "Passport",
            "Employment Proof",
            "Bank Statements (6 months)",
            "Sponsorship Letter (if applicable)"
        ],
        documents: {
            mandatory: ["Passport", "Financial Documents", "Employment/Student Proof"]
        },
        applicationProcess: [
            "Online Application",
            "Pay Fee",
            "Biometrics Appointment at VFS",
            "Submit Passport"
        ],
        faqs: [],
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
        isPopular: false
    }
];

async function main() {
    console.log('Start seeding visa packages...');

    // Clear existing if any (optional, but good for idempotent)
    // await prisma.visaPackage.deleteMany({}); 

    for (const pkg of visaPackages) {
        const existing = await prisma.visaPackage.findUnique({
            where: { slug: pkg.slug }
        });

        if (!existing) {
            await prisma.visaPackage.create({
                data: pkg
            });
            console.log(`Created: ${pkg.country}`);
        } else {
            console.log(`Skipped (Exists): ${pkg.country}`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
