const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');
const moment = require('moment');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Public
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Total orders
    const totalOrders = await Order.countDocuments();
    
    // Orders this month
    const ordersThisMonth = await Order.countDocuments({
      orderDate: { $gte: startOfMonth }
    });

    // Orders this week
    const ordersThisWeek = await Order.countDocuments({
      orderDate: { $gte: startOfWeek }
    });

    // Orders today
    const ordersToday = await Order.countDocuments({
      orderDate: { $gte: startOfDay }
    });

    // Total revenue
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'PAID' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Revenue this month
    const revenueThisMonthResult = await Order.aggregate([
      { 
        $match: { 
          paymentStatus: 'PAID',
          orderDate: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const revenueThisMonth = revenueThisMonthResult[0]?.total || 0;

    // Order status distribution
    const statusDistribution = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Priority distribution
    const priorityDistribution = await Order.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Payment method distribution
    const paymentMethodDistribution = await Order.aggregate([
      { $group: { _id: '$paymentMethod', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('customerId', 'name email')
      .sort({ orderDate: -1 })
      .limit(5);

    // Top customers by order count
    const topCustomers = await Order.aggregate([
      { $group: { 
          _id: '$customerId', 
          orderCount: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          customerEmail: { $first: '$customerEmail' },
          customerName: { $first: '$customerName' }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 5 }
    ]);

    // Average order value
    const avgOrderValueResult = await Order.aggregate([
      { $group: { _id: null, avgValue: { $avg: '$totalAmount' } } }
    ]);
    const avgOrderValue = avgOrderValueResult[0]?.avgValue || 0;

    // Total customers
    const totalCustomers = await User.countDocuments({ role: 'USER' });

    // Active customers (ordered in last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const activeCustomers = await Order.distinct('customerId', {
      orderDate: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalOrders,
          ordersThisMonth,
          ordersThisWeek,
          ordersToday,
          totalRevenue,
          revenueThisMonth,
          avgOrderValue,
          totalCustomers,
          activeCustomers: activeCustomers.length
        },
        distributions: {
          status: statusDistribution,
          priority: priorityDistribution,
          paymentMethod: paymentMethodDistribution
        },
        recentOrders,
        topCustomers
      }
    });

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard analytics'
    });
  }
});

// @route   GET /api/analytics/sales-chart
// @desc    Get sales chart data
// @access  Private (Admin/Manager)
router.get('/sales-chart', auth, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const { period = 'month', year = new Date().getFullYear() } = req.query;

    let groupBy, dateFormat, startDate, endDate;

    if (period === 'year') {
      // Group by month for yearly view
      groupBy = { 
        year: { $year: '$orderDate' },
        month: { $month: '$orderDate' }
      };
      dateFormat = 'YYYY-MM';
      startDate = new Date(year, 0, 1);
      endDate = new Date(parseInt(year) + 1, 0, 1);
    } else if (period === 'week') {
      // Group by day for weekly view (last 7 days)
      groupBy = {
        year: { $year: '$orderDate' },
        month: { $month: '$orderDate' },
        day: { $dayOfMonth: '$orderDate' }
      };
      dateFormat = 'YYYY-MM-DD';
      endDate = new Date();
      startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else {
      // Group by day for monthly view
      groupBy = {
        year: { $year: '$orderDate' },
        month: { $month: '$orderDate' },
        day: { $dayOfMonth: '$orderDate' }
      };
      dateFormat = 'YYYY-MM-DD';
      startDate = new Date(year, new Date().getMonth(), 1);
      endDate = new Date(year, new Date().getMonth() + 1, 1);
    }

    const salesData = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: startDate, $lt: endDate },
          paymentStatus: 'PAID'
        }
      },
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Format data for chart
    const chartData = salesData.map(item => {
      let date;
      if (period === 'year') {
        date = moment(`${item._id.year}-${item._id.month}`, 'YYYY-M').format('MMM YYYY');
      } else {
        date = moment(`${item._id.year}-${item._id.month}-${item._id.day}`, 'YYYY-M-D').format('MMM DD');
      }
      
      return {
        date,
        sales: item.totalSales,
        orders: item.orderCount
      };
    });

    res.json({
      success: true,
      data: {
        chartData,
        period,
        year
      }
    });

  } catch (error) {
    console.error('Sales chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sales chart data'
    });
  }
});

// @route   GET /api/analytics/order-trends
// @desc    Get order trends data
// @access  Private (Admin/Manager)
router.get('/order-trends', auth, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000);

    const trends = await Order.aggregate([
      { $match: { orderDate: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' },
            day: { $dayOfMonth: '$orderDate' }
          },
          totalOrders: { $sum: 1 },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] }
          },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'DELIVERED'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'CANCELLED'] }, 1, 0] }
          }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    const trendData = trends.map(item => ({
      date: moment(`${item._id.year}-${item._id.month}-${item._id.day}`, 'YYYY-M-D').format('MMM DD'),
      total: item.totalOrders,
      pending: item.pendingOrders,
      completed: item.completedOrders,
      cancelled: item.cancelledOrders
    }));

    res.json({
      success: true,
      data: { trendData }
    });

  } catch (error) {
    console.error('Order trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order trends'
    });
  }
});

// @route   GET /api/analytics/customer-insights
// @desc    Get customer insights
// @access  Private (Admin/Manager)
router.get('/customer-insights', auth, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    // Customer lifetime value
    const customerLTV = await Order.aggregate([
      { $match: { paymentStatus: 'PAID' } },
      {
        $group: {
          _id: '$customerId',
          totalSpent: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          firstOrder: { $min: '$orderDate' },
          lastOrder: { $max: '$orderDate' },
          customerName: { $first: '$customerName' },
          customerEmail: { $first: '$customerEmail' }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ]);

    // New vs returning customers (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const newCustomers = await Order.aggregate([
      { $match: { orderDate: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: '$customerId',
          firstOrder: { $min: '$orderDate' },
          orderCount: { $sum: 1 }
        }
      },
      { $match: { firstOrder: { $gte: thirtyDaysAgo } } },
      { $count: 'newCustomers' }
    ]);

    const returningCustomers = await Order.aggregate([
      { $match: { orderDate: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: '$customerId',
          firstOrder: { $min: '$orderDate' },
          orderCount: { $sum: 1 }
        }
      },
      { $match: { firstOrder: { $lt: thirtyDaysAgo } } },
      { $count: 'returningCustomers' }
    ]);

    // Customer segments by order frequency
    const customerSegments = await Order.aggregate([
      {
        $group: {
          _id: '$customerId',
          orderCount: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' }
        }
      },
      {
        $bucket: {
          groupBy: '$orderCount',
          boundaries: [1, 2, 5, 10, 50],
          default: '50+',
          output: {
            customers: { $sum: 1 },
            avgSpent: { $avg: '$totalSpent' }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        topCustomers: customerLTV,
        customerAcquisition: {
          newCustomers: newCustomers[0]?.newCustomers || 0,
          returningCustomers: returningCustomers[0]?.returningCustomers || 0
        },
        customerSegments
      }
    });

  } catch (error) {
    console.error('Customer insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching customer insights'
    });
  }
});

module.exports = router;
