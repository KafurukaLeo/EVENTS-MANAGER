// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import Terms from './components/common/Terms'
import Privacy from './components/common/Privacy'
import NotFound from './pages/NotFound'
import Layout from './components/layout/Layout'
import Home from './components/layout/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Public pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
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