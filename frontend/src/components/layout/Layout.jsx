// frontend/src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This renders the child routes */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout