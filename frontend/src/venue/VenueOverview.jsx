import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaUserFriends, FaCalendarCheck, FaCreditCard, FaArrowRight } from 'react-icons/fa'

const API = 'http://localhost:5000/api'

export default function VenueOverview() {
  const [events, setEvents] = useState([])
  const [guests, setGuests] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/events`).then(r => r.json()),
      fetch(`${API}/guests`).then(r => r.json()),
      fetch(`${API}/registrations`).then(r => r.json()),
      fetch(`${API}/payments`).then(r => r.json()),
    ])
      .then(([ev, gu, re, pa]) => {
        setEvents(ev.data || [])
        setGuests(gu.data || [])
        setRegistrations(re.data || [])
        setPayments(pa.data || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totalRevenue = payments.reduce((s, p) => s + parseFloat(p.amount || 0), 0)

  const stats = [
    { icon: FaCalendarAlt, label: 'My Events', value: events.length, to: '/venue/events', color: 'bg-indigo-600' },
    { icon: FaUserFriends, label: 'Total Guests', value: guests.length, to: '/venue/guests', color: 'bg-blue-600' },
    { icon: FaCalendarCheck, label: 'Registrations', value: registrations.length, to: '/venue/registrations', color: 'bg-purple-600' },
    { icon: FaCreditCard, label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, to: '/venue/payments', color: 'bg-green-600' },
  ]

  const upcomingEvents = events
    .filter(e => e.event_date && new Date(e.event_date) >= new Date())
    .slice(0, 3)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Your venue at a glance</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-24 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <Link key={s.label} to={s.to} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
              <FaArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}

      {/* Upcoming Events */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Upcoming Events</h2>
          <Link to="/venue/events" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View all <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse" />)}</div>
        ) : upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
            No upcoming events. <Link to="/venue/events" className="text-indigo-600 hover:underline">Create one</Link>.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Event', 'Date', 'Start', 'Capacity'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {upcomingEvents.map(ev => (
                  <tr key={ev.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{ev.name}</td>
                    <td className="px-4 py-3 text-gray-600">{ev.event_date?.slice(0, 10)}</td>
                    <td className="px-4 py-3 text-gray-600">{ev.start_time || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{ev.capacity || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Create New Event', desc: 'Add a new event to your venue', to: '/venue/events', color: 'border-indigo-200 hover:border-indigo-400' },
          { label: 'Send Invitations', desc: 'Invite guests to your events', to: '/venue/invitations', color: 'border-blue-200 hover:border-blue-400' },
          { label: 'Check-In Guests', desc: 'Scan tickets at the door', to: '/venue/checkin', color: 'border-purple-200 hover:border-purple-400' },
        ].map(a => (
          <Link key={a.to} to={a.to} className={`bg-white rounded-xl border-2 p-5 transition-colors ${a.color}`}>
            <p className="font-semibold text-gray-900">{a.label}</p>
            <p className="text-sm text-gray-500 mt-1">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
