import React, { useState, useEffect } from 'react';
import { Clock, Target, TrendingUp, TrendingDown, DollarSign, Activity, Shield, Zap, Eye, BarChart3, PieChart, AlertTriangle } from 'lucide-react';

const Positions = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 11,
    minutes: 47,
    seconds: 23
  });

  const [positions, setPositions] = useState([
    { 
      id: 1, 
      symbol: 'BTC/USDT', 
      type: 'Long', 
      size: 0.75, 
      entryPrice: 42800, 
      currentPrice: 43250, 
      pnl: 337.50, 
      pnlPercent: 0.79, 
      margin: 8560,
      leverage: '5x'
    },
    { 
      id: 2, 
      symbol: 'ETH/USDT', 
      type: 'Short', 
      size: 5.2, 
      entryPrice: 2720, 
      currentPrice: 2680, 
      pnl: 208.00, 
      pnlPercent: 1.47, 
      margin: 2816,
      leverage: '10x'
    },
    { 
      id: 3, 
      symbol: 'SOL/USDT', 
      type: 'Long', 
      size: 45, 
      entryPrice: 96.50, 
      currentPrice: 98.45, 
      pnl: 87.75, 
      pnlPercent: 2.02, 
      margin: 434.25,
      leverage: '20x'
    }
  ]);

  const [portfolioStats, setPortfolioStats] = useState({
    totalPnL: 0,
    totalMargin: 0,
    freeBalance: 8632.45,
    totalBalance: 10000,
    marginRatio: 0
  });

  const [riskMetrics, setRiskMetrics] = useState({
    var95: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    winRate: 0
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

  // Simulate position updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => prev.map(position => {
        const priceChange = (Math.random() - 0.5) * position.currentPrice * 0.002;
        const newPrice = position.currentPrice + priceChange;
        const priceDiff = newPrice - position.entryPrice;
        const newPnl = position.type === 'Long' 
          ? priceDiff * position.size 
          : -priceDiff * position.size;
        const newPnlPercent = (newPnl / position.margin) * 100;

        return {
          ...position,
          currentPrice: newPrice,
          pnl: newPnl,
          pnlPercent: newPnlPercent
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update portfolio stats
  useEffect(() => {
    const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
    const totalMargin = positions.reduce((sum, pos) => sum + pos.margin, 0);
    const marginRatio = (totalMargin / portfolioStats.totalBalance) * 100;

    setPortfolioStats(prev => ({
      ...prev,
      totalPnL,
      totalMargin,
      marginRatio,
      freeBalance: prev.totalBalance - totalMargin
    }));

    setRiskMetrics({
      var95: Math.abs(totalPnL * 0.1).toFixed(2),
      sharpeRatio: (1.2 + Math.random() * 0.5).toFixed(2),
      maxDrawdown: (Math.random() * 5 + 2).toFixed(2),
      winRate: (65 + Math.random() * 20).toFixed(1)
    });
  }, [positions]);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real-time P&L",
      description: "Live profit & loss tracking with mark-to-market valuation"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Management",
      description: "Advanced position sizing and risk metrics monitoring"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Position Analytics",
      description: "Comprehensive performance analysis and trade insights"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Auto Stop-Loss",
      description: "Intelligent stop-loss and take-profit automation"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Portfolio Overview",
      description: "Complete portfolio visualization and allocation tracking"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Metrics",
      description: "Detailed statistics including Sharpe ratio and drawdown"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-red-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-500 rounded-full animate-pulse"></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Positions
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Advanced position management with real-time P&L tracking and comprehensive risk analytics
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Total P&L</h3>
              <DollarSign className={`w-5 h-5 ${portfolioStats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            </div>
            <div className={`text-3xl font-bold mb-2 ${portfolioStats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioStats.totalPnL >= 0 ? '+' : ''}${portfolioStats.totalPnL.toFixed(2)}
            </div>
            <div className="text-slate-400 text-sm">Unrealized</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Used Margin</h3>
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${portfolioStats.totalMargin.toFixed(2)}
            </div>
            <div className="text-yellow-400 text-sm">{portfolioStats.marginRatio.toFixed(1)}% used</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Free Balance</h3>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${portfolioStats.freeBalance.toFixed(2)}
            </div>
            <div className="text-blue-400 text-sm">Available</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Win Rate</h3>
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {riskMetrics.winRate}%
            </div>
            <div className="text-green-400 text-sm">Success rate</div>
          </div>
        </div>

        {/* Open Positions Table */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Open Positions</h3>
            <div className="flex items-center gap-2 text-green-400">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Live Updates</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Symbol</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Type</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Size</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Entry Price</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Current Price</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">P&L</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Margin</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {position.symbol.split('/')[0].slice(0, 2)}
                        </div>
                        <span className="font-medium">{position.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          position.type === 'Long' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                        }`}>
                          {position.type}
                        </span>
                        <span className="text-slate-400 text-xs">{position.leverage}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{position.size}</td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      ${position.entryPrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      ${position.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className={`font-medium ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                        </span>
                        <span className={`text-xs ${position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      ${position.margin.toFixed(2)}
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
              <h4 className="text-slate-400 text-sm font-medium">VaR (95%)</h4>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              ${riskMetrics.var95}
            </div>
            <div className="text-red-400 text-xs">Daily risk</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Sharpe Ratio</h4>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {riskMetrics.sharpeRatio}
            </div>
            <div className="text-green-400 text-xs">Risk-adjusted</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Max Drawdown</h4>
              <TrendingDown className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {riskMetrics.maxDrawdown}%
            </div>
            <div className="text-yellow-400 text-xs">Peak to trough</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Portfolio Heat</h4>
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <div className="h-16 flex items-center justify-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-slate-600"></div>
                <div 
                  className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                    portfolioStats.marginRatio > 70 ? 'border-red-400' : 
                    portfolioStats.marginRatio > 50 ? 'border-yellow-400' : 'border-green-400'
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + (portfolioStats.marginRatio / 2)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="text-center mb-8">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Launching Soon</h2>
            <p className="text-slate-400">Advanced position management system is almost ready</p>
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
            <p className="text-slate-400">Position management system is 88% complete</p>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 relative"
              style={{ width: '88%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-blue-400">88%</span>
            <span className="text-slate-400 ml-2">Complete</span>
          </div>
        </div> */}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Ready for professional position management? 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              Get early access
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Positions;