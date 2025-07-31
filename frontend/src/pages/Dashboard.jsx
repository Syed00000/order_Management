import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { orderAPI, analyticsAPI } from '../services/api'
import { 
  EyeIcon, 
  DocumentArrowDownIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'
import SalesChart from '../components/SalesChart'
import StatusBadge from '../components/StatusBadge'
import StatusUpdateModal from '../components/StatusUpdateModal'

const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOrders, setFilteredOrders] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
    fetchAnalytics()
  }, [])

  useEffect(() => {
    // Filter orders based on search term
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter(order =>
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order._id || order.id)?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredOrders(filtered)
    }
  }, [orders, searchTerm])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await orderAPI.getAllOrders()

      // Extract orders from API response structure
      const orders = response.data?.orders || []
      setOrders(orders)
      setFilteredOrders(orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const [analyticsResponse, chartResponse] = await Promise.all([
        analyticsAPI.getDashboardAnalytics(),
        analyticsAPI.getSalesChartData()
      ])

      // Extract data from API response structure
      console.log('📊 Analytics Response:', analyticsResponse)
      console.log('📈 Chart Response:', chartResponse)
      setAnalytics(analyticsResponse.data || null)
      setChartData(chartResponse.data || null)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      // Don't show error toast for analytics as it's not critical
    }
  }

  const handleDownload = (url, customerName) => {
    if (url) {
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-${customerName}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      toast.error('Invoice file not available')
    }
  }

  const handleDelete = async (orderId, customerName) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the order for "${customerName}"?\n\nThis action cannot be undone.`
    )
    
    if (!isConfirmed) {
      return
    }

    const loadingToast = toast.loading('Deleting order...')
    
    try {
      await orderAPI.deleteOrder(orderId)
      
      // Remove the order from the local state
      setOrders(prevOrders => prevOrders.filter(order => (order._id || order.id) !== orderId))
      setFilteredOrders(prevOrders => prevOrders.filter(order => (order._id || order.id) !== orderId))
      
      toast.dismiss(loadingToast)
      toast.success('Order deleted successfully!')
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
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
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

  const handleStatusUpdate = (order) => {
    setSelectedOrder(order)
    setStatusModalOpen(true)
  }

  const handleStatusModalClose = () => {
    setStatusModalOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusUpdated = () => {

    fetchOrders()
    fetchAnalytics()
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track all your orders</p>
        </div>
        <Link
          to="/create"
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create New Order</span>
        </Link>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingCartIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{analytics.overview?.totalOrders || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${analytics.overview?.totalRevenue?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowTrendingUpIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Avg Order Value</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${analytics.overview?.avgOrderValue?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Delivered Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {analytics.statusDistribution?.DELIVERED?.count || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
            {chartData.chartData && chartData.chartData.length > 0 ? (
              <SalesChart
                data={{
                  labels: chartData.chartData.map(item => item.date),
                  datasets: [{
                    label: 'Sales ($)',
                    data: chartData.chartData.map(item => item.sales),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1,
                  }]
                }}
                type="bar"
              />
            ) : (
              <p className="text-gray-500 text-center py-8">No sales data available</p>
            )}
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
            {analytics.statusDistribution ? (
              <SalesChart
                data={{
                  labels: Object.keys(analytics.statusDistribution),
                  datasets: [{
                    data: Object.values(analytics.statusDistribution).map(status => status.count),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)',
                      'rgba(255, 205, 86, 0.8)',
                      'rgba(75, 192, 192, 0.8)',
                      'rgba(153, 102, 255, 0.8)',
                    ],
                    borderWidth: 1,
                  }]
                }}
                type="doughnut"
              />
            ) : (
              <p className="text-gray-500 text-center py-8">No status data available</p>
            )}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="card">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            All Orders ({filteredOrders.length})
          </h2>
          <button
            onClick={() => {

              fetchOrders()
              fetchAnalytics()
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary-500"
          >
            Refresh Data
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <DocumentArrowDownIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first order'}
            </p>
            {!searchTerm && (
              <Link to="/create" className="btn-primary">
                Create First Order
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id || order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{(order._id || order.id)?.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(order.orderAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusUpdate(order)}
                        className="hover:bg-gray-50 p-1 rounded"
                      >
                        <StatusBadge
                          key={`${order._id || order.id}-${order.status}`}
                          status={order.status || 'PENDING'}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/orders/${order._id || order.id}`}
                          className="text-primary-600 hover:text-primary-900 inline-flex items-center space-x-1"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>View</span>
                        </Link>
                        <button
                          onClick={() => handleDownload(order.invoiceFileUrl, order.customerName)}
                          className="text-green-600 hover:text-green-900 inline-flex items-center space-x-1"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleDelete(order._id || order.id, order.customerName)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center space-x-1"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      <StatusUpdateModal
        isOpen={statusModalOpen}
        onClose={handleStatusModalClose}
        order={selectedOrder}
        onUpdate={handleStatusUpdated}
      />
    </div>
  )
}

export default Dashboard
