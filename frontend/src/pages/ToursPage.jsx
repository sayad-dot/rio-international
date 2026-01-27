import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tourApi } from '../services/api/tourApi';
import { TourPackageSkeletonGrid, LoadingBanner } from '../components/common/SkeletonLoader';
import { 
  Search, MapPin, Calendar, Users, Star, Filter, 
  Clock, Heart, ChevronDown, Grid, List, X, 
  SlidersHorizontal, TrendingUp, Plane, Building,
  DollarSign, ArrowUpDown
} from 'lucide-react';

const ToursPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 150000],
    duration: 'all',
    category: searchParams.get('category') || 'all',
    rating: 0,
    sortBy: 'popular'
  });

  // Sample tours data
  const allTours = [
    {
      id: 1,
      title: "Cox's Bazar Beach Paradise",
      location: "Cox's Bazar, Bangladesh",
      country: "Bangladesh",
      duration: "3 Days 2 Nights",
      durationDays: 3,
      price: 15000,
      originalPrice: 18000,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      category: "beach",
      badge: "Popular",
      badgeColor: "from-rose-500 to-pink-500",
      includes: ["Hotel", "Transport", "Meals", "Guide"],
      description: "Experience the world's longest natural sea beach with golden sands and stunning sunsets."
    },
    {
      id: 2,
      title: "Sundarbans Wildlife Adventure",
      location: "Sundarbans, Bangladesh",
      country: "Bangladesh",
      duration: "2 Days 1 Night",
      durationDays: 2,
      price: 12000,
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=800",
      category: "adventure",
      badge: "Hot Deal",
      badgeColor: "from-orange-500 to-red-500",
      includes: ["Boat", "Meals", "Guide", "Permits"],
      description: "Explore the largest mangrove forest and spot the majestic Royal Bengal Tiger."
    },
    {
      id: 3,
      title: "Dubai Shopping & Desert Safari",
      location: "Dubai, UAE",
      country: "UAE",
      duration: "5 Days 4 Nights",
      durationDays: 5,
      price: 85000,
      originalPrice: 95000,
      rating: 4.7,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      category: "international",
      badge: "Trending",
      badgeColor: "from-violet-500 to-purple-500",
      includes: ["Flight", "Hotel", "Safari", "City Tour"],
      description: "Discover the glamour of Dubai with world-class shopping and thrilling desert adventures."
    },
    {
      id: 4,
      title: "Maldives Luxury Escape",
      location: "Maldives",
      country: "Maldives",
      duration: "4 Days 3 Nights",
      durationDays: 4,
      price: 120000,
      rating: 5.0,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      category: "beach",
      badge: "Premium",
      badgeColor: "from-amber-500 to-yellow-500",
      includes: ["Flight", "Resort", "All Meals", "Water Sports"],
      description: "Indulge in paradise with crystal clear waters and overwater villas."
    },
    {
      id: 5,
      title: "Thailand Cultural Experience",
      location: "Bangkok & Pattaya",
      country: "Thailand",
      duration: "6 Days 5 Nights",
      durationDays: 6,
      price: 45000,
      rating: 4.6,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
      category: "international",
      badge: "Family Friendly",
      badgeColor: "from-emerald-500 to-teal-500",
      includes: ["Flight", "Hotel", "Tours", "Some Meals"],
      description: "Experience the rich culture, temples, and vibrant nightlife of Thailand."
    },
    {
      id: 6,
      title: "Srimangal Tea Garden Tour",
      location: "Srimangal, Bangladesh",
      country: "Bangladesh",
      duration: "2 Days 1 Night",
      durationDays: 2,
      price: 8000,
      rating: 4.5,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800",
      category: "nature",
      badge: "Budget",
      badgeColor: "from-cyan-500 to-blue-500",
      includes: ["Hotel", "Transport", "Breakfast"],
      description: "Explore the tea capital of Bangladesh with lush green gardens and serene landscapes."
    },
    {
      id: 7,
      title: "Malaysia Adventure Package",
      location: "Kuala Lumpur & Langkawi",
      country: "Malaysia",
      duration: "5 Days 4 Nights",
      durationDays: 5,
      price: 55000,
      rating: 4.7,
      reviews: 143,
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800",
      category: "international",
      badge: "Popular",
      badgeColor: "from-rose-500 to-pink-500",
      includes: ["Flight", "Hotel", "Island Tour", "City Tour"],
      description: "From iconic Petronas Towers to beautiful Langkawi beaches."
    },
    {
      id: 8,
      title: "Singapore City Explorer",
      location: "Singapore",
      country: "Singapore",
      duration: "4 Days 3 Nights",
      durationDays: 4,
      price: 65000,
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
      category: "international",
      badge: "Recommended",
      badgeColor: "from-blue-500 to-indigo-500",
      includes: ["Flight", "Hotel", "Universal Studios", "City Tour"],
      description: "Explore the Lion City with its futuristic architecture and cultural heritage."
    },
    {
      id: 9,
      title: "Sajek Valley Expedition",
      location: "Sajek, Rangamati",
      country: "Bangladesh",
      duration: "3 Days 2 Nights",
      durationDays: 3,
      price: 10000,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      category: "adventure",
      badge: "Adventure",
      badgeColor: "from-green-500 to-emerald-500",
      includes: ["Jeep", "Resort", "Meals", "Guide"],
      description: "Journey to the 'Roof of Bangladesh' with breathtaking cloud views."
    },
    {
      id: 10,
      title: "Hajj Package 2026",
      location: "Makkah & Madinah",
      country: "Saudi Arabia",
      duration: "21 Days",
      durationDays: 21,
      price: 450000,
      rating: 5.0,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
      category: "hajj",
      badge: "Hajj 2026",
      badgeColor: "from-emerald-600 to-green-600",
      includes: ["Flight", "5-Star Hotel", "All Meals", "Transport", "Visa"],
      description: "Complete Hajj package with premium accommodation and guided services."
    },
    {
      id: 11,
      title: "Umrah Package",
      location: "Makkah & Madinah",
      country: "Saudi Arabia",
      duration: "10 Days",
      durationDays: 10,
      price: 150000,
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      category: "hajj",
      badge: "Umrah",
      badgeColor: "from-teal-500 to-cyan-500",
      includes: ["Flight", "Hotel", "All Meals", "Transport", "Visa"],
      description: "Spiritual journey with comfortable accommodation near Haram."
    },
    {
      id: 12,
      title: "Nepal Himalayan Trek",
      location: "Kathmandu & Pokhara",
      country: "Nepal",
      duration: "7 Days 6 Nights",
      durationDays: 7,
      price: 35000,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      category: "adventure",
      badge: "Trekking",
      badgeColor: "from-orange-500 to-amber-500",
      includes: ["Hotel", "Guide", "Some Meals", "Permits"],
      description: "Trek through stunning Himalayan trails with breathtaking mountain views."
    }
  ];

  // Fetch tours from API with smart loading strategy
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ['tours', filters.category, filters.sortBy],
    queryFn: () => tourApi.getAllTours({
      category: filters.category !== 'all' ? filters.category : undefined,
      sortBy: filters.sortBy,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1]
    }),
    // Use static data as placeholder for instant render
    placeholderData: {
      data: {
        tours: allTours.map(tour => ({
          id: tour.id,
          title: tour.title,
          slug: tour.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          destination: tour.location,
          country: tour.country,
          duration: tour.durationDays,
          price: tour.price,
          discountPrice: tour.originalPrice,
          rating: tour.rating,
          totalReviews: tour.reviews,
          coverImage: tour.image,
          category: tour.category,
          isFeatured: tour.badge === 'Popular',
          inclusions: tour.includes,
          shortDescription: tour.description,
        }))
      }
    },
    staleTime: 1000 * 60 * 5, // Consider fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  // Track slow loading for better UX feedback
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  
  useEffect(() => {
    if (isLoading || isFetching) {
      // Show loading banner after 2 seconds of loading
      const timer = setTimeout(() => setIsSlowLoading(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsSlowLoading(false);
    }
  }, [isLoading, isFetching]);

  // Map API data to frontend format, or use static data as fallback
  const apiTours = data?.data?.tours?.map(tour => ({
    id: tour.id,
    title: tour.title,
    location: tour.destination,
    country: tour.country,
    duration: `${tour.duration} Days`,
    durationDays: tour.duration,
    price: tour.price,
    originalPrice: tour.discountPrice,
    rating: tour.rating,
    reviews: tour.totalReviews,
    image: tour.coverImage,
    category: tour.category,
    badge: tour.isFeatured ? 'Popular' : 'Available',
    badgeColor: tour.isFeatured ? 'from-rose-500 to-pink-500' : 'from-blue-500 to-indigo-500',
    includes: tour.inclusions || [],
    description: tour.shortDescription || tour.description || ''
  })) || [];

  // Use API data (which includes placeholderData for instant render)
  const displayTours = apiTours.length > 0 ? apiTours : allTours;

  const categories = [
    { id: 'all', name: 'All Tours', icon: Grid },
    { id: 'beach', name: 'Beach & Island', icon: Building },
    { id: 'adventure', name: 'Adventure', icon: TrendingUp },
    { id: 'international', name: 'International', icon: Plane },
    { id: 'nature', name: 'Nature & Wildlife', icon: MapPin },
    { id: 'hajj', name: 'Hajj & Umrah', icon: Star },
  ];

  const durations = [
    { id: 'all', name: 'Any Duration' },
    { id: 'short', name: '1-3 Days' },
    { id: 'medium', name: '4-7 Days' },
    { id: 'long', name: '8+ Days' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'duration', name: 'Duration' },
  ];

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let result = [...displayTours];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tour => 
        tour.title.toLowerCase().includes(query) ||
        tour.location.toLowerCase().includes(query) ||
        tour.country.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(tour => tour.category === filters.category);
    }

    // Duration filter
    if (filters.duration !== 'all') {
      result = result.filter(tour => {
        if (filters.duration === 'short') return tour.durationDays <= 3;
        if (filters.duration === 'medium') return tour.durationDays >= 4 && tour.durationDays <= 7;
        if (filters.duration === 'long') return tour.durationDays >= 8;
        return true;
      });
    }

    // Price filter
    result = result.filter(tour => 
      tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter(tour => tour.rating >= filters.rating);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => a.durationDays - b.durationDays);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [displayTours, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-dark-900/80" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-display">
              Explore Our <span className="text-primary-400">Tour Packages</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8">
              Discover amazing destinations with our carefully curated travel packages. 
              From beach getaways to spiritual journeys, we have something for everyone.
            </p>

            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations, tours..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-sm sm:text-base text-gray-700 transition-all sm:hidden min-h-[44px]"
                >
                  <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                  Filters
                </button>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all min-h-[44px]">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                  <button 
                    onClick={() => setFilters({
                      priceRange: [0, 150000],
                      duration: 'all',
                      category: 'all',
                      rating: 0,
                      sortBy: 'popular'
                    })}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Reset All
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFilters({...filters, category: cat.id})}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                          filters.category === cat.id 
                            ? 'bg-primary-100 text-primary-700 font-medium' 
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <cat.icon className="h-5 w-5" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Duration</h4>
                  <div className="space-y-2">
                    {durations.map((dur) => (
                      <button
                        key={dur.id}
                        onClick={() => setFilters({...filters, duration: dur.id})}
                        className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                          filters.duration === dur.id 
                            ? 'bg-primary-100 text-primary-700 font-medium' 
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {dur.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="px-2">
                    <input 
                      type="range"
                      min="0"
                      max="500000"
                      step="5000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                      className="w-full accent-primary-600"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>৳0</span>
                      <span className="font-medium text-primary-600">৳{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({...filters, rating})}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all ${
                          filters.rating === rating 
                            ? 'border-primary-500 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {rating === 0 ? 'All' : (
                          <>
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {rating}+
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Tours Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredTours.length}</span> tours
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 pr-10 font-medium text-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all cursor-pointer"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                    <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tours Grid/List */}
              {/* Loading Banner for slow loads */}
              {isSlowLoading && <LoadingBanner message="Fetching latest tour packages..." />}
              
              {/* Show skeletons only on initial load (no cached/placeholder data) */}
              {isLoading && !data ? (
                <TourPackageSkeletonGrid count={6} viewMode={viewMode} />
              ) : filteredTours.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        priceRange: [0, 150000],
                        duration: 'all',
                        category: 'all',
                        rating: 0,
                        sortBy: 'popular'
                      });
                    }}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredTours.map((tour) => (
                    <div 
                      key={tour.id}
                      className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
                        viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                      }`}
                    >
                      {/* Image */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-80 h-64 md:h-auto' : 'h-64'}`}>
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${tour.badgeColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
                            {tour.badge}
                          </span>
                        </div>
                        
                        {/* Wishlist */}
                        <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group/heart">
                          <Heart className="h-5 w-5 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
                        </button>

                        {/* Duration */}
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                            <Clock className="h-4 w-4 text-primary-600" />
                            {tour.duration}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-6 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-gray-900">{tour.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{tour.reviews} reviews</span>
                        </div>
                        
                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                          {tour.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
                          {tour.location}
                        </p>

                        {viewMode === 'list' && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                        )}

                        {/* Includes */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tour.includes.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {item}
                            </span>
                          ))}
                          {tour.includes.length > 3 && (
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{tour.includes.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-primary-600">
                                ৳{tour.price.toLocaleString()}
                              </span>
                              {tour.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ৳{tour.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">per person</p>
                          </div>
                          <button 
                            onClick={() => navigate(`/tours/${tour.id}`)}
                            className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;
