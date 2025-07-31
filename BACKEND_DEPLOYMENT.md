# 🚀 Backend Deployment Guide - Java Spring Boot

## ❌ Vercel Java Issue
`@vercel/java` is not available. Use these alternatives:

---

## 🎯 Option 1: Railway (Recommended - Free)

### Step 1: Go to Railway
1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

### Step 2: Configure Railway
1. Select your repository
2. Choose `backend` folder as root
3. Railway auto-detects Java Spring Boot

### Step 3: Environment Variables
```
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
```

### Step 4: Deploy
- Railway builds automatically
- Get backend URL: `https://your-app.railway.app`

---

## 🎯 Option 2: Render (Free Tier)

### Step 1: Go to Render
1. Visit [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"

### Step 2: Configure Render
1. Connect GitHub repository
2. Root Directory: `backend`
3. Build Command: `mvn clean package -DskipTests`
4. Start Command: `java -jar target/*.jar`

### Step 3: Environment Variables
```
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
```

---

## 🎯 Option 3: Heroku (Paid but Reliable)

### Step 1: Install Heroku CLI
```bash
# Download from heroku.com/cli
```

### Step 2: Deploy
```bash
cd backend
heroku create your-app-name
git subtree push --prefix=backend heroku main
```

### Step 3: Set Environment Variables
```bash
heroku config:set MONGODB_URI="mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/"
heroku config:set MONGODB_DATABASE="orderManagement"
heroku config:set CORS_ALLOWED_ORIGINS="https://your-frontend.vercel.app"
```

---

## 🎯 Recommended Deployment Flow

### 1. Deploy Frontend First (Vercel)
- Upload `frontend/dist` folder manually
- Get frontend URL

### 2. Deploy Backend (Railway)
- Connect GitHub repo
- Set environment variables with frontend URL
- Get backend URL

### 3. Update Frontend
- Update `VITE_API_URL` with backend URL
- Redeploy frontend

---

## 🔧 Your Environment Variables Ready

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.railway.app
VITE_APP_NAME=Order Management System
VITE_APP_VERSION=1.0.0
```

### Backend (Railway/Render):
```
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
```

---

## ✅ Success Flow

1. **Frontend on Vercel** ✅
2. **Backend on Railway** ✅  
3. **Database on MongoDB Atlas** ✅
4. **All connected with environment variables** ✅

**Railway is best for Java Spring Boot - free and easy! 🚀**
