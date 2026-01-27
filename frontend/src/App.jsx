import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailsPage from './pages/TourDetailsPage';
import VisaPackagesPage from './pages/VisaPackagesPage';
import VisaDetailsPage from './pages/VisaDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FlightBookingPage from './pages/FlightBookingPage';
import HotelReservationPage from './pages/HotelReservationPage';
import CareerPage from './pages/CareerPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import AdminRegisterPage from './pages/auth/AdminRegisterPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminToursPage from './pages/admin/AdminToursPage';
import AdminVisaPage from './pages/admin/AdminVisaPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminEmployeesPage from './pages/admin/AdminEmployeesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminJobsPage from './pages/admin/AdminJobsPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();

  console.log('🛡️ ProtectedRoute check:', {
    loading,
    isAuthenticated,
    isAdmin,
    adminOnly,
    userRole: user?.role
  });

  if (loading) {
    console.log('⏳ Still loading auth state...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ Not authenticated - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    console.log('❌ Not admin - redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted');
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="tours" element={<ToursPage />} />
              <Route path="tours/:id" element={<TourDetailsPage />} />
              <Route path="visa-packages" element={<VisaPackagesPage />} />
              <Route path="visa/:slug" element={<VisaDetailsPage />} />
              <Route path="flight-booking" element={<FlightBookingPage />} />
              <Route path="hotel-reservation" element={<HotelReservationPage />} />
              <Route path="career" element={<CareerPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Admin Auth Routes (No Layout) */}
            <Route path="/auth/admin/login" element={<AdminLoginPage />} />
            <Route path="/auth/admin/register" element={<AdminRegisterPage />} />

            {/* Protected User Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfilePage />} />
              <Route path="bookings" element={<BookingsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="tours" element={<AdminToursPage />} />
              <Route path="visa" element={<AdminVisaPage />} />
              <Route path="reviews" element={<AdminReviewsPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="employees" element={<AdminEmployeesPage />} />
              <Route path="career/jobs" element={<AdminJobsPage />} />
              <Route path="career/applications" element={<AdminApplicationsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
