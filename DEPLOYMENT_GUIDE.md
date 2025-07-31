# 🚀 Vercel Deployment Guide - Order Management System

## 📋 Prerequisites
1. GitHub account
2. Vercel account (free)
3. MongoDB Atlas account (already setup)

---

## 🎯 Step 1: Prepare Repository

### 1.1 Create GitHub Repository
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Order Management System"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/order-management-system.git
git branch -M main
git push -u origin main
```

---

## 🎯 Step 2: Deploy Backend to Vercel

### 2.1 Deploy Backend
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `backend` folder
5. Framework Preset: "Other"
6. Root Directory: `backend`

### 2.2 Set Backend Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
UPLOAD_DIR=/tmp/uploads
```

### 2.3 Get Backend URL
After deployment, copy the backend URL (e.g., `https://your-backend.vercel.app`)

---

## 🎯 Step 3: Deploy Frontend to Vercel

### 3.1 Deploy Frontend
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository again
4. Select the `frontend` folder
5. Framework Preset: "Vite"
6. Root Directory: `frontend`

### 3.2 Set Frontend Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.vercel.app
NODE_ENV=production
```

---

## 🎯 Step 4: Update CORS Configuration

### 4.1 Update Backend CORS
Go back to backend Vercel project → Settings → Environment Variables:
Update `CORS_ALLOWED_ORIGINS` with your frontend URL:

```
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

---

## 🎯 Step 5: Test Deployment

### 5.1 Test URLs
- **Frontend**: https://your-frontend.vercel.app
- **Backend**: https://your-backend.vercel.app/health

### 5.2 Test Functionality
1. Open frontend URL
2. Navigate through landing page
3. Go to dashboard
4. Try creating an order
5. Test file upload
6. Check order details

---

## 🔧 Environment Variables Reference

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
UPLOAD_DIR=/tmp/uploads
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.vercel.app
NODE_ENV=production
```

---

## 🚨 Important Notes

1. **MongoDB Atlas**: Make sure your IP is whitelisted (0.0.0.0/0 for all IPs)
2. **File Uploads**: Vercel has 50MB limit for serverless functions
3. **Cold Starts**: First request might be slow due to serverless cold start
4. **HTTPS**: Both frontend and backend will have HTTPS automatically

---

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Error**: Check CORS_ALLOWED_ORIGINS includes frontend URL
2. **MongoDB Connection**: Verify MONGODB_URI and whitelist IPs
3. **API Not Found**: Check VITE_API_URL points to correct backend
4. **Build Fails**: Check all dependencies are in package.json

### Debug Steps:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Test backend health endpoint
4. Verify environment variables are set

---

## 🎉 Success!
Your Order Management System is now live on Vercel! 🚀
