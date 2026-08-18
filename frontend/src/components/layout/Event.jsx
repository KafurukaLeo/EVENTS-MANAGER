// frontend/src/pages/Event.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTicketAlt,
  FaStar,
  FaStarHalfAlt,
  FaFilter,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaTag,
  FaArrowRight,
  FaMusic,
  FaMicrophone,
  FaLaptop,
  FaUtensils,
  FaBriefcase,
  FaGraduationCap,
  FaTheaterMasks,
  FaFutbol,
  FaHeart as FaHeartSolid,
  FaBolt
} from 'react-icons/fa'

const Event = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [favorites, setFavorites] = useState([])

  const categories = [
    { id: 'all', label: 'All Events', icon: FaCalendarAlt },
    { id: 'music', label: 'Music', icon: FaMusic },
    { id: 'conference', label: 'Conference', icon: FaMicrophone },
    { id: 'tech', label: 'Tech', icon: FaLaptop },
    { id: 'food', label: 'Food & Drink', icon: FaUtensils },
    { id: 'business', label: 'Business', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'entertainment', label: 'Entertainment', icon: FaTheaterMasks },
    { id: 'sports', label: 'Sports', icon: FaFutbol },
  ]

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2026',
      category: 'tech',
      date: '2026-09-15',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, Downtown',
      price: 299,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
      description: 'Join the largest tech conference of the year with industry leaders and innovators.',
      attendees: 850,
      availableTickets: 150,
      featured: true,
      organizer: 'TechEvents Inc.'
    },
    {
      id: 2,
      title: 'Summer Music Festival',
      category: 'music',
      date: '2026-08-20',
      time: '12:00 PM - 11:00 PM',
      location: 'Central Park, City Center',
      price: 149,
      rating: 4.9,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600',
      description: 'Experience the best summer music festival with top artists and amazing vibes.',
      attendees: 2500,
      availableTickets: 300,
      featured: true,
      organizer: 'MusicFest Productions'
    },
    {
      id: 3,
      title: 'Business Leadership Summit',
      category: 'business',
      date: '2026-10-05',
      time: '8:30 AM - 5:00 PM',
      location: 'Grand Hotel, Business District',
      price: 399,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
      description: 'Learn from top business leaders and enhance your leadership skills.',
      attendees: 400,
      availableTickets: 50,
      featured: false,
      organizer: 'Leadership Academy'
    },
    {
      id: 4,
      title: 'Food & Wine Expo',
      category: 'food',
      date: '2026-09-25',
      time: '11:00 AM - 8:00 PM',
      location: 'Exhibition Center, Westside',
      price: 89,
      rating: 4.6,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
      description: 'Discover culinary delights and fine wines from around the world.',
      attendees: 1200,
      availableTickets: 200,
      featured: false,
      organizer: 'Culinary Events Co.'
    },
    {
      id: 5,
      title: 'AI & Machine Learning Workshop',
      category: 'tech',
      date: '2026-09-10',
      time: '10:00 AM - 4:00 PM',
      location: 'Innovation Hub, Tech Park',
      price: 199,
      rating: 4.9,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
      description: 'Hands-on workshop on AI and machine learning for developers and data scientists.',
      attendees: 150,
      availableTickets: 30,
      featured: true,
      organizer: 'AI Institute'
    },
    {
      id: 6,
      title: 'Jazz Night Under the Stars',
      category: 'music',
      date: '2026-08-28',
      time: '7:00 PM - 11:00 PM',
      location: 'Rooftop Garden, Downtown',
      price: 75,
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600',
      description: 'Enjoy an evening of smooth jazz with breathtaking city views.',
      attendees: 200,
      availableTickets: 75,
      featured: false,
      organizer: 'Jazz Society'
    },
    {
      id: 7,
      title: 'Startup Pitch Competition',
      category: 'business',
      date: '2026-09-20',
      time: '2:00 PM - 7:00 PM',
      location: 'Startup Hub, Innovation District',
      price: 49,
      rating: 4.5,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
      description: 'Watch the most promising startups pitch their ideas to investors.',
      attendees: 300,
      availableTickets: 100,
      featured: false,
      organizer: 'Startup Events'
    },
    {
      id: 8,
      title: 'Coding Bootcamp Graduation',
      category: 'education',
      date: '2026-08-30',
      time: '6:00 PM - 9:00 PM',
      location: 'Tech Academy, Eastside',
      price: 0,
      rating: 4.7,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
      description: 'Celebrate the graduation of our latest coding bootcamp cohort.',
      attendees: 150,
      availableTickets: 200,
      featured: false,
      organizer: 'Tech Academy'
    }
  ]

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesDate = !selectedDate || event.date >= selectedDate
    const matchesPrice = !selectedPrice || event.price <= parseInt(selectedPrice)
    return matchesSearch && matchesCategory && matchesDate && matchesPrice
  })

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.icon : FaCalendarAlt
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Matching Book.jsx style */}
      <div className="relative overflow-hidden bg-[#1e3a8a] px-4 py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#3b82f6] font-['IBM_Plex_Mono',monospace]">
            <FaTicketAlt className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Discover Events</span>
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk',sans-serif]">
            Find Your Next Experience
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
            Discover and book tickets for the best events happening near you.
          </p>
        </div>

        {/* Perforated edge, matching Book.jsx */}
        <svg
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-6 w-full text-gray-50"
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20 C 0 20 8 0 16 0 C 24 0 24 20 32 20 C 40 20 40 0 48 0 C 56 0 56 20 64 20 C 72 20 72 0 80 0 C 88 0 88 20 96 20 C 104 20 104 0 112 0 C 120 0 120 20 128 20 C 136 20 136 0 144 0 C 152 0 152 20 160 20 C 168 20 168 0 176 0 C 184 0 184 20 192 20 C 200 20 200 0 208 0 C 216 0 216 20 224 20 C 232 20 232 0 240 0 C 248 0 248 20 256 20 C 264 20 264 0 272 0 C 280 0 280 20 288 20 C 296 20 296 0 304 0 C 312 0 312 20 320 20 C 328 20 328 0 336 0 C 344 0 344 20 352 20 C 360 20 360 0 368 0 C 376 0 376 20 384 20 C 392 20 392 0 400 0 L400 20 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events by title, location, or organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="">All Prices</option>
                <option value="0">Free</option>
                <option value="50">Under $50</option>
                <option value="100">Under $100</option>
                <option value="200">Under $200</option>
                <option value="500">Under $500</option>
              </select>
            </div>
          </div>

          {/* Category Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-3 w-3" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredEvents.length}</span> events found
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
            <option>Sort by: Recommended</option>
            <option>Sort by: Date (Soonest)</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
          </select>
        </div>
      </div>

      {/* Event Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const CategoryIcon = getCategoryIcon(event.category)
            return (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <FaStar className="h-3 w-3" />
                      <span>Featured</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(event.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    {favorites.includes(event.id) ? (
                      <FaHeartSolid className="h-4 w-4 text-red-500" />
                    ) : (
                      <FaRegHeart className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/60 px-3 py-1 rounded-full">
                    <CategoryIcon className="h-3 w-3 text-white" />
                    <span className="text-white text-xs">
                      {categories.find(c => c.id === event.category)?.label || 'Event'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{event.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaCalendarAlt className="h-3 w-3 mr-2 text-gray-400" />
                      <span>{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="h-3 w-3 mr-2 text-gray-400" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="h-3 w-3 mr-2 text-gray-400" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Price and Tickets */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      {event.price === 0 ? (
                        <span className="text-lg font-bold text-green-600">Free</span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-gray-900">${event.price}</span>
                          <span className="text-sm text-gray-500">/ticket</span>
                        </>
                      )}
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <FaTicketAlt className="h-3 w-3 mr-1" />
                        <span>{event.availableTickets} tickets left</span>
                      </div>
                    </div>
                    <Link
                      to={`/events/${event.id}`}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span>Get Tickets</span>
                      <FaArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
              <FaSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Event