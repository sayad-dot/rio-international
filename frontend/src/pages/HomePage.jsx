import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Users, Star, Phone, 
  Mail, Clock, Shield, Award, TrendingUp, Heart,
  Plane, Ship, Mountain, Building, Palmtree, Camera,
  ChevronRight, Play, ArrowRight, Sparkles, Globe,
  CheckCircle, Compass, Sun, Wind, Waves, FileText,
  Briefcase, Check, Package
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Autocomplete from '../components/common/Autocomplete';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    visaType: '',
    destination: ''
  });

  // Comprehensive country list for autocomplete
  const countries = [
    { value: 'dubai', label: 'Dubai, UAE', emoji: '🇦🇪', searchTerms: ['uae', 'united arab emirates', 'emirates'] },
    { value: 'thailand', label: 'Thailand', emoji: '🇹🇭', searchTerms: ['bangkok', 'phuket', 'pattaya'] },
    { value: 'malaysia', label: 'Malaysia', emoji: '🇲🇾', searchTerms: ['kuala lumpur', 'kl', 'penang'] },
    { value: 'singapore', label: 'Singapore', emoji: '🇸🇬', searchTerms: ['sg', 'lion city'] },
    { value: 'usa', label: 'United States', emoji: '🇺🇸', searchTerms: ['america', 'us', 'usa', 'new york', 'california'] },
    { value: 'uk', label: 'United Kingdom', emoji: '🇬🇧', searchTerms: ['britain', 'england', 'london', 'scotland'] },
    { value: 'canada', label: 'Canada', emoji: '🇨🇦', searchTerms: ['toronto', 'vancouver', 'montreal'] },
    { value: 'australia', label: 'Australia', emoji: '🇦🇺', searchTerms: ['sydney', 'melbourne', 'aussie'] },
    { value: 'india', label: 'India', emoji: '🇮🇳', searchTerms: ['delhi', 'mumbai', 'kolkata'] },
    { value: 'turkey', label: 'Turkey', emoji: '🇹🇷', searchTerms: ['istanbul', 'ankara'] },
    { value: 'saudi', label: 'Saudi Arabia', emoji: '🇸🇦', searchTerms: ['riyadh', 'jeddah', 'mecca', 'ksa'] },
    { value: 'qatar', label: 'Qatar', emoji: '🇶🇦', searchTerms: ['doha'] },
    { value: 'oman', label: 'Oman', emoji: '🇴🇲', searchTerms: ['muscat'] },
    { value: 'japan', label: 'Japan', emoji: '🇯🇵', searchTerms: ['tokyo', 'osaka', 'kyoto'] },
    { value: 'south-korea', label: 'South Korea', emoji: '🇰🇷', searchTerms: ['korea', 'seoul', 'busan'] },
    { value: 'china', label: 'China', emoji: '🇨🇳', searchTerms: ['beijing', 'shanghai'] },
    { value: 'vietnam', label: 'Vietnam', emoji: '🇻🇳', searchTerms: ['hanoi', 'ho chi minh', 'saigon'] },
    { value: 'indonesia', label: 'Indonesia', emoji: '🇮🇩', searchTerms: ['jakarta', 'bali'] },
    { value: 'philippines', label: 'Philippines', emoji: '🇵🇭', searchTerms: ['manila'] },
    { value: 'nepal', label: 'Nepal', emoji: '🇳🇵', searchTerms: ['kathmandu'] },
    { value: 'sri-lanka', label: 'Sri Lanka', emoji: '🇱🇰', searchTerms: ['colombo'] },
    { value: 'maldives', label: 'Maldives', emoji: '🇲🇻', searchTerms: ['male'] },
    { value: 'new-zealand', label: 'New Zealand', emoji: '🇳🇿', searchTerms: ['auckland', 'wellington', 'nz'] },
    { value: 'germany', label: 'Germany', emoji: '🇩🇪', searchTerms: ['berlin', 'munich'] },
    { value: 'france', label: 'France', emoji: '🇫🇷', searchTerms: ['paris'] },
    { value: 'italy', label: 'Italy', emoji: '🇮🇹', searchTerms: ['rome', 'milan'] },
    { value: 'spain', label: 'Spain', emoji: '🇪🇸', searchTerms: ['madrid', 'barcelona'] },
    { value: 'switzerland', label: 'Switzerland', emoji: '🇨🇭', searchTerms: ['zurich', 'geneva'] },
    { value: 'netherlands', label: 'Netherlands', emoji: '🇳🇱', searchTerms: ['amsterdam', 'holland'] },
    { value: 'belgium', label: 'Belgium', emoji: '🇧🇪', searchTerms: ['brussels'] },
    { value: 'austria', label: 'Austria', emoji: '🇦🇹', searchTerms: ['vienna'] },
    { value: 'sweden', label: 'Sweden', emoji: '🇸🇪', searchTerms: ['stockholm'] },
    { value: 'norway', label: 'Norway', emoji: '🇳🇴', searchTerms: ['oslo'] },
    { value: 'denmark', label: 'Denmark', emoji: '🇩🇰', searchTerms: ['copenhagen'] },
    { value: 'poland', label: 'Poland', emoji: '🇵🇱', searchTerms: ['warsaw'] },
    { value: 'russia', label: 'Russia', emoji: '🇷🇺', searchTerms: ['moscow'] },
    { value: 'brazil', label: 'Brazil', emoji: '🇧🇷', searchTerms: ['rio', 'sao paulo'] },
    { value: 'egypt', label: 'Egypt', emoji: '🇪🇬', searchTerms: ['cairo'] },
    { value: 'south-africa', label: 'South Africa', emoji: '🇿🇦', searchTerms: ['johannesburg', 'cape town'] },
    { value: 'morocco', label: 'Morocco', emoji: '🇲🇦', searchTerms: ['casablanca'] }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Main Visa Categories (4 categories only for homepage)
  const visaServices = [
    {
      id: 1,
      title: "Tourist Visa",
      category: "tourist",
      countries: ["Dubai", "Thailand", "Singapore", "Malaysia", "India", "Turkey", "Maldives"],
      processing: "3-10 Days",
      priceRange: "From ৳2,500",
      icon: Plane,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
      badge: "Most Popular",
      badgeColor: "from-rose-500 to-pink-500",
      features: ["50+ Destinations", "Fast Processing", "Multiple Entry Options", "Expert Guidance"],
      description: "Explore the world with our comprehensive tourist visa services for 50+ destinations."
    },
    {
      id: 2,
      title: "Business Visa",
      category: "business",
      countries: ["USA", "UK", "UAE", "Saudi Arabia", "Europe", "Asia"],
      processing: "7-30 Days",
      priceRange: "From ৳18,000",
      icon: Users,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      badge: "Professional",
      badgeColor: "from-indigo-500 to-blue-600",
      features: ["Corporate Support", "Conference Assistance", "Multiple Entry", "Documentation Help"],
      description: "Professional business visa services for meetings, conferences, and corporate travel."
    },
    {
      id: 3,
      title: "Student Visa",
      category: "student",
      countries: ["USA", "UK", "Canada", "Australia", "Europe"],
      processing: "30-60 Days",
      priceRange: "From ৳30,000",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      badge: "Study Abroad",
      badgeColor: "from-cyan-500 to-blue-600",
      features: ["University Admission Support", "Document Preparation", "Interview Training", "Post-study Work Rights"],
      description: "Complete student visa assistance for top universities worldwide with work permit benefits."
    },
    {
      id: 4,
      title: "Work Permit",
      category: "work",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Malaysia", "Singapore"],
      processing: "15-45 Days",
      priceRange: "From ৳22,000",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
      badge: "Employment",
      badgeColor: "from-emerald-500 to-teal-500",
      features: ["Job Placement Support", "Attestation Service", "Family Visa", "Legal Compliance"],
      description: "Work permit and employment visa services for Middle East, Asia, and Europe."
    }
  ];

  // Featured tours, destinations, stats, and testimonials defined below

  const featuredTours = [
    {
      id: 1,
      title: "Cox's Bazar Beach Paradise",
      location: "Cox's Bazar, Bangladesh",
      duration: "3 Days 2 Nights",
      price: 15000,
      originalPrice: 18000,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      badge: "Popular",
      badgeColor: "from-rose-500 to-pink-500"
    },
    {
      id: 2,
      title: "Sundarbans Wildlife Adventure",
      location: "Sundarbans, Bangladesh",
      duration: "2 Days 1 Night",
      price: 12000,
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=800",
      badge: "Hot Deal",
      badgeColor: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      title: "Dubai Shopping & Desert Safari",
      location: "Dubai, UAE",
      duration: "5 Days 4 Nights",
      price: 85000,
      originalPrice: 95000,
      rating: 4.7,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      badge: "Trending",
      badgeColor: "from-violet-500 to-purple-500"
    },
    {
      id: 4,
      title: "Maldives Luxury Escape",
      location: "Maldives",
      duration: "4 Days 3 Nights",
      price: 120000,
      rating: 5.0,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      badge: "Premium",
      badgeColor: "from-amber-500 to-yellow-500"
    },
    {
      id: 5,
      title: "Thailand Cultural Experience",
      location: "Bangkok & Pattaya",
      duration: "6 Days 5 Nights",
      price: 45000,
      rating: 4.6,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
      badge: "Family Friendly",
      badgeColor: "from-emerald-500 to-teal-500"
    },
    {
      id: 6,
      title: "Srimangal Tea Garden Tour",
      location: "Srimangal, Bangladesh",
      duration: "2 Days 1 Night",
      price: 8000,
      rating: 4.5,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800",
      badge: "Budget",
      badgeColor: "from-cyan-500 to-blue-500"
    }
  ];

  const destinations = [
    { name: "Cox's Bazar", tours: 15, icon: Waves, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400", country: "Bangladesh" },
    { name: "Dubai", tours: 23, icon: Building, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400", country: "UAE" },
    { name: "Thailand", tours: 18, icon: Sun, image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400", country: "Thailand" },
    { name: "Maldives", tours: 12, icon: Palmtree, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400", country: "Maldives" },
    { name: "Malaysia", tours: 16, icon: Mountain, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400", country: "Malaysia" },
    { name: "Singapore", tours: 9, icon: Building, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400", country: "Singapore" },
  ];

  const stats = [
    { number: "12,000", suffix: "+", label: "Happy Travelers", icon: Users },
    { number: "150", suffix: "+", label: "Tour Packages", icon: MapPin },
    { number: "50", suffix: "+", label: "Destinations", icon: Globe },
    { number: "15", suffix: "+", label: "Years Experience", icon: Award },
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Business Owner",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Best travel experience! Rio International made our Dubai trip unforgettable. Highly professional service and amazing attention to detail. I will definitely book with them again!",
      tour: "Dubai Shopping & Desert Safari"
    },
    {
      name: "Fatima Rahman",
      role: "Teacher",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Excellent service for Hajj package. Everything was well organized from start to finish. The team was incredibly supportive throughout our spiritual journey.",
      tour: "Hajj Package 2025"
    },
    {
      name: "Karim Ahmed",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      text: "Great experience with Cox's Bazar tour. Professional team, good accommodation, and the sunset views were breathtaking. Highly recommended!",
      tour: "Cox's Bazar Beach Paradise"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "100% secure payment with SSL encryption and money-back guarantee",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "We offer the most competitive prices in the market",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round the clock customer assistance whenever you need",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Heart,
      title: "Trusted by Thousands",
      description: "Join 12,000+ happy travelers who chose us",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const services = [
    { icon: Globe, title: "Visa Assistance", desc: "Hassle-free visa processing services" },
    { icon: Compass, title: "Tour Packages", desc: "Curated experiences for every traveler" },
    { icon: Plane, title: "Flight Booking", desc: "Best deals on domestic & international flights" },
    { icon: Building, title: "Hotel Reservation", desc: "Premium hotels at unbeatable prices" },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Split Layout: 60% Visa, 40% Tours */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-hero-pattern" />
        </div>

        {/* Elegant Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-transparent to-gray-900/40" />
        
        {/* Minimal Decorative Elements - Hide on small screens */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl hidden md:block" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl hidden md:block" />

        {/* Hero Content */}
        <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - 60% VISA PROCESSING */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              {/* Main Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Your Gateway to World Travel
                </h1>
                <div className="max-w-2xl">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed mb-2">
                    Expert visa processing for over 50+ countries.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                    Fast, reliable, and hassle-free service you can trust.
                  </p>
                </div>
              </div>

              {/* Visa Search Card - Beautiful Friendly Design */}
              <div className="relative bg-gradient-to-br from-white via-white to-primary-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-primary-100/50 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-200/20 to-secondary-200/20 rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Start Your Journey</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Find your perfect visa in seconds</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Destination with Autocomplete */}
                    <Autocomplete
                      value={searchData.destination}
                      onChange={(value) => setSearchData({...searchData, destination: value})}
                      options={countries}
                      placeholder="🌍 Search your destination..."
                      icon={Globe}
                      iconColor="from-blue-500 to-cyan-500"
                    />

                    {/* Visa Type */}
                    <div className="group">
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md z-10">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <select 
                          className="w-full pl-14 sm:pl-20 pr-10 sm:pr-12 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-300/30 focus:border-purple-400 outline-none transition-all duration-300 text-gray-800 text-sm sm:text-base font-medium cursor-pointer hover:border-purple-300 appearance-none"
                          value={searchData.visaType}
                          onChange={(e) => setSearchData({...searchData, visaType: e.target.value})}
                        >
                          <option value="">✨ Select visa type...</option>
                          <option value="tourist">🏖️ Tourist Visa</option>
                          <option value="business">💼 Business Visa</option>
                          <option value="student">📚 Student Visa</option>
                          <option value="work">🏢 Work Permit</option>
                        </select>
                        <ChevronRight className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none rotate-90" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (searchData.destination) params.append('destination', searchData.destination);
                        if (searchData.visaType) params.append('type', searchData.visaType);
                        const queryString = params.toString();
                        navigate(`/visa-packages${queryString ? '?' + queryString : ''}`);
                      }}
                      className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 group mt-4 sm:mt-6"
                    >
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                      <span>Find My Visa</span>
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>

                  {/* View All Link */}
                  <div className="mt-4 sm:mt-6">
                    <button 
                      onClick={() => navigate('/visa-packages')}
                      className="w-full bg-gradient-to-br from-primary-50 to-white hover:from-primary-100 hover:to-primary-50 text-primary-700 border-2 border-primary-200 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 group"
                    >
                      View All Visa Packages
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Quick Stats - More Visual */}
                  <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-200/50">
                    <div className="text-center group cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <Globe className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">50+</div>
                      <div className="text-xs text-gray-500 font-medium">Countries</div>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-5 w-5 text-accent-600" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent">98%</div>
                      <div className="text-xs text-gray-500 font-medium">Success Rate</div>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <Clock className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">7-15</div>
                      <div className="text-xs text-gray-500 font-medium">Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent-400" />
                  <span>Verified Agent</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent-400" />
                  <span>Secure Processing</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-accent-400" />
                  <span className="hidden xs:inline">15+ Years Experience</span>
                  <span className="xs:hidden">15+ Years</span>
                </div>
              </div>
            </div>

            {/* Right Side - 40% TOUR PACKAGES */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="text-center lg:text-left mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white mb-2 sm:mb-3">
                  Explore <span className="text-secondary-400">Tour Packages</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-300">Premium travel experiences worldwide</p>
              </div>

              {/* Featured Tours - Compact Cards */}
              <div className="space-y-3 sm:space-y-4">
                {featuredTours.slice(0, 3).map((tour) => (
                  <div 
                    key={tour.id}
                    onClick={() => navigate(`/tours/${tour.id}`)}
                    className="group bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden">
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
                          {tour.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2 flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          <span className="truncate">{tour.location}</span>
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                            <span className="text-xs sm:text-sm font-semibold text-gray-900">{tour.rating}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-bold text-primary-600">৳{tour.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/tours')}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                View All Tour Packages
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-xs uppercase tracking-wider">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Bar - Floating */}
      <section className="relative -mt-20 z-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    if (service.title === 'Visa Assistance') navigate('/visa-packages');
                    else if (service.title === 'Tour Packages') navigate('/tours');
                    else if (service.title === 'Flight Booking') navigate('/contact');
                    else if (service.title === 'Hotel Reservation') navigate('/contact');
                  }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-primary-50/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">{service.title}</h3>
                    <p className="text-xs text-gray-500">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visa Services Section - Premium Design */}
      <section id="visa-services" data-animate className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-4 sm:mb-6">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
              <span className="text-primary-700 font-semibold text-xs sm:text-sm tracking-wide uppercase">Visa Processing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 text-gray-900 px-4">
              Professional <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Visa Services</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              Expert visa assistance for 50+ countries with 98% success rate. Fast processing, complete documentation support, and dedicated consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {visaServices.map((service, idx) => (
              <div 
                key={service.id}
                onClick={() => {
                  navigate(`/visa-packages?type=${service.category}`);
                }}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${service.badgeColor} text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
                      <Sparkles className="h-3.5 w-3.5" />
                      {service.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {service.countries.slice(0, 3).join(", ")}
                      {service.countries.length > 3 && ` +${service.countries.length - 3} more`}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-accent-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Processing Time</div>
                      <div className="font-semibold text-gray-900 flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary-600" />
                        {service.processing}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Starting from</div>
                      <div className="text-xl font-bold text-primary-600">{service.priceRange}</div>
                    </div>
                  </div>

                  <button className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    Learn More
                    <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button 
              onClick={() => navigate('/visa-packages')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              View All Visa Services
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Tour Packages Section - Modern Design */}
      <section id="tour-packages" data-animate className="section-padding bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary-100 px-5 py-2.5 rounded-full mb-6">
              <Package className="h-5 w-5 text-secondary-600" />
              <span className="text-secondary-700 font-semibold text-sm tracking-wide uppercase">Travel Packages</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900">
              Curated <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent">Tour Packages</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Discover handpicked tour packages to the world's most beautiful destinations. Premium experiences at unbeatable prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, idx) => (
              <div 
                key={tour.id}
                onClick={() => navigate(`/tours/${tour.id}`)}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r ${tour.badgeColor} text-white text-sm font-semibold rounded-full shadow-lg`}>
                      <TrendingUp className="h-3.5 w-3.5" />
                      {tour.badge}
                    </span>
                  </div>
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group/heart">
                    <Heart className="h-5 w-5 text-gray-600 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-colors" />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary-600">৳{tour.price.toLocaleString()}</span>
                        {tour.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">৳{tour.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                      <Clock className="h-4 w-4 text-primary-600" />
                      {tour.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-900">{tour.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{tour.reviews} reviews</span>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {tour.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-5 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    {tour.location}
                  </p>

                  <button className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    View Details
                    <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button 
              onClick={() => navigate('/tours')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-secondary-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              Explore All Tour Packages
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Elegant Premium Design */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-hero-pattern" />
        </div>
        
        {/* Elegant decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl md:text-6xl font-bold font-display text-white">{stat.number}</span>
                  <span className="text-3xl font-bold text-secondary-400">{stat.suffix}</span>
                </div>
                <div className="text-lg text-white/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Premium Features */}
      <section className="section-padding bg-gradient-to-b from-white via-gray-50/50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 px-5 py-2.5 rounded-full mb-6">
                <Award className="h-5 w-5 text-primary-600" />
                <span className="text-primary-700 font-semibold text-sm tracking-wide uppercase">Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-gray-900">
                Your Trusted Partner for{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Global Travel
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                With over 15 years of expertise in visa processing and travel management, we've helped thousands of travelers 
                achieve their dreams of exploring the world with confidence and ease.
              </p>

              <div className="space-y-5">
                {features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-5 p-6 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-primary-50/20 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-5">
                  <div className="rounded-3xl overflow-hidden shadow-xl animate-float">
                    <img 
                      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600" 
                      alt="Mountain view"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" 
                      alt="Beach view"
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-5 pt-12">
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600" 
                      alt="Dubai"
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600" 
                      alt="Maldives"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Elegant floating badge */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl z-10 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-display text-gray-900">15+</div>
                    <div className="text-sm text-gray-500 font-medium">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Refined Elegant Design */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 px-5 py-2.5 rounded-full mb-6">
              <Star className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700 font-semibold text-sm tracking-wide uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900">
              What Our <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Hear from thousands of satisfied travelers who trusted us for their visa processing and tour bookings
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className={`relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  idx === activeTestimonial ? 'scale-105 border-primary-200' : 'scale-100'
                }`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-serif">"</span>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-primary-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">{testimonial.text}</p>
                  
                  <div className="pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-medium">
                      <MapPin className="h-4 w-4" />
                      <span>{testimonial.tour}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Elegant dots indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeTestimonial 
                    ? 'bg-primary-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Premium Refined Design */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-hero-pattern" />
        </div>

        {/* Minimal decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
                  <Mail className="h-9 w-9 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-5">
                  Stay Updated with Exclusive Offers
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                  Subscribe to receive the latest visa updates, travel deals, and exclusive packages delivered to your inbox
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl text-gray-900 focus:ring-4 focus:ring-white/20 outline-none transition-all duration-300 bg-white border-2 border-transparent hover:border-primary-200"
                  />
                </div>
                <button className="bg-white hover:bg-gray-50 text-primary-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap group">
                  Subscribe Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <p className="text-center text-white/50 text-sm mt-6 flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant Final Design */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200">
            {/* Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/97 via-primary-800/95 to-primary-900/97" />

            <div className="relative z-10 p-12 md:p-16 lg:p-20 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Let our expert team help you with visa processing and plan your perfect travel experience. 
                Your dream destination is just one step away.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                  <Phone className="h-5 w-5" />
                  <span>Call: +880 1XXX-XXXXXX</span>
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 group"
                >
                  <Mail className="h-5 w-5" />
                  <span>Get in Touch</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
