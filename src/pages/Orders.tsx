import React, { useState, useEffect } from 'react';
import { Clock, ShoppingCart, TrendingUp, BarChart2, Target, Zap, CheckCircle, AlertCircle, DollarSign, Activity } from 'lucide-react';

const Orders = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 6,
    minutes: 23,
    seconds: 45
  });

  const [mockOrders, setMockOrders] = useState([
    { id: 1, symbol: 'BTC', type: 'Buy', amount: 0.5, price: 43250, status: 'pending', profit: 2.45 },
    { id: 2, symbol: 'ETH', type: 'Sell', amount: 2.1, price: 2680, status: 'filled', profit: -1.2 },
    { id: 3, symbol: 'ADA', type: 'Buy', amount: 1000, price: 0.52, status: 'partial', profit: 5.8 }
  ]);

  const [animatedValues, setAnimatedValues] = useState({
    totalOrders: 0,
    activeOrders: 0,
    profit: 0
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues({
        totalOrders: Math.floor(Math.random() * 50) + 150,
        activeOrders: Math.floor(Math.random() * 15) + 8,
        profit: (Math.random() * 10 - 2).toFixed(2)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMockOrders(prev => prev.map(order => ({
        ...order,
        profit: (Math.random() * 10 - 2).toFixed(2),
        price: order.price + (Math.random() * 100 - 50)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Order Management",
      description: "Advanced order types including stop-loss, take-profit, and trailing stops"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Execution",
      description: "Ultra-low latency order execution with real-time market data"
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Order Analytics",
      description: "Comprehensive order history analysis and performance tracking"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Live order status updates and instant fill notifications"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Cost Optimization",
      description: "Smart routing to minimize fees and maximize execution quality"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Order Validation",
      description: "Pre-trade risk checks and automatic order validation"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'filled': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'partial': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'filled': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'partial': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500 rounded-full animate-pulse"></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Orders Page
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Advanced order management system with real-time execution and comprehensive tracking
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Total Orders</h3>
              <BarChart2 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {animatedValues.totalOrders}
            </div>
            <div className="text-green-400 text-sm">+12% this week</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Active Orders</h3>
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {animatedValues.activeOrders}
            </div>
            <div className="text-blue-400 text-sm">Real-time</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Profit/Loss</h3>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {animatedValues.profit > 0 ? '+' : ''}{animatedValues.profit}%
            </div>
            <div className={`text-sm ${animatedValues.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
              Today's performance
            </div>
          </div>
        </div>

        {/* Mock Orders Table */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <h3 className="text-2xl font-semibold mb-8 text-center">Order Management Preview</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Symbol</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Type</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Amount</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Price</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">P&L</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {order.symbol.slice(0, 2)}
                        </div>
                        <span className="font-medium">{order.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.type === 'Buy' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{order.amount}</td>
                    <td className="py-4 px-4 text-slate-300">${order.price.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${parseFloat(order.profit) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {parseFloat(order.profit) > 0 ? '+' : ''}{order.profit}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-400/30 transition-all duration-300">
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
 
        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Ready to revolutionize your trading experience? 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              Get notified when we launch
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;