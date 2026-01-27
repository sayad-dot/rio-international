import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ShoppingBag, Search, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Visa Services', href: '/visa-packages' },
    { name: 'Hajj & Umrah', href: '/tours?category=hajj' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-1.5 sm:py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-1 sm:gap-2 hover:text-primary-200">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">+880 1XXX-XXXXXX</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>🇧🇩 Your Trusted Travel Partner</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center min-w-fit">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-display whitespace-nowrap">
              <span className="text-primary-600">Rio</span>
              <span className="text-gray-800"> International</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <button className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

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
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-all py-3 px-4 rounded-lg -mx-4 min-h-[44px] flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
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
    </header>
  );
};

export default Header;
