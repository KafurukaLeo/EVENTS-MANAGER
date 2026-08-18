import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaCreditCard, FaCheckCircle, FaChartBar, FaArrowRight } from 'react-icons/fa'

const API = 'http://localhost:5000/api'

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <Link to={to} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
    </div>
    <FaArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
  </Link>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/reports`)
      .then((r) => r.json())
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { icon: FaCalendarAlt, label: 'Total Events', value: stats?.totalEvents, color: 'bg-blue-600', to: '/admin/events' },
    { icon: FaCreditCard, label: 'Total Payments', value: stats?.totalPayments, color: 'bg-indigo-600', to: '/admin/payments' },
    { icon: FaChartBar, label: 'Total Revenue', value: stats ? `$${stats.totalRevenue.toFixed(2)}` : null, color: 'bg-green-600', to: '/admin/reports' },
    { icon: FaCheckCircle, label: 'Total Check-ins', value: stats?.totalCheckIns, color: 'bg-purple-600', to: '/admin/registrations' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your event platform</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => <StatCard key={c.label} {...c} />)}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Manage Events', desc: 'Create, edit and delete events', to: '/admin/events', color: 'border-blue-200 hover:border-blue-400' },
          { label: 'Manage Users', desc: 'View and remove user accounts', to: '/admin/users', color: 'border-indigo-200 hover:border-indigo-400' },
          { label: 'View Payments', desc: 'Track all payment transactions', to: '/admin/payments', color: 'border-green-200 hover:border-green-400' },
          { label: 'Send Invitations', desc: 'Invite guests to events', to: '/admin/invitations', color: 'border-purple-200 hover:border-purple-400' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className={`bg-white rounded-xl border-2 p-5 transition-colors ${item.color}`}>
            <p className="font-semibold text-gray-900">{item.label}</p>
            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
