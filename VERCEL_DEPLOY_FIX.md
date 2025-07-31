# 🔧 Vercel Build Error 126 - Fix Guide

## ❌ Error: Command "npm run build" exited with 126

### 🎯 Solution Steps:

## 1. **Frontend Deployment Settings**

### In Vercel Dashboard:
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 2. **Environment Variables (Frontend)**
```
VITE_API_URL=https://your-backend.vercel.app
NODE_ENV=production
```

## 3. **Backend Deployment Settings**

### In Vercel Dashboard:
- **Framework Preset**: `Other`
- **Root Directory**: `backend`
- **Build Command**: `mvn clean package -DskipTests`
- **Output Directory**: `target`

## 4. **Environment Variables (Backend)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
SPRING_PROFILES_ACTIVE=production
```

## 5. **Alternative: Manual Deploy**

### If auto-deploy fails:
1. Build locally: `npm run build`
2. Upload `dist` folder manually to Vercel
3. Or use Vercel CLI:
```bash
npm i -g vercel
cd frontend
vercel --prod
```

## 6. **Common Fixes**

### Node.js Version:
- Set Node.js version to 18.x in Vercel
- Add `.nvmrc` file with `18` in frontend folder

### Package.json:
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Check scripts are correct

## 7. **Debug Steps**

1. Check Vercel build logs
2. Test local build: `npm run build`
3. Check file permissions
4. Try different Node.js version
5. Clear Vercel cache and redeploy

## ✅ Success Indicators:
- Build completes without errors
- `dist` folder is created
- Frontend loads at Vercel URL
- API calls work to backend
