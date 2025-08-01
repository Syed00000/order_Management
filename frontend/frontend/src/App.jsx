import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import LandingPage from './pages/SimpleLandingPage'
import Dashboard from './pages/Dashboard'
import CreateOrder from './pages/CreateOrder'
import OrderDetails from './pages/OrderDetails'

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Landing Page - No Navbar */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard Routes - With Navbar */}
            <Route path="/dashboard" element={
              <div>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Dashboard />
                </main>
              </div>
            } />
            <Route path="/create" element={
              <div>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <CreateOrder />
                </main>
              </div>
            } />
            <Route path="/orders/:id" element={
              <div>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <OrderDetails />
                </main>
              </div>
            } />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
