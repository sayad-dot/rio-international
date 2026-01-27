import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ShoppingBag, Search, Phone, ChevronDown, Plane, FileText, Building, Hotel, Compass, Briefcase, Users, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [otherServicesOpen, setOtherServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationLinks = [
    { name: 'Visa Services', href: '/visa-packages', icon: FileText },
    { name: 'Tour Packages', href: '/tours', icon: Compass },
  ];

  const otherServicesLinks = [
    { name: 'Flight Booking', href: '/flight-booking', icon: Plane },
    { name: 'Hotel Reservation', href: '/hotel-reservation', icon: Hotel },
    { name: 'Hajj & Umrah', href: '/tours?category=hajj', icon: Compass },
    { name: 'Career', href: '/career', icon: Briefcase },
    { name: 'About Us', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search across tours and visa packages
      navigate(`/tours?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Top Bar - More Professional */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline font-medium">+880 1XXX-XXXXXX</span>
            </a>
            <a href="mailto:info@riointernational.com" className="hidden sm:flex items-center gap-2 hover:text-primary-100 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">info@riointernational.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline">🇧🇩</span>
            <span className="font-medium">Your Trusted Travel Partner</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Enhanced Professional Design */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Enhanced */}
          <Link to="/" className="flex items-center gap-2 min-w-fit group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-display whitespace-nowrap">
              <span className="text-primary-600">Rio</span>
              <span className="text-gray-800"> Tours & Travels</span>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced with Icons */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-white bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary-500 hover:to-primary-600 font-medium transition-all duration-300 rounded-xl shadow-sm hover:shadow-md group"
              >
                <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                {link.name}
              </Link>
            ))}
            
            {/* Other Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOtherServicesOpen(!otherServicesOpen)}
                onMouseEnter={() => setOtherServicesOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-white bg-gradient-to-br from-gray-50 to-gray-100 hover:from-secondary-500 hover:to-secondary-600 font-medium transition-all duration-300 rounded-xl shadow-sm hover:shadow-md group"
              >
                <Building className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Other Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${otherServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {otherServicesOpen && (
                <div 
                  onMouseLeave={() => setOtherServicesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 animate-in slide-in-from-top-2 duration-200"
                >
                  {otherServicesLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-colors group"
                      onClick={() => setOtherServicesOpen(false)}
                    >
                      <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center group"
            >
              <Search className="h-5 w-5 text-gray-600 group-hover:text-primary-600 group-hover:scale-110 transition-all" />
            </button>

            {/* Admin Dashboard Button - Only for Admins */}
            {isAuthenticated && isAdmin && (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-300 rounded-xl shadow-md hover:shadow-lg"
              >
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </button>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/profile/bookings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all py-3 px-4 rounded-lg min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
              
              {/* Other Services in Mobile */}
              <div className="border-t pt-3 mt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 mb-2">Other Services</div>
                {otherServicesLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all py-3 px-4 rounded-lg min-h-[44px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {!isAuthenticated && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                    className="w-full min-h-[44px]"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                    className="w-full min-h-[44px]"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-in slide-in-from-top-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Search Tours & Visa Packages</h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, tour packages, visa services..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all text-gray-900"
                    autoFocus
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="px-6 py-3 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-semibold text-gray-500 mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Dubai', 'Thailand', 'Tourist Visa', 'Hajj Package', 'Malaysia', 'Cox\'s Bazar'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded-lg text-sm font-medium text-gray-700 transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
