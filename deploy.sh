#!/bin/bash

# 🚀 Quick Deploy Script for Order Management System

echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy: Order Management System - $(date)"

# Push to GitHub (you need to set up remote first)
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🎯 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Deploy backend first (select 'backend' folder)"
echo "4. Deploy frontend second (select 'frontend' folder)"
echo "5. Set environment variables as per DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Happy deploying!"
