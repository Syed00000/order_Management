import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { orderAPI } from '../services/api'
import {
  DocumentArrowUpIcon,
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const CreateOrder = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    orderAmount: '',
    invoiceFile: null,
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    items: [{
      productName: '',
      productId: '',
      quantity: 1,
      unitPrice: 0
    }],
    priority: 'MEDIUM',
    notes: ''
  })
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const handleFile = (file) => {
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file')
        return
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB')
        return
      }
      setFormData(prev => ({
        ...prev,
        invoiceFile: file
      }))
      toast.success('File selected successfully')
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      toast.error('Customer name is required')
      return false
    }
    if (!formData.orderAmount || parseFloat(formData.orderAmount) <= 0) {
      toast.error('Please enter a valid order amount')
      return false
    }
    if (!formData.invoiceFile) {
      toast.error('Please select an invoice file')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    const loadingToast = toast.loading('Creating order...')

    try {
      const orderData = {
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        items: formData.items.map(item => ({
          productName: item.productName.trim(),
          productId: item.productId.trim() || `PROD-${Date.now()}`,
          quantity: parseInt(item.quantity),
          unitPrice: parseFloat(item.unitPrice)
        })),
        shippingAddress: formData.shippingAddress,
        priority: formData.priority,
        notes: formData.notes.trim(),
        invoiceFile: formData.invoiceFile
      }

      const response = await orderAPI.createOrder(orderData)
      
      toast.dismiss(loadingToast)
      toast.success('Order created successfully!')
      
      // Navigate to the created order details
      navigate(`/orders/${response.orderId}`)
      
    } catch (error) {
      toast.dismiss(loadingToast)
      console.error('Error creating order:', error)
      
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Failed to create order. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      customerName: '',
      orderAmount: '',
      invoiceFile: null
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Order</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Fill in the details to create a new order</p>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Customer Name */}
          <div>
            <label htmlFor="customerName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <div className="relative">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Customer Email */}
          <div>
            <label htmlFor="customerEmail" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Customer Email *
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                placeholder="Enter customer email"
                className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Customer Phone */}
          <div>
            <label htmlFor="customerPhone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Customer Phone *
            </label>
            <div className="relative">
              <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                placeholder="Enter customer phone"
                className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Order Amount */}
          <div>
            <label htmlFor="orderAmount" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Order Amount *
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="orderAmount"
                name="orderAmount"
                value={formData.orderAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice File (PDF) *
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                dragActive 
                  ? 'border-primary-500 bg-primary-50' 
                  : formData.invoiceFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {formData.invoiceFile ? (
                <div className="space-y-2">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-green-700">
                    {formData.invoiceFile.name}
                  </p>
                  <p className="text-xs text-green-600">
                    {(formData.invoiceFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-sm font-medium text-gray-700">
                    Drop your PDF file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Maximum file size: 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Order...' : 'Create Order'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="btn-secondary flex-1"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateOrder
