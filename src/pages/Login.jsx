import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    try {
      // Demo credentials for testing
      const validCredentials = {
        'admin@portacabin.com': 'admin123',
        'john@portacabin.com': 'manager123',
        'sarah@portacabin.com': 'customer123'
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      if (validCredentials[formData.email] && validCredentials[formData.email] === formData.password) {
        // Store authentication data
        const userData = {
          email: formData.email,
          name: formData.email === 'admin@portacabin.com' ? 'Admin User' : 
                formData.email === 'john@portacabin.com' ? 'John Manager' : 'Sarah Customer Service',
          role: formData.email === 'admin@portacabin.com' ? 'Admin' : 
                formData.email === 'john@portacabin.com' ? 'Manager' : 'Customer Service',
          permissions: formData.email === 'admin@portacabin.com' ? ['all'] : 
                      formData.email === 'john@portacabin.com' ? ['quotations', 'sales_orders', 'projects'] : 
                      ['quotations', 'customers']
        };

        // Use the AuthContext login method to properly set authentication state
        login(userData);
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Starfield effect */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-48 left-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-white rounded-full opacity-70"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-lg"></div>
      </div>

      {/* Header with SoftwareOrbits Branding */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">SO</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">SoftwareOrbits</h1>
              <p className="text-blue-200 text-xs">Transforming Ideas into Digital Reality</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-blue-200">
            <a href="https://softwareorbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
            <a href="https://softwareorbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Services</a>
            <a href="https://softwareorbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side - Feature Cards and Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Revenue Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 text-sm font-medium">Total Revenue</span>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">$1,504,823</span>
                <span className="text-gray-500">.46</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm">
                <span>↗</span>
                <span>2.98%</span>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Maximize your Business
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Potential</span>
              </h1>
              <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                Professional CRM solutions built with cutting-edge technology to streamline your operations and boost productivity.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-300">📊</span>
                  </div>
                  <span className="text-blue-100">Advanced Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-300">🚀</span>
                  </div>
                  <span className="text-blue-100">Cloud-Based Solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-300">🔒</span>
                  </div>
                  <span className="text-blue-100">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-300">⚡</span>
                  </div>
                  <span className="text-blue-100">Real-time Updates</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side - Login Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl w-full max-w-md border border-white/20">
              
              {/* Login Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏗️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Porta Cabin CRM</h2>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                    <div className="flex items-center">
                      <span className="mr-2">⚠️</span>
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="hi@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember Me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot Password
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3">Demo Credentials:</p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Admin:</span>
                    <span>admin@portacabin.com / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manager:</span>
                    <span>john@portacabin.com / manager123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Service:</span>
                    <span>sarah@portacabin.com / customer123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Links */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-6 text-sm text-blue-200">
          <a href="https://softwareorbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</a>
          <span>|</span>
          <a href="https://softwareorbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Legal</a>
          <span>|</span>
          <a href="https://softwareorbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
}