
import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, Search, Book, MessageCircle, Mail, Phone,
  ChevronDown, ChevronRight, ExternalLink, Download,
  Play, FileText, Video, User, TrendingUp, Shield,
  Bell, Monitor, Settings, CreditCard, AlertTriangle,
  CheckCircle, Clock, Star, ThumbsUp, Users
} from 'lucide-react';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
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

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: <Play className="w-4 h-4" /> },
    { id: 'trading', label: 'Trading', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'account', label: 'Account & Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'platform', label: 'Platform Features', icon: <Monitor className="w-4 h-4" /> },
    { id: 'payments', label: 'Payments & Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const helpContent = {
    'getting-started': {
      title: 'Getting Started with TradePro',
      articles: [
        {
          title: 'Welcome to TradePro',
          type: 'video',
          duration: '5 min',
          description: 'A comprehensive introduction to the TradePro platform and its features.',
          tags: ['beginner', 'overview']
        },
        {
          title: 'Creating Your First Account',
          type: 'article',
          readTime: '3 min',
          description: 'Step-by-step guide to setting up your TradePro account.',
          tags: ['setup', 'account']
        },
        {
          title: 'Navigating the Dashboard',
          type: 'guide',
          readTime: '7 min',
          description: 'Learn how to use the main dashboard and find all essential features.',
          tags: ['dashboard', 'navigation']
        },
        {
          title: 'Making Your First Trade',
          type: 'tutorial',
          readTime: '10 min',
          description: 'Complete walkthrough of placing your first trade on the platform.',
          tags: ['trading', 'beginner']
        }
      ]
    },
    'trading': {
      title: 'Trading Guide',
      articles: [
        {
          title: 'Understanding Order Types',
          type: 'article',
          readTime: '8 min',
          description: 'Learn about market orders, limit orders, stop orders, and more.',
          tags: ['orders', 'trading']
        },
        {
          title: 'Risk Management Strategies',
          type: 'guide',
          readTime: '12 min',
          description: 'Essential risk management techniques for successful trading.',
          tags: ['risk', 'strategy']
        },
        {
          title: 'Technical Analysis Tools',
          type: 'tutorial',
          readTime: '15 min',
          description: 'How to use charts, indicators, and analysis tools effectively.',
          tags: ['analysis', 'charts']
        },
        {
          title: 'Portfolio Management',
          type: 'article',
          readTime: '6 min',
          description: 'Best practices for managing and diversifying your portfolio.',
          tags: ['portfolio', 'management']
        }
      ]
    },
    'account': {
      title: 'Account & Security',
      articles: [
        {
          title: 'Account Verification Process',
          type: 'guide',
          readTime: '5 min',
          description: 'Complete guide to verifying your account and increasing limits.',
          tags: ['verification', 'limits']
        },
        {
          title: 'Two-Factor Authentication Setup',
          type: 'tutorial',
          readTime: '4 min',
          description: 'Secure your account with 2FA for enhanced protection.',
          tags: ['security', '2fa']
        },
        {
          title: 'Password Security Best Practices',
          type: 'article',
          readTime: '3 min',
          description: 'Tips for creating and maintaining secure passwords.',
          tags: ['security', 'password']
        },
        {
          title: 'Account Recovery Options',
          type: 'guide',
          readTime: '6 min',
          description: 'What to do if you lose access to your account.',
          tags: ['recovery', 'support']
        }
      ]
    },
    'platform': {
      title: 'Platform Features',
      articles: [
        {
          title: 'Customizing Your Workspace',
          type: 'tutorial',
          readTime: '8 min',
          description: 'Learn how to customize layouts, themes, and preferences.',
          tags: ['customization', 'workspace']
        },
        {
          title: 'Using Advanced Charting',
          type: 'guide',
          readTime: '12 min',
          description: 'Master the advanced charting tools and indicators.',
          tags: ['charts', 'advanced']
        },
        {
          title: 'Setting Up Alerts',
          type: 'article',
          readTime: '5 min',
          description: 'Configure price alerts and trading notifications.',
          tags: ['alerts', 'notifications']
        },
        {
          title: 'Mobile App Features',
          type: 'tutorial',
          readTime: '7 min',
          description: 'Complete guide to using TradePro on mobile devices.',
          tags: ['mobile', 'app']
        }
      ]
    },
    'payments': {
      title: 'Payments & Billing',
      articles: [
        {
          title: 'Deposit Methods',
          type: 'guide',
          readTime: '6 min',
          description: 'All available methods to fund your trading account.',
          tags: ['deposit', 'funding']
        },
        {
          title: 'Withdrawal Process',
          type: 'article',
          readTime: '5 min',
          description: 'How to withdraw funds from your account safely.',
          tags: ['withdrawal', 'funds']
        },
        {
          title: 'Fee Structure',
          type: 'guide',
          readTime: '4 min',
          description: 'Understanding all fees and charges on the platform.',
          tags: ['fees', 'pricing']
        },
        {
          title: 'Payment Security',
          type: 'article',
          readTime: '3 min',
          description: 'How we protect your financial information.',
          tags: ['security', 'payments']
        }
      ]
    },
    'troubleshooting': {
      title: 'Troubleshooting',
      articles: [
        {
          title: 'Common Login Issues',
          type: 'guide',
          readTime: '4 min',
          description: 'Solutions for the most common login problems.',
          tags: ['login', 'issues']
        },
        {
          title: 'Trading Platform Not Loading',
          type: 'tutorial',
          readTime: '6 min',
          description: 'Steps to resolve platform loading and connectivity issues.',
          tags: ['loading', 'connectivity']
        },
        {
          title: 'Order Execution Problems',
          type: 'article',
          readTime: '5 min',
          description: 'What to do when orders are not executing properly.',
          tags: ['orders', 'execution']
        },
        {
          title: 'Browser Compatibility',
          type: 'guide',
          readTime: '3 min',
          description: 'Ensure your browser is optimized for TradePro.',
          tags: ['browser', 'compatibility']
        }
      ]
    }
  };

  const faqs = [
    {
      question: 'How do I get started with TradePro?',
      answer: 'Getting started is easy! First, create your account by providing basic information and verifying your email. Then complete the account verification process by uploading required documents. Once verified, you can fund your account and start trading.',
      category: 'getting-started'
    },
    {
      question: 'What are the minimum deposit requirements?',
      answer: 'The minimum deposit varies by payment method. For bank transfers, the minimum is $100. For credit/debit cards, it\'s $50. Cryptocurrency deposits have a minimum equivalent to $25.',
      category: 'payments'
    },
    {
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Settings > Security and click on "Two-Factor Authentication". Download an authenticator app like Google Authenticator, scan the QR code, and enter the verification code to complete setup.',
      category: 'account'
    },
    {
      question: 'What trading fees does TradePro charge?',
      answer: 'TradePro charges competitive trading fees starting from 0.1% per trade. Fees may be lower for high-volume traders. There are no deposit fees, and withdrawal fees vary by method.',
      category: 'payments'
    },
    {
      question: 'Can I trade on mobile devices?',
      answer: 'Yes! TradePro offers full mobile apps for iOS and Android, plus a mobile-optimized web platform. All features available on desktop are accessible on mobile.',
      category: 'platform'
    },
    {
      question: 'What should I do if I forgot my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a secure reset link. Follow the instructions in the email to create a new password.',
      category: 'troubleshooting'
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4 text-red-400" />;
      case 'tutorial': return <Play className="w-4 h-4 text-green-400" />;
      case 'guide': return <Book className="w-4 h-4 text-blue-400" />;
      default: return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'video': return 'bg-red-500/10 text-red-300 border-red-500/30';
      case 'tutorial': return 'bg-green-500/10 text-green-300 border-green-500/30';
      case 'guide': return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      default: return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
    }
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderQuickActions = () => (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-400/20 p-6 rounded-xl border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-8 h-8 text-blue-400" />
          <h3 className="text-xl font-semibold">Live Chat</h3>
        </div>
        <p className="text-slate-300 mb-4">Get instant help from our support team</p>
        <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Start Chat
        </button>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-400/20 p-6 rounded-xl border border-green-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-8 h-8 text-green-400" />
          <h3 className="text-xl font-semibold">Email Support</h3>
        </div>
        <p className="text-slate-300 mb-4">Send us a detailed message</p>
        <button className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          Send Email
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-500/20 to-pink-400/20 p-6 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-8 h-8 text-purple-400" />
          <h3 className="text-xl font-semibold">Phone Support</h3>
        </div>
        <p className="text-slate-300 mb-4">Call us during business hours</p>
        <button className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Call Now
        </button>
      </div>
    </div>
  );

  const renderCategoryContent = () => {
    const content = helpContent[activeCategory];
    if (!content) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">{content.title}</h2>
        
        <div className="grid gap-4">
          {content.articles.map((article, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-6 hover:bg-slate-700/50 transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getTypeIcon(article.type)}
                    <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs border ${getTypeColor(article.type)}`}>
                      {article.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 mb-3">{article.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.duration || article.readTime}
                    </div>
                    <div className="flex gap-2">
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-slate-600/50 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <Star className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFAQSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div key={index} className="bg-slate-700/30 rounded-lg border border-slate-600/50">
            <button
              onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/50 transition-colors"
            >
              <h3 className="font-semibold">{faq.question}</h3>
              {expandedFAQ === index ? 
                <ChevronDown className="w-5 h-5 text-blue-400" /> : 
                <ChevronRight className="w-5 h-5 text-slate-400" />
              }
            </button>
            
            {expandedFAQ === index && (
              <div className="px-6 pb-4">
                <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-600/50">
                  <button className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                  </button>
                  <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                    <MessageCircle className="w-4 h-4" />
                    Need more help?
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

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
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Help Center
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find answers, tutorials, and get support for all your TradePro questions
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

   
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Help Categories</h3>
              <nav className="space-y-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      activeCategory === category.id 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {category.icon}
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </nav>
              
              <div className="border-t border-slate-600/50 pt-4">
                <button 
                  onClick={() => setActiveCategory('faq')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeCategory === 'faq' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm">FAQ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              {activeCategory === 'faq' ? renderFAQSection() : renderCategoryContent()}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </button>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community Forum
              </button>
            </div>
          </div>
        </div>

             {/* Quick Actions */}
        {/* {renderQuickActions()} */}

      </div>
    </div>
  );
};

export default HelpCenter;