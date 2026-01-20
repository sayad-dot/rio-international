import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { visaApi } from '../services/api/visaApi';
import { 
  Plane, Globe, Calendar, FileText, CheckCircle, Star, 
  Clock, Shield, Users, MapPin, TrendingUp, Heart,
  ArrowRight, Check, X, Filter, Search, Loader2
} from 'lucide-react';

const VisaPackagesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get URL parameters
  const urlType = searchParams.get('type');
  const urlDestination = searchParams.get('destination');

  // Set filters from URL on component mount
  useEffect(() => {
    if (urlType) {
      // Normalize the type to lowercase to match category values
      const normalizedType = urlType.toLowerCase();
      setSelectedCategory(normalizedType);
    }
    if (urlDestination) {
      setSearchQuery(urlDestination);
    }
  }, [urlType, urlDestination]);

  // Fetch visa packages from API
  const { data, isLoading, error } = useQuery({
    queryKey: ['visaPackages'],
    queryFn: () => visaApi.getAllPackages()
  });

  // Debug logging
  useEffect(() => {
    console.log('=== VISA PACKAGES DEBUG ===');
    console.log('isLoading:', isLoading);
    console.log('error:', error);
    console.log('data:', data);
    console.log('packages:', data?.data?.packages);
    console.log('packages length:', data?.data?.packages?.length);
  }, [data, isLoading, error]);

  // Map backend data to frontend format
  const visaPackages = data?.data?.packages?.map(pkg => ({
    slug: pkg.slug,
    country: pkg.country,
    type: pkg.type,
    duration: pkg.duration,
    processing: pkg.processingTime,
    price: pkg.cost,
    validity: pkg.validity,
    entry: pkg.entryType,
    image: pkg.imageUrl,
    isPopular: pkg.isPopular,
    description: pkg.description,
    requirements: pkg.requirements || [],
    // Set defaults for UI fields not in backend
    rating: 4.5,
    reviews: 100,
    flagEmoji: getCountryFlag(pkg.country),
    badge: pkg.isPopular ? 'Popular' : 'Available',
    badgeColor: pkg.isPopular ? 'from-rose-500 to-pink-500' : 'from-blue-500 to-indigo-500',
    features: pkg.requirements?.slice(0, 6) || [],
    category: pkg.type.toLowerCase().includes('evisa') ? 'evisa' : 
              pkg.type.toLowerCase().includes('business') ? 'business' : 
              pkg.type.toLowerCase().includes('student') ? 'student' :
              pkg.type.toLowerCase().includes('work') ? 'work' : 'tourist'
  })) || [];

  // Helper function to get country flag emoji
  function getCountryFlag(country) {
    const flagMap = {
      'Thailand': '🇹🇭',
      'Malaysia': '🇲🇾',
      'Singapore': '🇸🇬',
      'United Arab Emirates': '🇦🇪',
      'Turkey': '🇹🇷',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'India': '🇮🇳',
    };
    return flagMap[country] || '🌍';
  }

  const categories = [
    { id: 'all', name: 'All Visas', icon: Globe },
    { id: 'tourist', name: 'Tourist', icon: MapPin },
    { id: 'business', name: 'Business', icon: Users },
    { id: 'student', name: 'Student', icon: FileText },
    { id: 'work', name: 'Work Permit', icon: Shield },
    { id: 'evisa', name: 'eVisa', icon: FileText },
  ];

  // Use the API data if available, otherwise use empty array
  const displayPackages = isLoading ? [] : visaPackages;

  const filteredPackages = displayPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    
    // Enhanced search matching - search in country, type, and description
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchQuery === '' || 
                          pkg.country.toLowerCase().includes(searchLower) ||
                          pkg.type.toLowerCase().includes(searchLower) ||
                          pkg.description.toLowerCase().includes(searchLower) ||
                          // Handle city names (Dubai -> UAE, Bangkok -> Thailand, etc.)
                          (searchLower === 'dubai' && pkg.country.toLowerCase().includes('emirates')) ||
                          (searchLower === 'abu dhabi' && pkg.country.toLowerCase().includes('emirates')) ||
                          (searchLower === 'bangkok' && pkg.country.toLowerCase().includes('thailand')) ||
                          (searchLower === 'phuket' && pkg.country.toLowerCase().includes('thailand')) ||
                          (searchLower === 'kuala lumpur' && pkg.country.toLowerCase().includes('malaysia')) ||
                          (searchLower === 'sydney' && pkg.country.toLowerCase().includes('australia')) ||
                          (searchLower === 'melbourne' && pkg.country.toLowerCase().includes('australia')) ||
                          (searchLower === 'london' && pkg.country.toLowerCase().includes('kingdom')) ||
                          (searchLower === 'manchester' && pkg.country.toLowerCase().includes('kingdom')) ||
                          (searchLower === 'riyadh' && pkg.country.toLowerCase().includes('saudi')) ||
                          (searchLower === 'jeddah' && pkg.country.toLowerCase().includes('saudi')) ||
                          (searchLower === 'doha' && pkg.country.toLowerCase().includes('qatar')) ||
                          (searchLower === 'muscat' && pkg.country.toLowerCase().includes('oman'));
    
    return matchesCategory && matchesSearch;
  });

  const benefits = [
    {
      icon: Shield,
      title: "100% Secure Process",
      description: "Your documents are safe with us",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Quick turnaround on all applications",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 visa consultation available",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: CheckCircle,
      title: "High Success Rate",
      description: "95% approval rate across all visas",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-dark-900/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Plane className="h-4 w-4 text-primary-300" />
              <span className="text-white text-sm font-medium">Visa Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              Get Your <span className="text-primary-400">Visa</span> Hassle-Free
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Expert visa assistance for 50+ countries. Fast processing, high success rate, 
              and comprehensive support throughout your application.
            </p>

            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search countries or visa types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Search Visas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <cat.icon className="h-5 w-5" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredPackages.length}</span> visa packages
            </p>
          </div>

          {/* Visa Packages Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load visa packages</h3>
              <p className="text-gray-500 mb-6">Please try again later</p>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No visas found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div 
                  key={pkg.slug}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.country}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${pkg.badgeColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group/heart">
                      <Heart className="h-4 w-4 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
                    </button>

                    {/* Country Flag */}
                    <div className="absolute bottom-4 left-4">
                      <div className="text-4xl">{pkg.flagEmoji}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-gray-900">{pkg.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-sm">{pkg.reviews} reviews</span>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-1 group-hover:text-primary-600 transition-colors">
                      {pkg.country}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.type}</p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Duration
                        </span>
                        <span className="font-medium text-gray-900">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Processing
                        </span>
                        <span className="font-medium text-gray-900">{pkg.processing}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Plane className="h-4 w-4" />
                          Entry
                        </span>
                        <span className="font-medium text-gray-900">{pkg.entry}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Includes</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                            <Check className="h-3 w-3" />
                            {feature}
                          </span>
                        ))}
                        {pkg.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{pkg.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary-600">
                            ৳{pkg.price.toLocaleString()}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ৳{pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">per application</p>
                      </div>
                      <button 
                        onClick={() => navigate(`/visa/${pkg.slug}`)}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm"
                      >
                        Apply
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Need Help Choosing the Right Visa?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our visa experts are here to guide you through the process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg">
              Contact Visa Expert
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all">
              Download Visa Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaPackagesPage;
