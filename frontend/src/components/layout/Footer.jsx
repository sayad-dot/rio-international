import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-display">
              Rio Tours & Travels
            </h3>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4">
              Your trusted travel partner in Bangladesh. We specialize in creating unforgettable
              journeys with personalized service and competitive prices.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/tours" className="hover:text-white transition-colors">
                  All Tours
                </Link>
              </li>
              <li>
                <Link to="/tours?category=hajj" className="hover:text-white transition-colors">
                  Hajj & Umrah
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Our Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>International Tours</li>
              <li>Domestic Packages</li>
              <li>Hajj & Umrah Services</li>
              <li>Visa Processing</li>
              <li>Hotel Booking</li>
              <li>Flight Tickets</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 flex-shrink-0" />
                <a href="tel:+8801XXXXXXXXX" className="hover:text-white">
                  +880 1XXX-XXXXXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 flex-shrink-0" />
                <a href="mailto:info@riointernational.com" className="hover:text-white break-all">
                  info@riointernational.com
                </a>
              </li>
            </ul>
            <div className="mt-3 sm:mt-4">
              <h5 className="text-white text-sm sm:text-base font-semibold mb-2">Payment Methods</h5>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded text-xs">bKash</span>
                <span className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded text-xs">Nagad</span>
                <span className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded text-xs">Rocket</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-3 sm:gap-0">
            <p className="text-center md:text-left">&copy; {currentYear} Rio Tours & Travels. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
