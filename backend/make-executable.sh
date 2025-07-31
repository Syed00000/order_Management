#!/bin/bash

# Make startup scripts executable
echo "🔧 Making startup scripts executable..."

chmod +x start.sh
chmod +x start-dev.sh
chmod +x mvnw

echo "✅ Scripts are now executable!"
echo ""
echo "Usage:"
echo "  ./start.sh      - Start in production mode"
echo "  ./start-dev.sh  - Start in development mode"
