import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const API = 'http://localhost:5000/api/registrations'

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetch(API).then(r => r.json()).then(res => setRegistrations(res.data || [])).catch(() => setRegistrations([])).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleCancel = async (id) => {
    if (!confirm('Cancel this registration?')) return
    await fetch(API, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ registration_id: id }) })
    load()
  }

  const statusBadge = (status) => {
    const map = { confirmed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', cancelled: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
        <p className="text-sm text-gray-500 mt-1">{registrations.length} total registrations</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse" />)}</div>
      ) : registrations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">No registrations found.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Event', 'User / Email', 'Status', 'Registered', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">#{r.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.event_name || r.event_id}</td>
                  <td className="px-4 py-3 text-gray-600">{r.user_name || r.email || r.user_id}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>{r.status || 'pending'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.created_at?.slice(0,10) || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleCancel(r.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
