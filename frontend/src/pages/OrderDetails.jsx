import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { orderAPI } from '../services/api'
import { 
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrderDetails()
  }, [id])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await orderAPI.getOrderById(id)

      setOrder(data)
    } catch (error) {
      console.error('Error fetching order details:', error)
      setError('Order not found or failed to load')
      toast.error('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (order?.invoiceFileUrl) {
      const link = document.createElement('a')
      link.href = order.invoiceFileUrl
      link.download = `invoice-${order.customerName}-${order.id}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Download started')
    } else {
      toast.error('Invoice file not available')
    }
  }

  const handleDelete = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the order for "${order.customerName}"?\n\nThis action cannot be undone and you will be redirected to the dashboard.`
    )
    
    if (!isConfirmed) {
      return
    }

    const loadingToast = toast.loading('Deleting order...')
    
    try {
      await orderAPI.deleteOrder(order?._id || order?.id)
      
      toast.dismiss(loadingToast)
      toast.success('Order deleted successfully!')
      
      // Redirect to dashboard after successful deletion
      navigate('/')
    } catch (error) {
      toast.dismiss(loadingToast)
      console.error('Error deleting order:', error)
      
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Failed to delete order. Please try again.')
      }
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy \'at\' HH:mm')
    } catch (error) {
      return 'Invalid Date'
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return <LoadingSpinner text="Loading order details..." />
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Go Back
            </button>
            <Link to="/" className="btn-primary">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm sm:text-base text-gray-600">Order #{order && (order._id || order.id) ? (order._id || order.id).slice(-8) : 'N/A'}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <DocumentArrowDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Download Invoice</span>
          </button>
          <button
            onClick={handleDelete}
            className="btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Delete Order</span>
          </button>
        </div>
      </div>

      {/* Order Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Basic Details */}
        <div className="card">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Information</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Customer Name</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{order.customerName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CurrencyDollarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Order Amount</p>
                <p className="font-medium text-gray-900 text-base sm:text-lg">
                  {formatAmount(order.orderAmount)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {formatDate(order.orderDate)}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Status</h3>
              <StatusBadge status={order.status || 'PENDING'} />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="card">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Invoice Details</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Invoice File</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">PDF Document</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                Click the button below to download the invoice PDF file.
              </p>
              <button
                onClick={handleDownload}
                className="w-full btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <DocumentArrowDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Download Invoice PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Order Summary */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h2>
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Order ID</h3>
              <p className="text-gray-600 font-mono text-xs sm:text-sm break-all">{order.id}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Status</h3>
              <StatusBadge status={order.status || 'PENDING'} />
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <span className="text-base sm:text-lg font-medium text-gray-900">Total Amount</span>
              <span className="text-xl sm:text-2xl font-bold text-primary-600">
                {formatAmount(order.orderAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default OrderDetails