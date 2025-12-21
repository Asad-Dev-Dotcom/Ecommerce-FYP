import React, { useState } from 'react';

const Settings = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'E-commerce Admin',
    siteDescription: 'Admin dashboard for managing your online store',
    contactEmail: 'admin@example.com',
    currency: 'USD',
    timezone: 'UTC',
    maintenanceMode: false
  });

  const [profileSettings, setProfileSettings] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://via.placeholder.com/100x100/4A90E2/FFFFFF?text=A',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSiteSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSiteSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileSettingsChange = (e) => {
    const { name, value } = e.target;
    setProfileSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSiteSettings = (e) => {
    e.preventDefault();
    alert('Site settings saved successfully!');
  };

  const handleSaveProfileSettings = (e) => {
    e.preventDefault();
    if (profileSettings.newPassword !== profileSettings.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Profile settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 m-0">Settings</h1>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Site Settings</h2>
          <form onSubmit={handleSaveSiteSettings} className="space-y-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={siteSettings.siteName}
                onChange={handleSiteSettingsChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={siteSettings.siteDescription}
                onChange={handleSiteSettingsChange}
                rows="3"
                className="input-field resize-vertical"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={siteSettings.contactEmail}
                  onChange={handleSiteSettingsChange}
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={siteSettings.currency}
                  onChange={handleSiteSettingsChange}
                  className="input-field"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={siteSettings.timezone}
                onChange={handleSiteSettingsChange}
                className="input-field"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={siteSettings.maintenanceMode}
                onChange={handleSiteSettingsChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="maintenanceMode" className="ml-2 text-sm font-medium text-gray-700">
                Maintenance Mode
              </label>
            </div>

            <button type="submit" className="btn-primary">
              Save Site Settings
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
          <form onSubmit={handleSaveProfileSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="profileName"
                  name="name"
                  value={profileSettings.name}
                  onChange={handleProfileSettingsChange}
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="profileEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="profileEmail"
                  name="email"
                  value={profileSettings.email}
                  onChange={handleProfileSettingsChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={profileSettings.avatar}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <button type="button" className="btn-secondary">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={profileSettings.currentPassword}
                  onChange={handleProfileSettingsChange}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={profileSettings.newPassword}
                    onChange={handleProfileSettingsChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={profileSettings.confirmPassword}
                    onChange={handleProfileSettingsChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Save Profile Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
