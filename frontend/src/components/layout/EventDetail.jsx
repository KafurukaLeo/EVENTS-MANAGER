// frontend/src/pages/EventDetail.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  FaArrowLeft,
  FaStar,
  FaStarHalfAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaTicketAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShare,
  FaPrint,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaTag,
  FaClock as FaClockIcon
} from 'react-icons/fa'

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [event, setEvent] = useState(null)
  const [selectedTicketType, setSelectedTicketType] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [paymentError, setPaymentError] = useState('')

  // Mock event data
  const eventData = {
    id: parseInt(id),
    title: 'Tech Conference 2026',
    category: 'tech',
    date: '2026-09-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Convention Center, Downtown',
    price: 299,
    rating: 4.8,
    reviews: 234,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800'
    ],
    description: 'Join the largest tech conference of the year with industry leaders and innovators. This full-day event features keynote speeches, panel discussions, workshops, and networking opportunities.',
    longDescription: 'Tech Conference 2026 brings together the brightest minds in technology for a day of learning, networking, and innovation. With over 50 speakers across 10 tracks, you\'ll have the opportunity to dive deep into the latest trends in AI, machine learning, cloud computing, cybersecurity, and more. The conference also includes an exhibition hall with 100+ companies showcasing their latest products and services. Whether you\'re a developer, executive, or entrepreneur, this event has something for everyone.',
    attendees: 850,
    availableTickets: 150,
    featured: true,
    organizer: 'TechEvents Inc.',
    organizerEmail: 'info@techevents.com',
    organizerPhone: '+1 (555) 123-4567',
    agenda: [
      { time: '9:00 AM - 10:00 AM', title: 'Registration & Breakfast', speaker: 'Networking' },
      { time: '10:00 AM - 11:00 AM', title: 'Keynote: Future of Technology', speaker: 'Dr. Sarah Johnson' },
      { time: '11:00 AM - 12:30 PM', title: 'AI & Machine Learning Workshop', speaker: 'Prof. Michael Chen' },
      { time: '12:30 PM - 1:30 PM', title: 'Lunch Break', speaker: 'Networking' },
      { time: '1:30 PM - 3:00 PM', title: 'Panel Discussion: Tech Trends', speaker: 'Industry Leaders' },
      { time: '3:00 PM - 4:30 PM', title: 'Hands-on Coding Session', speaker: 'Dev Team' },
      { time: '4:30 PM - 6:00 PM', title: 'Networking Reception', speaker: 'All Attendees' }
    ],
    speakers: [
      { name: 'Dr. Sarah Johnson', title: 'AI Research Lead', company: 'TechCorp' },
      { name: 'Prof. Michael Chen', title: 'ML Professor', company: 'Stanford University' },
      { name: 'James Rodriguez', title: 'CTO', company: 'Innovate Inc.' },
      { name: 'Emily Park', title: 'VP of Engineering', company: 'CloudTech' }
    ],
    ticketTypes: [
      { name: 'Early Bird', price: 199, available: 50 },
      { name: 'Regular', price: 299, available: 100 },
      { name: 'VIP', price: 499, available: 20 }
    ]
  }

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setEvent(eventData)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="h-4 w-4 text-yellow-400" />)
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="h-4 w-4 text-yellow-400" />)
    }
    return stars
  }

  const handleBuyClick = () => {
    setPhoneNumber('')
    setEmail('')
    setPaymentError('')
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setPaymentError('Please enter your email address.')
      return
    }
    if (!phoneNumber.trim()) {
      setPaymentError('Please enter your payment phone number.')
      return
    }
    setIsBooking(true)
    setShowPaymentModal(false)
    setTimeout(() => {
      setIsBooking(false)
      setBookingSuccess(true)
      setTimeout(() => {
        setBookingSuccess(false)
        navigate('/events')
      }, 3000)
    }, 2000)
  }

  const getTicketPrice = () => {
    if (!event) return 0
    return event.ticketTypes[selectedTicketType]?.price ?? event.price
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <FaTimesCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Link to="/events" className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Events</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative h-96">
                <img 
                  src={event.images[currentImageIndex]} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {event.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured Event
                  </div>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  {isFavorite ? (
                    <FaHeart className="h-5 w-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-5 w-5 text-gray-600" />
                  )}
                </button>

                {event.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? event.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <FaChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === event.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <FaChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {event.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                    <FaShare className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                    <FaPrint className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-lg">
                  {renderStars(event.rating)}
                  <span className="text-sm font-semibold text-gray-900 ml-1">{event.rating}</span>
                  <span className="text-xs text-gray-500">({event.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 border-t border-b border-gray-100 py-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date</p>
                    <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClockIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Attendees</p>
                    <p className="text-sm text-gray-600">{event.attendees} people</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About This Event</h2>
                <p className="text-gray-600 leading-relaxed">{event.longDescription}</p>
              </div>

              {/* Agenda */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Agenda</h2>
                <div className="space-y-2">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 text-sm font-medium text-blue-600">{item.time}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                        {speaker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{speaker.name}</p>
                        <p className="text-xs text-gray-500">{speaker.title}</p>
                        <p className="text-xs text-blue-600">{speaker.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organizer */}
              <div className="border-t border-gray-100 pt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Organizer</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {event.organizer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.organizer}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <FaEnvelope className="h-3 w-3" />
                        <span>{event.organizerEmail}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FaPhone className="h-3 w-3" />
                        <span>{event.organizerPhone}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Ticket Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">${event.price}</span>
                    <span className="text-sm text-gray-500">/ticket</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(event.rating)}
                    <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
                  </div>
                </div>

                {/* Ticket Selection */}
                <div className="space-y-4">
                  {/* Ticket Types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ticket Type
                    </label>
                    <select
                      value={selectedTicketType}
                      onChange={(e) => setSelectedTicketType(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {event.ticketTypes.map((ticket, index) => (
                        <option key={index} value={index}>
                          {ticket.name} - ${ticket.price} ({ticket.available} available)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Tickets */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Tickets
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedTickets(Math.max(1, selectedTickets - 1))}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaTimesCircle className="h-4 w-4 text-gray-500" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={event.availableTickets}
                        value={selectedTickets}
                        onChange={(e) => setSelectedTickets(Math.min(parseInt(e.target.value) || 1, event.availableTickets))}
                        className="w-20 text-center py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => setSelectedTickets(Math.min(selectedTickets + 1, event.availableTickets))}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaCheckCircle className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Maximum: {event.availableTickets} tickets available</p>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">${getTicketPrice()} x {selectedTickets} ticket{selectedTickets > 1 ? 's' : ''}</span>
                      <span className="text-gray-900">${getTicketPrice() * selectedTickets}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900">${Math.round(getTicketPrice() * selectedTickets * 0.05)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${getTicketPrice() * selectedTickets + Math.round(getTicketPrice() * selectedTickets * 0.05)}</span>
                    </div>
                  </div>

                  {/* Booking Button */}
                  {bookingSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <FaCheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
                      <p className="text-green-700 font-medium">Tickets Confirmed!</p>
                      <p className="text-xs text-green-600">Redirecting...</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleBuyClick}
                      disabled={isBooking}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isBooking ? (
                        <>
                          <FaSpinner className="h-5 w-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FaTicketAlt className="h-5 w-5" />
                          <span>Buy Tickets</span>
                          <FaArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 pt-2">
                    <span className="flex items-center space-x-1">
                      <FaShieldAlt className="h-3 w-3 text-green-500" />
                      <span>Secure booking</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaCreditCard className="h-3 w-3 text-blue-500" />
                      <span>No hidden fees</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaHeadset className="h-3 w-3 text-purple-500" />
                      <span>24/7 support</span>
                    </span>
                  </div>

                  {/* Available Tickets */}
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-blue-800">
                      <FaTicketAlt className="h-4 w-4 inline mr-1" />
                      {event.availableTickets} tickets remaining
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Organizer */}
              <div className="mt-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <FaEnvelope className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <FaPhone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaCreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <h2 className="font-semibold text-gray-900">Complete Your Purchase</h2>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimesCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-5">
              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Order Summary</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2"><FaTicketAlt className="h-3.5 w-3.5" /> Ticket type</span>
                  <span className="font-medium text-gray-900">{event.ticketTypes[selectedTicketType]?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2"><FaUsers className="h-3.5 w-3.5" /> Quantity</span>
                  <span className="font-medium text-gray-900">{selectedTickets} ticket{selectedTickets > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2"><FaCalendarAlt className="h-3.5 w-3.5" /> Event date</span>
                  <span className="font-medium text-gray-900">{formatDate(event.date)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex items-center justify-between text-sm font-semibold">
                  <span className="text-gray-700">Total</span>
                  <span className="text-blue-600 text-base">${getTicketPrice() * selectedTickets + Math.round(getTicketPrice() * selectedTickets * 0.05)}</span>
                </div>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setPaymentError('') }}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Ticket confirmation will be sent here</p>
              </div>

              {/* Phone number field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Money / Payment Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => { setPhoneNumber(e.target.value); setPaymentError('') }}
                    placeholder="e.g. +250 7XX XXX XXX"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {paymentError && (
                  <p className="text-xs text-red-600 mt-1">{paymentError}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Enter the number used to make the payment</p>
              </div>

              {/* Trust note */}
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
                <FaShieldAlt className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                <span>Your payment details are secure and encrypted</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  Confirm Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetail