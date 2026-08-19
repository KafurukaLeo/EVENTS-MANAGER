// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import Terms from './components/common/Terms'
import Privacy from './components/common/Privacy'
import NotFound from './pages/NotFound'
import Layout from './components/layout/Layout'
import Home from './components/layout/Home'
import Contact from './components/layout/Contact'
import Faq from './components/layout/Faq'
import About from './components/layout/About'
import Book from './components/layout/Book'
import BookDetail from './components/layout/BookDetail'
import Event from './components/layout/Event'
import EventDetail from './components/layout/EventDetail'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminEvents from './admin/AdminEvents'
import AdminUsers from './admin/AdminUsers'
import AdminRegistrations from './admin/AdminRegistrations'
import AdminPayments from './admin/AdminPayments'
import AdminGuests from './admin/AdminGuests'
import AdminTickets from './admin/AdminTickets'
import AdminInvitations from './admin/AdminInvitations'
import AdminReports from './admin/AdminReports'
import VenueLayout from './venue/VenueLayout'
import VenueOverview from './venue/VenueOverview'
import VenueEvents from './venue/VenueEvents'
import VenueGuests from './venue/VenueGuests'
import VenueInvitations from './venue/VenueInvitations'
import VenueRegistrations from './venue/VenueRegistrations'
import VenuePayments from './venue/VenuePayments'
import VenueCheckIn from './venue/VenueCheckIn'
import Tickets from './pages/tickets/Tickets'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* ticket booking routes */}
          <Route path="/tickets" element={<Tickets />} />

          {/* Public pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* booking venue or location route */}
          <Route path="/book" element={<Book />} />
          <Route path="/book/:id" element={<BookDetail />} />

          {/* buying ticket route */}
          <Route path="/events" element={<Event />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="guests" element={<AdminGuests />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="invitations" element={<AdminInvitations />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
        
        {/* Auth routes without Layout */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Venue Owner routes */}
        <Route path="/venue" element={<VenueLayout />}>
          <Route index element={<VenueOverview />} />
          <Route path="events" element={<VenueEvents />} />
          <Route path="guests" element={<VenueGuests />} />
          <Route path="invitations" element={<VenueInvitations />} />
          <Route path="registrations" element={<VenueRegistrations />} />
          <Route path="payments" element={<VenuePayments />} />
          <Route path="checkin" element={<VenueCheckIn />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App