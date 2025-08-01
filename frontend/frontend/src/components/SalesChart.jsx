import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

const SalesChart = ({ data, type = 'bar' }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: type === 'bar' ? 'Monthly Sales' : type === 'doughnut' ? 'Order Status Distribution' : 'Sales Trend',
      },
    },
    scales: type !== 'doughnut' ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
  }

  if (type === 'bar') {
    return <Bar data={data} options={options} />
  } else if (type === 'doughnut') {
    return <Doughnut data={data} options={options} />
  } else if (type === 'line') {
    return <Line data={data} options={options} />
  }

  return null
}

export default SalesChart