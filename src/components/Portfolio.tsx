import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Shield, Award } from 'lucide-react';

interface PortfolioData {
  totalBalance: number;
  availableBalance: number;
  lockedBalance: number;
  totalPnL: number;
  dailyPnL: number;
  positions: any[];
  assets: any[];
  statistics: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    averageWin: number;
    averageLoss: number;
    profitFactor: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
  riskManagement: {
    maxPositionSize: number;
    maxDailyLoss: number;
    maxLeverage: number;
    stopLossPercentage: number;
    takeProfitPercentage: number;
  };
}

// Static dummy data
const DUMMY_PORTFOLIO_DATA: PortfolioData = {
  totalBalance: 15750.50,
  availableBalance: 12250.50,
  lockedBalance: 3500.00,
  totalPnL: 1250.75,
  dailyPnL: 325.40,
  positions: [
    {
      pair: 'BTC/USDT',
      side: 'long',
      size: 0.5,
      entryPrice: 65000,
      currentPrice: 66500,
      unrealizedPnL: 750.00,
      leverage: 3
    },
    {
      pair: 'ETH/USDT',
      side: 'short',
      size: 5.0,
      entryPrice: 3200,
      currentPrice: 3150,
      unrealizedPnL: 250.00,
      leverage: 2
    },
    {
      pair: 'ADA/USDT',
      side: 'long',
      size: 1000,
      entryPrice: 0.45,
      currentPrice: 0.42,
      unrealizedPnL: -30.00,
      leverage: 5
    }
  ],
  assets: [
    { 
      symbol: 'USDT', 
      balance: 12250.50, 
      locked: 3500.00, 
      currentValue: 15750.50, 
      pnl: 1250.75, 
      pnlPercentage: 8.6 
    },
    { 
      symbol: 'BTC', 
      balance: 0.025, 
      locked: 0, 
      currentValue: 1662.50, 
      pnl: 162.50, 
      pnlPercentage: 10.8 
    },
    { 
      symbol: 'ETH', 
      balance: 0.5, 
      locked: 0, 
      currentValue: 1575.00, 
      pnl: -25.00, 
      pnlPercentage: -1.6 
    }
  ],
  statistics: {
    totalTrades: 47,
    winningTrades: 28,
    losingTrades: 19,
    winRate: 59.6,
    averageWin: 185.30,
    averageLoss: 95.75,
    profitFactor: 1.94,
    sharpeRatio: 1.65,
    maxDrawdown: 7.2,
  },
  riskManagement: {
    maxPositionSize: 2000,
    maxDailyLoss: 500,
    maxLeverage: 10,
    stopLossPercentage: 2,
    takeProfitPercentage: 4,
  },
};

const Portfolio: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'statistics' | 'risk'>('overview');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setPortfolioData(DUMMY_PORTFOLIO_DATA);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Function to simulate real-time updates (optional)
  const simulateRealTimeUpdates = () => {
    if (!portfolioData) return;
    
    // Simulate price changes
    const updatedPositions = portfolioData.positions.map(position => ({
      ...position,
      currentPrice: position.currentPrice + (Math.random() - 0.5) * 100,
      unrealizedPnL: position.unrealizedPnL + (Math.random() - 0.5) * 50
    }));

    // Update daily P&L
    const newDailyPnL = portfolioData.dailyPnL + (Math.random() - 0.5) * 20;
    const newTotalBalance = portfolioData.totalBalance + (Math.random() - 0.5) * 100;

    setPortfolioData({
      ...portfolioData,
      positions: updatedPositions,
      dailyPnL: newDailyPnL,
      totalBalance: newTotalBalance,
      availableBalance: newTotalBalance * 0.78, // 78% available
      lockedBalance: newTotalBalance * 0.22 // 22% locked
    });
  };

  // Uncomment to enable real-time simulation
  // useEffect(() => {
  //   const interval = setInterval(simulateRealTimeUpdates, 5000);
  //   return () => clearInterval(interval);
  // }, [portfolioData]);

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="text-center text-gray-400">
          <p>Unable to load portfolio data</p>
        </div>
      </div>
    );
  }

  const balanceData = [
    { name: 'Available', value: portfolioData.availableBalance, color: '#10B981' },
    { name: 'Locked', value: portfolioData.lockedBalance, color: '#F59E0B' },
  ];

  const performanceData = [
    { name: 'Wins', value: portfolioData.statistics.winningTrades, color: '#10B981' },
    { name: 'Losses', value: portfolioData.statistics.losingTrades, color: '#EF4444' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DollarSign },
    { id: 'positions', label: 'Positions', icon: Target },
    { id: 'statistics', label: 'Statistics', icon: Award },
    { id: 'risk', label: 'Risk Management', icon: Shield },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Portfolio Management</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live Demo Data</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-700 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Balance</p>
                  <p className="text-2xl font-bold text-white font-mono">
                    ${portfolioData.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total P&L</p>
                  <p className={`text-2xl font-bold font-mono ${
                    portfolioData.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {portfolioData.totalPnL >= 0 ? '+' : ''}${portfolioData.totalPnL.toFixed(2)}
                  </p>
                </div>
                {portfolioData.totalPnL >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-500" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-500" />
                )}
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Daily P&L</p>
                  <p className={`text-2xl font-bold font-mono ${
                    portfolioData.dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {portfolioData.dailyPnL >= 0 ? '+' : ''}${portfolioData.dailyPnL.toFixed(2)}
                  </p>
                </div>
                {portfolioData.dailyPnL >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-500" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance Distribution */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-4">Balance Distribution</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={balanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {balanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                {balanceData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-4">Win/Loss Ratio</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="value" fill="#8884d8">
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'positions' && (
        <div className="space-y-4">
          {portfolioData.positions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No open positions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolioData.positions.map((position, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{position.pair}</h4>
                      <p className="text-sm text-gray-400">{position.side.toUpperCase()} • {position.leverage}x Leverage</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-mono">{position.size} {position.pair.split('/')[0]}</p>
                      <p className={`text-sm font-mono ${
                        position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {position.unrealizedPnL >= 0 ? '+' : ''}${position.unrealizedPnL.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Entry Price: </span>
                      <span className="text-white font-mono">${position.entryPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Current Price: </span>
                      <span className="text-white font-mono">${position.currentPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3">Trading Performance</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Trades:</span>
                <span className="text-white font-mono">{portfolioData.statistics.totalTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate:</span>
                <span className="text-green-400 font-mono">{portfolioData.statistics.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Win:</span>
                <span className="text-green-400 font-mono">${portfolioData.statistics.averageWin.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Loss:</span>
                <span className="text-red-400 font-mono">${portfolioData.statistics.averageLoss.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3">Risk Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Profit Factor:</span>
                <span className="text-white font-mono">{portfolioData.statistics.profitFactor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sharpe Ratio:</span>
                <span className="text-white font-mono">{portfolioData.statistics.sharpeRatio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Drawdown:</span>
                <span className="text-red-400 font-mono">{portfolioData.statistics.maxDrawdown.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3">Risk Management Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Position Size:</span>
                  <span className="text-white font-mono">${portfolioData.riskManagement.maxPositionSize.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Daily Loss:</span>
                  <span className="text-red-400 font-mono">${portfolioData.riskManagement.maxDailyLoss.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Leverage:</span>
                  <span className="text-white font-mono">{portfolioData.riskManagement.maxLeverage}x</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Stop Loss %:</span>
                  <span className="text-red-400 font-mono">{portfolioData.riskManagement.stopLossPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Take Profit %:</span>
                  <span className="text-green-400 font-mono">{portfolioData.riskManagement.takeProfitPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;