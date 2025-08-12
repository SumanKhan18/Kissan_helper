import React, { useState } from 'react';

const UserSetting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleNotificationChange = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-green-500 mb-6">Settings</h1>

      {/* Personal Info */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Personal Information</h2>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="@username"
            className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
          />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
          />
          <input
            type="tel"
            placeholder="+91 xxxxxxxxxx"
            className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
          />
        </div>
      </section>

      {/* Profile Picture */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Profile Picture</h2>
        <div className="flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
            Upload New Picture
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
            Remove Current Picture
          </button>
        </div>
      </section>

      {/* Account Security */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Account Security</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mb-4 transition">
          Change Password
        </button>
        <div>
          <label className="block mt-4 text-gray-300">
            Two-Factor Authentication:
            <select className="w-full mt-1 bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </label>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-4 transition">
          View Recent Logins
        </button>
      </section>

      {/* Preferences */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Preferences</h2>
        <label className="block mb-4">
          Language:
          <select className="w-full mt-1 bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </label>
        <label className="block mb-4">
          Timezone:
          <select className="w-full mt-1 bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg">
            <option>GMT-5:00</option>
            <option>GMT+1:00</option>
            <option>GMT+8:00</option>
          </select>
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="accent-green-600"
          />
          <span className="text-gray-300">Enable Dark Mode</span>
        </label>
      </section>

      {/* Notifications */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange("email")}
              className="accent-green-600"
            />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange("sms")}
              className="accent-green-600"
            />
            SMS Alerts
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange("push")}
              className="accent-green-600"
            />
            Push Notifications
          </label>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-gray-800 border border-red-500 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex gap-4">
          <button className="border border-orange-500 text-orange-400 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-black transition">
            Deactivate Account
          </button>
          <button className="border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
            Delete Account Permanently
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserSetting;
