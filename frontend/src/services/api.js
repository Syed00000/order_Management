import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Log API URL for debugging
console.log('API Base URL:', API_BASE_URL)

// Simple API without authentication

// Order API functions
export const orderAPI = {
  // Create a new order with file upload
  createOrder: async (orderData) => {
    const formData = new FormData()
    formData.append('customerName', orderData.customerName)
    formData.append('orderAmount', orderData.orderAmount)
    formData.append('invoiceFile', orderData.invoiceFile)

    const response = await axios.post(`${API_BASE_URL}/orders`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await api.get('/orders')
    return response.data
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  // Search orders
  searchOrders: async (params) => {
    const response = await api.get('/orders/search', { params })
    return response.data
  },

  // Delete order
  deleteOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`)
    return response.data
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status })
    return response.data
  },
}



// Analytics API functions
export const analyticsAPI = {
  // Get dashboard analytics
  getDashboardAnalytics: async () => {
    const response = await api.get('/analytics/dashboard')
    return response.data
  },

  // Get sales chart data
  getSalesChartData: async () => {
    const response = await api.get('/analytics/sales-chart')
    return response.data
  },
}

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health')
    return response.data
  },
}

export default api
