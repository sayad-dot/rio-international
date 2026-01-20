import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const visaPackages = [
    // ==================== TOURIST VISAS (7) ====================
    {
        country: "United Arab Emirates",
        slug: "dubai-tourist-visa-30days",
        type: "Tourist",
        description: "Experience the luxury of Dubai with our hassle-free 30-day tourist visa. Visit world's tallest building Burj Khalifa, stunning beaches, and luxury shopping malls. Fast processing in just 3-7 working days.",
        duration: "30 Days Stay",
        processingTime: "3-7 Working Days",
        cost: 17500.0,
        validity: "60 Days from Issue",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport (minimum 6 months validity)",
            "Passport Bio Page Color Scan",
            "Recent Passport Size Photo (white background, 35x45mm)",
            "Minimum 3 country visit stamps in passport",
            "Visiting Card or Business/Profession Proof"
        ],
        documents: {
            mandatory: ["Passport Bio Page Scan (Color)", "Recent Photo (White Background)", "Travel History Proof"],
            optional: ["Hotel Booking Confirmation", "Return Air Ticket", "Bank Statement"],
            note: "All documents should be clear and readable"
        },
        applicationProcess: [
            "Submit passport copy and photo to our office",
            "We process application with UAE immigration",
            "Payment processing and verification",
            "Receive e-Visa within 3-7 working days",
            "Print visa and carry during travel"
        ],
        faqs: [
            { 
                question: "Do I need hotel booking for Dubai visa?", 
                answer: "Not mandatory for visa approval, but recommended. Immigration may ask at airport." 
            },
            { 
                question: "Can I extend my Dubai tourist visa?", 
                answer: "Yes, 30-day extension is possible from inside UAE. Contact typing centers in Dubai." 
            },
            { 
                question: "What if my visa gets rejected?", 
                answer: "Rejection is rare with proper documents. If rejected, 70% fee will be refunded." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
        isPopular: true
    },
    {
        country: "Thailand",
        slug: "thailand-tourist-visa-60days",
        type: "Tourist",
        description: "Explore Thailand's beautiful beaches, ancient temples, and vibrant street culture. Visit Phuket, Pattaya, Bangkok, and Chiang Mai. 60 days stay with e-Visa facility for Bangladeshi citizens.",
        duration: "60 Days Stay",
        processingTime: "5-7 Working Days",
        cost: 4500.0,
        validity: "90 Days from Issue",
        entryType: "Single Entry",
        requirements: [
            "Original Passport (minimum 6 months validity)",
            "2 Recent Photos (3.5 x 4.5 cm, white background, matte finish)",
            "Bank Statement (last 6 months, minimum 50,000 BDT balance)",
            "Confirmed Return Air Ticket",
            "Hotel Booking Proof or Invitation Letter"
        ],
        documents: {
            mandatory: ["Original Passport", "2 Recent Photos", "Bank Statement (6 months)", "Return Flight Ticket", "Hotel Booking"],
            optional: ["Marriage Certificate (if traveling with spouse)", "Birth Certificate (if traveling with children)"],
            note: "Bank statement must show regular transactions"
        },
        applicationProcess: [
            "Submit original passport and all documents to our office",
            "We fill online e-Visa application form",
            "Payment to Thai Embassy through our channel",
            "Track application status online",
            "Receive approved e-Visa via email within 5-7 days"
        ],
        faqs: [
            { 
                question: "Is visa on arrival available for Bangladesh?", 
                answer: "No, Bangladeshi passport holders must obtain visa before travel. On-arrival not available." 
            },
            { 
                question: "Can I extend my Thailand visa?", 
                answer: "Yes, 60-day tourist visa can be extended for 30 more days at immigration office in Thailand." 
            },
            { 
                question: "Do I need to submit original passport?", 
                answer: "Yes, original passport required for Thailand visa processing." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200",
        isPopular: true
    },
    {
        country: "Singapore",
        slug: "singapore-tourist-visa-30days",
        type: "Tourist",
        description: "Visit the Garden City with our efficient visa service. Explore Marina Bay Sands, Gardens by the Bay, and Sentosa Island. 30 days stay with multiple entry option available.",
        duration: "30 Days Stay",
        processingTime: "5-7 Working Days",
        cost: 4000.0,
        validity: "9 Weeks from Issue",
        entryType: "Multiple Entry",
        requirements: [
            "Passport (minimum 6 months validity from travel date)",
            "2 Photos (white background, 35x45mm, matte finish)",
            "Bank Statement (last 6 months, good balance)",
            "Solvency Certificate from Bank",
            "NOC from Employer / Trade License (for business)",
            "Income Tax Return (last year)"
        ],
        documents: {
            mandatory: ["Passport Copy", "2 Recent Photos", "Bank Statement", "Solvency Certificate", "Profession Proof (NOC/Trade License)"],
            optional: ["Invitation Letter from Singapore", "Hotel Booking", "Return Ticket", "Previous Travel History"],
            note: "Strong financial proof increases approval chances"
        },
        applicationProcess: [
            "Submit all required documents to our office",
            "We verify and process through Singapore ICA portal",
            "Application review by immigration (3-5 days)",
            "Visa approval notification",
            "Receive e-Visa via email to print"
        ],
        faqs: [
            { 
                question: "What is the approval rate for Bangladesh?", 
                answer: "Approval rate is 85-90% with complete proper documents and good financial standing." 
            },
            { 
                question: "Can I get multiple entry visa?", 
                answer: "Yes, multiple entry for 2 years is available based on profile and travel history." 
            },
            { 
                question: "How much bank balance is required?", 
                answer: "Minimum 1-2 lakh BDT with regular transactions for better approval." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
        isPopular: false
    },
    {
        country: "Malaysia",
        slug: "malaysia-tourist-visa-30days",
        type: "Tourist",
        description: "Discover Malaysia's diverse culture and stunning landscapes. Visit Kuala Lumpur, Penang, Langkawi. Affordable visa for 30 days stay with easy processing.",
        duration: "30 Days Stay",
        processingTime: "5-7 Working Days",
        cost: 5500.0,
        validity: "90 Days from Issue",
        entryType: "Single Entry",
        requirements: [
            "Passport (minimum 6 months validity, 2 blank pages)",
            "2 Recent Photos (white/blue background, 35x50mm)",
            "Confirmed Return Air Ticket",
            "Hotel Booking for entire stay",
            "Bank Statement (last 3 months)",
            "Visa Fee Payment Receipt"
        ],
        documents: {
            mandatory: ["Passport Copy", "2 Photos", "Return Flight Ticket", "Hotel Booking", "Bank Statement"],
            optional: ["Travel Itinerary", "Invitation Letter", "Previous Malaysia Visa Copy"],
            note: "eVisa and eNTRI available for Bangladeshi citizens"
        },
        applicationProcess: [
            "Choose eVisa or eNTRI based on eligibility",
            "Submit documents and passport copy",
            "Online application processing",
            "Visa approval via email",
            "Print and carry during travel"
        ],
        faqs: [
            { 
                question: "What is the difference between eVisa and eNTRI?", 
                answer: "eNTRI is cheaper (no visa fee) for air entry only. eVisa allows any entry point." 
            },
            { 
                question: "Can I extend Malaysia tourist visa?", 
                answer: "Extension is difficult. Better to apply for correct duration initially." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
        isPopular: true
    },
    {
        country: "India",
        slug: "india-tourist-visa-30days",
        type: "Tourist",
        description: "Explore incredible India with our fast e-Visa service. Visit Delhi, Agra, Jaipur, Kerala, and more. Perfect for sightseeing, recreation, and short-term courses.",
        duration: "30 Days Stay",
        processingTime: "3-5 Working Days",
        cost: 3500.0,
        validity: "120 Days from Issue",
        entryType: "Double Entry",
        requirements: [
            "Passport (minimum 6 months validity from arrival date)",
            "Recent Photo (color, white background, 51x51mm)",
            "Proof of Residence (Utility Bill/NID)",
            "Confirmed Flight Tickets",
            "Bank Statement (last 3 months)"
        ],
        documents: {
            mandatory: ["Passport Bio Page Scan", "Recent Photo (Digital)", "Address Proof"],
            optional: ["Hotel Booking", "Sponsor Letter", "Previous India Visa"],
            note: "e-Tourist Visa available online with faster processing"
        },
        applicationProcess: [
            "Submit passport copy and photo",
            "Fill online e-Visa application form",
            "Upload documents and pay fee online",
            "Receive ETA (Electronic Travel Authorization)",
            "Carry printout during travel to India"
        ],
        faqs: [
            { 
                question: "Can I get visa on arrival in India?", 
                answer: "No, Bangladeshi citizens must apply for e-Visa online before travel." 
            },
            { 
                question: "How many times can I enter India?", 
                answer: "Tourist e-Visa allows double entry (two times) within validity period." 
            },
            { 
                question: "What documents needed at airport?", 
                answer: "Passport, e-Visa printout, return ticket, and hotel booking proof." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
        isPopular: true
    },
    {
        country: "Turkey",
        slug: "turkey-tourist-visa-90days",
        type: "Tourist",
        description: "Experience where East meets West. Visit Istanbul, Cappadocia, Antalya. e-Visa available with 90 days stay for tourism, business visits, and transit.",
        duration: "90 Days Stay",
        processingTime: "5-10 Working Days",
        cost: 6500.0,
        validity: "180 Days from Issue",
        entryType: "Multiple Entry",
        requirements: [
            "Passport (minimum 6 months validity)",
            "Email Address for visa delivery",
            "Hotel Reservation Confirmation",
            "Return Flight Ticket",
            "Travel Insurance (recommended)",
            "Sufficient Financial Means Proof"
        ],
        documents: {
            mandatory: ["Passport Copy", "Flight Booking", "Hotel Booking"],
            optional: ["Travel Insurance", "Bank Statement", "Invitation Letter"],
            note: "Turkey e-Visa can be obtained online easily"
        },
        applicationProcess: [
            "Apply online through official Turkey e-Visa portal",
            "Fill application with passport details",
            "Make payment via credit/debit card",
            "Receive e-Visa via email (instant to 24 hours)",
            "Print e-Visa for travel"
        ],
        faqs: [
            { 
                question: "Is Turkey visa easy to get for Bangladesh?", 
                answer: "Yes, e-Visa is straightforward online process with high approval rate." 
            },
            { 
                question: "Can I stay 90 days continuously?", 
                answer: "Yes, you can stay up to 90 days within 180-day validity period." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
        isPopular: false
    },
    {
        country: "Maldives",
        slug: "maldives-tourist-visa-on-arrival",
        type: "Tourist",
        description: "Enjoy tropical paradise with free visa on arrival! Visit beautiful islands, pristine beaches, and luxury resorts. No pre-application needed for Bangladeshi citizens.",
        duration: "30 Days Stay",
        processingTime: "On Arrival (Instant)",
        cost: 2500.0,
        validity: "30 Days",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport (minimum 6 months validity)",
            "Confirmed Return Air Ticket",
            "Hotel Booking Confirmation or Sponsor Letter",
            "Sufficient funds (USD 100 per day minimum)",
            "Completed Arrival Card (given in flight)"
        ],
        documents: {
            mandatory: ["Valid Passport", "Return Ticket", "Hotel Booking Proof", "Cash/Credit Card"],
            optional: ["Travel Itinerary"],
            note: "Free visa stamped at Malé Airport on arrival"
        },
        applicationProcess: [
            "Book confirmed round-trip flight tickets",
            "Get hotel/resort booking confirmation",
            "Fill arrival card during flight",
            "Present documents at Malé Airport immigration",
            "Receive free 30-day tourist visa stamp"
        ],
        faqs: [
            { 
                question: "Do I need to apply before travel?", 
                answer: "No, Maldives offers free visa on arrival for Bangladeshi passport holders." 
            },
            { 
                question: "What is the service charge 2,500 BDT for?", 
                answer: "Our service includes visa guidance, document verification, and travel assistance." 
            },
            { 
                question: "Can I extend Maldives visa?", 
                answer: "Yes, extension possible up to 90 days total. Apply at immigration office in Malé." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
        isPopular: true
    },

    // ==================== BUSINESS VISAS (4) ====================
    {
        country: "United States",
        slug: "usa-business-visa-b1",
        type: "Business",
        description: "B-1 Business Visa for USA. Attend business meetings, conferences, negotiations, and professional events. Valid for multiple entries up to 10 years.",
        duration: "Up to 180 Days per entry",
        processingTime: "15-30 Working Days",
        cost: 25000.0,
        validity: "Up to 10 Years (Multiple Entry)",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport (6+ months validity)",
            "DS-160 Confirmation Page",
            "Passport Size Photos (2 photos, 51x51mm)",
            "Business Invitation Letter from US company",
            "Company Registration Documents",
            "Bank Statement (last 6 months)",
            "Income Tax Returns (last 3 years)",
            "Previous Travel History (if any)",
            "Embassy Interview Appointment"
        ],
        documents: {
            mandatory: ["Passport", "DS-160 Form", "Photos", "Business Invitation", "Financial Documents"],
            optional: ["Previous US Visa", "Company Profile", "Conference Registration"],
            note: "Personal interview at US Embassy in Dhaka is mandatory"
        },
        applicationProcess: [
            "Fill DS-160 form online",
            "Pay visa application fee",
            "Schedule embassy interview appointment",
            "Gather all required documents",
            "Attend interview at US Embassy Dhaka",
            "Passport with visa returned via courier"
        ],
        faqs: [
            { 
                question: "What questions are asked in interview?", 
                answer: "Purpose of visit, business nature, US contacts, ties to Bangladesh, return plans." 
            },
            { 
                question: "Can business visa be rejected?", 
                answer: "Yes, if unable to prove strong ties to Bangladesh or unclear business purpose." 
            },
            { 
                question: "Can I work on B-1 visa?", 
                answer: "No, B-1 visa does not permit employment. Only business activities allowed." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200",
        isPopular: false
    },
    {
        country: "United Arab Emirates",
        slug: "uae-business-visa-14days",
        type: "Business",
        description: "UAE Business Visa for attending meetings, conferences, exhibitions. Sponsored by UAE company. Fast processing within 7-10 days.",
        duration: "14 Days Stay",
        processingTime: "7-10 Working Days",
        cost: 22000.0,
        validity: "60 Days from Issue",
        entryType: "Single Entry",
        requirements: [
            "Valid Passport (6+ months validity)",
            "Passport Bio Page Color Scan",
            "Recent Photo (white background)",
            "Business Invitation from UAE Company",
            "Company Trade License Copy (UAE sponsor)",
            "Your Company Documents (Bangladesh)",
            "Visiting Card / Business Card"
        ],
        documents: {
            mandatory: ["Passport Scan", "Photo", "UAE Company Invitation", "Sponsor Trade License"],
            optional: ["Conference/Exhibition Details", "Hotel Booking"],
            note: "Sponsor company in UAE must have valid trade license"
        },
        applicationProcess: [
            "UAE company applies for your business visa",
            "Submit passport copy and documents",
            "Application processed with immigration",
            "Visa approval from Dubai/Abu Dhabi immigration",
            "Receive e-Business visa via email"
        ],
        faqs: [
            { 
                question: "Can I convert business visa to work visa?", 
                answer: "No, business visa is only for temporary business visits. Separate work visa needed." 
            },
            { 
                question: "Do I need sponsor in UAE?", 
                answer: "Yes, business visa requires sponsorship from registered UAE company." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
        isPopular: true
    },
    {
        country: "United Kingdom",
        slug: "uk-business-visa-standard",
        type: "Business",
        description: "UK Standard Visitor Visa for Business. Attend meetings, conferences, training. Multiple entry visa valid for 6 months to 10 years.",
        duration: "Up to 180 Days per entry",
        processingTime: "15-20 Working Days",
        cost: 28000.0,
        validity: "6 Months to 10 Years",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport (one blank page)",
            "UK Visa Application Form (online)",
            "Passport Size Photos (45x35mm, color)",
            "Business Invitation Letter from UK",
            "Bank Statement (6 months)",
            "Company documents and registration",
            "Travel History (previous visas)",
            "Biometric Appointment (VFS Global)"
        ],
        documents: {
            mandatory: ["Passport", "Application Form", "Photo", "Business Invitation", "Financial Proof"],
            optional: ["Hotel Booking", "Flight Reservation", "Travel Itinerary"],
            note: "Biometric (fingerprints and photo) required at VFS center"
        },
        applicationProcess: [
            "Complete online application form",
            "Pay visa fee online (approx. £115)",
            "Book biometric appointment at VFS Dhaka",
            "Submit documents at VFS center",
            "Attend biometric appointment",
            "Passport returned with visa decision"
        ],
        faqs: [
            { 
                question: "How long can I stay in UK on business visa?", 
                answer: "Maximum 180 days in any 12-month period. Multiple short visits allowed." 
            },
            { 
                question: "Can I bring family on business visa?", 
                answer: "No, family members need separate visitor visa applications." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
        isPopular: false
    },
    {
        country: "Saudi Arabia",
        slug: "saudi-business-visa-90days",
        type: "Business",
        description: "Saudi Arabia Business Visit Visa. Multiple entry visa for business meetings, negotiations, and contract signing. Sponsored by Saudi company.",
        duration: "90 Days Stay",
        processingTime: "10-15 Working Days",
        cost: 18000.0,
        validity: "6 Months from Issue",
        entryType: "Multiple Entry",
        requirements: [
            "Original Passport (6+ months validity)",
            "Recent Photos (2 photos, white background)",
            "Saudi Company Invitation (Dawa)",
            "Chamber of Commerce Certification",
            "Company Authorization Letter",
            "Bank Statement (3 months)",
            "Yellow Fever Certificate (if applicable)"
        ],
        documents: {
            mandatory: ["Passport", "2 Photos", "Saudi Invitation/Dawa", "Chamber Certificate"],
            optional: ["Previous Saudi Visa", "Business Cards"],
            note: "Invitation must be approved by Saudi Ministry of Foreign Affairs"
        },
        applicationProcess: [
            "Saudi sponsor company submits visa request (Dawa)",
            "Receive approved Dawa from sponsor",
            "Submit passport and documents to embassy",
            "Visa processing at Saudi Embassy Dhaka",
            "Collect passport with visa sticker"
        ],
        faqs: [
            { 
                question: "Can I perform Umrah on business visa?", 
                answer: "No, business visa is strictly for business. Separate Umrah visa required." 
            },
            { 
                question: "How many times can I enter Saudi?", 
                answer: "Multiple entry allowed within 6-month validity period." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1200",
        isPopular: true
    },

    // ==================== STUDENT VISAS (4) ====================
    {
        country: "United States",
        slug: "usa-student-visa-f1",
        type: "Student",
        description: "F-1 Student Visa for academic studies in USA universities and colleges. Valid for duration of study program. Includes work permission opportunities.",
        duration: "Duration of Study (up to 5 years)",
        processingTime: "30-60 Working Days",
        cost: 30000.0,
        validity: "Duration of Program",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport (entire study duration)",
            "I-20 Form from US University",
            "DS-160 Confirmation Page",
            "SEVIS Fee Payment Receipt",
            "Passport Photos (2 photos, 51x51mm)",
            "Academic Transcripts and Certificates",
            "Financial Documents (Bank Statement, Scholarship)",
            "English Proficiency Test (TOEFL/IELTS)",
            "Sponsor's Financial Documents",
            "Embassy Interview Appointment"
        ],
        documents: {
            mandatory: ["Passport", "I-20 Form", "DS-160", "SEVIS Receipt", "Academic Records", "Financial Proof"],
            optional: ["GRE/GMAT Scores", "Work Experience Letters", "Research Proposal"],
            note: "Must prove financial ability to cover tuition and living expenses"
        },
        applicationProcess: [
            "Get admission and I-20 from US university",
            "Pay SEVIS fee online ($350)",
            "Complete DS-160 form online",
            "Schedule visa interview at US Embassy",
            "Prepare all financial and academic documents",
            "Attend interview with confidence",
            "Receive passport with F-1 visa"
        ],
        faqs: [
            { 
                question: "Can I work on F-1 visa?", 
                answer: "On-campus work allowed (20 hrs/week). CPT and OPT available for practical training." 
            },
            { 
                question: "What if I get rejected?", 
                answer: "Can reapply anytime with improved documentation. Refusal under 214(b) is common." 
            },
            { 
                question: "How much funds needed?", 
                answer: "Must show 1st year tuition + living expenses (typically $40,000-80,000 USD)." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200",
        isPopular: true
    },
    {
        country: "Canada",
        slug: "canada-student-visa-study-permit",
        type: "Student",
        description: "Canadian Study Permit for international students. Study at Canadian universities and colleges. Work permit included (20 hours/week during study).",
        duration: "Duration of Study Program",
        processingTime: "30-45 Working Days",
        cost: 32000.0,
        validity: "Duration of Program + 90 days",
        entryType: "Multiple Entry (with eTA)",
        requirements: [
            "Valid Passport",
            "Letter of Acceptance from DLI (Designated Learning Institution)",
            "Proof of Financial Support (GIC or Bank Statement)",
            "Academic Transcripts (SSC, HSC, Bachelor's)",
            "IELTS/TOEFL Score (min. 6.0-6.5 overall)",
            "Medical Examination (approved panel physician)",
            "Police Clearance Certificate",
            "Statement of Purpose (SOP)",
            "Biometric Fee Payment Receipt"
        ],
        documents: {
            mandatory: ["Passport", "LOA from DLI", "Financial Proof (GIC/Bank)", "Academic Records", "IELTS", "Medical", "Police Certificate"],
            optional: ["Work Experience", "Sponsor Documents", "Property Papers"],
            note: "GIC (Guaranteed Investment Certificate) of CAD 10,000 commonly required"
        },
        applicationProcess: [
            "Receive Letter of Acceptance from Canadian college/university",
            "Open GIC account or show sufficient funds",
            "Complete medical exam with panel physician",
            "Get police clearance certificate",
            "Apply online through IRCC portal",
            "Submit biometrics at VAC center",
            "Receive study permit approval letter",
            "Get study permit at Canadian port of entry"
        ],
        faqs: [
            { 
                question: "Can I work while studying in Canada?", 
                answer: "Yes, 20 hours/week during study term, full-time during breaks with valid study permit." 
            },
            { 
                question: "What is Post-Graduation Work Permit?", 
                answer: "PGWP allows you to work in Canada after graduation (up to 3 years)." 
            },
            { 
                question: "Is IELTS mandatory for Canada?", 
                answer: "Yes, most DLIs require IELTS 6.0-6.5 overall for undergraduate programs." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200",
        isPopular: true
    },
    {
        country: "Australia",
        slug: "australia-student-visa-subclass-500",
        type: "Student",
        description: "Australian Student Visa Subclass 500. Study at Australian universities, TAFEs, or English language schools. Work rights included (48 hours/fortnight).",
        duration: "Duration of Study + Holiday period",
        processingTime: "30-60 Working Days",
        cost: 35000.0,
        validity: "Duration of Course + 2-4 months",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport",
            "Confirmation of Enrolment (CoE) from institution",
            "Genuine Temporary Entrant (GTE) Statement",
            "Academic Transcripts and Certificates",
            "English Proficiency (IELTS/PTE/TOEFL)",
            "Financial Capacity Evidence (approx. AUD 24,505/year)",
            "Overseas Student Health Cover (OSHC)",
            "Health Examination (mandatory)",
            "Character Requirements (Police Clearance)",
            "Biometric Collection"
        ],
        documents: {
            mandatory: ["Passport", "CoE", "GTE Statement", "Academic Records", "English Test", "Financial Proof", "OSHC", "Health Exam"],
            optional: ["Work Experience", "Scholarship Letter", "Sponsor Documents"],
            note: "Must maintain full-time enrollment and satisfactory academic progress"
        },
        applicationProcess: [
            "Receive CoE from Australian institution",
            "Purchase OSHC (health insurance)",
            "Complete health examination",
            "Prepare GTE statement explaining study intentions",
            "Apply online via ImmiAccount",
            "Upload all supporting documents",
            "Provide biometrics if requested",
            "Receive visa grant notification"
        ],
        faqs: [
            { 
                question: "Can I work on Australian student visa?", 
                answer: "Yes, 48 hours per fortnight during semester, unlimited during scheduled breaks." 
            },
            { 
                question: "What is GTE requirement?", 
                answer: "Genuine Temporary Entrant - statement proving you genuinely intend to study temporarily." 
            },
            { 
                question: "How much funds required?", 
                answer: "Approx. AUD 24,505/year for living + tuition fees + travel costs." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200",
        isPopular: true
    },
    {
        country: "United Kingdom",
        slug: "uk-student-visa-tier-4",
        type: "Student",
        description: "UK Student Visa (formerly Tier 4). Study at UK universities and colleges. Work allowed (20 hours/week during term). Post-study work visa available.",
        duration: "Duration of Study",
        processingTime: "30-60 Working Days",
        cost: 38000.0,
        validity: "Duration of Course + 2-4 months",
        entryType: "Multiple Entry",
        requirements: [
            "Valid Passport (with blank page)",
            "CAS (Confirmation of Acceptance for Studies) from UK institution",
            "Proof of Financial Funds (tuition + £1,334/month for 9 months if studying in London)",
            "Academic Transcripts and Degrees",
            "English Language Proficiency (IELTS/UKVI SELT)",
            "TB Test Certificate (from approved clinic)",
            "Academic Technology Approval Scheme (if required)",
            "Parental Consent (if under 18)",
            "Biometric Appointment Confirmation"
        ],
        documents: {
            mandatory: ["Passport", "CAS Letter", "Financial Proof", "Academic Records", "IELTS UKVI", "TB Test"],
            optional: ["Scholarship Letters", "Sponsor Documents", "Previous UK Visa"],
            note: "Funds must be held for 28 consecutive days before application"
        },
        applicationProcess: [
            "Receive CAS number from UK university",
            "Complete TB test at approved clinic in Dhaka",
            "Prepare financial evidence (28-day rule)",
            "Apply online and pay visa fee (£363-490)",
            "Book biometric appointment at VFS",
            "Submit documents and biometrics",
            "Track application online",
            "Receive visa vignette in passport"
        ],
        faqs: [
            { 
                question: "Can I work while studying in UK?", 
                answer: "Yes, up to 20 hours/week during term time, full-time during holidays." 
            },
            { 
                question: "What is Graduate Route Visa?", 
                answer: "Post-study work visa allowing 2 years (3 for PhD) to work in UK after graduation." 
            },
            { 
                question: "How much money do I need to show?", 
                answer: "1 year tuition + £1,334/month × 9 months (London) or £1,023/month (outside London)." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
        isPopular: false
    },

    // ==================== WORK PERMITS (7) ====================
    {
        country: "United Arab Emirates",
        slug: "uae-work-visa-employment",
        type: "Work Permit",
        description: "UAE Employment Visa sponsored by UAE company. 2-year work visa with residence permit. Includes medical insurance and labor card. Popular destination for Bangladeshi workers.",
        duration: "2 Years (renewable)",
        processingTime: "15-25 Working Days",
        cost: 28000.0,
        validity: "2 Years",
        entryType: "Single Entry + Residence Visa",
        requirements: [
            "Valid Passport (minimum 7 months validity)",
            "Recent Passport Size Photos (10 copies, white background)",
            "Educational Certificates (attested by UAE Embassy)",
            "Experience Certificates (if required)",
            "Employment Contract from UAE company",
            "Medical Fitness Certificate (after arrival)",
            "Police Clearance Certificate (attested)",
            "Passport Bio Page Copy"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Attested Certificates", "Job Offer Letter", "Police Clearance"],
            optional: ["Previous UAE Visa", "Professional License"],
            note: "Educational certificates must be attested by MOFA Bangladesh and UAE Embassy"
        },
        applicationProcess: [
            "UAE employer obtains work permit approval",
            "Sponsor sends entry permit (e-visa)",
            "Submit attested documents",
            "Enter UAE on entry permit",
            "Complete medical fitness test in UAE",
            "Get Emirates ID and labor card",
            "Residence visa stamped in passport"
        ],
        faqs: [
            { 
                question: "What is attestation process for certificates?", 
                answer: "Educational certificates must be attested from Education Ministry, MOFA Bangladesh, and UAE Embassy." 
            },
            { 
                question: "Can I change employer in UAE?", 
                answer: "Yes, after completing contract period or with NOC from current employer." 
            },
            { 
                question: "What salary can I expect?", 
                answer: "Varies by profession: AED 2,000-15,000/month. Check job contract carefully." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
        isPopular: true
    },
    {
        country: "Saudi Arabia",
        slug: "saudi-work-visa-iqama",
        type: "Work Permit",
        description: "Saudi Arabia Work Visa with Iqama (residence permit). Sponsored employment for 1-2 years. Includes accommodation and medical benefits as per contract.",
        duration: "1-2 Years (renewable)",
        processingTime: "20-30 Working Days",
        cost: 25000.0,
        validity: "1-2 Years",
        entryType: "Single Entry + Iqama",
        requirements: [
            "Original Passport (minimum 1 year validity)",
            "Recent Photos (8 copies, white background)",
            "Degree/Certificate Attestation (from Saudi Embassy)",
            "Work Contract from Saudi employer",
            "Medical Report from approved center",
            "Police Clearance Certificate (attested)",
            "Visa Block Number from sponsor",
            "Professional License (if applicable)"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Attested Certificates", "Medical Report", "Police Clearance", "Block Number"],
            optional: ["Previous Saudi Iqama", "Experience Letters"],
            note: "Different procedures for Kafala and non-Kafala visa systems"
        },
        applicationProcess: [
            "Saudi employer obtains work permit and block number",
            "Complete medical test at GAMCA center",
            "Attest certificates at Saudi Embassy",
            "Submit documents for visa processing",
            "Receive visa authorization",
            "Fly to Saudi Arabia",
            "Complete biometrics and get Iqama"
        ],
        faqs: [
            { 
                question: "What is GAMCA medical test?", 
                answer: "GCC Approved Medical Centers Association - mandatory health check for Gulf countries." 
            },
            { 
                question: "Can I bring family on work visa?", 
                answer: "Yes, if salary is SAR 4,000+/month, you can sponsor family on dependent visa." 
            },
            { 
                question: "Is attestation mandatory?", 
                answer: "Yes, all educational and personal documents must be attested by Saudi Embassy Dhaka." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1200",
        isPopular: true
    },
    {
        country: "Qatar",
        slug: "qatar-work-visa-rp",
        type: "Work Permit",
        description: "Qatar Work Visa with Residence Permit (RP). Sponsored employment for professionals, engineers, and skilled workers. Tax-free salary and benefits.",
        duration: "1-5 Years (renewable)",
        processingTime: "15-25 Working Days",
        cost: 26000.0,
        validity: "As per Contract",
        entryType: "Single Entry + RP",
        requirements: [
            "Valid Passport (minimum 6 months)",
            "Recent Photos (6 copies, white background)",
            "Educational Certificates (Qatar Embassy attested)",
            "Experience Certificates (if required)",
            "Employment Contract from Qatar company",
            "Medical Fitness (GAMCA approved center)",
            "Police Clearance Certificate (attested)",
            "Work Permit Approval from employer"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Attested Degrees", "Job Contract", "GAMCA Medical", "Police Clearance"],
            optional: ["Professional Certificates", "NOC from previous employer"],
            note: "Qatar follows new labor law - easier job change after contract"
        },
        applicationProcess: [
            "Qatar employer obtains work visa approval",
            "Complete GAMCA medical examination",
            "Attest documents at Qatar Embassy Dhaka",
            "Submit passport and documents",
            "Receive entry permit/visa",
            "Travel to Qatar",
            "Complete biometric and get Qatar ID (RP)"
        ],
        faqs: [
            { 
                question: "Can I change jobs in Qatar?", 
                answer: "Yes, new labor law allows job change even during contract with notice period." 
            },
            { 
                question: "What benefits do workers get?", 
                answer: "Tax-free salary, accommodation, transport, medical insurance, annual ticket as per contract." 
            },
            { 
                question: "How long does attestation take?", 
                answer: "Qatar Embassy attestation takes 7-10 working days in Dhaka." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1200",
        isPopular: true
    },
    {
        country: "Oman",
        slug: "oman-work-visa-residence",
        type: "Work Permit",
        description: "Oman Employment Visa with residence card. 2-year renewable work visa for skilled professionals. Good work environment and benefits in Gulf region.",
        duration: "2 Years (renewable)",
        processingTime: "15-20 Working Days",
        cost: 24000.0,
        validity: "2 Years",
        entryType: "Work Visa + Residence",
        requirements: [
            "Valid Passport (6+ months validity)",
            "Recent Photos (8 copies, white background)",
            "Educational Certificates (Oman Embassy attested)",
            "Professional Certificates (if applicable)",
            "Employment Contract from Omani company",
            "Medical Certificate (GAMCA approved)",
            "Police Clearance Certificate",
            "Visa Approval from Omani sponsor"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Attested Certificates", "Job Offer", "Medical Certificate", "Police Clearance"],
            optional: ["Previous Oman Visa", "Work Experience Letters"],
            note: "Oman offers good working conditions with reasonable living costs"
        },
        applicationProcess: [
            "Omani employer obtains labor clearance",
            "Complete medical test at GAMCA center",
            "Attest documents at Oman Embassy",
            "Submit passport for visa processing",
            "Receive work visa approval",
            "Travel to Oman",
            "Complete residence card formalities"
        ],
        faqs: [
            { 
                question: "What is the salary range in Oman?", 
                answer: "Entry level: OMR 200-300, Skilled: OMR 300-600, Professionals: OMR 600-2000/month." 
            },
            { 
                question: "Can family accompany on work visa?", 
                answer: "Yes, can sponsor family if salary meets minimum requirement (usually OMR 400+)." 
            },
            { 
                question: "Is Oman work visa easy to get?", 
                answer: "Yes, straightforward process with proper documents and genuine job offer." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200",
        isPopular: false
    },
    {
        country: "Malaysia",
        slug: "malaysia-work-permit-ep-professional",
        type: "Work Permit",
        description: "Malaysia Employment Pass for professionals and skilled workers. Valid for up to 5 years. Renewable work permit with dependent visa option.",
        duration: "1-5 Years (renewable)",
        processingTime: "25-35 Working Days",
        cost: 22000.0,
        validity: "1-5 Years based on contract",
        entryType: "Multiple Entry Work Pass",
        requirements: [
            "Valid Passport (minimum 18 months validity)",
            "Recent Passport Photos (4 copies, blue background)",
            "Degree Certificate and Transcripts",
            "Professional Certificates/Qualifications",
            "CV/Resume with detailed experience",
            "Employment Contract from Malaysian company",
            "Medical Report (after approval)",
            "Approved Employment Pass approval letter"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Degree Certificate", "CV", "Job Contract", "EP Approval Letter"],
            optional: ["Professional Memberships", "Reference Letters"],
            note: "Minimum salary RM 5,000 for expatriate Employment Pass"
        },
        applicationProcess: [
            "Employer applies for Employment Pass online (ESD)",
            "Receive EP approval from Immigration",
            "Submit passport and medical report",
            "Visa application processing",
            "Receive Single Entry Visa",
            "Travel to Malaysia",
            "Complete medical check and collect EP card"
        ],
        faqs: [
            { 
                question: "What is minimum salary for Malaysia EP?", 
                answer: "RM 5,000/month for general positions, RM 7,000 for senior positions." 
            },
            { 
                question: "Can I bring family to Malaysia?", 
                answer: "Yes, dependent pass available for spouse and children under 18." 
            },
            { 
                question: "How long does EP processing take?", 
                answer: "Typically 25-35 working days from application to visa collection." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
        isPopular: true
    },
    {
        country: "Singapore",
        slug: "singapore-work-visa-ep-sp",
        type: "Work Permit",
        description: "Singapore Employment Pass (EP) / S Pass for professionals and skilled workers. Competitive salary with PR pathway. Family visa available.",
        duration: "1-3 Years (renewable)",
        processingTime: "20-30 Working Days",
        cost: 30000.0,
        validity: "Up to 3 Years (renewable)",
        entryType: "Multiple Entry Work Pass",
        requirements: [
            "Valid Passport (minimum 6 months validity)",
            "Recent Passport Photos (2 copies, white background)",
            "Degree Certificate and Transcripts",
            "Professional Qualifications and Certifications",
            "Detailed CV with work experience",
            "Employment Contract (must meet salary criteria)",
            "Educational Assessment (if required)",
            "In-Principle Approval (IPA) letter"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Degree Certificates", "CV", "Job Offer", "IPA Letter"],
            optional: ["Reference Letters", "Salary Slips from previous job"],
            note: "EP minimum salary: SGD 5,000, S Pass: SGD 3,150 (varies by sector)"
        },
        applicationProcess: [
            "Employer applies online via Ministry of Manpower",
            "Receive In-Principle Approval (IPA)",
            "Complete medical examination in Singapore",
            "Submit passport for work pass issuance",
            "Collect Employment Pass card from MOM",
            "Begin employment legally in Singapore"
        ],
        faqs: [
            { 
                question: "What is difference between EP and S Pass?", 
                answer: "EP for professionals (>SGD 5K salary), S Pass for mid-skilled (>SGD 3.15K). EP has more privileges." 
            },
            { 
                question: "Can I get PR with work visa?", 
                answer: "Yes, after working 6 months on EP/S Pass, eligible to apply for Permanent Residence." 
            },
            { 
                question: "Can spouse work in Singapore?", 
                answer: "Yes, EP holder's spouse can apply for Dependant Pass and Letter of Consent to work." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
        isPopular: true
    },
    {
        country: "Kuwait",
        slug: "kuwait-work-visa-visa-18",
        type: "Work Permit",
        description: "Kuwait Work Visa (Visa 18) sponsored by Kuwaiti company. Employment visa for skilled workers with 2-year validity. Medical and benefits included.",
        duration: "2 Years (renewable)",
        processingTime: "20-30 Working Days",
        cost: 23000.0,
        validity: "2 Years",
        entryType: "Work Visa + Civil ID",
        requirements: [
            "Valid Passport (minimum 1 year validity)",
            "Recent Photos (6 copies, white background)",
            "Educational Certificates (Kuwait Embassy attested)",
            "Professional Certificates (if applicable)",
            "Employment Contract from Kuwait company",
            "Medical Fitness Certificate (Kuwait approved center)",
            "Police Clearance Certificate (attested)",
            "Visa Authorization Number from sponsor"
        ],
        documents: {
            mandatory: ["Passport", "Photos", "Attested Degrees", "Medical Certificate", "Police Clearance", "Visa Number"],
            optional: ["Experience Certificates", "Previous Kuwait Visa"],
            note: "Kuwait requires all documents to be Kuwait Embassy attested"
        },
        applicationProcess: [
            "Kuwaiti sponsor obtains work visa approval",
            "Receive visa authorization number",
            "Complete medical test at approved center",
            "Attest documents at Kuwait Embassy Dhaka",
            "Submit documents for visa stamping",
            "Receive work visa in passport",
            "Travel to Kuwait and get Civil ID"
        ],
        faqs: [
            { 
                question: "What is Kuwait Civil ID?", 
                answer: "Mandatory residence card for all expats living in Kuwait. Includes biometric data." 
            },
            { 
                question: "Can I change employer in Kuwait?", 
                answer: "Possible after completing contract or with NOC from current sponsor." 
            },
            { 
                question: "What is the salary range?", 
                answer: "Varies: Skilled workers KWD 150-300, Professionals KWD 300-800/month." 
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200",
        isPopular: false
    }
];

async function main() {
    try {
        console.log('🚀 Starting comprehensive visa package seeding...\n');

        // Clear existing visa packages
        console.log('🗑️  Clearing existing visa packages...');
        const deleteResult = await prisma.$queryRaw`DELETE FROM visa_packages`;
        console.log('✅ Existing data cleared\n');

        // Insert new visa packages
        console.log('📦 Inserting 22 comprehensive visa packages...\n');
        
        for (const pkg of visaPackages) {
            const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
            await prisma.$executeRaw`
                INSERT INTO visa_packages (
                    id, country, slug, type, description, duration, "processingTime",
                    cost, validity, "entryType", requirements, documents, "applicationProcess",
                    faqs, "imageUrl", "isPopular", "createdAt", "updatedAt"
                ) VALUES (
                    ${id}, ${pkg.country}, ${pkg.slug}, ${pkg.type}, ${pkg.description},
                    ${pkg.duration}, ${pkg.processingTime}, ${pkg.cost}, ${pkg.validity},
                    ${pkg.entryType}, ${pkg.requirements}::text[], ${JSON.stringify(pkg.documents)}::jsonb,
                    ${pkg.applicationProcess}::text[], ${JSON.stringify(pkg.faqs)}::jsonb,
                    ${pkg.imageUrl}, ${pkg.isPopular}, NOW(), NOW()
                )
            `;
            console.log(`✅ Added: ${pkg.country} - ${pkg.type}`);
        }

        console.log('\n✨ Successfully seeded 22 visa packages!');
        console.log('\n📊 Summary:');
        console.log('   - Tourist Visas: 7 packages');
        console.log('   - Business Visas: 4 packages');
        console.log('   - Student Visas: 4 packages');
        console.log('   - Work Permits: 7 packages');
        console.log('   - TOTAL: 22 visa packages\n');

        // Verify the count
        const countResult = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM visa_packages`;
        console.log(`✅ Verified: ${countResult[0].count} packages in database\n`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
