// frontend/src/pages/Book.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaSearch,
  FaFilter,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaHeadset,
  FaBolt
} from 'react-icons/fa'

const Book = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [favorites, setFavorites] = useState([])

  const venues = [
    {
      id: 1,
      name: 'Grand Conference Hall',
      location: 'Downtown, City Center',
      capacity: 500,
      price: 2500,
      rating: 4.8,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600',
      amenities: ['WiFi', 'Parking', 'Catering', 'AV Equipment', 'Microphone'],
      availability: ['Mon-Fri 8AM-10PM', 'Sat-Sun 10AM-8PM'],
      featured: true,
      description: 'Perfect for large conferences, seminars, and corporate events with state-of-the-art facilities.'
    },
    {
      id: 2,
      name: 'Garden Pavilion',
      location: 'Westside Gardens',
      capacity: 200,
      price: 1500,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600',
      amenities: ['WiFi', 'Parking', 'Outdoor Space', 'Catering', 'Garden View'],
      availability: ['Mon-Sun 9AM-9PM'],
      featured: true,
      description: 'A beautiful garden venue perfect for weddings, receptions, and outdoor events.'
    },
    {
      id: 3,
      name: 'Modern Loft Space',
      location: 'Arts District',
      capacity: 150,
      price: 1800,
      rating: 4.7,
      reviews: 64,
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600',
      amenities: ['WiFi', 'Parking', 'Kitchen', 'Projector', 'Sound System'],
      availability: ['Mon-Sat 10AM-11PM'],
      featured: false,
      description: 'Contemporary loft space ideal for workshops, art exhibitions, and networking events.'
    },
    {
      id: 4,
      name: 'Executive Boardroom',
      location: 'Financial District',
      capacity: 50,
      price: 800,
      rating: 4.6,
      reviews: 43,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
      amenities: ['WiFi', 'Parking', 'Video Conferencing', 'Whiteboard', 'Coffee'],
      availability: ['Mon-Fri 8AM-8PM'],
      featured: false,
      description: 'Professional boardroom for meetings, presentations, and executive sessions.'
    },
    {
      id: 5,
      name: 'Rooftop Terrace',
      location: 'Skyline Towers',
      capacity: 300,
      price: 2200,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600',
      amenities: ['WiFi', 'Parking', 'Catering', 'Outdoor Space', 'City View', 'Bar'],
      availability: ['Mon-Sun 4PM-12AM'],
      featured: true,
      description: 'Stunning rooftop venue with panoramic city views, perfect for parties and celebrations.'
    },
    {
      id: 6,
      name: 'Community Center',
      location: 'Eastside Community',
      capacity: 100,
      price: 600,
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      amenities: ['WiFi', 'Parking', 'Kitchen', 'Stage', 'Chairs'],
      availability: ['Mon-Sun 8AM-10PM'],
      featured: false,
      description: 'Versatile community space suitable for workshops, classes, and small gatherings.'
    }
  ]

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  // Filter venues based on search and filters
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCapacity = !selectedCapacity || venue.capacity >= parseInt(selectedCapacity)
    const matchesPrice = !selectedPrice || venue.price <= parseInt(selectedPrice)
    return matchesSearch && matchesCapacity && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
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
            <FaMapMarkerAlt className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Book your perfect venue</span>
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk',sans-serif]">
            Find & Book Event Venues
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
            Discover the perfect space for your next event. Browse venues, check availability, and book instantly.
          </p>
        </div>

        {/* Perforated edge, matching the rest of the site */}
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
                placeholder="Search venues by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Capacity Filter */}
            <div>
              <select
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="">All Capacities</option>
                <option value="50">Up to 50</option>
                <option value="100">Up to 100</option>
                <option value="200">Up to 200</option>
                <option value="500">Up to 500</option>
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
                <option value="1000">Under $1,000</option>
                <option value="2000">Under $2,000</option>
                <option value="3000">Under $3,000</option>
              </select>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors flex items-center space-x-1">
              <FaFilter className="h-3 w-3" />
              <span>All Venues</span>
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Featured
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Available Today
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredVenues.length}</span> venues found
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
            <option>Sort by: Recommended</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
          </select>
        </div>
      </div>

      {/* Venue Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {venue.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(venue.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  {favorites.includes(venue.id) ? (
                    <FaHeart className="h-4 w-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
                  <div className="flex items-center space-x-1">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{venue.rating}</span>
                    <span className="text-xs text-gray-500">({venue.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                  <span>{venue.location}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <FaUsers className="h-3 w-3 mr-1" />
                    <span>{venue.capacity} people</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="h-3 w-3 mr-1" />
                    <span className="text-xs">{venue.availability[0]}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {venue.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {venue.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {venue.amenities.length > 4 && (
                    <span className="text-xs text-gray-400">+{venue.amenities.length - 4} more</span>
                  )}
                </div>

                {/* Price and Booking */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${venue.price}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  <Link
                    to={`/book/${venue.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>Book Now</span>
                    <FaArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
              <FaSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Why Book With Us */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Book With EventManager?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make venue booking simple, secure, and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FaCheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Booking</h3>
              <p className="text-gray-600">Book your venue instantly with real-time availability confirmation.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FaShieldAlt className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">All transactions are secure and protected with encryption.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FaHeadset className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our support team is available around the clock to help you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book