// frontend/src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,  
  AlertCircle,
  Search,
  Compass,
} from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-lg w-full relative">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 animate-fade-in">
          {/* 404 Number with Animation */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                404
              </div>
              <div className="absolute -top-4 -right-4 animate-bounce">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Icon with Rotating Animation */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-full animate-float">
              <Compass className="h-16 w-16 text-blue-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600">
              The page you're looking for seems to have wandered off into the digital wilderness.
            </p>
            <div className="mt-3 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Search className="h-4 w-4" />
              <span>We searched everywhere but couldn't find it</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Need help?{' '}
              <a href="mailto:byiringirobon01fra@gmail.com" className="text-blue-600 hover:text-blue-500 font-medium">
                Contact Support
              </a>
              {' '}or check our{' '}
              <Link to="/help" className="text-blue-600 hover:text-blue-500 font-medium">
                Help Center
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2026 EventHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;