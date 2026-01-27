import { 
  Award, Users, Globe, TrendingUp, Heart, Shield, 
  MapPin, Plane, Star, CheckCircle, Target, Eye
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: 'Happy Travelers', value: '10,000+', icon: Users },
    { label: 'Destinations', value: '100+', icon: Globe },
    { label: 'Tour Packages', value: '500+', icon: Plane },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction and comfort are our top priorities in every journey.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Secure bookings and reliable service you can count on.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering world-class travel experiences with attention to detail.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting you to amazing destinations across the world.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const team = [
    {
      name: 'Ahmed Rahman',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Leading Rio Tours & Travels with 15+ years of travel industry experience.'
    },
    {
      name: 'Fatima Khatun',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description: 'Ensuring seamless operations and exceptional customer service.'
    },
    {
      name: 'Karim Hassan',
      role: 'Tour Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      description: 'Crafting memorable travel experiences for our valued clients.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-dark-900/80" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              About <span className="text-primary-400">Rio Tours & Travels</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your trusted partner for unforgettable travel experiences since 2010. 
              We're passionate about making your dream journeys a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl mb-4">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2010, Rio Tours & Travels started with a simple vision: to make 
                  travel accessible, affordable, and memorable for everyone. What began as a 
                  small travel agency in Dhaka has grown into Bangladesh's leading tour operator.
                </p>
                <p>
                  Over the years, we've helped thousands of travelers explore the world, from 
                  the beaches of Cox's Bazar to the deserts of Dubai, from spiritual journeys 
                  to Makkah to exotic adventures in Thailand and beyond.
                </p>
                <p>
                  Our commitment to excellence, personalized service, and competitive pricing 
                  has made us the preferred choice for travelers across Bangladesh. We don't 
                  just sell tours – we create experiences that last a lifetime.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800" 
                alt="Our Story"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display">Our Mission</h3>
              <p className="text-gray-100 leading-relaxed">
                To provide exceptional travel experiences that exceed expectations through 
                personalized service, competitive pricing, and unwavering commitment to 
                customer satisfaction. We aim to make every journey smooth, safe, and memorable.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display">Our Vision</h3>
              <p className="text-gray-100 leading-relaxed">
                To become the most trusted and preferred travel partner in Bangladesh, recognized 
                for innovation, reliability, and creating extraordinary travel experiences that 
                connect people with the world's most beautiful destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate travel experts dedicated to making your journey extraordinary
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-3xl mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Why Choose Rio Tours & Travels?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass p-6 rounded-2xl">
              <CheckCircle className="h-10 w-10 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-200 text-sm">Competitive rates on all packages</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <Shield className="h-10 w-10 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-200 text-sm">We're always here to help you</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <Star className="h-10 w-10 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-200 text-sm">Professional travel consultants</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
