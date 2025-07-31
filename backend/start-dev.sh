#!/bin/bash

# Development Startup Script for Order Management System
echo "🚀 Starting Order Management Backend (Development Mode)..."

# Set development environment variables
export MONGODB_URI="mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/"
export MONGODB_DATABASE="orderManagement"
export CORS_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
export PORT=8081
export SPRING_PROFILES_ACTIVE="development"
export UPLOAD_DIR="uploads"

# Create uploads directory if it doesn't exist
mkdir -p uploads

echo "🌍 Environment: Development"
echo "🔗 MongoDB: $MONGODB_DATABASE"
echo "🌐 Port: $PORT"
echo "📁 Upload Directory: $UPLOAD_DIR"

# Start with Maven (hot reload enabled)
echo "🎯 Starting with Maven (hot reload enabled)..."
./mvnw spring-boot:run
