import { useEffect, useState } from 'react'
import {
  FaTicketAlt, FaCalendarAlt, FaClock, FaUsers,
  FaCheckCircle, FaTimesCircle, FaTag, FaQrcode
} from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5'

const API = 'http://localhost:5000/api/tickets'

// Category config — matched against event name keywords
const CATEGORIES = [
  { key: 'music',    label: 'Music',     color: 'bg-purple-100 text-purple-700',  gradient: 'from-purple-600 to-pink-500' },
  { key: 'sports',   label: 'Sports',    color: 'bg-green-100 text-green-700',    gradient: 'from-green-600 to-teal-500' },
  { key: 'tech',     label: 'Tech',      color: 'bg-blue-100 text-blue-700',      gradient: 'from-blue-600 to-indigo-500' },
  { key: 'comedy',   label: 'Comedy',    color: 'bg-yellow-100 text-yellow-700',  gradient: 'from-yellow-500 to-orange-400' },
  { key: 'workshop', label: 'Workshop',  color: 'bg-orange-100 text-orange-700',  gradient: 'from-orange-500 to-red-400' },
  { key: 'festival', label: 'Festival',  color: 'bg-pink-100 text-pink-700',      gradient: 'from-pink-500 to-rose-500' },
  { key: 'conference', label: 'Conference', color: 'bg-indigo-100 text-indigo-700', gradient: 'from-indigo-600 to-blue-500' },
]

// Event cover images keyed by category
const CATEGORY_IMAGES = {
  music:      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
  sports:     'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
  tech:       'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
  comedy:     'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600',
  workshop:   'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600',
  festival:   'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
  conference: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
  default:    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',
}

const detectCategory = (name = '') => {
  const lower = name.toLowerCase()
  return CATEGORIES.find(c => lower.includes(c.key)) || null
}

const statusConfig = {
  active:    { label: 'Active',    icon: FaCheckCircle, cls: 'bg-green-100 text-green-700' },
  used:      { label: 'Used',      icon: FaCheckCircle, cls: 'bg-gray-100 text-gray-500' },
  cancelled: { label: 'Cancelled', icon: FaTimesCircle, cls: 'bg-red-100 text-red-600' },
}

const formatDate = (iso) => {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

const TicketCard = ({ ticket }) => {
  const category = detectCategory(ticket.event_name)
  const gradient = category ? category.gradient : 'from-blue-600 to-indigo-600'
  const image = CATEGORY_IMAGES[category?.key] || CATEGORY_IMAGES.default
  const status = statusConfig[ticket.status] || statusConfig.active
  const StatusIcon = status.icon

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Event photo banner */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={ticket.event_name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />

        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-800">
            <FaTag className="h-3 w-3" />
            {category.label}
          </span>
        )}

        {/* Status badge */}
        <span className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.cls} bg-white/90 backdrop-blur-sm`}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>

        {/* Event name over image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h3 className="text-white font-bold text-base leading-tight drop-shadow-md line-clamp-1">
            {ticket.event_name || `Event #${ticket.event_id}`}
          </h3>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="relative flex items-center px-4 py-0">
        <div className="absolute -left-3 w-6 h-6 rounded-full bg-gray-100 border border-gray-200" />
        <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-3" />
        <div className="absolute -right-3 w-6 h-6 rounded-full bg-gray-100 border border-gray-200" />
      </div>

      {/* Ticket body */}
      <div className="px-4 pt-3 pb-4 space-y-3">
        {/* Ticket number */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <FaQrcode className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-gray-400">Ticket No.</span>
          </div>
          <span className="font-mono text-sm font-bold text-gray-800 tracking-wider">
            {ticket.ticket_number || `#${String(ticket.id).padStart(6, '0')}`}
          </span>
        </div>

        {/* Date */}
        {ticket.event_date && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt className="h-3.5 w-3.5" /> Date
            </span>
            <span className="text-gray-700 font-medium">{formatDate(ticket.event_date)}</span>
          </div>
        )}

        {/* Time */}
        {(ticket.start_time || ticket.end_time) && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-400">
              <FaClock className="h-3.5 w-3.5" /> Time
            </span>
            <span className="text-gray-700 font-medium">
              {ticket.start_time}{ticket.end_time ? ` – ${ticket.end_time}` : ''}
            </span>
          </div>
        )}

        {/* Capacity / people */}
        {ticket.capacity && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-400">
              <FaUsers className="h-3.5 w-3.5" /> Capacity
            </span>
            <span className="text-gray-700 font-medium">{ticket.capacity} people</span>
          </div>
        )}

        {/* Issued date */}
        <div className="flex items-center justify-between text-sm pt-1 border-t border-gray-100">
          <span className="text-gray-400 text-xs">Issued</span>
          <span className="text-gray-500 text-xs">{formatDate(ticket.created_at) || '—'}</span>
        </div>
      </div>
    </div>
  )
}

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(res => setTickets(res.data || []))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? tickets : tickets.filter(t => (t.status || 'active') === filter)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl">
              <FaTicketAlt className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
              <p className="text-sm text-gray-500">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''} generated</p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {['all', 'active', 'used', 'cancelled'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-36 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-sm">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <IoCalendarOutline className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {filter === 'all' ? 'No tickets yet' : `No ${filter} tickets`}
              </h3>
              <p className="text-sm text-gray-500">
                {filter === 'all'
                  ? 'Tickets will appear here once generated after payment.'
                  : `You have no ${filter} tickets at the moment.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
