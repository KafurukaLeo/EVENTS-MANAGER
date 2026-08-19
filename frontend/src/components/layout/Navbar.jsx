// frontend/src/components/layout/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaChevronDown,
  FaSignInAlt,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaQuestionCircle,
  FaTachometerAlt,
  FaUsers,
  FaTicketAlt,
  FaBell,
  FaMapMarkerAlt  // Added for Book icon
} from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const isAuthenticated = false // This would come from your auth context/state
  const navigate = useNavigate()

  const handleLogout = () => {
    // Add logout logic here
    navigate('/auth')
  }

  const navLinks = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/events', label: 'Events', icon: FaCalendarAlt },
    { to: '/book', label: 'Book Venue', icon: FaMapMarkerAlt }, // Added Book link
    { to: '/about', label: 'About', icon: FaInfoCircle },
    { to: '/contact', label: 'Contact', icon: FaEnvelope },
  ]

  const authenticatedLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { to: '/my-events', label: 'My Events', icon: FaTicketAlt },
    { to: '/attendees', label: 'Attendees', icon: FaUsers },
  ]

  // Helper function to get active link classes
  const getActiveLinkClasses = ({ isActive }) => {
    return isActive
      ? 'flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 transition-all duration-200 group'
      : 'flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group'
  }

  const getMobileActiveLinkClasses = ({ isActive }) => {
    return isActive
      ? 'flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-blue-600 bg-blue-50 transition-all duration-200'
      : 'flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200'
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <IoCalendarOutline className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                EventManager
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getActiveLinkClasses}
                end={link.to === '/'}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`h-4 w-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            
            {isAuthenticated && authenticatedLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getActiveLinkClasses}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`h-4 w-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <FaBell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <p className="text-sm text-gray-800">New attendee registered for your event</p>
                        <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <p className="text-sm text-gray-800">Event "Tech Conference" starts in 3 days</p>
                        <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                    JD
                  </div>
                  <FaChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john@example.com</p>
                    </div>
                    <div className="py-1">
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => 
                          `flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                            isActive 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className={({ isActive }) => 
                          `flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                            isActive 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaCog className="h-4 w-4" />
                        <span>Settings</span>
                      </NavLink>
                      <NavLink
                        to="/help"
                        className={({ isActive }) => 
                          `flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                            isActive 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaQuestionCircle className="h-4 w-4" />
                        <span>Help & Support</span>
                      </NavLink>
                    </div>
                    <div className="border-t border-gray-200 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`
                  }
                >
                  <FaSignInAlt className="h-4 w-4" />
                  <span>Sign In</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getMobileActiveLinkClasses}
                end={link.to === '/'}
                onClick={() => setIsMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            
            {isAuthenticated && authenticatedLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getMobileActiveLinkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}

            <div className="border-t border-gray-200 pt-2 mt-2">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/profile"
                    className={getMobileActiveLinkClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <FaUser className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                        <span>Profile</span>
                      </>
                    )}
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <FaSignOutAlt className="h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/auth"
                    className={getMobileActiveLinkClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <FaSignInAlt className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                        <span>Sign In</span>
                      </>
                    )}
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar