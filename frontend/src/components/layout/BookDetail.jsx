//frontend/src/components/layout/BookDetail.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  FaArrowLeft,
  FaStar,
  FaStarHalfAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaWifi,
  FaParking,
  FaUtensils,
  FaMicrophone,
  FaVideo,
  FaChair,
  FaSnowflake,
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaPrint,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaUserPlus,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaSpinner
} from 'react-icons/fa'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [venue, setVenue] = useState(null)

  // Mock venue data - In real app, fetch from API
  const venueData = {
    id: parseInt(id),
    name: 'Grand Conference Hall',
    location: 'Downtown, City Center',
    capacity: 500,
    price: 2500,
    rating: 4.8,
    reviews: 127,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800'
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'AV Equipment', 'Microphone', 'Video Conferencing', 'Whiteboard', 'Coffee'],
    availability: ['Mon-Fri 8AM-10PM', 'Sat-Sun 10AM-8PM'],
    featured: true,
    description: 'Perfect for large conferences, seminars, and corporate events with state-of-the-art facilities. Our Grand Conference Hall features cutting-edge technology, flexible seating arrangements, and professional support staff to ensure your event runs smoothly.',
    longDescription: 'The Grand Conference Hall is our flagship venue, designed to accommodate up to 500 guests in comfort and style. With 10,000 square feet of flexible space, it can be configured for various event types including conferences, trade shows, gala dinners, and corporate meetings. The venue features floor-to-ceiling windows offering panoramic city views, a built-in stage with professional lighting and sound systems, and high-speed WiFi throughout. Our dedicated event team will work with you to customize the space to your exact specifications.',
    features: [
      'State-of-the-art AV equipment',
      'Professional lighting system',
      'Built-in stage and presentation area',
      'High-speed WiFi (up to 1Gbps)',
      'Climate control system',
      'ADA accessible',
      'Loading dock for equipment',
      'Private preparation rooms'
    ],
    rules: [
      'No outside catering without approval',
      'Events must end by 11:00 PM',
      'Security deposit required',
      'Insurance certificate required for large events',
      'No confetti or glitter allowed',
      'Recycling and waste management provided'
    ],
    nearbyAmenities: [
      'Multiple hotels within walking distance',
      'Parking garage adjacent to venue',
      'Restaurants and cafes nearby',
      'Public transportation accessible',
      'Shopping centers within 2 blocks'
    ]
  }

  useEffect(() => {
    // Simulate API fetch
    const fetchVenue = async () => {
      setLoading(true)
      try {
        // In real app, fetch from API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setVenue(venueData)
      } catch (error) {
        console.error('Error fetching venue:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVenue()
  }, [id])

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', 
    '8:00 PM', '9:00 PM', '10:00 PM'
  ]

  // Generate next 30 days
  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const availableDates = generateDates()

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time for your booking.')
      return
    }
    
    setIsBooking(true)
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false)
      setBookingSuccess(true)
      setTimeout(() => {
        setBookingSuccess(false)
        navigate('/book')
      }, 3000)
    }, 2000)
  }

  const nextImage = () => {
    if (venue) {
      setCurrentImageIndex((prev) => 
        prev === venue.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (venue) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? venue.images.length - 1 : prev - 1
      )
    }
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

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': FaWifi,
      'Parking': FaParking,
      'Catering': FaUtensils,
      'Microphone': FaMicrophone,
      'Video Conferencing': FaVideo,
      'Whiteboard': FaChair,
      'Coffee': FaSnowflake
    }
    return icons[amenity] || FaCheckCircle
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading venue details...</p>
        </div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <FaTimesCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Venue Not Found</h2>
          <p className="text-gray-600 mb-4">The venue you're looking for doesn't exist.</p>
          <Link
            to="/book"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft className="h-4 w-4" />
            <span>Back to Venues</span>
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
          onClick={() => navigate('/book')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Venues</span>
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
                  src={venue.images[currentImageIndex]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                {venue.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured Venue
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

                {/* Image Navigation */}
                {venue.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <FaChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <FaChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {venue.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons Overlay */}
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

            {/* Venue Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{venue.name}</h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                    <span>{venue.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-lg">
                  {renderStars(venue.rating)}
                  <span className="text-sm font-semibold text-gray-900 ml-1">{venue.rating}</span>
                  <span className="text-xs text-gray-500">({venue.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 border-t border-b border-gray-100 py-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FaUsers className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Capacity</p>
                    <p className="text-sm text-gray-600">Up to {venue.capacity} people</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hours</p>
                    <p className="text-sm text-gray-600">{venue.availability.join(' | ')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMoneyBillWave className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Price</p>
                    <p className="text-sm text-gray-600">${venue.price}/day</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{venue.longDescription}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {venue.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FaCheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.map((amenity, index) => {
                    const Icon = getAmenityIcon(amenity)
                    return (
                      <span key={index} className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        <Icon className="h-4 w-4" />
                        <span>{amenity}</span>
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Rules */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Venue Rules</h2>
                <ul className="space-y-1">
                  {venue.rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <FaTimesCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby Amenities */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Nearby Amenities</h2>
                <ul className="space-y-1">
                  {venue.nearbyAmenities.map((amenity, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <FaCheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all reviews
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2].map((review) => (
                  <div key={review} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          JD
                        </div>
                        <span className="font-medium text-gray-900">John Doe</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(4.5)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Amazing venue! The space was perfect for our conference. Great staff and facilities.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 weeks ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">${venue.price}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(venue.rating)}
                    <span className="text-sm text-gray-600 ml-1">{venue.rating}</span>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Choose a date</option>
                        {availableDates.map((date, index) => (
                          <option key={index} value={date.toISOString()}>
                            {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Time
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Choose a time</option>
                        {timeSlots.map((time, index) => (
                          <option key={index} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max={venue.capacity}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Math.min(parseInt(e.target.value) || 1, venue.capacity))}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Maximum capacity: {venue.capacity} guests</p>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">${venue.price} x 1 day</span>
                      <span className="text-gray-900">${venue.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900">${Math.round(venue.price * 0.05)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${venue.price + Math.round(venue.price * 0.05)}</span>
                    </div>
                  </div>

                  {/* Booking Button */}
                  {bookingSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <FaCheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
                      <p className="text-green-700 font-medium">Booking Confirmed!</p>
                      <p className="text-xs text-green-600">Redirecting...</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleBooking}
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
                          <FaCalendarCheck className="h-5 w-5" />
                          <span>Book Now</span>
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
                </div>
              </div>

              {/* Contact Host */}
              <div className="mt-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <FaEnvelope className="h-4 w-4" />
                    <span>Message</span>
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
    </div>
  )
}

export default BookDetail