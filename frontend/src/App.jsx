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
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

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
