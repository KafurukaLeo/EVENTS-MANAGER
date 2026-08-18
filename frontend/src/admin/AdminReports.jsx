import { useEffect, useState } from 'react'
import { FaCalendarAlt, FaCreditCard, FaDollarSign, FaCheckCircle } from 'react-icons/fa'

const API = 'http://localhost:5000/api/reports'

export default function AdminReports() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API).then(r => r.json()).then(res => setData(res.data)).catch(() => setData(null)).finally(() => setLoading(false))
  }, [])

  const metrics = data ? [
    { icon: FaCalendarAlt, label: 'Total Events', value: data.totalEvents, color: 'bg-blue-600', light: 'bg-blue-50 text-blue-700' },
    { icon: FaCreditCard, label: 'Total Payments', value: data.totalPayments, color: 'bg-indigo-600', light: 'bg-indigo-50 text-indigo-700' },
    { icon: FaDollarSign, label: 'Total Revenue', value: `$${data.totalRevenue.toFixed(2)}`, color: 'bg-green-600', light: 'bg-green-50 text-green-700' },
    { icon: FaCheckCircle, label: 'Total Check-ins', value: data.totalCheckIns, color: 'bg-purple-600', light: 'bg-purple-50 text-purple-700' },
  ] : []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide statistics summary</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-32 animate-pulse" />)}</div>
      ) : !data ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">Could not load report data.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className={`inline-flex p-3 rounded-xl ${m.color} mb-4`}>
                  <m.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{m.value}</p>
                <p className="text-sm text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Summary Breakdown</h2>
            <div className="space-y-4">
              {metrics.map((m) => {
                const numVal = typeof m.value === 'string' ? parseFloat(m.value.replace('$','')) : m.value
                const max = Math.max(...metrics.map(x => typeof x.value === 'string' ? parseFloat(x.value.replace('$','')) : x.value), 1)
                const pct = Math.round((numVal / max) * 100)
                return (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{m.label}</span>
                      <span className="font-semibold text-gray-900">{m.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
