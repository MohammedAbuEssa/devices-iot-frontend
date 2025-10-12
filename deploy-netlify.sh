#!/bin/bash

echo "🚀 Netlify Deployment Script"
echo "============================"

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Building project first..."
    yarn build
fi

echo "📦 Deploying to Netlify..."

# Deploy with manual configuration
npx netlify-cli deploy --prod --dir=dist --site-name="iot-devices-dashboard-$(date +%s)"

echo "✅ Deployment completed!"
echo ""
echo "🔧 Next steps:"
echo "1. Go to your Netlify dashboard"
echo "2. Set environment variables:"
echo "   - VITE_API_BASE_URL=https://your-backend-api.com"
echo "   - VITE_APP_NAME=IoT Devices Dashboard"
echo "3. Redeploy if needed"
