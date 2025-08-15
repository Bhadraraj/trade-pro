import React, { useState, useEffect } from 'react';
import { 
  Settings, User, Shield, Bell, Monitor, Globe, 
  Eye, EyeOff, Save, RefreshCw, Smartphone, Mail,
  Lock, Key, CreditCard, Palette, Moon, Sun,
  Database, Download, Upload, AlertTriangle
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    firstName: ' ',
    lastName: '',
    email: '',
    phone: '+91 98765 43210',
    timezone: 'Asia/Kolkata',
    language: 'English',
    
    // Security Settings
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: '30',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    tradingAlerts: true,
    portfolioUpdates: true,
    
    // Display Settings
    theme: 'dark',
    currency: 'USD',
    chartType: 'candlestick',
    autoRefresh: true,
    refreshInterval: '5',
    
    // Trading Settings
    confirmTrades: true,
    defaultOrderType: 'market',
    riskWarnings: true,
    advancedMode: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({
    pulse1: 0,
    pulse2: 0,
    pulse3: 0
  });

  // Animated background elements
  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setAnimatedElements(prev => ({
          ...prev,
          pulse1: Math.random() * 100
        }));
      }, 3000),
      setInterval(() => {
        setAnimatedElements(prev => ({
          ...prev,
          pulse2: Math.random() * 100
        }));
      }, 4000),
      setInterval(() => {
        setAnimatedElements(prev => ({
          ...prev,
          pulse3: Math.random() * 100
        }));
      }, 5000)
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    // Simulate saving
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'display', label: 'Display', icon: <Monitor className="w-4 h-4" /> },
    { id: 'trading', label: 'Trading', icon: <RefreshCw className="w-4 h-4" /> }
  ];

  const renderToggle = (setting, color = 'blue') => (
    <div 
      className={`w-12 h-7 rounded-full cursor-pointer transition-colors ${
        settings[setting] ? `bg-${color}-500` : 'bg-slate-600'
      }`}
      onClick={() => toggleSetting(setting)}
    >
      <div className={`w-5 h-5 bg-white rounded-full mt-1 transition-transform ${
        settings[setting] ? 'translate-x-6' : 'translate-x-1'
      }`}></div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => updateSetting('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => updateSetting('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => updateSetting('email', e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => updateSetting('phone', e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => updateSetting('timezone', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <div>
          <h4 className="font-semibold text-red-300">Security Notice</h4>
          <p className="text-red-200 text-sm">Always keep your account secure with strong passwords and 2FA enabled.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
            </div>
          </div>
          {renderToggle('twoFactor', 'green')}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-yellow-400" />
            <div>
              <h4 className="font-medium">Login Alerts</h4>
              <p className="text-sm text-slate-400">Get notified of suspicious login attempts</p>
            </div>
          </div>
          {renderToggle('loginAlerts', 'yellow')}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Session Timeout (minutes)</label>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Change Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-slate-400">Receive updates via email</p>
            </div>
          </div>
          {renderToggle('emailNotifications')}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-green-400" />
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-slate-400">Get real-time alerts</p>
            </div>
          </div>
          {renderToggle('pushNotifications', 'green')}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-slate-400">Receive text messages for critical alerts</p>
            </div>
          </div>
          {renderToggle('smsNotifications', 'purple')}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
            <div>
              <h4 className="font-medium">Trading Alerts</h4>
              <p className="text-sm text-slate-400">Notifications for trade executions and orders</p>
            </div>
          </div>
          {renderToggle('tradingAlerts', 'cyan')}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-orange-400" />
            <div>
              <h4 className="font-medium">Portfolio Updates</h4>
              <p className="text-sm text-slate-400">Daily portfolio performance summaries</p>
            </div>
          </div>
          {renderToggle('portfolioUpdates', 'orange')}
        </div>
      </div>
    </div>
  );

  const renderDisplayTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-4">Theme</label>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              settings.theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/30'
            }`}
            onClick={() => updateSetting('theme', 'dark')}
          >
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Dark Mode</span>
            </div>
          </div>
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              settings.theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/30'
            }`}
            onClick={() => updateSetting('theme', 'light')}
          >
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Light Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Default Currency</label>
        <select
          value={settings.currency}
          onChange={(e) => updateSetting('currency', e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="JPY">JPY - Japanese Yen</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Chart Type</label>
        <select
          value={settings.chartType}
          onChange={(e) => updateSetting('chartType', e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="candlestick">Candlestick</option>
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="area">Area Chart</option>
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div>
          <h4 className="font-medium">Auto Refresh</h4>
          <p className="text-sm text-slate-400">Automatically refresh market data</p>
        </div>
        {renderToggle('autoRefresh')}
      </div>

      {settings.autoRefresh && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Refresh Interval</label>
          <select
            value={settings.refreshInterval}
            onChange={(e) => updateSetting('refreshInterval', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="1">1 second</option>
            <option value="5">5 seconds</option>
            <option value="10">10 seconds</option>
            <option value="30">30 seconds</option>
          </select>
        </div>
      )}
    </div>
  );

  const renderTradingTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div>
          <h4 className="font-medium">Confirm Trades</h4>
          <p className="text-sm text-slate-400">Require confirmation before executing trades</p>
        </div>
        {renderToggle('confirmTrades')}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Default Order Type</label>
        <select
          value={settings.defaultOrderType}
          onChange={(e) => updateSetting('defaultOrderType', e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="market">Market Order</option>
          <option value="limit">Limit Order</option>
          <option value="stop">Stop Order</option>
          <option value="stop-limit">Stop-Limit Order</option>
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div>
          <h4 className="font-medium">Risk Warnings</h4>
          <p className="text-sm text-slate-400">Show risk warnings for high-risk trades</p>
        </div>
        {renderToggle('riskWarnings', 'red')}
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div>
          <h4 className="font-medium">Advanced Trading Mode</h4>
          <p className="text-sm text-slate-400">Enable advanced trading features and tools</p>
        </div>
        {renderToggle('advancedMode', 'purple')}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'account': return renderAccountTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'display': return renderDisplayTab();
      case 'trading': return renderTradingTab();
      default: return renderAccountTab();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"
          style={{ transform: `scale(${1 + animatedElements.pulse1 / 500})` }}
        ></div>
        <div 
          className="absolute top-60 right-32 w-24 h-24 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/3 w-20 h-20 bg-purple-500 rounded-full animate-ping"
          style={{ animationDelay: '2s' }}
        ></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Customize your TradePro experience and manage your account preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      activeTab === tab.id 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold capitalize">{activeTab} Settings</h2>
                <button 
                  onClick={saveSettings}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all flex items-center gap-2 font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;