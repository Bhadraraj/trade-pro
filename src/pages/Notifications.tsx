import React, { useState, useEffect } from 'react';
import { 
  Bell, TrendingUp, BarChart3, Shield, Mail, Smartphone, 
  CheckCircle, AlertTriangle, Info, X, Clock
} from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'trade',
      title: 'Trade Executed',
      message: 'Your BTC buy order has been filled at $43,250.59',
      time: '2 minutes ago',
      read: false,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'alert',
      title: 'Price Alert',
      message: 'Bitcoin has reached your target price of $43,000',
      time: '15 minutes ago',
      read: false,
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'portfolio',
      title: 'Portfolio Update',
      message: 'Your portfolio is up 2.45% today (+$1,225.30)',
      time: '1 hour ago',
      read: true,
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 4,
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from Chrome on Windows',
      time: '3 hours ago',
      read: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 5,
      type: 'trade',
      title: 'Order Cancelled',
      message: 'Your ETH sell order at $2,800 has been cancelled',
      time: '5 hours ago',
      read: true,
      icon: <X className="w-5 h-5" />
    },
    {
      id: 6,
      type: 'alert',
      title: 'Market Alert',
      message: 'High volatility detected in crypto markets',
      time: '6 hours ago',
      read: true,
      icon: <AlertTriangle className="w-5 h-5" />
    }
  ]);

  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
    trades: true,
    alerts: true,
    portfolio: true,
    security: true
  });

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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getNotificationTypeColor = (type) => {
    switch(type) {
      case 'trade': return 'text-green-400';
      case 'alert': return 'text-blue-400';
      case 'portfolio': return 'text-purple-400';
      case 'security': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getNotificationBgColor = (type) => {
    switch(type) {
      case 'trade': return 'bg-green-500/10';
      case 'alert': return 'bg-blue-500/10';
      case 'portfolio': return 'bg-purple-500/10';
      case 'security': return 'bg-red-500/10';
      default: return 'bg-slate-500/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center relative">
              <Bell className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  {unreadCount}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Notifications
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stay updated with your trading activity and important alerts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{notifications.length}</div>
                <div className="text-slate-400 text-sm">Total Notifications</div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{unreadCount}</div>
                <div className="text-slate-400 text-sm">Unread Messages</div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{notifications.length - unreadCount}</div>
                <div className="text-slate-400 text-sm">Read Messages</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Manage Notifications</h3>
            <div className="flex gap-3">
              <button 
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                disabled={unreadCount === 0}
              >
                <CheckCircle className="w-4 h-4" />
                Mark All Read
              </button>
              <button 
                onClick={clearAllNotifications}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
          <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { key: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email', color: 'blue' },
              { key: 'push', icon: <Bell className="w-4 h-4" />, label: 'Push', color: 'green' },
              { key: 'sms', icon: <Smartphone className="w-4 h-4" />, label: 'SMS', color: 'purple' },
              { key: 'trades', icon: <TrendingUp className="w-4 h-4" />, label: 'Trades', color: 'cyan' }
            ].map(item => (
              <div key={item.key} className="flex flex-col items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
                <div className={`text-${item.color}-400`}>{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
                <div 
                  className={`w-12 h-7 rounded-full cursor-pointer transition-colors ${
                    settings[item.key] ? `bg-${item.color}-500` : 'bg-slate-600'
                  }`}
                  onClick={() => toggleSetting(item.key)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full mt-1 transition-transform ${
                    settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold mb-6">Recent Notifications</h3>
          
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No notifications</h3>
              <p className="text-slate-500">You're all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`relative p-4 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer group ${
                    notification.read 
                      ? 'bg-slate-700/20 border-slate-700/50' 
                      : 'bg-slate-700/40 border-blue-500/30 shadow-lg shadow-blue-500/10'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getNotificationTypeColor(notification.type)} ${getNotificationBgColor(notification.type)}`}>
                      {notification.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all p-1 rounded hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-slate-300 text-sm mb-3 leading-relaxed">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                        {!notification.read && (
                          <span className="text-blue-400 text-xs font-medium px-2 py-1 bg-blue-500/10 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-l-lg"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Configure notification settings in your 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              account preferences
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;