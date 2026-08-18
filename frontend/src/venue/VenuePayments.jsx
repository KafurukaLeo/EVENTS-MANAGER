import { useEffect, useState } from 'react'
import { FaUpload, FaTimes } from 'react-icons/fa'

const API = 'http://localhost:5000/api'

export default function VenuePayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadId, setUploadId] = useState(null)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const load = () => {
    setLoading(true)
    fetch(`${API}/payments`).then(r => r.json()).then(res => setPayments(res.data || [])).catch(() => setPayments([])).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true); setUploadError('')
    try {
      const fd = new FormData()
      fd.append('proof', file)
      const res = await fetch(`${API}/payments/${uploadId}/proof`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Upload failed')
      setUploadId(null); setFile(null); load()
    } catch (err) { setUploadError(err.message) }
    finally { setUploading(false) }
  }

  const statusBadge = (status) => {
    const map = { Paid: 'bg-green-100 text-green-700', Pending: 'bg-yellow-100 text-yellow-700', Failed: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  const total = payments.reduce((s, p) => s + parseFloat(p.amount || 0), 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500 mt-1">{payments.length} transactions · Revenue: <span className="font-semibold text-gray-700">${total.toFixed(2)}</span></p>
      </div>

      {/* Upload proof modal */}
      {uploadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Upload Payment Proof</h2>
              <button onClick={() => { setUploadId(null); setFile(null); setUploadError('') }} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              {uploadError && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{uploadError}</p>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment #{uploadId} — Proof file</label>
                <input type="file" required accept="image/*,.pdf" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => { setUploadId(null); setFile(null) }} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={uploading || !file} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse" />)}</div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">No payments yet.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Registration', 'Amount', 'Method', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">#{p.id}</td>
                  <td className="px-4 py-3 text-gray-600">#{p.registration_id}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">${parseFloat(p.amount || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{p.method || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(p.status)}`}>{p.status || 'Pending'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.created_at?.slice(0, 10) || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setUploadId(p.id); setUploadError('') }} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors">
                      <FaUpload className="h-3 w-3" /> Proof
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
