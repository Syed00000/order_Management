import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { orderAPI } from '../services/api'
import toast from 'react-hot-toast'

const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'PENDING')
  const [loading, setLoading] = useState(false)

  // Update selectedStatus when order changes
  React.useEffect(() => {
    if (order?.status) {

      setSelectedStatus(order.status)
    }
  }, [order])

  const statusOptions = [
    { value: 'PENDING', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'CONFIRMED', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'PROCESSING', label: 'Processing', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'SHIPPED', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    { value: 'DELIVERED', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      await orderAPI.updateOrderStatus(order._id || order.id, selectedStatus)
      toast.success('Order status updated successfully!')
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update order status')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Update Order Status</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Order ID: <span className="font-medium">#{(order?._id || order?.id)?.slice(-8)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Customer: <span className="font-medium">{order?.customerName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select New Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="mr-3"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-4 py-2 text-sm"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StatusUpdateModal