# 🔧 Local Development Setup Guide

## ☕ Java Installation Required

### Step 1: Download Java JDK 17
1. Go to [https://adoptium.net/](https://adoptium.net/)
2. Download **Eclipse Temurin JDK 17** for Windows
3. Install with default settings

### Step 2: Set JAVA_HOME Environment Variable
1. **Open System Properties:**
   - Press `Win + R`
   - Type `sysdm.cpl`
   - Click "Environment Variables"

2. **Add JAVA_HOME:**
   - Click "New" in System Variables
   - Variable Name: `JAVA_HOME`
   - Variable Value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot`

3. **Update PATH:**
   - Find "Path" in System Variables
   - Click "Edit"
   - Add: `%JAVA_HOME%\bin`

### Step 3: Verify Installation
```bash
java -version
javac -version
```

---

## 🚀 Alternative: Use IDE

### Option 1: IntelliJ IDEA
1. Download IntelliJ IDEA Community (Free)
2. Open `backend` folder
3. IntelliJ will auto-download Java if needed
4. Run `OrderManagementApplication.java`

### Option 2: VS Code with Java Extension
1. Install "Extension Pack for Java"
2. Open `backend` folder
3. VS Code will prompt to install Java
4. Run with F5

---

## 🎯 Quick Start Commands

### After Java Installation:
```bash
cd backend
./mvnw spring-boot:run
```

### Backend will start on:
- **URL**: http://localhost:8081
- **Health Check**: http://localhost:8081/health

---

## 🔧 If Still Issues

### Alternative 1: Use Docker
```bash
# If you have Docker installed
docker run -p 8081:8081 -v $(pwd):/app openjdk:17 java -jar /app/target/*.jar
```

### Alternative 2: Skip Local, Deploy Only
- Deploy backend on Railway
- Deploy frontend on Vercel
- Test on production URLs

---

## ✅ Success Indicators

When backend starts successfully:
- Console shows "Started OrderManagementApplication"
- Port 8081 is listening
- Frontend API calls work
- No more connection refused errors

**Install Java JDK 17 first, then backend will run perfectly! ☕**
