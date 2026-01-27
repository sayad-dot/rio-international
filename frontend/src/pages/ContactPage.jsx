import { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare, 
  Facebook, Instagram, Youtube, Twitter, CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Gulshan Avenue', 'Dhaka 1212, Bangladesh'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+880 1234-567890', '+880 9876-543210'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@riointernational.com', 'support@riointernational.com'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#', color: 'hover:bg-blue-600' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:bg-pink-600' },
    { icon: Youtube, label: 'Youtube', url: '#', color: 'hover:bg-red-600' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:bg-sky-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-dark-900/80" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <MessageSquare className="h-16 w-16 text-primary-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              Get In <span className="text-primary-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Have questions? We'd love to hear from you. Send us a message and 
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                Send Us a Message
              </h2>
              
              {submitted && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-700 text-sm font-medium">
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-900"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-900"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-900 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1990946780676!2d90.41143931543408!3d23.780573093567986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0d6dc0001%3A0x21c745fbb9de0e21!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rio Tours & Travels Location"
                />
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      className={`flex items-center gap-3 px-6 py-4 bg-gray-100 ${social.color} text-gray-700 hover:text-white rounded-xl font-medium transition-all group`}
                    >
                      <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                <p className="text-gray-100 mb-6">
                  Call our hotline for instant support and booking assistance.
                </p>
                <a 
                  href="tel:+8801234567890" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  <Phone className="h-5 w-5" />
                  +880 1234-567890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How do I book a tour package?',
                a: 'You can book directly through our website, call our hotline, or visit our office. We accept online payments and bank transfers.'
              },
              {
                q: 'What is your cancellation policy?',
                a: 'Cancellations made 15+ days before departure receive 80% refund. 7-14 days: 50% refund. Less than 7 days: no refund.'
              },
              {
                q: 'Do you arrange visa services?',
                a: 'Yes! We provide comprehensive visa assistance for all our tour destinations with fast processing.'
              },
              {
                q: 'Are travel insurance included?',
                a: 'Basic travel insurance is included in most packages. Premium insurance is available for an additional fee.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
                <summary className="font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary-600 text-xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
