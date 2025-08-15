import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  TrendingUp,
  User,
  Mail,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // Register.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      const errorMessage = "Passwords do not match";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    } // Check password length

    if (formData.password.length < 8) {
      const errorMessage = "Password must be at least 8 characters long";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password); // Remove this line to prevent the first toast message // toast.success('Registration successful! Please sign in.');
      setIsRedirecting(true);
      navigate("/login", {
        state: { message: "Registration successful! Please sign in." },
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Main card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Join TradePro and start trading
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300 block"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading || isRedirecting}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800 border border-gray-700 rounded-xl 
                           text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           hover:border-gray-600 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading || isRedirecting}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800 border border-gray-700 rounded-xl 
                           text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           hover:border-gray-600 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading || isRedirecting}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-800 border border-gray-700 rounded-xl 
                           text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           hover:border-gray-600 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Password (min. 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isRedirecting}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-300 block"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading || isRedirecting}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-800 border border-gray-700 rounded-xl 
                           text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           hover:border-gray-600 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading || isRedirecting}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-start space-x-3 p-4 bg-red-900/20 border border-red-800 rounded-xl">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-300 text-sm leading-relaxed">
                  {error}
                </span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || isRedirecting}
              className="w-full relative overflow-hidden group py-3.5 px-6 
                       bg-gradient-to-r from-blue-600 to-cyan-600 
                       hover:from-blue-500 hover:to-cyan-500 
                       disabled:from-gray-600 disabled:to-gray-600
                       text-white font-semibold rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                       disabled:cursor-not-allowed transition-all duration-200
                       shadow-lg hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Creating account...</span>
                </span>
              ) : isRedirecting ? (
                <span className="flex items-center justify-center space-x-2 relative z-10">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Registration successful!</span>
                </span>
              ) : (
                <span className="relative z-10">Create Account</span>
              )}
            </button>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
