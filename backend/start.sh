#!/bin/bash

# Backend Startup Script for Order Management System
echo "🚀 Starting Order Management Backend..."

# Set environment variables from .env.production if exists
if [ -f ".env.production" ]; then
    echo "📋 Loading environment variables from .env.production..."
    export $(cat .env.production | grep -v '^#' | xargs)
fi

# Set default values if not provided
export MONGODB_URI=${MONGODB_URI:-"mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/"}
export MONGODB_DATABASE=${MONGODB_DATABASE:-"orderManagement"}
export CORS_ALLOWED_ORIGINS=${CORS_ALLOWED_ORIGINS:-"http://localhost:3000,http://localhost:5173"}
export PORT=${PORT:-8080}
export SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE:-"production"}
export UPLOAD_DIR=${UPLOAD_DIR:-"uploads"}

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Check if JAR file exists
JAR_FILE=$(find target -name "*.jar" -type f | head -n 1)

if [ -z "$JAR_FILE" ]; then
    echo "❌ JAR file not found. Building application..."
    ./mvnw clean package -DskipTests
    JAR_FILE=$(find target -name "*.jar" -type f | head -n 1)
fi

if [ -z "$JAR_FILE" ]; then
    echo "❌ Failed to build JAR file. Exiting..."
    exit 1
fi

echo "✅ Found JAR file: $JAR_FILE"
echo "🌍 Environment: $SPRING_PROFILES_ACTIVE"
echo "🔗 MongoDB: $MONGODB_DATABASE"
echo "🌐 Port: $PORT"
echo "📁 Upload Directory: $UPLOAD_DIR"

# Start the application
echo "🎯 Starting Java application..."
java -jar "$JAR_FILE"
