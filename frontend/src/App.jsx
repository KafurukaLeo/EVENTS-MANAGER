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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Public pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
        
        {/* Auth routes without Layout */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />


        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App