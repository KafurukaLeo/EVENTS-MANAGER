import { useEffect, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

const API = 'http://localhost:5000/api/invitations'
const EMPTY = { event_id: '', email: '' }

export default function AdminInvitations() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    fetch(API).then(r => r.json()).then(res => setInvitations(res.data || [])).catch(() => setInvitations([])).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
      setShowForm(false)
      setForm(EMPTY)
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const statusBadge = (status) => {
    const map = { accepted: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', declined: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invitations</h1>
          <p className="text-sm text-gray-500 mt-1">{invitations.length} total invitations</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setError(''); setShowForm(true) }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <FaPlus className="h-3.5 w-3.5" /> Send Invitation
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Send Invitation</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event ID *</label>
                <input required type="number" value={form.event_id} onChange={e => setForm(f => ({...f, event_id: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {saving ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse" />)}</div>
      ) : invitations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">No invitations sent yet.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Event', 'Email', 'Status', 'Sent'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invitations.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">#{inv.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{inv.event_name || `Event #${inv.event_id}`}</td>
                  <td className="px-4 py-3 text-gray-600">{inv.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(inv.status)}`}>{inv.status || 'pending'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{inv.created_at?.slice(0,10) || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
