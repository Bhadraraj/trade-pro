
import React, { useState, useEffect } from 'react';
import { Clock, BarChart3, TrendingUp, TrendingDown, Activity, Globe, Zap, Eye, Database, Signal, LineChart, PieChart } from 'lucide-react';

const MarketData = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 32,
    seconds: 18
  });

  const [marketData, setMarketData] = useState([
    { symbol: 'BTC', price: 43250.50, change: 2.45, volume: '28.5B', marketCap: '847B' },
    { symbol: 'ETH', price: 2680.25, change: -1.2, volume: '15.2B', marketCap: '322B' },
    { symbol: 'BNB', price: 315.80, change: 3.8, volume: '2.1B', marketCap: '48.7B' },
    { symbol: 'ADA', price: 0.52, change: 5.2, volume: '890M', marketCap: '18.4B' },
    { symbol: 'SOL', price: 98.45, change: -2.1, volume: '1.8B', marketCap: '42.1B' }
  ]);

  const [chartData, setChartData] = useState({
    candlesticks: Array.from({ length: 20 }, (_, i) => ({
      x: i,
      open: 42000 + Math.random() * 2000,
      high: 43000 + Math.random() * 2000,
      low: 41000 + Math.random() * 2000,
      close: 42500 + Math.random() * 2000
    })),
    volume: Array.from({ length: 10 }, () => Math.random() * 100),
    sentiment: Math.random() * 100
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

  // Simulate real-time market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price + (Math.random() - 0.5) * coin.price * 0.002,
        change: (Math.random() - 0.5) * 10
      })));

      setChartData(prev => ({
        ...prev,
        volume: prev.volume.map(() => Math.random() * 100),
        sentiment: Math.random() * 100
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Charting",
      description: "Professional-grade candlestick charts with 50+ technical indicators"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Markets",
      description: "Real-time data from 100+ exchanges and 10,000+ trading pairs"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Speed",
      description: "Sub-millisecond data feeds with guaranteed uptime"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Market Depth",
      description: "Level 2 order book data and real-time trade execution"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Market Insights",
      description: "AI-powered market analysis and sentiment tracking"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Historical Data",
      description: "5+ years of historical price and volume data"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-yellow-500 rounded-full animate-pulse"></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Market Data
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-time market data, advanced charting, and comprehensive market analysis tools
          </p>
        </div>

        {/* Live Market Data Preview */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Live Market Data Preview</h3>
            <div className="flex items-center gap-2 text-green-400">
              <Signal className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Live</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Asset</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Price</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">24h Change</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Volume</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Market Cap</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Chart</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((coin) => (
                  <tr key={coin.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {coin.symbol.slice(0, 2)}
                        </div>
                        <span className="font-medium">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono">
                      ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-4">
                      <div className={`flex items-center gap-1 ${coin.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {coin.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-medium">
                          {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{coin.volume}</td>
                    <td className="py-4 px-4 text-slate-300">${coin.marketCap}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-end gap-1 h-8 w-16">
                        {Array.from({ length: 8 }, (_, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm flex-1 opacity-70 animate-pulse"
                            style={{
                              height: `${Math.random() * 100}%`,
                              animationDelay: `${i * 100}ms`
                            }}
                          ></div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Previews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Candlestick Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium mb-4 text-blue-400 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Candlestick Chart
            </h4>
            <div className="h-32 flex items-end justify-between gap-1">
              {chartData.candlesticks.slice(0, 15).map((candle, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full ${candle.close > candle.open ? 'bg-green-500' : 'bg-red-500'} rounded-sm transition-all duration-500`}
                    style={{
                      height: `${Math.abs((candle.close - candle.open) / candle.open) * 1000 + 10}px`,
                      minHeight: '4px'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium mb-4 text-green-400 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Volume Analysis
            </h4>
            <div className="h-32 flex items-end justify-between gap-1">
              {chartData.volume.map((vol, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-green-500/50 to-green-400/20 rounded-t flex-1 transition-all duration-1000"
                  style={{ height: `${vol}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium mb-4 text-purple-400 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Market Sentiment
            </h4>
            <div className="h-32 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-slate-600"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-purple-400 transition-all duration-1000"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + (chartData.sentiment / 2)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">{Math.round(chartData.sentiment)}%</div>
                    <div className="text-xs text-slate-400">Bullish</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        

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
            <p className="text-slate-400">Market data infrastructure is 95% complete</p>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 relative"
              style={{ width: '95%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-blue-400">95%</span>
            <span className="text-slate-400 ml-2">Complete</span>
          </div>
        </div> */}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Ready for professional-grade market analysis? 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              Join the waitlist
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketData;