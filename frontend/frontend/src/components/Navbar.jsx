import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity duration-200">
            <DocumentTextIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
            <h1 className="text-base sm:text-xl font-bold text-gray-800 hidden xs:block">Order Management</h1>
            <h1 className="text-sm font-bold text-gray-800 xs:hidden">OMS</h1>
          </Link>

          <div className="flex space-x-1 sm:space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                isActive('/')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Home</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ${
                isActive('/dashboard')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Dashboard</span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
