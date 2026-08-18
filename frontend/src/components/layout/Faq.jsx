// frontend/src/pages/Faq.jsx
import { useState } from 'react'
import { 
  FaChevronDown,
  FaSearch,
  FaCalendarAlt,
  FaUsers,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
  FaRocket,
  FaQuestionCircle,
  FaCheckCircle,
  FaComments,
  FaEnvelope,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const categories = [
    { id: 'all', label: 'All Questions', icon: FaQuestionCircle },
    { id: 'getting-started', label: 'Getting Started', icon: FaRocket },
    { id: 'events', label: 'Events', icon: FaCalendarAlt },
    { id: 'attendees', label: 'Attendees', icon: FaUsers },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'support', label: 'Support', icon: FaHeadset },
  ]

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'What is EventManager and how does it work?',
      answer: 'EventManager is a comprehensive event management platform that helps you create, manage, and promote events. It provides tools for event creation, ticketing, attendee management, and analytics. Simply sign up, create your event, customize your registration page, and start selling tickets.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'How do I create my first event?',
      answer: 'To create your first event: 1) Log in to your account, 2) Click "Create Event" on your dashboard, 3) Fill in event details (title, date, location, description), 4) Set up ticket types and pricing, 5) Customize your event page, 6) Publish and share your event.'
    },
    {
      id: 3,
      category: 'getting-started',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can cancel anytime during the trial period.'
    },
    {
      id: 4,
      category: 'events',
      question: 'Can I create recurring events?',
      answer: 'Absolutely! EventManager supports recurring events. You can create daily, weekly, monthly, or custom recurring patterns. Each occurrence can have its own date, time, and capacity settings.'
    },
    {
      id: 5,
      category: 'events',
      question: 'How do I customize my event page?',
      answer: 'Our event page builder allows you to: 1) Upload custom branding and images, 2) Add a video introduction, 3) Customize colors and fonts, 4) Add custom fields to registration forms, 5) Set up multiple ticket tiers, 6) Enable or disable various features.'
    },
    {
      id: 6,
      category: 'events',
      question: 'Can I set different ticket types and prices?',
      answer: 'Yes, you can create multiple ticket types with different: - Pricing tiers (Early Bird, Regular, VIP) - Limited quantities - Custom fields - Start and end dates for each ticket type - Group discounts and promotional codes'
    },
    {
      id: 7,
      category: 'attendees',
      question: 'How do I manage attendee registrations?',
      answer: 'EventManager provides a comprehensive attendee management system where you can: - View all registrations in real-time - Check-in attendees using QR codes - Send email updates to attendees - Export attendee lists (CSV/Excel) - Track attendance metrics'
    },
    {
      id: 8,
      category: 'attendees',
      question: 'Can I send emails to my attendees?',
      answer: 'Yes! Our built-in email system allows you to: - Send custom emails to all or selected attendees - Create automated email sequences - Send reminders before the event - Share event updates and announcements - Personalize emails with attendee data'
    },
    {
      id: 9,
      category: 'payments',
      question: 'What payment methods are supported?',
      answer: 'EventManager supports multiple payment gateways including: - Credit/Debit Cards (Visa, Mastercard, American Express) - PayPal - Stripe - Bank Transfers - Cash (for offline events) All transactions are secure and PCI compliant.'
    },
    {
      id: 10,
      category: 'payments',
      question: 'How and when do I get paid?',
      answer: 'Funds from ticket sales are automatically transferred to your connected bank account. Standard payout time is 2-3 business days after the event ends. You can track all your transactions and payout history in your dashboard.'
    },
    {
      id: 11,
      category: 'security',
      question: 'Is my data secure on EventManager?',
      answer: 'Security is our top priority. We use: - SSL/TLS encryption for all data transfer - Secure payment processing (PCI DSS compliant) - Regular security audits - GDPR compliance - Two-factor authentication - Encrypted data storage at rest'
    },
    {
      id: 12,
      category: 'security',
      question: 'What happens to my data if I cancel?',
      answer: 'If you cancel your account, you can: - Export all your data before cancellation - Request data deletion - We retain data for 30 days after cancellation, after which it is permanently deleted. You can also contact our support team for data export requests.'
    },
    {
      id: 13,
      category: 'support',
      question: 'What kind of support do you offer?',
      answer: 'We provide comprehensive support including: - 24/7 email support - Live chat during business hours - Comprehensive knowledge base - Video tutorials - Onboarding calls for Enterprise plans - Dedicated account managers for large organizations'
    },
    {
      id: 14,
      category: 'support',
      question: 'How do I get help with a specific issue?',
      answer: 'You can get help through: 1) Visit our Help Center for articles and guides, 2) Use the live chat feature on our website, 3) Email us at support@eventmanager.com, 4) Check our video tutorials on YouTube, 5) Post in our community forum. We usually respond within 2-4 hours.'
    }
  ]

  // Filter FAQ items based on search and category
  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaQuestionCircle className="h-4 w-4 text-blue-200" />
            <span className="text-blue-100 text-sm font-medium">FAQ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions about EventManager. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <FaChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      openItems[item.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openItems[item.id] && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
              <FaSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse through the categories above.
            </p>
          </div>
        )}
      </div>

      {/* Still Have Questions Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Still Have Questions?
                </h3>
                <p className="text-gray-600">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <FaComments className="h-4 w-4" />
                    <span>Contact Support</span>
                  </Link>
                  <a
                    href="mailto:support@eventmanager.com"
                    className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <FaEnvelope className="h-4 w-4" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Average response time: 2-4 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>24/7 live chat support available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Comprehensive knowledge base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq