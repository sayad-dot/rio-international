import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Settings, Bell, Mail, Lock, Globe, 
  Database, Shield, Activity, Save, AlertCircle
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AdminSettingsPage = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Rio Tours & Travels',
    siteEmail: 'info@riointernational.com',
    supportPhone: '+1 234 567 8900',
    companyAddress: '123 Travel Street, Dubai, UAE',
    
    // Email Settings
    emailNotifications: true,
    bookingConfirmationEmail: true,
    paymentConfirmationEmail: true,
    reviewNotificationEmail: true,
    
    // Notification Settings
    pushNotifications: false,
    smsNotifications: false,
    adminAlerts: true,
    
    // Security Settings
    requireEmailVerification: true,
    passwordMinLength: 8,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    
    // Booking Settings
    bookingRequiresApproval: false,
    autoConfirmPayment: false,
    cancellationPeriodDays: 7,
    maxAdvanceBookingDays: 365,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    logLevel: 'info'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      alert('Settings saved successfully!');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure application settings and preferences</p>
        </div>
        <Button
          onClick={handleSave}
          loading={isSaving}
          leftIcon={<Save className="h-5 w-5" />}
        >
          Save Changes
        </Button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <Input
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Email
              </label>
              <Input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => handleChange('siteEmail', e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Phone
              </label>
              <Input
                value={settings.supportPhone}
                onChange={(e) => handleChange('supportPhone', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Address
              </label>
              <textarea
                value={settings.companyAddress}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Email Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Enable Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Booking Confirmation Email</span>
              <input
                type="checkbox"
                checked={settings.bookingConfirmationEmail}
                onChange={(e) => handleChange('bookingConfirmationEmail', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Payment Confirmation Email</span>
              <input
                type="checkbox"
                checked={settings.paymentConfirmationEmail}
                onChange={(e) => handleChange('paymentConfirmationEmail', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Review Notification Email</span>
              <input
                type="checkbox"
                checked={settings.reviewNotificationEmail}
                onChange={(e) => handleChange('reviewNotificationEmail', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Other Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Other Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">SMS Notifications</span>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Admin Alerts</span>
              <input
                type="checkbox"
                checked={settings.adminAlerts}
                onChange={(e) => handleChange('adminAlerts', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Require Email Verification</span>
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                disabled={!isSuperAdmin}
              />
            </label>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Password Length
              </label>
              <Input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
                min="6"
                max="20"
                disabled={!isSuperAdmin}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="1440"
                disabled={!isSuperAdmin}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Login Attempts
              </label>
              <Input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
                min="3"
                max="10"
                disabled={!isSuperAdmin}
              />
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Booking Settings</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Booking Requires Approval</span>
              <input
                type="checkbox"
                checked={settings.bookingRequiresApproval}
                onChange={(e) => handleChange('bookingRequiresApproval', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Auto-Confirm Payment</span>
              <input
                type="checkbox"
                checked={settings.autoConfirmPayment}
                onChange={(e) => handleChange('autoConfirmPayment', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Period (days)
              </label>
              <Input
                type="number"
                value={settings.cancellationPeriodDays}
                onChange={(e) => handleChange('cancellationPeriodDays', parseInt(e.target.value))}
                min="0"
                max="30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Advance Booking (days)
              </label>
              <Input
                type="number"
                value={settings.maxAdvanceBookingDays}
                onChange={(e) => handleChange('maxAdvanceBookingDays', parseInt(e.target.value))}
                min="30"
                max="730"
              />
            </div>
          </div>
        </div>

        {/* System Settings (SUPER_ADMIN only) */}
        {isSuperAdmin && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="text-gray-700">Maintenance Mode</div>
                  <div className="text-xs text-gray-500">Site will be unavailable to customers</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <span className="text-gray-700">Debug Mode</span>
                <input
                  type="checkbox"
                  checked={settings.debugMode}
                  onChange={(e) => handleChange('debugMode', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <span className="text-gray-700">Cache Enabled</span>
                <input
                  type="checkbox"
                  checked={settings.cacheEnabled}
                  onChange={(e) => handleChange('cacheEnabled', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Log Level
                </label>
                <select
                  value={settings.logLevel}
                  onChange={(e) => handleChange('logLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Warning Notice */}
      {!isSuperAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Limited Access</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Some settings are restricted to Super Admins only. Contact your administrator for changes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
