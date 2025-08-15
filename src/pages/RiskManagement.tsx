import React, { useState, useEffect } from 'react';
import { Clock, Shield, Target, TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, Zap, Eye, PieChart, Settings } from 'lucide-react';

const RiskManagement = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 9,
    minutes: 18,
    seconds: 42
  });

  const [riskPositions, setRiskPositions] = useState([
    { 
      id: 1, 
      symbol: 'BTC/USDT', 
      riskLevel: 'Medium', 
      exposure: 25.4, 
      stopLoss: 41200, 
      riskAmount: 856.50, 
      riskPercent: 2.1, 
      maxLeverage: '5x',
      currentLeverage: '3x'
    },
    { 
      id: 2, 
      symbol: 'ETH/USDT', 
      riskLevel: 'High', 
      exposure: 18.7, 
      stopLoss: 2580, 
      riskAmount: 1240.80, 
      riskPercent: 3.8, 
      maxLeverage: '10x',
      currentLeverage: '8x'
    },
    { 
      id: 3, 
      symbol: 'SOL/USDT', 
      riskLevel: 'Low', 
      exposure: 12.3, 
      stopLoss: 94.20, 
      riskAmount: 425.75, 
      riskPercent: 1.2, 
      maxLeverage: '20x',
      currentLeverage: '5x'
    }
  ]);

  const [portfolioRisk, setPortfolioRisk] = useState({
    totalRisk: 0,
    riskBudget: 5000,
    portfolioVar: 0,
    riskUtilization: 0
  });

  const [riskMetrics, setRiskMetrics] = useState({
    var95: 0,
    expectedShortfall: 0,
    betaRisk: 0,
    correlationRisk: 0
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

  // Simulate risk updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskPositions(prev => prev.map(position => {
        const riskChange = (Math.random() - 0.5) * 0.5;
        const newRiskAmount = Math.max(0, position.riskAmount + riskChange * 100);
        const newRiskPercent = (newRiskAmount / 10000) * 100;

        return {
          ...position,
          riskAmount: newRiskAmount,
          riskPercent: newRiskPercent
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update portfolio risk
  useEffect(() => {
    const totalRisk = riskPositions.reduce((sum, pos) => sum + pos.riskAmount, 0);
    const riskUtilization = (totalRisk / portfolioRisk.riskBudget) * 100;

    setPortfolioRisk(prev => ({
      ...prev,
      totalRisk,
      riskUtilization,
      portfolioVar: totalRisk * 1.2
    }));

    setRiskMetrics({
      var95: (totalRisk * 0.15).toFixed(2),
      expectedShortfall: (totalRisk * 0.18).toFixed(2),
      betaRisk: (0.85 + Math.random() * 0.3).toFixed(2),
      correlationRisk: (Math.random() * 0.4 + 0.1).toFixed(2)
    });
  }, [riskPositions]);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Position Sizing",
      description: "Automated position sizing based on risk tolerance and portfolio heat"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Risk Alerts",
      description: "Real-time notifications when risk limits are approaching or exceeded"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Stop Loss Management",
      description: "Dynamic stop-loss adjustments and trailing stop automation"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Auto Risk Controls",
      description: "Automatic position reduction when portfolio risk exceeds thresholds"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Risk Monitoring",
      description: "Comprehensive risk dashboard with real-time portfolio heat mapping"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Correlation Analysis",
      description: "Asset correlation tracking to identify and manage concentration risk"
    }
  ];

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'text-red-400 bg-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Low': return 'text-green-400 bg-green-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-500 rounded-full animate-pulse"></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-400 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
              Risk Management
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Advanced risk controls and portfolio protection tools to safeguard your trading capital
          </p>
        </div>

        {/* Portfolio Risk Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Total Risk</h3>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-400 mb-2">
              ${portfolioRisk.totalRisk.toFixed(2)}
            </div>
            <div className="text-slate-400 text-sm">At Risk</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Risk Budget</h3>
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${portfolioRisk.riskBudget.toFixed(2)}
            </div>
            <div className="text-blue-400 text-sm">Available</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Risk Usage</h3>
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {portfolioRisk.riskUtilization.toFixed(1)}%
            </div>
            <div className="text-yellow-400 text-sm">Utilized</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Portfolio VaR</h3>
              <TrendingDown className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${portfolioRisk.portfolioVar.toFixed(2)}
            </div>
            <div className="text-purple-400 text-sm">95% Confidence</div>
          </div>
        </div>

        {/* Risk Positions Table */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Position Risk Analysis</h3>
            <div className="flex items-center gap-2 text-orange-400">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Coming Soon</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Symbol</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Risk Level</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Exposure %</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Stop Loss</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Risk Amount</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Leverage</th>
                </tr>
              </thead>
              <tbody>
                {riskPositions.map((position) => (
                  <tr key={position.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {position.symbol.split('/')[0].slice(0, 2)}
                        </div>
                        <span className="font-medium">{position.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(position.riskLevel)}`}>
                        {position.riskLevel}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      {position.exposure.toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      ${position.stopLoss.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-red-400">
                          ${position.riskAmount.toFixed(2)}
                        </span>
                        <span className="text-xs text-red-400">
                          {position.riskPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-slate-300 text-sm">
                          {position.currentLeverage}
                        </span>
                        <span className="text-xs text-slate-500">
                          Max: {position.maxLeverage}
                        </span>
                      </div>
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
              <h4 className="text-slate-400 text-sm font-medium">Expected Shortfall</h4>
              <TrendingDown className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              ${riskMetrics.expectedShortfall}
            </div>
            <div className="text-orange-400 text-xs">Tail risk</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Beta Risk</h4>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {riskMetrics.betaRisk}
            </div>
            <div className="text-blue-400 text-xs">Market correlation</div>
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
                    portfolioRisk.riskUtilization > 80 ? 'border-red-400' : 
                    portfolioRisk.riskUtilization > 60 ? 'border-yellow-400' : 'border-green-400'
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + (portfolioRisk.riskUtilization / 2)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="text-center mb-8">
            <Clock className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Launching Soon</h2>
            <p className="text-slate-400">Advanced risk management tools are almost ready</p>
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
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-orange-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-red-500/30 group-hover:to-orange-400/30 transition-all duration-300">
                <div className="text-red-400 group-hover:text-red-300 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-red-300 transition-colors duration-300">
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
            <p className="text-slate-400">Risk management system is 82% complete</p>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-1000 relative"
              style={{ width: '82%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-red-400">82%</span>
            <span className="text-slate-400 ml-2">Complete</span>
          </div>
        </div> */}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Ready for professional risk management? 
            <span className="text-red-400 ml-1 cursor-pointer hover:text-red-300 transition-colors">
              Get early access
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskManagement;