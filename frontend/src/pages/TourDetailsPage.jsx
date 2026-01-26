import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tourApi } from '../services/api/tourApi';
import {
  MapPin, Clock, Users, Star, Heart, Share2, Check, X,
  Calendar, Shield, AlertCircle, ChevronRight, ChevronLeft,
  Phone, MessageCircle, Info, Image as ImageIcon
} from 'lucide-react';
import Spinner from '../components/common/Spinner';

const TourDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch tour details
  const { data, isLoading, error } = useQuery({
    queryKey: ['tour', id],
    queryFn: () => tourApi.getTourById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const tour = data?.data?.tour;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate total price
  const calculateTotal = () => {
    if (!tour) return 0;
    const adultPrice = tour.price * travelers.adults;
    const childPrice = (tour.price * 0.7) * travelers.children; // 30% discount for children
    return adultPrice + childPrice;
  };

  // Handle booking
  const handleBooking = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    // Navigate to booking page with details
    navigate('/bookings', {
      state: {
        tour,
        date: selectedDate,
        travelers,
        totalPrice: calculateTotal()
      }
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Add API call to save/remove from wishlist
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour?.title,
          text: tour?.shortDescription,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
        <p className="ml-4 text-gray-600">Loading tour details...</p>
      </div>
    );
  }

  // Error state
  if (error || !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h2>
          <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/tours')}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
          >
            Browse All Tours
          </button>
        </div>
      </div>
    );
  }

  const allImages = [tour.coverImage, ...(tour.images || [])];
  const difficultyColors = {
    EASY: 'text-green-600 bg-green-50',
    MODERATE: 'text-yellow-600 bg-yellow-50',
    CHALLENGING: 'text-red-600 bg-red-50'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-primary-600">Home</button>
            <ChevronRight className="h-4 w-4" />
            <button onClick={() => navigate('/tours')} className="hover:text-primary-600">Tours</button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{tour.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Image Gallery */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          {/* Title & Actions Row */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">{tour.rating}</span>
                  <span>({tour.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <span>{tour.destination}, {tour.country}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-xl border-2 ${
                  isWishlisted
                    ? 'bg-red-50 border-red-500 text-red-500'
                    : 'border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-500'
                } transition-all`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 transition-all"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2 h-96">
            {/* Main large image */}
            <div
              className="col-span-4 md:col-span-3 relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setShowAllImages(true)}
            >
              <img
                src={allImages[currentImageIndex]}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="h-4 w-4" />
                View All Photos
              </button>
            </div>

            {/* Thumbnail grid */}
            <div className="hidden md:flex flex-col gap-2">
              {allImages.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden cursor-pointer h-full group"
                  onClick={() => setCurrentImageIndex(idx + 1)}
                >
                  <img
                    src={img}
                    alt={`${tour.title} ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400';
                    }}
                  />
                  {idx === 1 && allImages.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        +{allImages.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{tour.duration} Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Group Size</p>
                    <p className="font-semibold text-gray-900">Max {tour.maxGroupSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${difficultyColors[tour.difficulty]}`}>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <p className="font-semibold text-gray-900">{tour.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold text-gray-900">{tour.rating}/5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="space-y-2 mb-6">
                {tour.inclusions && tour.inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {tour.exclusions && tour.exclusions.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">What's Not Included</h3>
                  <div className="space-y-2">
                    {tour.exclusions.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Itinerary */}
            {tour.itinerary && typeof tour.itinerary === 'object' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {Object.entries(tour.itinerary).map(([day, details], idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary-600">D{idx + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{day}</h4>
                        <p className="text-gray-600">{details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Meeting Point</p>
                    <p className="text-blue-700 text-sm">{tour.destination}, {tour.country}</p>
                    <p className="text-blue-600 text-sm mt-1">Exact location will be provided after booking</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
                  <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-emerald-900 mb-1">Free Cancellation</p>
                    <p className="text-emerald-700 text-sm">Cancel up to 24 hours before for a full refund</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
                  <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900 mb-1">Travel Insurance</p>
                    <p className="text-amber-700 text-sm">We recommend travel insurance for your safety</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {tour.reviews && tour.reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                  {tour.reviews.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary-600">
                              {review.users.firstName[0]}{review.users.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {review.users.firstName} {review.users.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      )}
                      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  {tour.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-primary-600">
                        ৳{tour.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ৳{tour.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary-600">
                      ৳{tour.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">per person</p>
              </div>

              {/* Date Picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travelers
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setTravelers(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{travelers.adults}</span>
                      <button
                        onClick={() => setTravelers(prev => ({ ...prev, adults: Math.min(tour.maxGroupSize, prev.adults + 1) }))}
                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Children</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setTravelers(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{travelers.children}</span>
                      <button
                        onClick={() => setTravelers(prev => ({ ...prev, children: prev.children + 1 }))}
                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ৳{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {travelers.adults} adult{travelers.adults > 1 ? 's' : ''}
                  {travelers.children > 0 && ` + ${travelers.children} child${travelers.children > 1 ? 'ren' : ''}`}
                </p>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all mb-4"
              >
                Book Now
              </button>

              {/* Contact Options */}
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">Call Us</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Live Chat</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Best Price</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowAllImages(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
            className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={allImages[currentImageIndex]}
            alt={tour.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetailsPage;
