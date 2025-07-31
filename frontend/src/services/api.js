import axios from 'axios'

// MERN Stack Environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Order Management System'
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Name': APP_NAME,
    'X-App-Version': APP_VERSION,
  },
})

// Log MERN Stack environment info for debugging
console.log('🌍 MERN Stack Environment Info:')
console.log('API Base URL:', API_BASE_URL)
console.log('Backend:', 'Node.js Express Server')
console.log('Database:', 'MongoDB Atlas')
console.log('App Name:', APP_NAME)
console.log('App Version:', APP_VERSION)
console.log('Node Environment:', import.meta.env.NODE_ENV)

// Authentication API functions
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials)
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me')
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
  }
}

// Order API functions
export const orderAPI = {
  // Create a new order with file upload
  createOrder: async (orderData) => {
    const formData = new FormData()
    formData.append('customerName', orderData.customerName)
    formData.append('orderAmount', orderData.orderAmount)
    formData.append('invoiceFile', orderData.invoiceFile)

    const response = await api.post('/api/orders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await api.get('/api/orders')
    return response.data
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/api/orders/${id}`)
    return response.data
  },

  // Search orders
  searchOrders: async (params) => {
    const response = await api.get('/api/orders/search', { params })
    return response.data
  },

  // Delete order
  deleteOrder: async (id) => {
    const response = await api.delete(`/api/orders/${id}`)
    return response.data
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/api/orders/${id}/status`, { status })
    return response.data
  },
}



// Analytics API functions
export const analyticsAPI = {
  // Get dashboard analytics
  getDashboardAnalytics: async () => {
    const response = await api.get('/api/analytics/dashboard')
    return response.data
  },

  // Get sales chart data
  getSalesChartData: async () => {
    const response = await api.get('/api/analytics/sales-chart')
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
