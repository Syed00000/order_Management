# 🚀 Order Management System - Full Stack MERN

A complete **MERN Stack** application for managing orders, customers, and analytics with modern web technologies.

## 📋 **Technology Stack**

### **Frontend**
- ⚛️ **React 18** - Modern UI library
- ⚡ **Vite** - Fast build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🛣️ **React Router** - Client-side routing
- 📊 **Chart.js** - Data visualization
- 🔔 **React Hot Toast** - Beautiful notifications
- 📱 **Responsive Design** - Mobile-first approach

### **Backend**
- 🟢 **Node.js 22.x** - JavaScript runtime
- 🚀 **Express.js** - Fast web framework
- 🍃 **MongoDB** - NoSQL database
- 🔗 **Mongoose** - MongoDB object modeling
- 🔐 **JWT** - JSON Web Token authentication
- 🔒 **bcryptjs** - Password hashing
- 📁 **Multer** - File upload handling
- ✅ **Joi** - Input validation
- 🛡️ **Helmet** - Security middleware

### **Database**
- 🌐 **MongoDB Atlas** - Cloud database
- 📊 **Aggregation Pipelines** - Advanced analytics
- 🔍 **Indexing** - Optimized queries
- 🔄 **Real-time Updates** - Live data sync

---

## ✨ **Features**

### **🔐 Authentication & Authorization**
- User registration and login
- JWT-based authentication
- Role-based access control (Admin, Manager, User)
- Password hashing with bcryptjs
- Protected routes and API endpoints

### **📦 Order Management**
- Create, read, update, delete orders
- Order status tracking (Pending → Delivered)
- Priority levels (Low, Medium, High, Urgent)
- Customer information management
- File attachments for orders
- Order search and filtering

### **📊 Analytics Dashboard**
- Sales charts and trends
- Order status distribution
- Customer insights and analytics
- Revenue tracking
- Top customers analysis
- Real-time metrics

### **👥 Customer Management**
- Customer profiles and history
- Order history per customer
- Customer lifetime value
- New vs returning customers

### **📱 Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Cross-browser compatibility
- Modern UI/UX design

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 22.x or higher
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### **1. Clone Repository**
```bash
git clone https://github.com/Syed00000/order_Management.git
cd OrderManagement
```

### **2. Backend Setup**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:8080
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### **4. Environment Variables**

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/orderManagement
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=8080
```

**Frontend (.env.production):**
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Order Management System
VITE_APP_VERSION=1.0.0
```

---

## 🐳 **Docker Deployment**

### **Development**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### **Production**
```bash
docker-compose up --build
```

---

## 🌐 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get profile
- `PUT /api/auth/profile` - Update profile

### **Orders**
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### **Analytics**
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/sales-chart` - Sales chart
- `GET /api/analytics/order-trends` - Order trends

### **Health**
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system info

---

## 🚀 **Production Deployment**

### **Frontend (Vercel)**
1. Build the frontend: `npm run build`
2. Upload `dist` folder to Vercel
3. Set environment variables
4. Deploy instantly

### **Backend (Railway)**
1. Connect GitHub repository
2. Set root directory to `backend`
3. Configure environment variables
4. Deploy automatically

### **Database (MongoDB Atlas)**
- Already configured and connected
- Cloud-hosted and scalable
- Automatic backups and monitoring

---

## 🔒 **Security Features**

- **Helmet** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - Prevent abuse
- **JWT Authentication** - Secure tokens
- **Password Hashing** - bcryptjs encryption
- **Input Validation** - Joi validation
- **File Upload Security** - Type and size limits

---

## 📊 **Performance**

- **Vite** - Fast build and HMR
- **MongoDB Indexing** - Optimized queries
- **Compression** - Reduced payload size
- **Caching** - Improved response times
- **Pagination** - Efficient data loading

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 **License**

This project is licensed under the MIT License.

---

## 👨‍💻 **Author**

**Syed Imran Hassan**
- GitHub: [@Syed00000](https://github.com/Syed00000)
- Repository: [order_Management](https://github.com/Syed00000/order_Management)

**Built with ❤️ using the MERN Stack**
