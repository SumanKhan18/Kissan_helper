import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      await login(username, password);
      navigate('/layout');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid credentials or not yet approved by owner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-1000">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/portal-9508" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                KissanHelper
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to your admin account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-slate-400">Remember me</span>
              </label>
              <span className="text-sm text-slate-500">No password recovery available</span>
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Need admin access?{' '}
              <Link to="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-semibold">
                Apply for registration
              </Link>
            </p>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-xs">
                <strong>Note:</strong> Login credentials are provided manually after registration approval. 
                Contact owner if you haven't received your username and password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
