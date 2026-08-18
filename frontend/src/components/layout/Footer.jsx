// frontend/src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { 
  FaCalendarAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaUsers,
  FaClock,  
} from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone, FiStar, FiShield } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const isAuthenticated = false // This would come from your auth context/state

  const quickLinks = [
    { to: '/events', label: 'Browse Events' },
    { to: '/create-event', label: 'Create Event' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ]

  const authenticatedLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/my-events', label: 'My Events' },
    { to: '/tickets', label: 'My Tickets' },
    { to: '/settings', label: 'Settings' },
  ]

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  ]

  const features = [
    { icon: HiSparkles, text: 'Smart Event Management' },
    { icon: FaUsers, text: 'Seamless Registration' },
    { icon: FaShieldAlt, text: 'Secure Payments' },
    { icon: FaClock, text: 'Real-time Updates' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <FaCalendarAlt className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                EventManager
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your all-in-one event management platform. Create, manage, and promote events effortlessly.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-1 text-xs text-gray-300">
                  <feature.icon className="h-3 w-3 text-blue-400" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 bg-gray-800 ${social.color} rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 items-center space-x-2">
              <span>Quick Links</span>
              <div className="h-0.5 w-10 bg-blue-500 rounded"></div>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-200 text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Authenticated Links - Show only when logged in */}
          {isAuthenticated && (
            <div>
              <h3 className="text-lg font-semibold mb-4 items-center space-x-2">
                <span>My Account</span>
                <div className="h-0.5 w-12 bg-indigo-500 rounded"></div>
              </h3>
              <ul className="space-y-2.5">
                {authenticatedLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-indigo-400 transition-all duration-200 text-sm flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 items-center space-x-2">
              <span>Get in Touch</span>
              <div className="h-0.5 w-12 bg-blue-500 rounded"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <FiMapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>123 Event Street, City, State 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <FiMail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:support@eventmanager.com" className="hover:text-blue-400 transition-colors">
                  support@eventmanager.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <FiPhone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>

            {/* Rating */}
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">4.9/5</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Trusted by 10,000+ event organizers</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400 flex items-center space-x-1">
            <span>&copy; {currentYear} EventManager.</span>
            <span>All rights reserved.</span>
          </p>
          
          <div className="flex items-center space-x-6 text-xs">
            <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
              Cookie Policy
            </Link>
            <span className="flex items-center space-x-1 text-gray-500">
              <FiShield className="h-3 w-3" />
              <span>Secure</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer