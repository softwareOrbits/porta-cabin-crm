import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Porta Cabin Industries Ltd.',
      companyEmail: 'info@portacabin.com',
      companyPhone: '+91-9876543210',
      address: '123 Industrial Area, Manufacturing Zone',
      taxId: 'GSTIN123456789',
      currency: 'INR'
    },
    users: [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@portacabin.com',
        role: 'Admin',
        status: 'active',
        permissions: ['all']
      },
      {
        id: 2,
        name: 'John Manager',
        email: 'john@portacabin.com',
        role: 'Manager',
        status: 'active',
        permissions: ['quotations', 'sales_orders', 'projects']
      },
      {
        id: 3,
        name: 'Sarah Customer Service',
        email: 'sarah@portacabin.com',
        role: 'Customer Service',
        status: 'active',
        permissions: ['quotations', 'customers']
      }
    ],
    notifications: {
      emailNotifications: true,
      lowStockAlerts: true,
      projectDeadlines: true,
      paymentReminders: true
    },
    integrations: {
      zedPortal: true,
      zohoBooks: false,
      emailService: 'gmail'
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'users', name: 'Users & Permissions', icon: '👥' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' }
  ];

  const roles = ['Admin', 'Manager', 'Customer Service', 'Accountant'];
  const permissions = [
    'all', 'quotations', 'sales_orders', 'projects', 'work_orders', 
    'invoices', 'inventory', 'payroll', 'contractors', 'assets', 'reports'
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={settings.general.companyName}
            onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Email
          </label>
          <input
            type="email"
            value={settings.general.companyEmail}
            onChange={(e) => handleSettingChange('general', 'companyEmail', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Phone
          </label>
          <input
            type="text"
            value={settings.general.companyPhone}
            onChange={(e) => handleSettingChange('general', 'companyPhone', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax ID / GSTIN
          </label>
          <input
            type="text"
            value={settings.general.taxId}
            onChange={(e) => handleSettingChange('general', 'taxId', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Address
        </label>
        <textarea
          value={settings.general.address}
          onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Currency
        </label>
        <select
          value={settings.general.currency}
          onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="INR">INR (₹)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
        </select>
      </div>

      <div className="pt-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save General Settings
        </button>
      </div>
    </div>
  );

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">User Management</h3>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="mr-2">➕</span>
          Add User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {settings.users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {user.permissions.includes('all') ? 'All Permissions' : `${user.permissions.length} permissions`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      <span className="text-lg">✏️</span>
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                      <span className="text-lg">🗑️</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
      
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {key === 'emailNotifications' && 'Receive email notifications for system events'}
                {key === 'lowStockAlerts' && 'Get notified when inventory items are running low'}
                {key === 'projectDeadlines' && 'Receive alerts for upcoming project deadlines'}
                {key === 'paymentReminders' && 'Get notified about pending payments'}
              </p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Notification Settings
        </button>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Third-party Integrations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">ZED Portal</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.integrations.zedPortal}
                onChange={(e) => handleSettingChange('integrations', 'zedPortal', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Integrate with ZED Portal for tax invoice QR code generation
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Zoho Books</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.integrations.zohoBooks}
                onChange={(e) => handleSettingChange('integrations', 'zohoBooks', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sync data with Zoho Books for accounting
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Service Provider
        </label>
        <select
          value={settings.integrations.emailService}
          onChange={(e) => handleSettingChange('integrations', 'emailService', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="gmail">Gmail</option>
          <option value="outlook">Outlook</option>
          <option value="smtp">Custom SMTP</option>
        </select>
      </div>

      <div className="pt-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Integration Settings
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'users':
        return renderUsersSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your application settings and configurations
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Sidebar */}
        <div className="lg:w-64 mb-6 lg:mb-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}