import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, AlertCircle, Shield, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Check if user is admin or super admin
        if (result.user.role === 'ADMIN' || result.user.role === 'SUPER_ADMIN') {
          navigate('/admin');
        } else {
          setError('Access denied. Admin credentials required.');
          setLoading(false);
        }
      } else {
        setError(result.error || 'Invalid credentials');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to regular login */}
        <Link
          to="/login"
          className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to User Login
        </Link>

        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Admin Access
            </h2>
            <p className="text-slate-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Admin Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@riointernational.com"
              icon={Mail}
              className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              icon={Lock}
              className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Sign In to Admin Panel
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/50 text-slate-400">
                New to the team?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-slate-400">
              Need admin access?{' '}
              <Link
                to="/auth/admin/register"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Register as Employee
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-start text-xs text-slate-500">
              <Shield className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <p>
                This is a secure admin area. All login attempts are logged and monitored.
                Unauthorized access is strictly prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            © 2026 RIO International Travel Agency. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
