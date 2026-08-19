import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const ROLES = ['admin', 'eventmanager', 'guest']
const ROLE_LABEL = { admin: 'Admin', eventmanager: 'Event Manager', guest: 'Guest' }
const ROLE_STYLE = {
  admin: 'bg-blue-100 text-blue-700',
  eventmanager: 'bg-indigo-100 text-indigo-700',
  guest: 'bg-gray-100 text-gray-600',
}

const badge = (role) => ROLE_STYLE[(role || '').toLowerCase()] || 'bg-gray-100 text-gray-600'
const label = (role) => ROLE_LABEL[(role || '').toLowerCase()] || role

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('em_token')}`,
  }

  const load = () => {
    setLoading(true)
    setError('')
    fetch(`${API}/users`, { headers })
      .then(r => r.json())
      .then(res => res.success ? setUsers(res.data || []) : setError(res.message || 'Failed to load'))
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    const res = await fetch(`${API}/users/${id}`, { method: 'DELETE', headers }).then(r => r.json())
    res.success ? load() : alert(res.message)
  }

  const handleRoleChange = async (id, role) => {
    setUpdatingId(id)
    const res = await fetch(`${API}/users/${id}/role`, {
      method: 'PATCH', headers, body: JSON.stringify({ role }),
    }).then(r => r.json())
    if (res.success) setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
    else alert(res.message)
    setUpdatingId(null)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-400 mt-1">{users.length} registered users</p>
        </div>
        <div className="flex gap-2">
          {ROLES.map(r => (
            <span key={r} className={`text-xs px-3 py-1 rounded-full font-medium ${badge(r)}`}>
              {label(r)}
            </span>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400 py-16 text-sm">No users found.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['User', 'Email', 'Role', 'Joined', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">

                  {/* Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">{u.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-gray-500">{u.email}</td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <select
                      value={(u.role || '').toLowerCase()}
                      disabled={updatingId === u.id}
                      onChange={e => handleRoleChange(u.id, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer disabled:opacity-50 ${badge(u.role)}`}
                    >
                      {ROLES.map(r => <option key={r} value={r}>{label(r)}</option>)}
                    </select>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {u.created_at?.slice(0, 10) || '—'}
                  </td>

                  {/* Delete */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDelete(u.id, u.name)}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash size={13} />
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
