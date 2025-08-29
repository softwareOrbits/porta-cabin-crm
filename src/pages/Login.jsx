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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">🏗️</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Porta Cabin CRM
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
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
  );
}