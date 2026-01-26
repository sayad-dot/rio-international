import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, User, IdCard, AlertCircle, Shield, ChevronLeft, Phone, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import axiosInstance from '../../lib/axios';

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

  const validateForm = () => {
    if (!formData.employeeId) {
      setError('Employee ID is required');
      return false;
    }
    if (!formData.firstName || !formData.lastName) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/admin/register', {
        employeeId: formData.employeeId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.data.success) {
        // Store token and user data
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Navigate to admin dashboard
        navigate('/admin');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration failed. Please check your employee ID and try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Back to admin login */}
        <Link
          to="/auth/admin/login"
          className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Admin Login
        </Link>

        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mb-4 shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Employee Registration
            </h2>
            <p className="text-slate-400">
              Register with your employee credentials to access the admin panel
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 flex items-start">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-400">
              <p className="font-semibold mb-1">Employee ID Required</p>
              <p>
                You must have a valid employee ID provided by RIO International management to register as an admin.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Employee ID - Featured */}
            <div className="bg-slate-900/50 rounded-xl p-4 border-2 border-emerald-500/30">
              <Input
                label="Employee ID"
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                placeholder="EMP-XXXX"
                icon={IdCard}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
              />
              <p className="text-xs text-slate-400 mt-2 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enter your official employee ID from HR
              </p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                icon={User}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
              />

              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                icon={User}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            {/* Contact Fields */}
            <Input
              label="Work Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john.doe@riointernational.com"
              icon={Mail}
              className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              icon={Phone}
              className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />

            {/* Password Fields */}
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Minimum 6 characters"
              icon={Lock}
              className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
              icon={Lock}
              className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-600 rounded bg-slate-900"
              />
              <label className="ml-3 text-sm text-slate-400">
                I agree to the{' '}
                <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300">
                  Privacy Policy
                </Link>
                , and understand that as an employee, I have access to sensitive customer data.
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/25"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Register as Admin
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/50 text-slate-400">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/auth/admin/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Sign in to Admin Panel
            </Link>
          </div>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-start text-xs text-slate-500">
              <Shield className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <p>
                Employee registration is monitored and subject to approval. Invalid employee IDs will be flagged.
                Contact HR for assistance.
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

export default AdminRegisterPage;
