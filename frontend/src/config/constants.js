// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Rio Tours & Travels',
  DESCRIPTION: 'Your trusted travel partner in Bangladesh',
  CONTACT: {
    PHONE: '+880 1XXX-XXXXXX',
    EMAIL: 'info@riointernational.com',
    WHATSAPP: '+880 1XXX-XXXXXX',
    ADDRESS: 'Dhaka, Bangladesh',
  },
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/riointernational',
    INSTAGRAM: 'https://instagram.com/riointernational',
    TWITTER: 'https://twitter.com/riointernational',
    YOUTUBE: 'https://youtube.com/@riointernational',
  },
};

// Currency Configuration
export const CURRENCY = {
  BDT: {
    symbol: '৳',
    code: 'BDT',
    locale: 'bn-BD',
  },
  USD: {
    symbol: '$',
    code: 'USD',
    locale: 'en-US',
  },
};

// Date Format
export const DATE_FORMAT = {
  DISPLAY: 'DD MMM, YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'DD MMMM, YYYY',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
};

// Tour Categories
export const TOUR_CATEGORIES = [
  { id: 'international', label: 'International Tours', icon: '✈️' },
  { id: 'domestic', label: 'Domestic Tours', icon: '🏝️' },
  { id: 'hajj', label: 'Hajj & Umrah', icon: '🕋' },
  { id: 'corporate', label: 'Corporate Travel', icon: '💼' },
  { id: 'honeymoon', label: 'Honeymoon Packages', icon: '💑' },
  { id: 'adventure', label: 'Adventure Tours', icon: '🏔️' },
  { id: 'family', label: 'Family Packages', icon: '👨‍👩‍👧‍👦' },
  { id: 'student', label: 'Student Tours', icon: '🎓' },
];

// Popular Destinations (Bangladesh)
export const BD_DESTINATIONS = [
  { name: "Cox's Bazar", image: '/destinations/coxsbazar.jpg' },
  { name: 'Sundarbans', image: '/destinations/sundarbans.jpg' },
  { name: 'Srimangal', image: '/destinations/srimangal.jpg' },
  { name: "Saint Martin's Island", image: '/destinations/saintmartin.jpg' },
  { name: 'Bandarban', image: '/destinations/bandarban.jpg' },
  { name: 'Rangamati', image: '/destinations/rangamati.jpg' },
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'bkash', name: 'bKash', icon: '📱', popular: true },
  { id: 'nagad', name: 'Nagad', icon: '💳', popular: true },
  { id: 'rocket', name: 'Rocket', icon: '🚀', popular: true },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
  { id: 'cash', name: 'Cash on Office', icon: '💵' },
];
