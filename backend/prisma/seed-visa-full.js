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
        country: "United Arab Emirates",
        slug: "dubai-tourist-visa-30days",
        type: "Tourist Visa - 30 Days",
        description: "Experience the luxury of Dubai with our hassle-free 30-day tourist visa. Fast processing in just 3-7 working days.",
        duration: "30 Days",
        processingTime: "3-7 Working Days",
        cost: 17500.0,
        validity: "60 Days",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport (6+ months validity)",
            "Passport Bio Page Scan",
            "Recent Photo (white background)",
            "Minimum 3 country visit stamps",
            "Visiting Card"
        ],
        documents: {
            mandatory: ["Passport Scan", "Photo", "Travel History"],
            optional: ["Hotel Booking", "Return Ticket"]
        },
        applicationProcess: [
            "Submit documents to our office",
            "We process application with UAE immigration",
            "Receive e-Visa within 3-7 days",
            "Print and carry during travel"
        ],
        faqs: [
            { question: "Do I need hotel booking?", answer: "Not mandatory but recommended for smooth immigration." },
            { question: "Can I extend the visa?", answer: "Yes, extension possible from inside UAE." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
        isPopular: true
    },
    {
        country: "Thailand",
        slug: "thailand-tourist-visa",
        type: "Tourist Visa",
        description: "Explore Thailand's beautiful beaches and vibrant culture. 60 days stay with e-Visa facility for Bangladeshi citizens.",
        duration: "60 Days",
        processingTime: "5-7 Working Days",
        cost: 4500.0,
        validity: "90 Days",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport (6+ months validity)",
            "Recent Photos (3.5 x 4.5 cm, white background)",
            "Bank Statement (last 6 months)",
            "Confirmed Return Air Ticket",
            "Hotel Booking Proof"
        ],
        documents: {
            mandatory: ["Original Passport", "2 Photos", "Bank Statement", "Flight Ticket"],
            optional: ["Marriage Certificate (if with spouse)"]
        },
        applicationProcess: [
            "Submit documents to our office",
            "We process the e-Visa application",
            "Payment to Thai Embassy",
            "Receive e-Visa via email"
        ],
        faqs: [
            { question: "Is on-arrival visa available?", answer: "No, Bangladeshi citizens must obtain visa before travel." },
            { question: "Can I extend my stay?", answer: "Yes, 60-day visa can be extended for 30 more days." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200",
        isPopular: true
    },
    {
        country: "Singapore",
        slug: "singapore-tourist-visa",
        type: "Tourist Visa",
        description: "Visit the Garden City with our efficient visa service. 30 days stay with multiple entry option.",
        duration: "30 Days",
        processingTime: "5-7 Working Days",
        cost: 4000.0,
        validity: "9 Weeks",
        entryType: "Multiple Entry",
        requirements: [
            "Passport (6+ months validity)",
            "Photo (white background, matte)",
            "Bank Statement (6 months)",
            "Solvency Certificate",
            "NOC / Trade License"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Bank Documents", "Profession Proof"],
            optional: ["Invitation Letter"]
        },
        applicationProcess: [
            "Submit documents to authorized agent",
            "Application to Singapore High Commission",
            "Processing 5-7 days",
            "Receive e-Visa PDF"
        ],
        faqs: [
            { question: "Is interview required?", answer: "Usually no, but may be requested by High Commission." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
        isPopular: true
    },
    {
        country: "Malaysia",
        slug: "malaysia-tourist-evisa",
        type: "Tourist eVisa",
        description: "Experience Malaysia's diverse culture. Quick eVisa processing in just 5-7 days.",
        duration: "30 Days",
        processingTime: "5-7 Working Days",
        cost: 5500.0,
        validity: "90 Days",
        entryType: "Single Entry",
        requirements: [
            "Passport (6+ months validity)",
            "Photo (35x50mm, white background)",
            "Bank Statement & Solvency",
            "Return Flight Ticket",
            "Hotel Booking"
        ],
        documents: {
            mandatory: ["Passport Scan", "Photo", "Bank Documents", "Ticket & Hotel"]
        },
        applicationProcess: [
            "Submit documents",
            "Online application",
            "Approval in 5-7 days",
            "Print eVisa"
        ],
        faqs: [
            { question: "Is this electronic visa?", answer: "Yes, this is eVisa - no sticker required." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
        isPopular: true
    },
    {
        country: "India",
        slug: "india-tourist-evisa",
        type: "Tourist e-Visa",
        description: "Visit India with quick e-Visa processing. Multiple entry available for tourism and sightseeing.",
        duration: "30 Days",
        processingTime: "3-5 Working Days",
        cost: 3500.0,
        validity: "120 Days",
        entryType: "Multiple Entry",
        requirements: [
            "Passport (6+ months validity)",
            "Recent Photo (white background)",
            "Passport First & Last Page Scan",
            "Return Ticket"
        ],
        documents: {
            mandatory: ["Passport Scan", "Photo", "Ticket Proof"]
        },
        applicationProcess: [
            "Online application with documents",
            "Payment of visa fee",
            "Receive e-Visa via email",
            "Print and carry during travel"
        ],
        faqs: [
            { question: "Can I enter multiple times?", answer: "Yes, multiple entry allowed during validity period." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
        isPopular: true
    },
    {
        country: "Turkey",
        slug: "turkey-tourist-visa",
        type: "Tourist Sticker Visa",
        description: "Explore the bridge between East and West. Sticker visa with 30 days stay permission.",
        duration: "30 Days",
        processingTime: "5-10 Working Days",
        cost: 6500.0,
        validity: "180 Days",
        entryType: "Single Entry",
        requirements: [
            "Passport (6+ months validity)",
            "Biometric Photo (5x6 cm)",
            "Bank Statement & Solvency",
            "Travel Insurance",
            "Hotel & Flight Booking"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Bank Documents", "Insurance", "Bookings"]
        },
        applicationProcess: [
            "Submit to Visa Application Center",
            "Biometrics enrollment",
            "Wait for Embassy decision",
            "Collect passport with visa"
        ],
        faqs: [
            { question: "Is e-Visa available?", answer: "Only if you have valid US/UK/Schengen visa." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200",
        isPopular: false
    },
    {
        country: "Maldives",
        slug: "maldives-visa-on-arrival",
        type: "Visa on Arrival",
        description: "Free visa on arrival for Maldives. Just carry your passport and enjoy the beautiful islands.",
        duration: "30 Days",
        processingTime: "On Arrival",
        cost: 2500.0,
        validity: "30 Days",
        entryType: "On Arrival",
        requirements: [
            "Valid Passport (6+ months)",
            "Return Ticket",
            "Hotel Booking Confirmation",
            "Sufficient Funds ($100 per day)"
        ],
        documents: {
            mandatory: ["Passport", "Return Ticket", "Hotel Booking"]
        },
        applicationProcess: [
            "No pre-application needed",
            "Fill arrival card on flight",
            "Present documents at immigration",
            "Receive free 30-day visa stamp"
        ],
        faqs: [
            { question: "Is it really free?", answer: "Yes, visa on arrival is free for Bangladeshi citizens." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
        isPopular: true
    },

    // BUSINESS VISAS
    {
        country: "United Arab Emirates",
        slug: "uae-business-visa",
        type: "Business Visa",
        description: "UAE business visa for meetings, conferences, and trade activities. 90 days stay with multiple entry.",
        duration: "90 Days",
        processingTime: "7-10 Working Days",
        cost: 22000.0,
        validity: "60 Days",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport",
            "Business Invitation Letter",
            "Company Trade License",
            "Bank Statement",
            "Visiting Card"
        ],
        documents: {
            mandatory: ["Passport", "Invitation Letter", "Trade License", "Bank Statement"]
        },
        applicationProcess: [
            "Submit business documents",
            "Sponsor company applies from UAE",
            "Processing 7-10 days",
            "Receive e-Visa"
        ],
        faqs: [
            { question: "Do I need sponsor?", answer: "Yes, UAE company must sponsor business visa." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200",
        isPopular: false
    },
    {
        country: "United Kingdom",
        slug: "uk-business-visa",
        type: "Standard Visitor Visa (Business)",
        description: "UK business visa for meetings, conferences, and trade activities. 6 months validity.",
        duration: "6 Months",
        processingTime: "15-20 Working Days",
        cost: 28000.0,
        validity: "6 Months",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport",
            "Business Invitation Letter",
            "Company Documents",
            "Bank Statements (6 months)",
            "Employment Proof"
        ],
        documents: {
            mandatory: ["Passport", "Invitation", "Financial Proof", "Employment Proof"]
        },
        applicationProcess: [
            "Online application",
            "Pay visa fee",
            "Biometrics at VFS",
            "Submit documents",
            "Wait for decision"
        ],
        faqs: [],
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
        isPopular: false
    },
    {
        country: "Saudi Arabia",
        slug: "saudi-business-visa",
        type: "Business Visit Visa",
        description: "Saudi Arabia business visa for trade, meetings, and business activities. Quick processing.",
        duration: "90 Days",
        processingTime: "10-15 Working Days",
        cost: 18000.0,
        validity: "90 Days",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport",
            "Saudi Company Invitation",
            "Company Trade License",
            "Chamber of Commerce Certificate",
            "Bank Statement"
        ],
        documents: {
            mandatory: ["Passport", "Invitation", "Trade License", "Chamber Certificate"]
        },
        applicationProcess: [
            "Saudi sponsor initiates visa",
            "Submit documents to embassy",
            "Processing 10-15 days",
            "Collect visa"
        ],
        faqs: [],
        imageUrl: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=1200",
        isPopular: false
    },
    {
        country: "United States",
        slug: "usa-b1-business-visa",
        type: "B1 Business Visa",
        description: "US B1 visa for business meetings, conferences, and negotiations. Valid up to 5 years.",
        duration: "Variable",
        processingTime: "15-30 Working Days",
        cost: 25000.0,
        validity: "5 Years",
        entryType: "Multiple Entry",
        requirements: [
            "DS-160 Confirmation",
            "Valid Passport",
            "Interview Appointment",
            "Business Invitation",
            "Company Documents",
            "Financial Proof"
        ],
        documents: {
            mandatory: ["DS-160", "Passport", "Invitation", "Employment Proof"]
        },
        applicationProcess: [
            "Fill DS-160 online",
            "Pay visa fee",
            "Schedule interview",
            "Attend embassy interview",
            "Await decision"
        ],
        faqs: [
            { question: "Is interview mandatory?", answer: "Yes, interview required for most applicants." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200",
        isPopular: false
    },

    // STUDENT VISAS
    {
        country: "Canada",
        slug: "canada-student-visa",
        type: "Study Permit",
        description: "Study in Canada with our complete student visa assistance. Work while you study.",
        duration: "Course Duration",
        processingTime: "30-45 Working Days",
        cost: 32000.0,
        validity: "Course Duration",
        entryType: "Single Entry",
        requirements: [
            "Letter of Acceptance from DLI",
            "Proof of Funds",
            "Medical Examination",
            "Police Clearance",
            "Academic Documents"
        ],
        documents: {
            mandatory: ["Acceptance Letter", "Financial Proof", "Medical", "Police Clearance"]
        },
        applicationProcess: [
            "Receive university offer",
            "Apply for study permit online",
            "Submit biometrics",
            "Medical examination",
            "Await decision"
        ],
        faqs: [
            { question: "Can I work while studying?", answer: "Yes, 20 hours/week during term, full-time during breaks." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200",
        isPopular: true
    },
    {
        country: "Australia",
        slug: "australia-student-visa",
        type: "Student Visa (Subclass 500)",
        description: "Study in Australia with quality education. Work rights and dependent visa options available.",
        duration: "Course Duration",
        processingTime: "30-60 Working Days",
        cost: 35000.0,
        validity: "Course Duration",
        entryType: "Multiple Entry",
        requirements: [
            "Confirmation of Enrollment (CoE)",
            "Genuine Temporary Entrant (GTE)",
            "Financial Capacity Proof",
            "English Proficiency (IELTS/PTE)",
            "Health Insurance (OSHC)"
        ],
        documents: {
            mandatory: ["CoE", "GTE Statement", "Financial Proof", "English Test", "OSHC"]
        },
        applicationProcess: [
            "Receive university CoE",
            "Apply online for student visa",
            "Health examination",
            "Submit documents",
            "Await decision"
        ],
        faqs: [
            { question: "Can I bring family?", answer: "Yes, dependent visa available for spouse and children." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200",
        isPopular: true
    },
    {
        country: "United Kingdom",
        slug: "uk-student-visa",
        type: "Student Visa (Tier 4)",
        description: "Study in the UK with Tier 4 student visa. Work rights and post-study work visa available.",
        duration: "Course Duration",
        processingTime: "30-60 Working Days",
        cost: 38000.0,
        validity: "Course Duration + Buffer",
        entryType: "Multiple Entry",
        requirements: [
            "Confirmation of Acceptance for Studies (CAS)",
            "Financial Proof (Tuition + Living)",
            "English Language Test",
            "Academic Transcripts",
            "TB Test Certificate"
        ],
        documents: {
            mandatory: ["CAS", "Financial Proof", "English Test", "Academic Docs", "TB Test"]
        },
        applicationProcess: [
            "Receive CAS from university",
            "Apply online",
            "Pay visa fee & IHS",
            "Biometrics appointment",
            "Submit documents",
            "Await decision"
        ],
        faqs: [
            { question: "Can I work during studies?", answer: "Yes, up to 20 hours/week during term time." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
        isPopular: true
    },
    {
        country: "United States",
        slug: "usa-f1-student-visa",
        type: "F-1 Student Visa",
        description: "Study in the USA with F-1 visa. Access to top universities and OPT work opportunities.",
        duration: "Course Duration",
        processingTime: "30-60 Working Days",
        cost: 30000.0,
        validity: "Course Duration",
        entryType: "Multiple Entry",
        requirements: [
            "I-20 from US University",
            "SEVIS Fee Payment",
            "Financial Proof",
            "Academic Documents",
            "Interview Appointment"
        ],
        documents: {
            mandatory: ["I-20", "SEVIS Receipt", "Financial Proof", "Academic Transcripts"]
        },
        applicationProcess: [
            "Receive I-20 from university",
            "Pay SEVIS fee",
            "Complete DS-160",
            "Schedule visa interview",
            "Attend interview",
            "Await decision"
        ],
        faqs: [
            { question: "Can I work on F-1?", answer: "On-campus work allowed, off-campus needs authorization." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200",
        isPopular: true
    },

    // WORK PERMITS
    {
        country: "United Arab Emirates",
        slug: "uae-work-visa",
        type: "Employment Visa",
        description: "UAE work visa with residence permit. 2-3 years validity with family sponsorship option.",
        duration: "2-3 Years",
        processingTime: "15-25 Working Days",
        cost: 28000.0,
        validity: "2-3 Years",
        entryType: "Residence Visa",
        requirements: [
            "Employment Contract",
            "Company Sponsorship",
            "Educational Certificates (Attested)",
            "Medical Fitness Test",
            "Police Clearance"
        ],
        documents: {
            mandatory: ["Employment Contract", "Certificates", "Medical", "Police Clearance"]
        },
        applicationProcess: [
            "Employer initiates visa",
            "Entry permit issued",
            "Travel to UAE",
            "Medical test & Emirates ID",
            "Residence visa stamped"
        ],
        faqs: [
            { question: "Can I sponsor family?", answer: "Yes, after receiving residence visa and meeting salary criteria." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200",
        isPopular: true
    },
    {
        country: "Saudi Arabia",
        slug: "saudi-work-visa-iqama",
        type: "Work Visa (Iqama)",
        description: "Saudi Arabia work visa with Iqama residence permit. Contract-based with full benefits.",
        duration: "Contract Duration",
        processingTime: "20-30 Working Days",
        cost: 25000.0,
        validity: "Contract Period",
        entryType: "Work Visa",
        requirements: [
            "Employment Contract",
            "Saudi Company Sponsorship",
            "Degree Certificates (Attested)",
            "Medical Fitness",
            "Police Clearance"
        ],
        documents: {
            mandatory: ["Contract", "Attested Certificates", "Medical", "Police Clearance"]
        },
        applicationProcess: [
            "Employer applies for visa block",
            "Visa authorization received",
            "Medical & biometrics in Bangladesh",
            "Travel to Saudi",
            "Iqama processing"
        ],
        faqs: [
            { question: "Is health insurance provided?", answer: "Yes, employer must provide health insurance." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200",
        isPopular: true
    },
    {
        country: "Qatar",
        slug: "qatar-work-visa",
        type: "Work Permit",
        description: "Qatar work visa with residence permit. Employer-sponsored with competitive benefits.",
        duration: "Contract Duration",
        processingTime: "15-25 Working Days",
        cost: 26000.0,
        validity: "Contract Period",
        entryType: "Work Visa",
        requirements: [
            "Employment Contract",
            "Company Sponsorship",
            "Attested Certificates",
            "Medical Examination",
            "Police Clearance"
        ],
        documents: {
            mandatory: ["Contract", "Certificates", "Medical", "Police Clearance"]
        },
        applicationProcess: [
            "Employer applies for work permit",
            "Receive visa approval",
            "Medical check in Bangladesh",
            "Travel to Qatar",
            "Residence permit processing"
        ],
        faqs: [],
        imageUrl: "https://images.unsplash.com/photo-1584464367949-e66adbc4a8bc?w=1200",
        isPopular: true
    },
    {
        country: "Oman",
        slug: "oman-work-visa",
        type: "Labour Card",
        description: "Oman work visa with 2-year renewable labour card. Family sponsorship available.",
        duration: "2 Years",
        processingTime: "15-20 Working Days",
        cost: 24000.0,
        validity: "2 Years",
        entryType: "Work Visa",
        requirements: [
            "Employment Contract",
            "Company Sponsorship",
            "Degree Certificates",
            "Medical Fitness",
            "Police Clearance"
        ],
        documents: {
            mandatory: ["Contract", "Certificates", "Medical", "Police Clearance"]
        },
        applicationProcess: [
            "Employer initiates visa",
            "Visa authorization",
            "Medical in Bangladesh",
            "Travel to Oman",
            "Residence card issuance"
        ],
        faqs: [],
        imageUrl: "https://images.unsplash.com/photo-1584893177394-d0be08a57495?w=1200",
        isPopular: false
    },
    {
        country: "Malaysia",
        slug: "malaysia-employment-pass",
        type: "Employment Pass",
        description: "Malaysia work permit for skilled workers. Job-specific with dependent pass option.",
        duration: "1-2 Years",
        processingTime: "25-35 Working Days",
        cost: 22000.0,
        validity: "1-2 Years",
        entryType: "Work Pass",
        requirements: [
            "Employment Contract",
            "Company Sponsorship",
            "Degree & Experience Proof",
            "Medical Report",
            "Passport"
        ],
        documents: {
            mandatory: ["Contract", "Qualifications", "Medical", "Passport"]
        },
        applicationProcess: [
            "Employer applies online",
            "Approval letter received",
            "Single entry visa",
            "Travel to Malaysia",
            "Employment pass collection"
        ],
        faqs: [
            { question: "Can family join?", answer: "Yes, dependent pass available for spouse and children." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
        isPopular: false
    },
    {
        country: "Singapore",
        slug: "singapore-work-pass",
        type: "S Pass / Employment Pass",
        description: "Singapore work visa for skilled professionals. Pathway to permanent residence.",
        duration: "2 Years",
        processingTime: "20-30 Working Days",
        cost: 30000.0,
        validity: "2 Years",
        entryType: "Work Pass",
        requirements: [
            "Job Offer from Singapore Company",
            "Relevant Qualifications",
            "Minimum Salary Requirement",
            "Skills Assessment"
        ],
        documents: {
            mandatory: ["Employment Letter", "Degree Certificates", "Experience Letters"]
        },
        applicationProcess: [
            "Employer applies online via MOM",
            "Assessment & approval",
            "In-principle approval",
            "Travel to Singapore",
            "Complete formalities & card collection"
        ],
        faqs: [
            { question: "Path to PR?", answer: "Yes, EP holders can apply for permanent residence." }
        ],
        imageUrl: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200",
        isPopular: false
    }
];

async function main() {
    console.log('Start seeding comprehensive visa packages...');

    // Optional: Clear existing packages
    // await prisma.visaPackage.deleteMany({});
    // console.log('Cleared existing packages.');

    for (const pkg of visaPackages) {
        try {
            const existing = await prisma.visaPackage.findUnique({
                where: { slug: pkg.slug }
            });

            if (!existing) {
                await prisma.visaPackage.create({
                    data: pkg
                });
                console.log(`✓ Created: ${pkg.country} - ${pkg.type}`);
            } else {
                // Update existing package
                await prisma.visaPackage.update({
                    where: { slug: pkg.slug },
                    data: pkg
                });
                console.log(`✓ Updated: ${pkg.country} - ${pkg.type}`);
            }
        } catch (error) {
            console.error(`✗ Error with ${pkg.country}:`, error.message);
        }
    }

    const count = await prisma.visaPackage.count();
    console.log(`\nSeeding finished. Total visa packages in database: ${count}`);
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
