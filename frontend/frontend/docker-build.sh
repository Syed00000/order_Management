#!/bin/bash

# Docker Build Script for Frontend

echo "🚀 Building Frontend for Docker..."

# Step 1: Build locally first
echo "📦 Building application locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Local build failed!"
    exit 1
fi

echo "✅ Local build successful!"

# Step 2: Build Docker image using simple Dockerfile
echo "🐳 Building Docker image..."
docker build -f Dockerfile.simple -t order-management-frontend .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Docker build successful!"
echo "🎉 Frontend Docker image ready: order-management-frontend"

# Step 3: Test run (optional)
echo "🧪 Test run Docker container..."
docker run -d -p 3000:80 --name frontend-test order-management-frontend

echo "✅ Frontend running on http://localhost:3000"
echo "🛑 To stop: docker stop frontend-test && docker rm frontend-test"
