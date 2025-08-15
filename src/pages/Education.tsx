import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Target, TrendingUp, TrendingDown, DollarSign, Activity, GraduationCap, Zap, Eye, PieChart, PlayCircle } from 'lucide-react';

const EducationComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 6,
    minutes: 33,
    seconds: 21
  });

  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'Trading Fundamentals', 
      difficulty: 'Beginner', 
      duration: '4.5 hours', 
      progress: 0, 
      lessons: 12, 
      students: 2847, 
      rating: 4.8,
      category: 'Basics'
    },
    { 
      id: 2, 
      title: 'Technical Analysis Mastery', 
      difficulty: 'Intermediate', 
      duration: '8.2 hours', 
      progress: 0, 
      lessons: 24, 
      students: 1923, 
      rating: 4.9,
      category: 'Analysis'
    },
    { 
      id: 3, 
      title: 'Risk Management Pro', 
      difficulty: 'Advanced', 
      duration: '6.8 hours', 
      progress: 0, 
      lessons: 18, 
      students: 1456, 
      rating: 4.7,
      category: 'Risk'
    }
  ]);

  const [learningStats, setLearningStats] = useState({
    totalCourses: 45,
    totalStudents: 12847,
    completionRate: 87.3,
    avgRating: 4.8
  });

  const [progressMetrics, setProgressMetrics] = useState({
    weeklyGoal: 0,
    streakDays: 0,
    skillPoints: 0,
    certificates: 0
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

  // Simulate course updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCourses(prev => prev.map(course => {
        const studentChange = Math.floor(Math.random() * 5);
        const newStudents = course.students + studentChange;

        return {
          ...course,
          students: newStudents
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update learning stats
  useEffect(() => {
    const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
    const avgRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;

    setLearningStats(prev => ({
      ...prev,
      totalStudents,
      avgRating: avgRating.toFixed(1)
    }));

    setProgressMetrics({
      weeklyGoal: Math.floor(Math.random() * 20 + 10),
      streakDays: Math.floor(Math.random() * 30 + 5),
      skillPoints: Math.floor(Math.random() * 500 + 200),
      certificates: Math.floor(Math.random() * 8 + 2)
    });
  }, [courses]);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Interactive Courses",
      description: "Comprehensive trading courses with hands-on exercises and real examples"
    },
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: "Video Tutorials",
      description: "High-quality video content covering all aspects of trading and analysis"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Skill Assessments",
      description: "Test your knowledge with quizzes and practical trading simulations"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Webinars",
      description: "Join live sessions with expert traders and market analysts"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Market Insights",
      description: "Daily market analysis and educational content from trading professionals"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Certification",
      description: "Earn certificates to validate your trading knowledge and skills"
    }
  ];

  const getDifficultyColor = (level) => {
    switch(level) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-400 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Education
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Comprehensive trading education platform with courses, tutorials, and expert insights
          </p>
        </div>

        {/* Learning Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Total Courses</h3>
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {learningStats.totalCourses}
            </div>
            <div className="text-blue-400 text-sm">Available</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Students</h3>
              <GraduationCap className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {learningStats.totalStudents.toLocaleString()}
            </div>
            <div className="text-green-400 text-sm">Enrolled</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Completion Rate</h3>
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {learningStats.completionRate}%
            </div>
            <div className="text-purple-400 text-sm">Average</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Avg Rating</h3>
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {learningStats.avgRating}/5
            </div>
            <div className="text-yellow-400 text-sm">Student reviews</div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Featured Courses Preview</h3>
            <div className="flex items-center gap-2 text-orange-400">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Coming Soon</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Course</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Difficulty</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Duration</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Students</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Rating</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {course.category.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-xs text-slate-400">{course.lessons} lessons</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {course.duration}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-slate-300">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-orange-400/20 text-orange-400">
                        Coming Soon
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Weekly Goal</h4>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {progressMetrics.weeklyGoal} hrs
            </div>
            <div className="text-blue-400 text-xs">Learning time</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Learning Streak</h4>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {progressMetrics.streakDays} days
            </div>
            <div className="text-green-400 text-xs">Consecutive</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Skill Points</h4>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {progressMetrics.skillPoints}
            </div>
            <div className="text-yellow-400 text-xs">Earned</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-slate-400 text-sm font-medium">Certificates</h4>
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {progressMetrics.certificates}
            </div>
            <div className="text-purple-400 text-xs">Completed</div>
          </div>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-400/30 transition-all duration-300">
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
            Ready to enhance your trading knowledge? 
            <span className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors">
              Join the waitlist
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationComingSoon;