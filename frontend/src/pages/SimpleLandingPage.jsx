import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon,
  CloudArrowUpIcon,
  CursorArrowRaysIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const SimpleLandingPage = () => {
  const features = [
    {
      name: 'Order Management',
      description: 'Create, track, and manage orders with ease. Upload invoices and monitor order status in real-time.',
      icon: DocumentTextIcon,
    },
    {
      name: 'Sales Analytics',
      description: 'Get detailed insights into your sales performance with comprehensive analytics and reporting.',
      icon: ChartBarIcon,
    },
    {
      name: 'Secure Storage',
      description: 'Your data is securely stored with enterprise-grade security and backup systems.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Cloud Integration',
      description: 'Seamlessly integrate with cloud services for file storage and data synchronization.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Easy to Use',
      description: 'Intuitive interface designed for efficiency and ease of use for all team members.',
      icon: CursorArrowRaysIcon,
    },
    {
      name: 'Team Collaboration',
      description: 'Work together with your team to manage orders and track progress collaboratively.',
      icon: UserGroupIcon,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-4 sm:px-6 lg:px-8 min-h-[75vh] flex items-center">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-2xl py-4 sm:py-8">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <DocumentTextIcon className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Order Management Made Simple
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-600 px-2 sm:px-0">
              Efficiently manage your orders, track sales, and grow your business with our comprehensive order management system.
              Upload invoices, monitor progress, and get insights that matter.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 text-center"
              >
                Get Started
              </Link>
              <a href="#features" className="text-base sm:text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:text-center">
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Powerful features for modern businesses
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-600 px-2 sm:px-0">
              Our order management system provides all the tools you need to streamline your operations and grow your business.
            </p>
          </div>

          <div className="mx-auto mt-12 sm:mt-16 lg:mt-24 max-w-2xl lg:max-w-4xl">
            <dl className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-16 lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-12 sm:pl-16">
                  <dt className="text-sm sm:text-base font-semibold leading-6 sm:leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-600">
                      <feature.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-6 sm:leading-8 text-blue-200 px-2 sm:px-0">
              Start managing your orders efficiently today. No setup required, just click and begin.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
              <Link
                to="/login"
                className="w-full sm:w-auto rounded-md bg-white px-6 py-3 text-base sm:text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200 text-center"
              >
                Login Now
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 text-center"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-xs sm:text-sm text-gray-500">Order Management System</span>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2025 Order Management System. Built for efficiency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SimpleLandingPage
