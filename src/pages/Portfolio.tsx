import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, BarChart3, PieChart, Settings, Bell, BookOpen, Shield } from 'lucide-react';

const ComingSoonPage = ({ title = "Portfolio Page", description = "Advanced portfolio management and analytics" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  });

  const [animatedElements, setAnimatedElements] = useState({
    chart1: 0,
    chart2: 0,
    chart3: 0
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

  // Animated charts
  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setAnimatedElements(prev => ({
          ...prev,
          chart1: Math.random() * 100
        }));
      }, 2000),
      setInterval(() => {
        setAnimatedElements(prev => ({
          ...prev,
          chart2: Math.random() * 100
        }));
      }, 2500),
      setInterval(() => {
        setAnimatedElements(prev => ({
          ...prev,
          chart3: Math.random() * 100
        }));
      }, 3000)
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Real-time portfolio performance tracking with detailed insights"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Asset Allocation",
      description: "Intelligent portfolio diversification and risk management"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Metrics",
      description: "Comprehensive returns analysis and benchmark comparisons"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Assessment",
      description: "Advanced risk metrics and position sizing recommendations"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Alerts",
      description: "Customizable notifications for portfolio events and thresholds"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Detailed Reports",
      description: "Professional-grade reports and trade history analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-purple-500 rounded-full animate-ping"></div>
      </div> */}

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Countdown Timer */}
      

        {/* Mock Dashboard Preview */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Mock Chart 1 */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
              <h4 className="text-lg font-medium mb-4 text-blue-400">Portfolio Value</h4>
              <div className="h-32 relative overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 bg-gradient-to-t from-blue-500/50 to-blue-400/20 rounded-t transition-all duration-1000"
                  style={{ 
                    width: '100%', 
                    height: `${Math.max(20, animatedElements.chart1)}%`,
                    transform: 'translateY(0)'
                  }}
                ></div>
                <div className="absolute top-2 left-2 text-2xl font-bold text-green-400">
                  +12.5%
                </div>
              </div>
            </div>

            {/* Mock Chart 2 */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
              <h4 className="text-lg font-medium mb-4 text-green-400">Performance</h4>
              <div className="h-32 flex items-end justify-between gap-2">
                {[60, 80, 45, 90, 70, 85, 95].map((height, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-green-500/50 to-green-400/20 rounded-t flex-1 transition-all duration-500"
                    style={{ 
                      height: `${Math.max(10, (height + animatedElements.chart2) / 2)}%`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Mock Chart 3 */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
              <h4 className="text-lg font-medium mb-4 text-purple-400">Risk Analysis</h4>
              <div className="h-32 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-600"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-purple-400 transition-all duration-1000"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + (animatedElements.chart3 / 2)}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                    {Math.round(animatedElements.chart3)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
 

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Want to be notified when we launch? 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              Sign up for updates
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;