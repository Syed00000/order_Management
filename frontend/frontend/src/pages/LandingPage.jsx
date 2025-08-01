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

const LandingPage = () => {
  const features = [
    {
      name: 'Order Management',
      description: 'Create, track, and manage orders with ease. Upload invoices and monitor order status in real-time.',
      icon: DocumentTextIcon,
    },
    {
      name: 'Sales Analytics',
      description: 'Get detailed insights with interactive charts and reports. Track revenue, trends, and performance.',
      icon: ChartBarIcon,
    },
    {
      name: 'Secure Authentication',
      description: 'JWT-based authentication ensures your data is secure. Role-based access control for team management.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'File Upload',
      description: 'Upload and manage invoice files with automatic organization. Download invoices anytime.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Real-time Updates',
      description: 'Get instant updates on order status changes. Stay informed with real-time notifications.',
      icon: CursorArrowRaysIcon,
    },
    {
      name: 'Team Collaboration',
      description: 'Work together with your team. Assign roles and manage permissions for better workflow.',
      icon: UserGroupIcon,
    },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-primary-600">OrderFlow</span>
            </Link>
          </div>
          <div className="flex lg:flex-1 lg:justify-end space-x-4">
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/register" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-primary-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Streamline Your Order Management
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Powerful, intuitive order management system with real-time analytics, secure file handling, and seamless team collaboration. Take control of your business operations today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Start Free Trial
              </Link>
              <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600">
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-400 to-primary-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Complete Order Management Solution
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From order creation to analytics, we've got you covered. Our comprehensive platform provides all the tools you need to manage your business efficiently.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-primary-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-primary-200">Orders Processed</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">10,000+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-primary-200">Happy Customers</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">500+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-primary-200">Uptime</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">99.9%</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Join thousands of businesses already using OrderFlow to streamline their operations and boost productivity.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Get started today
                </Link>
                <Link to="/contact" className="text-sm font-semibold leading-6 text-white">
                  Contact sales <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-xs leading-5 text-gray-400">
              &copy; 2024 OrderFlow. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              Built with ❤️ for better business management
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage