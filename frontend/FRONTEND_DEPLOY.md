# 🚀 Frontend Deployment Guide - Vercel

## 📋 Prerequisites
- GitHub repository with frontend code
- Vercel account (free)

---

## 🎯 Step 1: Push Frontend to GitHub

```bash
# Navigate to project root
cd OrderManagement

# Add all files
git add .

# Commit changes
git commit -m "Frontend ready for deployment"

# Push to GitHub
git push origin main
```

---

## 🎯 Step 2: Deploy Frontend on Vercel

### 2.1 Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"

### 2.2 Import Repository
1. Select your GitHub repository
2. Click "Import"

### 2.3 Configure Project
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 Set Environment Variables
Click "Environment Variables" and add:

```
VITE_API_URL = https://your-backend-url.vercel.app
VITE_APP_NAME = Order Management System
VITE_APP_VERSION = 1.0.0
```

**Note**: Leave VITE_API_URL as placeholder for now, update after backend deployment.

### 2.5 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Get your frontend URL (e.g., `https://your-frontend.vercel.app`)

---

## 🎯 Step 3: Environment Variables Explained

### Frontend .env Files:
- **`.env`** - Development (localhost)
- **`.env.production`** - Production template
- **Vercel Dashboard** - Actual production values

### Required Variables:
```
VITE_API_URL=https://your-backend.vercel.app
VITE_APP_NAME=Order Management System
VITE_APP_VERSION=1.0.0
```

### How Vite Handles Environment:
- `VITE_` prefix required for client-side access
- Variables are injected at build time
- Available via `import.meta.env.VITE_VARIABLE_NAME`

---

## 🎯 Step 4: After Frontend Deployment

### 4.1 Test Frontend
1. Visit your Vercel frontend URL
2. Check browser console for environment logs
3. Landing page should load correctly
4. API calls will fail (backend not deployed yet)

### 4.2 Next Steps
1. Deploy backend to Vercel
2. Update `VITE_API_URL` with backend URL
3. Update backend CORS with frontend URL
4. Test complete system

---

## 🔧 Troubleshooting

### Build Fails:
- Check Node.js version (should be 18.x)
- Verify all dependencies in package.json
- Test local build: `npm run build`

### Environment Variables Not Working:
- Ensure `VITE_` prefix
- Check Vercel dashboard variables
- Redeploy after adding variables

### CORS Errors:
- Backend not deployed yet (normal)
- Will fix after backend deployment

---

## ✅ Success Indicators

- ✅ Build completes without errors
- ✅ Frontend loads at Vercel URL
- ✅ Console shows correct environment variables
- ✅ Landing page displays properly
- ❌ API calls fail (expected until backend deployed)

---

## 📝 Next: Backend Deployment

After frontend is deployed:
1. Note your frontend URL
2. Deploy backend with frontend URL in CORS
3. Update frontend VITE_API_URL with backend URL
4. Test complete system

**Frontend deployment complete! 🎉**
