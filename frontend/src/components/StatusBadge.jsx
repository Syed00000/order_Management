import React from 'react'

const StatusBadge = ({ status }) => {


  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' }
      case 'CONFIRMED':
        return { color: 'bg-blue-100 text-blue-800', text: 'Confirmed' }
      case 'PROCESSING':
        return { color: 'bg-indigo-100 text-indigo-800', text: 'Processing' }
      case 'SHIPPED':
        return { color: 'bg-purple-100 text-purple-800', text: 'Shipped' }
      case 'DELIVERED':
        return { color: 'bg-green-100 text-green-800', text: 'Delivered' }
      case 'CANCELLED':
        return { color: 'bg-red-100 text-red-800', text: 'Cancelled' }
      // Legacy status support
      case 'COMPLETED':
        return { color: 'bg-green-100 text-green-800', text: 'Completed' }
      case 'DECLINED':
        return { color: 'bg-red-100 text-red-800', text: 'Declined' }
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Unknown' }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  )
}

export default StatusBadge