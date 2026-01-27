import { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Send, Users, TrendingUp, Award, Heart } from 'lucide-react';
import Button from '../components/common/Button';

const CareerPage = () => {
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: ''
  });

  const handleChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle application submission
    console.log('Application data:', applicationData);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Continuous learning and advancement opportunities'
    },
    {
      icon: Award,
      title: 'Competitive Salary',
      description: 'Market-leading compensation packages'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and remote options'
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with passionate and talented professionals'
    }
  ];

  const openPositions = [
    {
      title: 'Travel Consultant',
      type: 'Full-time',
      location: 'Dhaka, Bangladesh',
      salary: '৳30,000 - ৳50,000',
      description: 'Help clients plan their dream vacations and manage travel bookings.',
      requirements: ['2+ years experience in travel industry', 'Excellent communication skills', 'Knowledge of visa processing']
    },
    {
      title: 'Visa Processing Officer',
      type: 'Full-time',
      location: 'Dhaka, Bangladesh',
      salary: '৳25,000 - ৳40,000',
      description: 'Process visa applications and assist clients with documentation.',
      requirements: ['1+ years experience in visa processing', 'Attention to detail', 'Knowledge of international visa requirements']
    },
    {
      title: 'Tour Operations Manager',
      type: 'Full-time',
      location: 'Dhaka, Bangladesh',
      salary: '৳40,000 - ৳60,000',
      description: 'Manage tour operations, coordinate with partners, and ensure customer satisfaction.',
      requirements: ['3+ years experience in tour operations', 'Leadership skills', 'Strong organizational abilities']
    },
    {
      title: 'Customer Service Representative',
      type: 'Full-time',
      location: 'Dhaka, Bangladesh',
      salary: '৳20,000 - ৳35,000',
      description: 'Provide excellent customer service and support to our clients.',
      requirements: ['Experience in customer service', 'Good communication skills', 'Problem-solving abilities']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-hero-pattern" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
              <Briefcase className="h-5 w-5 text-white" />
              <span className="text-white font-semibold text-sm">Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              Build Your Career <span className="text-primary-300">With Us</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Join Rio Tours & Travels and be part of a dynamic team shaping the future of travel
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-primary-600">Join Us</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We believe in creating an environment where our team can thrive and grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open <span className="text-primary-600">Positions</span>
            </h2>
            <p className="text-gray-600 text-lg">Find your perfect role and start your journey with us</p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {openPositions.map((position, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <p className="text-gray-600 mb-4">{position.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary-600" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary-600" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-primary-600" />
                        {position.salary}
                      </span>
                    </div>
                  </div>
                  <Button className="md:w-auto">Apply Now</Button>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {position.requirements.map((req, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Submit Your <span className="text-primary-600">Application</span>
              </h2>
              <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you soon</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={applicationData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Position *
                    </label>
                    <select
                      name="position"
                      value={applicationData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                      required
                    >
                      <option value="">Select position</option>
                      {openPositions.map((pos, idx) => (
                        <option key={idx} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={applicationData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 3 years"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleChange}
                      rows="6"
                      placeholder="Tell us why you're a great fit for this position..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full py-4 text-lg">
                  Submit Application
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
