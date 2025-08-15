import React, { useState, useEffect } from 'react';
import { Clock, BarChart3, Target, TrendingUp, TrendingDown, DollarSign, Activity, Shield, Zap, Eye, PieChart, AlertTriangle } from 'lucide-react';

const StatisticsComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 23,
    seconds: 47
  });

  const [mockStats, setMockStats] = useState([
    { 
      id: 1, 
      metric: 'Total Trades', 
      value: '1,247', 
      change: '+12.5%', 
      trend: 'up',
      period: 'This Month'
    },
    { 
      id: 2, 
      metric: 'Win Rate', 
      value: '68.3%', 
      change: '+3.2%', 
      trend: 'up',
      period: 'Last 30 Days'
    },
    { 
      id: 3, 
      metric: 'Avg Return', 
      value: '2.47%', 
      change: '-0.8%', 
      trend: 'down',
      period: 'Per Trade'
    },
    { 
      id: 4, 
      metric: 'Sharpe Ratio', 
      value: '1.82', 
      change: '+0.15', 
      trend: 'up',
      period: 'Current'
    }
  ]);

  const [portfolioMetrics, setPortfolioMetrics] = useState({
    totalPnL: 15627.45,
    totalTrades: 1247,
    winningTrades: 852,
    avgHoldTime: '2.3 days',
    maxDrawdown: '8.7%',
    riskScore: 7.2
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

  // Simulate stat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMockStats(prev => prev.map(stat => {
        const changeValue = (Math.random() - 0.5) * 0.1;
        const newValue = stat.metric === 'Win Rate' 
          ? (parseFloat(stat.value) + changeValue).toFixed(1) + '%'
          : stat.metric === 'Sharpe Ratio'
          ? (parseFloat(stat.value) + changeValue * 0.1).toFixed(2)
          : stat.value;
        
        return {
          ...stat,
          value: newValue
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Comprehensive trading performance with detailed breakdowns and trends"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Risk Assessment",
      description: "Advanced risk metrics including VaR, Sharpe ratio, and drawdown analysis"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Trade Insights",
      description: "Deep dive into trade patterns, timing, and profitability analysis"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Live statistics updates with mark-to-market performance tracking"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Visual Reports",
      description: "Interactive charts and graphs for better data visualization"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Portfolio Breakdown",
      description: "Asset allocation and diversification analysis with sector insights"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-500 rounded-full animate-pulse"></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Statistics
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Advanced trading statistics and performance analytics are coming soon to enhance your trading insights
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Total P&L</h3>
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              +${portfolioMetrics.totalPnL.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">All Time</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Total Trades</h3>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {portfolioMetrics.totalTrades.toLocaleString()}
            </div>
            <div className="text-blue-400 text-sm">Executed</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Win Rate</h3>
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {((portfolioMetrics.winningTrades / portfolioMetrics.totalTrades) * 100).toFixed(1)}%
            </div>
            <div className="text-green-400 text-sm">Success rate</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Risk Score</h3>
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {portfolioMetrics.riskScore}/10
            </div>
            <div className="text-yellow-400 text-sm">Current</div>
          </div>
        </div>

        {/* Mock Statistics Table */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Performance Metrics Preview</h3>
            <div className="flex items-center gap-2 text-orange-400">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Coming Soon</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Metric</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Value</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Change</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Period</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {mockStats.map((stat) => (
                  <tr key={stat.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {stat.metric.split(' ').map(word => word[0]).join('')}
                        </div>
                        <span className="font-medium">{stat.metric}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono text-lg">
                      {stat.value}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-sm">
                      {stat.period}
                    </td>
                    <td className="py-4 px-4">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Max Drawdown</h4>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {portfolioMetrics.maxDrawdown}
            </div>
            <div className="text-red-400 text-xs">Historical peak</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Avg Hold Time</h4>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {portfolioMetrics.avgHoldTime}
            </div>
            <div className="text-blue-400 text-xs">Per position</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Best Month</h4>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              +24.7%
            </div>
            <div className="text-green-400 text-xs">December 2024</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Volatility</h4>
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              12.3%
            </div>
            <div className="text-purple-400 text-xs">Annualized</div>
          </div>
        </div>

        {/* Countdown Timer */}
        {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="text-center mb-8">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Statistics Module Launch</h2>
            <p className="text-slate-400">Advanced analytics and performance insights coming soon</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-lg p-4 border border-slate-600">
                  <div className="text-3xl font-bold text-white mb-1">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-slate-400 capitalize">{unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Features Grid */}
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

        {/* Progress Bar */}
        {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Development Progress</h3>
            <p className="text-slate-400">Statistics module is 75% complete</p>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 relative"
              style={{ width: '75%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-blue-400">75%</span>
            <span className="text-slate-400 ml-2">Complete</span>
          </div>
        </div> */}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Looking forward to advanced trading analytics? 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              Stay tuned for updates
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsComingSoon;