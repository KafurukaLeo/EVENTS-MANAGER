// frontend/src/components/layout/Home.jsx
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaClock,
  FaShieldAlt,
  FaBolt,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaHeadset,
  FaMusic,
  FaFutbol,
  FaMicrophone,
  FaChalkboardTeacher,
  FaGlassCheers,
  FaThLarge
} from 'react-icons/fa'

const CATEGORIES = [
  { id: 'all', label: 'All events', icon: FaThLarge },
  { id: 'music', label: 'Music', icon: FaMusic },
  { id: 'sports', label: 'Sports', icon: FaFutbol },
  { id: 'comedy', label: 'Comedy', icon: FaMicrophone },
  { id: 'workshop', label: 'Workshops', icon: FaChalkboardTeacher },
  { id: 'festival', label: 'Festivals', icon: FaGlassCheers },
]

// Mock catalog — swap for a real API call when one exists.
const EVENTS = [
  {
    id: 1,
    title: 'Skyline Sessions: Live Jazz',
    category: 'music',
    date: '2026-09-12',
    venue: 'Riverside Amphitheatre',
    city: 'Kigali',
    price: 25,
    seatsLeft: 14,
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 2,
    title: 'City Marathon Finish Line Fest',
    category: 'sports',
    date: '2026-09-20',
    venue: 'Central Stadium',
    city: 'Kigali',
    price: 10,
    seatsLeft: 120,
    gradient: 'from-indigo-600 to-blue-500'
  },
  {
    id: 3,
    title: 'Stand-Up Night: Fresh Faces',
    category: 'comedy',
    date: '2026-10-02',
    venue: 'The Laugh Loft',
    city: 'Kigali',
    price: 15,
    seatsLeft: 8,
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 4,
    title: 'Product Design Bootcamp',
    category: 'workshop',
    date: '2026-10-11',
    venue: 'Innovation Hub',
    city: 'Kigali',
    price: 60,
    seatsLeft: 22,
    gradient: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 5,
    title: 'Harvest Music & Food Festival',
    category: 'festival',
    date: '2026-11-01',
    venue: 'Green Valley Park',
    city: 'Musanze',
    price: 35,
    seatsLeft: 5,
    gradient: 'from-blue-600 to-indigo-500'
  },
  {
    id: 6,
    title: 'Acoustic Sundays',
    category: 'music',
    date: '2026-09-28',
    venue: 'The Courtyard',
    city: 'Kigali',
    price: 12,
    seatsLeft: 40,
    gradient: 'from-indigo-600 to-blue-600'
  },
]

const HOW_IT_WORKS = [
  { title: 'Browse events', description: 'Filter by category, city, or date to find something worth showing up for.' },
  { title: 'Pick your tickets', description: 'Choose a ticket type and quantity — pricing and fees are shown up front, no surprises at checkout.' },
  { title: 'Get your e-ticket instantly', description: 'Your QR ticket lands in your inbox and your account the moment payment clears. Just show it at the door.' }
]

const formatDate = (isoDate) => {
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const daysUntil = (isoDate) => {
  const today = new Date('2026-08-18T00:00:00')
  const target = new Date(`${isoDate}T00:00:00`)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

const EventCard = ({ event }) => {
  const days = daysUntil(event.date)
  const isAlmostSoldOut = event.seatsLeft <= 15

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`relative h-32 bg-gradient-to-r ${event.gradient} flex items-end p-4`}>
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
          {days > 0 ? `In ${days} days` : 'This week'}
        </span>
        <span className="text-white/90 text-xs font-medium uppercase tracking-wide">
          {CATEGORIES.find((c) => c.id === event.category)?.label}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
            <span>{event.venue}, {event.city}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${event.price}</span>
            <span className="text-xs text-gray-500"> / ticket</span>
          </div>
          {isAlmostSoldOut && (
            <span className="text-xs font-medium text-red-600">
              {event.seatsLeft} left
            </span>
          )}
        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <FaTicketAlt className="h-4 w-4" aria-hidden="true" />
          <span>Get tickets</span>
        </Link>
      </div>
    </div>
  )
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const haystack = `${event.title} ${event.venue} ${event.city}`.toLowerCase()
      const matchesSearch = haystack.includes(searchTerm.toLowerCase())
      const matchesCategory = activeCategory === 'all' || event.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#1e3a8a] px-4 py-20">
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
            <FaBolt className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{EVENTS.length}+ events live right now</span>
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white font-['Space_Grotesk',sans-serif]">
            Find your next
            <span className="block text-[#93c5fd]">unforgettable event</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Concerts, festivals, workshops, and more — browse what's happening
            near you and get your e-ticket in seconds.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events, venues, or cities..."
                aria-label="Search events"
                className="w-full rounded-xl border-0 bg-white pl-11 pr-4 py-3.5 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              />
            </div>
          </div>
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

      {/* Trust strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-y divide-gray-100 md:divide-y-0 md:divide-x">
          {[
            { icon: FaShieldAlt, label: 'Secure checkout' },
            { icon: FaBolt, label: 'Instant e-tickets' },
            { icon: FaHeadset, label: '24/7 support' },
            { icon: FaStar, label: 'Verified organizers' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-2 px-4 py-5">
              <item.icon className="h-4 w-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category chips + events grid */}
      <section aria-labelledby="events-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 id="events-heading" className="text-3xl font-bold text-gray-900">
              Upcoming events
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} matching your search
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>View all events</span>
            <FaArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-4 w-4" aria-hidden="true" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="inline-flex p-4 rounded-full bg-white mb-4">
              <FaSearch className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No events match that search</h3>
            <p className="text-gray-600 mt-1">Try a different keyword or category.</p>
          </div>
        )}
      </section>

      {/* How it works */}
      <section aria-labelledby="how-it-works-heading" className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-gray-900 mb-3">
              Getting tickets takes three steps
            </h2>
            <p className="text-lg text-gray-600">From browsing to your seat, in a couple of minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section aria-labelledby="testimonial-heading" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 id="testimonial-heading" className="sr-only">What attendees say</h2>
        <blockquote className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-10 text-white text-center">
          <FaQuoteLeft className="h-8 w-8 text-blue-300 mx-auto mb-4" aria-hidden="true" />
          <p className="text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            "I found a jazz night three blocks from my hotel, bought the ticket
            in under a minute, and just scanned my phone at the door. Easiest
            event I've ever been to."
          </p>
          <footer className="mt-6">
            <p className="font-semibold not-italic">Amina K.</p>
            <p className="text-sm text-blue-200">Attended Skyline Sessions</p>
          </footer>
        </blockquote>
      </section>

    </div>
  )
}

export default Home