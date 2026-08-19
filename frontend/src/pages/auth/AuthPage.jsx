// frontend/src/pages/AuthPage.jsx
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, LogIn, UserPlus } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  // Ignore /auth as a redirect target to prevent loops
  const safeRedirect = redirect === '/auth' ? '/' : redirect;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex flex-col items-center gap-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Calendar className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                EventManager
              </h1>
            </Link>
          </div>
          <p className="mt-2 text-gray-600">
            For organizers &amp; admins
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <div className="transition-all duration-300">
            {activeTab === 'login' ? (
              <LoginForm redirect={safeRedirect} />
            ) : (
              <RegisterForm onSuccess={() => setActiveTab('login')} />
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2026 EventManager. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;