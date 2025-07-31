# 🚀 Complete Deployment Guide - Order Management System

## 📋 Your Environment Variables Ready!

### 🎯 Frontend Environment Variables (Vercel Dashboard):
```
VITE_API_URL=https://your-backend.vercel.app
VITE_APP_NAME=Order Management System
VITE_APP_VERSION=1.0.0
```

### 🎯 Backend Environment Variables (Vercel Dashboard):
```
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
UPLOAD_DIR=/tmp/uploads
```

---

## 🚀 Step-by-Step Deployment

### Step 1: Push to GitHub
```bash
# Add all files
git add .

# Commit
git commit -m "Ready for deployment with environment variables"

# Push
git push origin main
```

### Step 2: Deploy Frontend First
1. Go to [vercel.com](https://vercel.com)
2. New Project → Import GitHub repo
3. **Settings:**
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables:**
   ```
   VITE_API_URL=https://placeholder-backend.vercel.app
   VITE_APP_NAME=Order Management System
   VITE_APP_VERSION=1.0.0
   ```

5. **Deploy** → Get frontend URL (e.g., `https://order-management-frontend.vercel.app`)

### Step 3: Deploy Backend
1. Go to [vercel.com](https://vercel.com)
2. New Project → Import same GitHub repo
3. **Settings:**
   - Framework: `Other`
   - Root Directory: `backend`

4. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
   MONGODB_DATABASE=orderManagement
   CORS_ALLOWED_ORIGINS=https://order-management-frontend.vercel.app
   PORT=8080
   SPRING_PROFILES_ACTIVE=production
   UPLOAD_DIR=/tmp/uploads
   ```

5. **Deploy** → Get backend URL (e.g., `https://order-management-backend.vercel.app`)

### Step 4: Update Frontend with Backend URL
1. Go to Frontend Vercel project
2. Settings → Environment Variables
3. Update `VITE_API_URL` with actual backend URL:
   ```
   VITE_API_URL=https://order-management-backend.vercel.app
   ```
4. **Redeploy** frontend

### Step 5: Test Complete System
1. Visit frontend URL
2. Test all functionality:
   - Landing page ✅
   - Dashboard ✅
   - Create order ✅
   - Order details ✅
   - File upload ✅

---

## 🔧 MongoDB Atlas Setup (Already Done!)

Your MongoDB is ready:
- **Connection String**: `mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/`
- **Database**: `orderManagement`
- **Collections**: Will be created automatically

### Make sure:
1. **Network Access**: Allow all IPs (0.0.0.0/0) for Vercel
2. **Database User**: `Code2cash` has read/write permissions
3. **Password**: `cash2code1` is correct

---

## 🎉 Final URLs

After deployment you'll have:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **Database**: MongoDB Atlas (already connected)

---

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Error**: Check frontend URL in backend CORS_ALLOWED_ORIGINS
2. **MongoDB Connection**: Verify connection string and network access
3. **Build Fails**: Check environment variables are set correctly
4. **API Not Found**: Verify VITE_API_URL points to backend

### Debug Steps:
1. Check Vercel deployment logs
2. Test backend health: `https://your-backend.vercel.app/health`
3. Check browser console for errors
4. Verify environment variables in Vercel dashboard

**Ready to deploy! 🚀**
