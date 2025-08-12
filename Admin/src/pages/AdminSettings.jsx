import { useState } from 'react';
import { Save, Globe, Bell, Shield, Mail, Smartphone, Palette, Database, Server } from 'lucide-react';

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Kissan Helper',
    siteDescription: 'Your digital companion for smart farming',
    contactEmail: 'support@kissanhelper.com',
    phoneNumber: '+91 9876543210',
    language: 'en',
    timezone: 'Asia/Kolkata'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newUserAlerts: true,
    paymentAlerts: true,
    systemAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: '90',
    loginAttempts: '5',
    sessionTimeout: '60'
  });

  const handleGeneralChange = () => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setSecuritySettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden sticky top-6">
            <nav className="p-2">
              <a href="#general" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-white">
                <Globe size={20} />
                <span>General</span>
              </a>
              <a href="#notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Bell size={20} />
                <span>Notifications</span>
              </a>
              <a href="#security" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Shield size={20} />
                <span>Security</span>
              </a>
              <a href="#appearance" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Palette size={20} />
                <span>Appearance</span>
              </a>
              <a href="#database" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Database size={20} />
                <span>Database</span>
              </a>
              <a href="#server" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Server size={20} />
                <span>Server</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <form id="general" onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">General Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Site Description
                </label>
                <input
                  type="text"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      Contact Email
                    </div>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} />
                      Phone Number
                    </div>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={generalSettings.phoneNumber}
                    onChange={handleGeneralChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Language
                  </label>
                  <select
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="pa">Punjabi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="Asia/Kolkata">India (GMT+5:30)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (US)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>

          {/* Notification Settings */}
          <form id="notifications" onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">Notification Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-gray-400">Receive notifications via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">New User Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified when new users register</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="newUserAlerts"
                    checked={notificationSettings.newUserAlerts}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">Payment Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified about payment activities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="paymentAlerts"
                    checked={notificationSettings.paymentAlerts}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">System Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified about system events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="systemAlerts"
                    checked={notificationSettings.systemAlerts}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>

          {/* Security Settings */}
          <form id="security" onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">Security Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onChange={handleSecurityChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="passwordExpiry"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    name="loginAttempts"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecurityChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  name="sessionTimeout"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecurityChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}