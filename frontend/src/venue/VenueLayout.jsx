import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  FaTachometerAlt, FaCalendarAlt, FaUserFriends, FaEnvelope,
  FaCalendarCheck, FaCreditCard, FaQrcode, FaBars, FaTimes, FaSignOutAlt
} from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5'

const navItems = [
  { to: '/venue', label: 'Overview', icon: FaTachometerAlt, end: true },
  { to: '/venue/events', label: 'My Events', icon: FaCalendarAlt },
  { to: '/venue/guests', label: 'Guests', icon: FaUserFriends },
  { to: '/venue/invitations', label: 'Invitations', icon: FaEnvelope },
  { to: '/venue/registrations', label: 'Registrations', icon: FaCalendarCheck },
  { to: '/venue/payments', label: 'Payments', icon: FaCreditCard },
  { to: '/venue/checkin', label: 'Check-In', icon: FaQrcode },
]

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
  }`

export default function VenueLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2d5a] flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <IoCalendarOutline className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">EventManager</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 py-2 mt-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 px-2">Venue Owner</span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setOpen(false)}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <FaSignOutAlt className="h-4 w-4" />
            Back to Site
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <FaBars className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">V</div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Venue Owner</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
