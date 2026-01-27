import { useState } from 'react';
import { Hotel, Calendar, Users, MapPin, Star, ArrowRight, Wifi, Coffee, Utensils, Shield, Award, Clock } from 'lucide-react';
import Button from '../components/common/Button';

const HotelReservationPage = () => {
  const [bookingData, setBookingData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    rooms: '1'
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle hotel reservation submission
    console.log('Hotel reservation data:', bookingData);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your reservation is protected with secure payment'
    },
    {
      icon: Award,
      title: 'Best Rates',
      description: 'We guarantee the best hotel prices available'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Customer support available anytime you need'
    }
  ];

  const featuredHotels = [
    {
      name: 'Luxury Dubai Hotel',
      location: 'Dubai, UAE',
      rating: 4.8,
      price: '৳12,000',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Spa']
    },
    {
      name: 'Bangkok Grand Hotel',
      location: 'Bangkok, Thailand',
      rating: 4.6,
      price: '৳8,500',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
      amenities: ['Free WiFi', 'Gym', 'Restaurant', 'Bar']
    },
    {
      name: 'Marina Bay Resort',
      location: 'Singapore',
      rating: 4.9,
      price: '৳15,000',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
      amenities: ['Infinity Pool', 'Spa', 'Fine Dining', 'Butler']
    },
    {
      name: 'Kuala Lumpur Plaza',
      location: 'Kuala Lumpur, Malaysia',
      rating: 4.5,
      price: '৳7,000',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600',
      amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-hero-pattern" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
              <Hotel className="h-5 w-5 text-white" />
              <span className="text-white font-semibold text-sm">Hotel Reservation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              Find Your <span className="text-primary-300">Perfect Stay</span>
            </h1>
            <p className="text-xl text-gray-200">
              Book premium hotels worldwide at the best prices with our easy reservation system
            </p>
          </div>

          {/* Booking Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Destination */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="destination"
                        value={bookingData.destination}
                        onChange={handleChange}
                        placeholder="Where do you want to stay?"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Check-in Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rooms
                    </label>
                    <div className="relative">
                      <Hotel className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="rooms"
                        value={bookingData.rooms}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all appearance-none"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full py-4 text-lg">
                  Search Hotels
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-primary-600">Hotels</span>
            </h2>
            <p className="text-gray-600 text-lg">Handpicked luxury hotels at the best destinations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-sm">{hotel.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-gray-600 text-sm">Per night</span>
                    <span className="text-primary-600 font-bold text-xl">{hotel.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelReservationPage;
