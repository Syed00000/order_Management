const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// @route   GET /health
// @desc    Basic health check
// @access  Public
router.get('/', async (req, res) => {
  try {
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      service: 'Order Management System API'
    };

    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// @route   GET /health/detailed
// @desc    Detailed health check with database status
// @access  Public
router.get('/detailed', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Check database connection
    let dbStatus = 'OK';
    let dbResponseTime = 0;
    let dbError = null;
    
    try {
      const dbStart = Date.now();
      await mongoose.connection.db.admin().ping();
      dbResponseTime = Date.now() - dbStart;
    } catch (error) {
      dbStatus = 'ERROR';
      dbError = error.message;
    }

    // Check collections
    let collectionsStatus = 'OK';
    let collectionsInfo = {};
    
    try {
      const userCount = await User.countDocuments();
      const orderCount = await Order.countDocuments();
      
      collectionsInfo = {
        users: userCount,
        orders: orderCount
      };
    } catch (error) {
      collectionsStatus = 'ERROR';
      collectionsInfo = { error: error.message };
    }

    // System information
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      },
      cpu: process.cpuUsage()
    };

    const totalResponseTime = Date.now() - startTime;
    const overallStatus = dbStatus === 'OK' && collectionsStatus === 'OK' ? 'OK' : 'DEGRADED';

    const healthCheck = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${totalResponseTime}ms`,
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      service: 'Order Management System API',
      checks: {
        database: {
          status: dbStatus,
          responseTime: `${dbResponseTime}ms`,
          connection: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
          error: dbError
        },
        collections: {
          status: collectionsStatus,
          info: collectionsInfo
        }
      },
      system: systemInfo
    };

    const statusCode = overallStatus === 'OK' ? 200 : 503;
    res.status(statusCode).json(healthCheck);

  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message,
      service: 'Order Management System API'
    });
  }
});

// @route   GET /health/ready
// @desc    Readiness probe for Kubernetes/Docker
// @access  Public
router.get('/ready', async (req, res) => {
  try {
    // Check if database is ready
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        status: 'NOT_READY',
        reason: 'Database not connected'
      });
    }

    // Quick database operation test
    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      status: 'READY',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(503).json({
      status: 'NOT_READY',
      reason: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// @route   GET /health/live
// @desc    Liveness probe for Kubernetes/Docker
// @access  Public
router.get('/live', (req, res) => {
  res.status(200).json({
    status: 'ALIVE',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// @route   GET /health/metrics
// @desc    Basic metrics for monitoring
// @access  Public
router.get('/metrics', async (req, res) => {
  try {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    // Get basic database metrics
    let dbMetrics = {};
    try {
      const userCount = await User.countDocuments();
      const orderCount = await Order.countDocuments();
      const recentOrders = await Order.countDocuments({
        orderDate: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      });
      
      dbMetrics = {
        totalUsers: userCount,
        totalOrders: orderCount,
        ordersLast24h: recentOrders
      };
    } catch (error) {
      dbMetrics = { error: 'Unable to fetch database metrics' };
    }

    const metrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        heapUsed: memoryUsage.heapUsed,
        heapTotal: memoryUsage.heapTotal,
        external: memoryUsage.external,
        rss: memoryUsage.rss
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      database: dbMetrics,
      environment: process.env.NODE_ENV || 'development'
    };

    res.status(200).json(metrics);

  } catch (error) {
    res.status(500).json({
      error: 'Unable to fetch metrics',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
