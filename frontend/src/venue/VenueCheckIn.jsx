import { useEffect, useState } from 'react'
import { FaQrcode, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const API = 'http://localhost:5000/api'

export default function VenueCheckIn() {
  const [ticketId, setTicketId] = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState(null) // { success, message }
  const [checkins, setCheckins] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCheckins = () => {
    fetch(`${API}/checkin`).then(r => r.json()).then(res => setCheckins(res.data || [])).catch(() => setCheckins([])).finally(() => setLoading(false))
  }

  useEffect(() => { loadCheckins() }, [])

  const handleCheckIn = async (e) => {
    e.preventDefault()
    if (!ticketId.trim()) return
    setChecking(true); setResult(null)
    try {
      const res = await fetch(`${API}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket_id: parseInt(ticketId) }),
      })
      const data = await res.json()
      setResult({ success: res.ok, message: data.message || (res.ok ? 'Checked in!' : 'Failed') })
      if (res.ok) { setTicketId(''); loadCheckins() }
    } catch {
      setResult({ success: false, message: 'Network error' })
    } finally { setChecking(false) }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Check-In</h1>
        <p className="text-sm text-gray-500 mt-1">Verify and check in guests by ticket ID</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-in form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <FaQrcode className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Manual Check-In</p>
              <p className="text-sm text-gray-500">Enter the ticket ID to check in a guest</p>
            </div>
          </div>

          <form onSubmit={handleCheckIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticket ID</label>
              <input
                type="number"
                value={ticketId}
                onChange={e => setTicketId(e.target.value)}
                placeholder="Enter ticket ID..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={checking || !ticketId.trim()}
              className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {checking ? 'Checking in...' : 'Check In Guest'}
            </button>
          </form>

          {result && (
            <div className={`mt-4 flex items-center gap-3 px-4 py-3 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              {result.success
                ? <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                : <FaTimesCircle className="h-5 w-5 text-red-600 flex-shrink-0" />}
              <p className={`text-sm font-medium ${result.success ? 'text-green-700' : 'text-red-700'}`}>{result.message}</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="font-semibold text-gray-900 mb-4">Today's Check-Ins</p>
          <div className="text-5xl font-bold text-indigo-600 mb-1">{checkins.length}</div>
          <p className="text-sm text-gray-500">total check-ins recorded</p>
        </div>
      </div>

      {/* Check-in log */}
      <div className="mt-6">
        <h2 className="font-semibold text-gray-900 mb-4">Check-In Log</h2>
        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-14 animate-pulse" />)}</div>
        ) : checkins.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">No check-ins recorded yet.</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Check-In ID', 'Ticket', 'Ticket #', 'Checked In At'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {checkins.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">#{c.id}</td>
                    <td className="px-4 py-3 text-gray-600">#{c.ticket_id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">{c.ticket_number || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.checked_in_at ? new Date(c.checked_in_at).toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
