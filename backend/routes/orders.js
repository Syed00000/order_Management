const express = require('express');
const Joi = require('joi');
const Order = require('../models/Order');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/orders';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed'));
    }
  }
});

// Validation schemas
const createOrderSchema = Joi.object({
  customerName: Joi.string().min(2).max(100).required(),
  customerEmail: Joi.string().email().required(),
  customerPhone: Joi.string().optional(),
  items: Joi.array().items(
    Joi.object({
      productName: Joi.string().required(),
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      unitPrice: Joi.number().min(0).required(),
      specifications: Joi.object().optional()
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().default('USA')
  }).required(),
  billingAddress: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),
  paymentMethod: Joi.string().valid('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CASH_ON_DELIVERY').required(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').default('MEDIUM'),
  expectedDeliveryDate: Joi.date().optional(),
  notes: Joi.string().max(1000).optional()
});

const updateOrderSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED').optional(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').optional(),
  paymentStatus: Joi.string().valid('PENDING', 'PAID', 'FAILED', 'REFUNDED').optional(),
  trackingNumber: Joi.string().optional(),
  expectedDeliveryDate: Joi.date().optional(),
  actualDeliveryDate: Joi.date().optional(),
  notes: Joi.string().max(1000).optional(),
  assignedTo: Joi.string().optional()
});

// @route   GET /api/orders
// @desc    Get all orders with pagination and filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      customerEmail,
      orderNumber,
      sortBy = 'orderDate',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (customerEmail) filter.customerEmail = new RegExp(customerEmail, 'i');
    if (orderNumber) filter.orderNumber = new RegExp(orderNumber, 'i');

    // Demo mode - show all orders (no user filtering)

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const orders = await Order.find(filter)
      .populate('customerId', 'name email phone')
      .populate('assignedTo', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalOrders: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name email phone address')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.changedBy', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Demo mode - allow access to all orders

    res.json({
      success: true,
      data: { order }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post('/', upload.array('attachments', 5), async (req, res) => {
  try {
    // Validate input
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Calculate item totals
    const items = value.items.map(item => ({
      ...item,
      totalPrice: item.quantity * item.unitPrice
    }));

    // Find or create customer
    let customer = await User.findOne({ email: value.customerEmail });
    if (!customer) {
      // Create new customer user
      customer = new User({
        name: value.customerName,
        email: value.customerEmail,
        phone: value.customerPhone,
        password: 'temp123456', // Temporary password
        role: 'USER'
      });
      await customer.save();
    }

    // Handle file attachments
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    })) : [];

    // Create order
    const order = new Order({
      ...value,
      customerId: customer._id,
      items,
      attachments,
      statusHistory: [{
        status: 'PENDING',
        changedBy: null, // Demo mode - no user tracking
        notes: 'Order created'
      }]
    });

    await order.save();

    // Populate order for response
    await order.populate('customerId', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order
// @access  Private (Admin/Manager only)
router.put('/:id', auth, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    // Validate input
    const { error, value } = updateOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Track status changes
    if (value.status && value.status !== order.status) {
      order.statusHistory.push({
        status: value.status,
        changedBy: null, // Demo mode - no user tracking
        notes: `Status changed from ${order.status} to ${value.status}`
      });
    }

    // Update order
    Object.assign(order, value);
    await order.save();

    // Populate for response
    await order.populate('customerId', 'name email phone');
    await order.populate('assignedTo', 'name email');

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order'
    });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete order
// @access  Private (Admin only)
router.delete('/:id', auth, authorize('ADMIN'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Delete associated files
    if (order.attachments && order.attachments.length > 0) {
      order.attachments.forEach(attachment => {
        const filePath = path.join('uploads/orders', attachment.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });

  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting order'
    });
  }
});

// @route   GET /api/orders/status/:status
// @desc    Get orders by status
// @access  Private
router.get('/status/:status', auth, async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const filter = { status };
    // Demo mode - show all orders regardless of user

    const orders = await Order.find(filter)
      .populate('customerId', 'name email phone')
      .populate('assignedTo', 'name email')
      .sort({ orderDate: -1 });

    res.json({
      success: true,
      data: { orders }
    });

  } catch (error) {
    console.error('Get orders by status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

module.exports = router;
