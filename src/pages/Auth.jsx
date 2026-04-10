import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Leaf, Sprout } from 'lucide-react';
import axios from 'axios';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(`http://127.0.0.1:5000${endpoint}`, formData);
      
      // Store token
      localStorage.setItem('kisansathi_token', data.token);
      localStorage.setItem('kisansathi_userId', data.userId);
      localStorage.setItem('kisansathi_username', data.username);
      
      onLoginSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-100 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[440px] relative">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-green-200 mb-4 transform hover:rotate-12 transition-transform duration-500">
            <Leaf size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KisanSathi</h1>
          <p className="text-gray-500 font-medium">Empowering Indian Farmers with AI</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
          <div className="flex gap-4 p-1 bg-gray-50 rounded-2xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                isLogin ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                !isLogin ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Username</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your username"
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-green-500 outline-none transition-all font-medium"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-green-500 outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200 disabled:opacity-70"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-400 text-sm">
            By continuing, you agree to our Terms of Service
          </p>
        </div>

        {/* Floating Icons */}
        <div className="absolute -left-12 top-1/2 bg-white p-3 rounded-2xl shadow-lg border border-gray-50 transform -rotate-12 hidden lg:block">
          <Sprout size={24} className="text-green-500" />
        </div>
        <div className="absolute -right-12 top-1/3 bg-white p-3 rounded-2xl shadow-lg border border-gray-50 transform rotate-12 hidden lg:block">
          <Leaf size={24} className="text-green-500" />
        </div>
      </div>
    </div>
  );
}
