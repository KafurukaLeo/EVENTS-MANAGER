import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/api/tickets'

export default function AdminTickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API).then(r => r.json()).then(res => setTickets(res.data || [])).catch(() => setTickets([])).finally(() => setLoading(false))
  }, [])

  const statusBadge = (status) => {
    const map = { active: 'bg-green-100 text-green-700', used: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
        <p className="text-sm text-gray-500 mt-1">{tickets.length} total tickets</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse" />)}</div>
      ) : tickets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">No tickets found.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Ticket ID', 'Event', 'User', 'Registration', 'Status', 'Issued'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">#{t.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{t.event_name || `Event #${t.event_id}`}</td>
                  <td className="px-4 py-3 text-gray-600">{t.user_name || t.user_id || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">#{t.registration_id}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(t.status)}`}>{t.status || 'active'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.created_at?.slice(0,10) || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
