# Order Management System

A modern, full-stack Order Management System built with React.js frontend and Spring Boot backend, featuring PDF invoice uploads, Firebase storage, and MongoDB Atlas database.

## 🚀 Features

- **Create Orders**: Add new orders with customer details, amounts, and PDF invoice uploads
- **View Orders**: Dashboard with searchable table of all orders
- **Order Details**: Detailed view of individual orders with download functionality
- **File Storage**: PDF invoices stored securely in Firebase Storage
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library
- **date-fns** - Date formatting

### Backend
- **Spring Boot** - Java framework
- **Spring Data MongoDB** - Database integration
- **Firebase Admin SDK** - File storage
- **Maven** - Dependency management

### Database & Storage
- **MongoDB Atlas** - Cloud database (free tier)
- **Firebase Storage** - File storage (free tier)

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (free)
- **Firebase** project with Storage enabled

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd OrderManagement
```

### 2. Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Configure application.properties:**
   The MongoDB connection string is already configured:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/orderdb
   ```

3. **Firebase Configuration:**
   The Firebase service account key is already present in the root directory:
   `ordermanagement-1902c-firebase-adminsdk-fbsvc-137fa7e735.json`

4. **Build and run the backend:**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create a new order with file upload |
| GET | `/orders` | Get all orders |
| GET | `/orders/{id}` | Get single order by ID |
| GET | `/orders/search` | Search orders by customer name or amount range |
| DELETE | `/orders/{id}` | Delete an order |
| GET | `/health` | Health check endpoint |

## 📱 Frontend Pages

1. **Dashboard (/)** - View all orders in a searchable table
2. **Create Order (/create)** - Form to create new orders with PDF upload
3. **Order Details (/orders/:id)** - Detailed view of individual orders

## 🔒 Environment Configuration

### Backend (application.properties)
```properties
# Server Configuration
server.port=8080

# MongoDB Configuration
spring.data.mongodb.uri=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/orderdb

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Firebase Configuration
firebase.service-account-key=../ordermanagement-1902c-firebase-adminsdk-fbsvc-137fa7e735.json
firebase.storage-bucket=ordermanagement-1902c.appspot.com

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

## 🧪 Testing the Application

1. **Start both backend and frontend servers**
2. **Open browser to** `http://localhost:3000`
3. **Test the flow:**
   - Create a new order with a PDF file
   - View the order in the dashboard
   - Click on order details to see full information
   - Download the invoice PDF

## 📁 Project Structure

```
OrderManagement/
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/ordermanagement/
│   │   ├── config/                   # Configuration classes
│   │   ├── controller/               # REST controllers
│   │   ├── model/                    # Entity classes
│   │   ├── repository/               # Data repositories
│   │   ├── service/                  # Business logic
│   │   └── OrderManagementApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                         # React.js frontend
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   ├── pages/                    # Page components
│   │   ├── services/                 # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── ordermanagement-1902c-firebase-adminsdk-fbsvc-137fa7e735.json
└── README.md
```

## 🚀 Deployment Options

### Frontend Deployment (Free)
- **Vercel** - Connect GitHub repo for automatic deployments
- **Netlify** - Drag and drop build folder or connect GitHub

### Backend Deployment (Free)
- **Render** - Connect GitHub repo, supports Spring Boot
- **Railway** - Easy deployment with GitHub integration

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure frontend URL is added to `cors.allowed-origins` in backend
2. **File Upload Issues**: Check Firebase Storage rules and service account permissions
3. **MongoDB Connection**: Verify connection string and network access in MongoDB Atlas
4. **Port Conflicts**: Change ports in configuration if 8080 or 3000 are in use

### Logs and Debugging

- **Backend logs**: Check console output when running Spring Boot
- **Frontend logs**: Open browser developer tools console
- **Network requests**: Use browser Network tab to debug API calls

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.
