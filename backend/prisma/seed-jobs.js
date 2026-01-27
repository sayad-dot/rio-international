import 'dotenv/config';
import prisma from '../src/config/database.js';

const jobs = [
  {
    title: 'Travel Consultant',
    department: 'Sales',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    salary: '৳30,000 - ৳50,000',
    description: 'Help clients plan their dream vacations and manage travel bookings. As a Travel Consultant, you will be the face of Rio Tours & Travels, providing expert advice and exceptional service.',
    requirements: [
      '2+ years of experience in travel industry',
      'Excellent communication and customer service skills',
      'Knowledge of visa processing and international travel',
      'Proficiency in English and Bengali',
      'Bachelor\'s degree in Tourism, Business, or related field'
    ],
    responsibilities: [
      'Consult with clients to understand their travel needs',
      'Create customized travel itineraries and packages',
      'Handle booking of flights, hotels, and tours',
      'Provide visa assistance and documentation support',
      'Maintain relationships with clients and follow up',
      'Meet sales targets and contribute to team goals'
    ],
    benefits: [
      'Health insurance coverage',
      'Performance-based bonuses',
      'Travel discounts and perks',
      'Professional development opportunities',
      'Paid time off and vacation leave'
    ],
    positions: 2,
    isActive: true
  },
  {
    title: 'Visa Processing Officer',
    department: 'Operations',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    salary: '৳25,000 - ৳40,000',
    description: 'Process visa applications and ensure compliance with embassy requirements. Play a crucial role in helping clients achieve their travel dreams.',
    requirements: [
      '1+ years of experience in visa processing',
      'Strong attention to detail',
      'Knowledge of international visa requirements and embassy procedures',
      'Excellent organizational skills',
      'Proficiency in MS Office applications'
    ],
    responsibilities: [
      'Review and verify visa application documents',
      'Communicate with embassies and consulates',
      'Guide clients through the visa application process',
      'Maintain up-to-date knowledge of visa regulations',
      'Track and manage application deadlines',
      'Resolve issues and provide solutions'
    ],
    benefits: [
      'Health insurance',
      'Annual bonuses',
      'Career advancement opportunities',
      'Supportive team environment',
      'Flexible working hours'
    ],
    positions: 3,
    isActive: true
  },
  {
    title: 'Tour Operations Manager',
    department: 'Operations',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    salary: '৳40,000 - ৳60,000',
    description: 'Manage tour operations, coordinate with partners, and ensure customer satisfaction. Lead a team to deliver exceptional travel experiences.',
    requirements: [
      '3+ years of experience in tour operations or hospitality',
      'Strong leadership and team management skills',
      'Excellent problem-solving abilities',
      'Knowledge of international travel destinations',
      'Bachelor\'s degree in Tourism Management or related field'
    ],
    responsibilities: [
      'Plan and coordinate tour packages',
      'Manage relationships with hotels, airlines, and local partners',
      'Supervise tour operations team',
      'Ensure quality control and customer satisfaction',
      'Handle escalations and resolve customer issues',
      'Monitor operational costs and budgets'
    ],
    benefits: [
      'Comprehensive health insurance',
      'Performance bonuses',
      'Travel opportunities',
      'Leadership development programs',
      'Paid vacation and sick leave'
    ],
    positions: 1,
    isActive: true
  },
  {
    title: 'Customer Service Representative',
    department: 'Customer Support',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    salary: '৳20,000 - ৳35,000',
    description: 'Provide excellent customer service and support to our clients. Be the first point of contact for customer inquiries and assist with their travel needs.',
    requirements: [
      'Experience in customer service (fresh graduates welcome)',
      'Excellent communication skills in English and Bengali',
      'Patience and empathy',
      'Computer literacy',
      'Willingness to work flexible hours'
    ],
    responsibilities: [
      'Respond to customer inquiries via phone, email, and chat',
      'Assist clients with booking and travel information',
      'Resolve customer complaints and issues',
      'Maintain accurate customer records',
      'Escalate complex issues to appropriate teams',
      'Contribute to improving customer service processes'
    ],
    benefits: [
      'Health insurance',
      'Performance incentives',
      'Training and development',
      'Friendly work environment',
      'Career growth opportunities'
    ],
    positions: 4,
    isActive: true
  },
  {
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    salary: '৳35,000 - ৳55,000',
    description: 'Drive digital marketing campaigns and grow our online presence. Use data-driven strategies to attract and engage travelers.',
    requirements: [
      '2+ years of digital marketing experience',
      'Expertise in SEO, SEM, and social media marketing',
      'Experience with Google Analytics and marketing tools',
      'Strong content creation and copywriting skills',
      'Knowledge of travel industry is a plus'
    ],
    responsibilities: [
      'Develop and execute digital marketing strategies',
      'Manage social media accounts and campaigns',
      'Create engaging content for website and social platforms',
      'Optimize website for search engines',
      'Track and analyze campaign performance',
      'Collaborate with design and sales teams'
    ],
    benefits: [
      'Health insurance coverage',
      'Performance-based bonuses',
      'Remote work flexibility',
      'Professional development budget',
      'Travel discounts'
    ],
    positions: 1,
    isActive: true
  }
];

async function main() {
  console.log('🌱 Starting job seeding...');

  for (const job of jobs) {
    const created = await prisma.job.create({
      data: job
    });
    console.log(`✅ Created job: ${created.title}`);
  }

  console.log('✅ Job seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding jobs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
