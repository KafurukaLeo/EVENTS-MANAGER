import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/api/payments'

export default function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API).then(r => r.json()).then(res => setPayments(res.data || [])).catch(() => setPayments([])).finally(() => setLoading(false))
  }, [])

  const statusBadge = (status) => {
    const map = { paid: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', failed: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  const total = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">{payments.length} transactions · Total: <span className="font-semibold text-gray-700">${total.toFixed(2)}</span></p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse" />)}</div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">No payments found.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Registration', 'User', 'Amount', 'Method', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">#{p.id}</td>
                  <td className="px-4 py-3 text-gray-600">#{p.registration_id}</td>
                  <td className="px-4 py-3 text-gray-600">{p.user_name || p.user_id || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">${parseFloat(p.amount || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{p.method || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(p.status)}`}>{p.status || 'pending'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.created_at?.slice(0,10) || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
