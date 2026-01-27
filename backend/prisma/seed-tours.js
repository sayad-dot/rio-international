import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { randomUUID } from 'crypto';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const tourPackages = [
  {
    id: randomUUID(),
    title: "Cox's Bazar Beach Paradise",
    slug: "coxs-bazar-beach-paradise",
    description: "Experience the world's longest natural sea beach with golden sands and stunning sunsets. Cox's Bazar is the perfect destination for beach lovers, offering pristine waters, local seafood delicacies, and breathtaking sunset views. Enjoy water sports, beach volleyball, and relaxing walks along the shore.",
    shortDescription: "World's longest natural sea beach with golden sands",
    destination: "Cox's Bazar",
    country: "Bangladesh",
    category: "beach",
    duration: 3,
    price: 15000,
    discountPrice: 15000,
    maxGroupSize: 20,
    difficulty: "EASY",
    inclusions: ["Hotel accommodation", "Daily breakfast", "Transport from Dhaka", "Professional guide", "All entry fees"],
    exclusions: ["Lunch and dinner", "Personal expenses", "Travel insurance", "Tips for guide"],
    itinerary: {
      "Day 1": "Depart from Dhaka early morning. Arrive at Cox's Bazar and check-in to hotel. Afternoon beach visit and sunset viewing. Evening free time.",
      "Day 2": "Full day beach activities including water sports, beach volleyball, and relaxation. Visit Inani Beach and Himchari National Park.",
      "Day 3": "Morning visit to Laboni Beach. Check-out and departure to Dhaka."
    },
    highlights: [
      "World's longest natural sea beach",
      "Stunning sunset views",
      "Fresh seafood experience",
      "Water sports activities",
      "Himchari National Park visit"
    ],
    coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800"
    ],
    rating: 4.8,
    totalReviews: 124,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: false,
    metaTitle: "Cox's Bazar Beach Tour Package - 3 Days",
    metaDescription: "Explore the world's longest natural sea beach with our exclusive tour package"
  },
  {
    id: randomUUID(),
    title: "Sundarbans Wildlife Adventure",
    slug: "sundarbans-wildlife-adventure",
    description: "Explore the largest mangrove forest in the world and spot the majestic Royal Bengal Tiger. The Sundarbans is a UNESCO World Heritage Site, home to diverse wildlife including spotted deer, crocodiles, and numerous bird species. Navigate through narrow creeks and experience the pristine beauty of this unique ecosystem.",
    shortDescription: "Explore the largest mangrove forest and spot Royal Bengal Tigers",
    destination: "Sundarbans",
    country: "Bangladesh",
    category: "adventure",
    duration: 2,
    price: 12000,
    maxGroupSize: 15,
    difficulty: "MODERATE",
    inclusions: ["Boat accommodation", "All meals", "Professional guide", "Forest permits", "Binoculars provided"],
    exclusions: ["Transport to/from Khulna", "Personal expenses", "Tips for crew"],
    itinerary: {
      "Day 1": "Early morning departure from Khulna. Board the boat and sail into Sundarbans. Wildlife spotting along narrow creeks. Overnight on boat.",
      "Day 2": "Early morning tiger spotting expedition. Visit Karamjal Wildlife Breeding Center. Return to Khulna by evening."
    },
    highlights: [
      "Royal Bengal Tiger spotting opportunity",
      "Unique mangrove ecosystem",
      "Diverse bird species",
      "Crocodile sightings",
      "UNESCO World Heritage Site"
    ],
    coverImage: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=1200",
    images: [
      "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=800",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
      "https://images.unsplash.com/photo-1535403383-bef0d5b2ebef?w=800"
    ],
    rating: 4.9,
    totalReviews: 98,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: false,
    metaTitle: "Sundarbans Wildlife Tour - 2 Days Adventure",
    metaDescription: "Experience the thrill of spotting Royal Bengal Tigers in the wild"
  },
  {
    id: randomUUID(),
    title: "Dubai Shopping & Desert Safari",
    slug: "dubai-shopping-desert-safari",
    description: "Discover the glamour of Dubai with world-class shopping and thrilling desert adventures. Experience the perfect blend of modern luxury and traditional Arabian culture. Visit iconic landmarks, enjoy desert safaris, and indulge in shopping at world-famous malls.",
    shortDescription: "Luxury shopping and thrilling desert adventures in Dubai",
    destination: "Dubai",
    country: "UAE",
    category: "international",
    duration: 5,
    price: 85000,
    discountPrice: 85000,
    maxGroupSize: 25,
    difficulty: "EASY",
    inclusions: ["Return flight tickets", "4-star hotel accommodation", "Desert safari with BBQ dinner", "Dubai city tour", "Burj Khalifa visit"],
    exclusions: ["Lunch on most days", "Shopping expenses", "Optional activities"],
    itinerary: {
      "Day 1": "Arrival in Dubai. Transfer to hotel. Evening at leisure.",
      "Day 2": "Full day Dubai city tour including Burj Khalifa, Dubai Mall, and Dubai Marina.",
      "Day 3": "Desert safari with dune bashing, camel ride, and BBQ dinner under the stars.",
      "Day 4": "Shopping day at Dubai Mall and Mall of Emirates. Optional activities.",
      "Day 5": "Check-out and departure to Dhaka."
    },
    highlights: [
      "Burj Khalifa - World's tallest building",
      "Thrilling desert safari",
      "World-class shopping malls",
      "Dubai Marina cruise",
      "Traditional Arabian BBQ dinner"
    ],
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800"
    ],
    rating: 4.7,
    totalReviews: 256,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: false,
    metaTitle: "Dubai Shopping & Desert Safari - 5 Days",
    metaDescription: "Experience luxury shopping and desert adventures in Dubai"
  },
  {
    id: randomUUID(),
    title: "Maldives Luxury Escape",
    slug: "maldives-luxury-escape",
    description: "Indulge in paradise with crystal clear waters and overwater villas. The Maldives offers the ultimate tropical escape with pristine beaches, vibrant marine life, and world-class resorts. Perfect for honeymooners and luxury travelers seeking relaxation and romance.",
    shortDescription: "Paradise beaches with overwater villas and crystal clear waters",
    destination: "Malé",
    country: "Maldives",
    category: "beach",
    duration: 4,
    price: 120000,
    maxGroupSize: 10,
    difficulty: "EASY",
    inclusions: ["Return flight", "Luxury resort accommodation", "All meals (breakfast, lunch, dinner)", "Water sports activities", "Speedboat transfers"],
    exclusions: ["Alcoholic beverages", "Spa treatments", "Diving courses"],
    itinerary: {
      "Day 1": "Arrival at Malé airport. Speedboat transfer to resort. Check-in to overwater villa. Afternoon relaxation.",
      "Day 2": "Full day at leisure. Water sports activities including snorkeling and kayaking. Sunset cruise.",
      "Day 3": "Island hopping tour. Visit local island and experience Maldivian culture. Beach BBQ dinner.",
      "Day 4": "Morning at beach. Check-out and transfer to airport for departure."
    },
    highlights: [
      "Overwater villa accommodation",
      "Crystal clear turquoise waters",
      "World-class snorkeling and diving",
      "Romantic sunset cruises",
      "Private beach access"
    ],
    coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=800"
    ],
    rating: 5.0,
    totalReviews: 189,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: false,
    metaTitle: "Maldives Luxury Resort Package - 4 Days",
    metaDescription: "Experience paradise with overwater villas and crystal waters"
  },
  {
    id: randomUUID(),
    title: "Thailand Cultural Experience",
    slug: "thailand-cultural-experience",
    description: "Experience the rich culture, temples, and vibrant nightlife of Thailand. From the bustling streets of Bangkok to the beautiful beaches of Pattaya, this tour offers the perfect mix of culture, adventure, and relaxation. Visit ancient temples, enjoy Thai cuisine, and experience the famous Thai hospitality.",
    shortDescription: "Rich culture, temples, and vibrant nightlife",
    destination: "Bangkok",
    country: "Thailand",
    category: "international",
    duration: 6,
    price: 45000,
    maxGroupSize: 30,
    difficulty: "EASY",
    inclusions: ["Return flight", "Hotel accommodation", "Bangkok city tour", "Pattaya beach tour", "Some meals included"],
    exclusions: ["Most lunches and dinners", "Optional activities", "Tips"],
    itinerary: {
      "Day 1": "Arrival in Bangkok. Hotel check-in. Evening free time.",
      "Day 2": "Full day Bangkok city tour including Grand Palace, Wat Pho, and floating market.",
      "Day 3": "Transfer to Pattaya. Coral Island tour with water activities.",
      "Day 4": "Nong Nooch Garden and Pattaya beach activities.",
      "Day 5": "Return to Bangkok. Shopping at MBK Center and Chatuchak Market.",
      "Day 6": "Check-out and departure."
    },
    highlights: [
      "Grand Palace and Wat Pho temples",
      "Floating market experience",
      "Coral Island water activities",
      "Nong Nooch Tropical Garden",
      "Thai street food experience"
    ],
    coverImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200",
    images: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800"
    ],
    rating: 4.6,
    totalReviews: 312,
    isActive: true,
    isFeatured: false,
    isHajjUmrah: false,
    metaTitle: "Thailand Cultural Tour - 6 Days Bangkok & Pattaya",
    metaDescription: "Explore Thai temples, culture, and beaches"
  },
  {
    id: randomUUID(),
    title: "Srimangal Tea Garden Tour",
    slug: "srimangal-tea-garden-tour",
    description: "Explore the tea capital of Bangladesh with lush green gardens and serene landscapes. Srimangal offers a peaceful retreat with its rolling tea gardens, tropical rainforests, and diverse birdlife. Experience the tea-making process and enjoy the natural beauty of this region.",
    shortDescription: "Lush tea gardens and serene natural landscapes",
    destination: "Srimangal",
    country: "Bangladesh",
    category: "nature",
    duration: 2,
    price: 8000,
    maxGroupSize: 20,
    difficulty: "EASY",
    inclusions: ["Hotel accommodation", "Daily breakfast", "Transport from Dhaka", "Tea garden tours", "Guide service"],
    exclusions: ["Lunch and dinner", "Personal expenses"],
    itinerary: {
      "Day 1": "Morning departure from Dhaka. Arrival in Srimangal. Visit Lawachara National Park. Tea garden tour. Overnight stay.",
      "Day 2": "Early morning visit to tea gardens. Seven-layer tea tasting. Return to Dhaka."
    },
    highlights: [
      "Lush green tea gardens",
      "Famous seven-layer tea",
      "Lawachara National Park",
      "Bird watching opportunities",
      "Tea factory visit"
    ],
    coverImage: "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=1200",
    images: [
      "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800",
      "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800",
      "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800"
    ],
    rating: 4.5,
    totalReviews: 67,
    isActive: true,
    isFeatured: false,
    isHajjUmrah: false,
    metaTitle: "Srimangal Tea Garden Tour - 2 Days",
    metaDescription: "Explore Bangladesh's tea capital and lush gardens"
  },
  {
    id: randomUUID(),
    title: "Malaysia Adventure Package",
    slug: "malaysia-adventure-package",
    description: "From iconic Petronas Towers to beautiful Langkawi beaches, experience the best of Malaysia. This tour combines urban excitement with tropical paradise, offering a perfect blend of culture, nature, and adventure.",
    shortDescription: "Kuala Lumpur cityscape to Langkawi beach paradise",
    destination: "Kuala Lumpur",
    country: "Malaysia",
    category: "international",
    duration: 5,
    price: 55000,
    maxGroupSize: 25,
    difficulty: "EASY",
    inclusions: ["Return flight", "Hotel accommodation", "KL city tour", "Langkawi island tour", "Some meals"],
    exclusions: ["Most meals", "Optional activities", "Travel insurance"],
    itinerary: {
      "Day 1": "Arrival in Kuala Lumpur. Hotel check-in. Evening visit to Petronas Twin Towers.",
      "Day 2": "Full day KL city tour including Batu Caves, Merdeka Square, and shopping.",
      "Day 3": "Flight to Langkawi. Island tour including Cable Car and Sky Bridge.",
      "Day 4": "Beach day and water activities. Island hopping tour.",
      "Day 5": "Return to KL and departure to Dhaka."
    },
    highlights: [
      "Petronas Twin Towers",
      "Batu Caves temple",
      "Langkawi Cable Car and Sky Bridge",
      "Beautiful beaches",
      "Island hopping"
    ],
    coverImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200",
    images: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800",
      "https://images.unsplash.com/photo-1602216056066-91257e4fab3b?w=800",
      "https://images.unsplash.com/photo-1581144499894-e74b0ce4cc0e?w=800"
    ],
    rating: 4.7,
    totalReviews: 143,
    isActive: true,
    isFeatured: false,
    isHajjUmrah: false,
    metaTitle: "Malaysia Tour Package - 5 Days KL & Langkawi",
    metaDescription: "Explore Kuala Lumpur and Langkawi island paradise"
  },
  {
    id: randomUUID(),
    title: "Singapore City Explorer",
    slug: "singapore-city-explorer",
    description: "Explore the Lion City with its futuristic architecture and cultural heritage. Singapore offers a perfect blend of modern marvels and traditional charm, from Marina Bay Sands to historic Chinatown. Experience world-class attractions and diverse cuisine.",
    shortDescription: "Futuristic cityscape meets cultural heritage",
    destination: "Singapore",
    country: "Singapore",
    category: "international",
    duration: 4,
    price: 65000,
    maxGroupSize: 20,
    difficulty: "EASY",
    inclusions: ["Return flight", "Hotel accommodation", "City tour", "Universal Studios ticket", "Gardens by the Bay"],
    exclusions: ["Most meals", "Shopping expenses", "Optional tours"],
    itinerary: {
      "Day 1": "Arrival in Singapore. Hotel check-in. Evening Marina Bay area visit.",
      "Day 2": "Full day at Universal Studios Singapore.",
      "Day 3": "City tour including Gardens by the Bay, Chinatown, and Sentosa Island.",
      "Day 4": "Shopping at Orchard Road. Check-out and departure."
    },
    highlights: [
      "Marina Bay Sands",
      "Universal Studios Singapore",
      "Gardens by the Bay",
      "Sentosa Island",
      "Vibrant food scene"
    ],
    coverImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800"
    ],
    rating: 4.8,
    totalReviews: 178,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: false,
    metaTitle: "Singapore City Tour Package - 4 Days",
    metaDescription: "Explore Singapore's modern attractions and culture"
  },
  {
    id: randomUUID(),
    title: "Sajek Valley Expedition",
    slug: "sajek-valley-expedition",
    description: "Journey to the 'Roof of Bangladesh' with breathtaking cloud views. Sajek Valley offers stunning panoramic views, indigenous culture, and serene mountain landscapes. Experience life above the clouds in this hidden gem of Bangladesh.",
    shortDescription: "Roof of Bangladesh with breathtaking cloud views",
    destination: "Sajek Valley",
    country: "Bangladesh",
    category: "adventure",
    duration: 3,
    price: 10000,
    maxGroupSize: 15,
    difficulty: "MODERATE",
    inclusions: ["Jeep transport", "Resort accommodation", "All meals", "Guide service", "Local permits"],
    exclusions: ["Transport to/from Khagrachari", "Personal expenses"],
    itinerary: {
      "Day 1": "Early morning journey from Khagrachari to Sajek by jeep. Check-in to resort. Afternoon exploration. Sunset viewing.",
      "Day 2": "Early morning cloud views. Visit indigenous villages. Afternoon at leisure. Evening bonfire.",
      "Day 3": "Morning exploration. Return journey to Khagrachari."
    },
    highlights: [
      "Cloud-touching mountain peaks",
      "Indigenous tribal culture",
      "Stunning sunrise and sunset",
      "Konglak Hill views",
      "Traditional Chakma villages"
    ],
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800"
    ],
    rating: 4.6,
    totalReviews: 89,
    isActive: true,
    isFeatured: false,
    isHajjUmrah: false,
    metaTitle: "Sajek Valley Tour - 3 Days Mountain Adventure",
    metaDescription: "Experience Bangladesh's roof with stunning cloud views"
  },
  {
    id: randomUUID(),
    title: "Hajj Package 2026",
    slug: "hajj-package-2026",
    description: "Complete Hajj package with premium accommodation and guided services. Fulfill your religious obligation with comfort and peace of mind. Our experienced team ensures smooth logistics, spiritual guidance, and comfortable accommodations throughout your journey.",
    shortDescription: "Complete Hajj package with 5-star accommodation",
    destination: "Makkah",
    country: "Saudi Arabia",
    category: "hajj",
    duration: 21,
    price: 450000,
    maxGroupSize: 50,
    difficulty: "MODERATE",
    inclusions: ["Return flight", "5-star hotel near Haram", "All meals", "Transport", "Visa processing", "Experienced guide", "Medical support"],
    exclusions: ["Personal shopping", "Extra meals outside package"],
    itinerary: {
      "Week 1": "Arrival in Madinah. Stay for 8 days. Visit historical Islamic sites. Ziyarat tours.",
      "Week 2": "Transfer to Makkah. Perform Umrah. Hajj rituals preparation.",
      "Week 3": "Hajj rituals including Arafah, Muzdalifah, and Mina. Return to Makkah. Farewell Tawaf. Departure."
    },
    highlights: [
      "5-star accommodation near Haram",
      "Experienced multilingual guides",
      "24/7 medical support",
      "All meals included",
      "Complete Hajj guidance",
      "Ziyarat tours included"
    ],
    coverImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200",
    images: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800"
    ],
    rating: 5.0,
    totalReviews: 234,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: true,
    metaTitle: "Hajj Package 2026 - Premium 5-Star",
    metaDescription: "Complete Hajj package with premium services"
  },
  {
    id: randomUUID(),
    title: "Umrah Package",
    slug: "umrah-package-2026",
    description: "Spiritual journey with comfortable accommodation near Haram. Perform Umrah with ease and devotion. Our package includes everything you need for a blessed and comfortable journey, with accommodations just minutes away from the holy mosques.",
    shortDescription: "Comfortable Umrah package with near-Haram hotels",
    destination: "Makkah",
    country: "Saudi Arabia",
    category: "hajj",
    duration: 10,
    price: 150000,
    maxGroupSize: 40,
    difficulty: "EASY",
    inclusions: ["Return flight", "4-star hotel near Haram", "All meals", "Transport", "Visa processing", "Umrah guidance"],
    exclusions: ["Personal expenses", "Shopping"],
    itinerary: {
      "Days 1-5": "Arrival in Madinah. Stay for 5 days near Prophet's Mosque. Ziyarat tours of historical sites.",
      "Days 6-10": "Transfer to Makkah. Hotel near Masjid al-Haram. Perform Umrah. Tawaf and Sai. Ziyarat tours. Departure."
    },
    highlights: [
      "Hotel 5 minutes walk from Haram",
      "Experienced Umrah guides",
      "All meals included",
      "Comfortable transport",
      "Ziyarat tours",
      "Group guidance"
    ],
    coverImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200",
    images: [
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800"
    ],
    rating: 4.9,
    totalReviews: 312,
    isActive: true,
    isFeatured: true,
    isHajjUmrah: true,
    metaTitle: "Umrah Package 2026 - 10 Days",
    metaDescription: "Spiritual Umrah journey with comfort"
  },
  {
    id: randomUUID(),
    title: "Nepal Himalayan Trek",
    slug: "nepal-himalayan-trek",
    description: "Trek through stunning Himalayan trails with breathtaking mountain views. Experience the majesty of the world's highest mountains, explore ancient temples, and immerse yourself in Nepali culture. From Kathmandu's bustling streets to Pokhara's serene lakes.",
    shortDescription: "Stunning Himalayan trails and mountain views",
    destination: "Kathmandu",
    country: "Nepal",
    category: "adventure",
    duration: 7,
    price: 35000,
    maxGroupSize: 15,
    difficulty: "CHALLENGING",
    inclusions: ["Hotel accommodation", "Trekking guide", "Permits", "Some meals", "Kathmandu and Pokhara tours"],
    exclusions: ["Flight tickets", "Most meals", "Trekking equipment", "Tips"],
    itinerary: {
      "Day 1": "Arrival in Kathmandu. Hotel check-in. Thamel area exploration.",
      "Day 2": "Kathmandu sightseeing: Pashupatinath, Boudhanath, and Swayambhunath.",
      "Day 3": "Drive to Pokhara. Lakeside area visit.",
      "Day 4": "Early morning sunrise from Sarangkot. Boating at Phewa Lake.",
      "Day 5": "Day trek to Peace Pagoda and surrounding hills.",
      "Day 6": "Return to Kathmandu. Free time for shopping.",
      "Day 7": "Departure."
    },
    highlights: [
      "Himalayan mountain views",
      "Ancient temples and stupas",
      "Pokhara's beautiful lakes",
      "Sarangkot sunrise",
      "Trekking experience",
      "Nepali culture immersion"
    ],
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1585170961192-84c512cad572?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800"
    ],
    rating: 4.7,
    totalReviews: 156,
    isActive: true,
    isFeatured: false,
    isHajjUmrah: false,
    metaTitle: "Nepal Himalayan Trek - 7 Days",
    metaDescription: "Trek through stunning Himalayan landscapes"
  }
];

async function main() {
  console.log('🚀 Starting tour package seeding...\n');

  try {
    // Clear existing tours
    console.log('🗑️  Clearing existing tour packages...');
    await prisma.tours.deleteMany({});
    console.log('✅ Existing tours cleared\n');

    // Insert tour packages
    console.log(`📦 Inserting ${tourPackages.length} tour packages...\n`);

    for (const tour of tourPackages) {
      await prisma.tours.create({
        data: {
          ...tour,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(`✅ Added: ${tour.title}`);
    }

    console.log(`\n✨ Successfully seeded ${tourPackages.length} tour packages!\n`);

    // Verify
    const count = await prisma.tours.count();
    console.log(`✅ Verified: ${count} tours in database`);

    // Show summary by category
    const categories = await prisma.tours.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    });

    console.log('\n📊 Summary by category:');
    categories.forEach(cat => {
      console.log(`   - ${cat.category}: ${cat._count.category} packages`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
