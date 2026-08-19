import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ redirect = '/' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role === 'admin') navigate('/admin', { replace: true });
      else if (user.role === 'organizer') navigate('/venue', { replace: true });
      else navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="mt-1 text-sm text-gray-600">Sign in to manage your events and attendees</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="/forgotPassword" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword
                ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <LogIn className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
