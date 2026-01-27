import { useState } from 'react';
import { Plane, Calendar, Users, MapPin, ArrowRight, Clock, Shield, Award, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';

const FlightBookingPage = () => {
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    classType: 'economy'
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle flight booking submission
    console.log('Flight booking data:', bookingData);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your payment information is protected with SSL encryption'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'We guarantee the most competitive flight prices'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round the clock customer assistance whenever you need'
    }
  ];

  const popularDestinations = [
    { city: 'Dubai', country: 'UAE', price: '৳35,000', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
    { city: 'Bangkok', country: 'Thailand', price: '৳28,000', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400' },
    { city: 'Singapore', country: 'Singapore', price: '৳32,000', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400' },
    { city: 'Kuala Lumpur', country: 'Malaysia', price: '৳26,000', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400' }
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
              <Plane className="h-5 w-5 text-white" />
              <span className="text-white font-semibold text-sm">Flight Booking</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              Book Your <span className="text-primary-300">Perfect Flight</span>
            </h1>
            <p className="text-xl text-gray-200">
              Find the best flight deals to destinations worldwide with our easy booking system
            </p>
          </div>

          {/* Booking Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* From */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="from"
                        value={bookingData.from}
                        onChange={handleChange}
                        placeholder="Departure city"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="to"
                        value={bookingData.to}
                        onChange={handleChange}
                        placeholder="Destination city"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Departure Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="departureDate"
                        value={bookingData.departureDate}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Return Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="returnDate"
                        value={bookingData.returnDate}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Passengers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="passengers"
                        value={bookingData.passengers}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Class Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class
                    </label>
                    <select
                      name="classType"
                      value={bookingData.classType}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    >
                      <option value="economy">Economy</option>
                      <option value="premium">Premium Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full py-4 text-lg">
                  Search Flights
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

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-primary-600">Destinations</span>
            </h2>
            <p className="text-gray-600 text-lg">Book your flight to these trending destinations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-xl">{dest.city}</h3>
                    <p className="text-white/80 text-sm">{dest.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Starting from</span>
                    <span className="text-primary-600 font-bold text-xl">{dest.price}</span>
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

export default FlightBookingPage;
