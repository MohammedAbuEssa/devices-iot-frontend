#!/bin/bash

# IoT Devices Frontend Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 IoT Devices Frontend Deployment Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_status "Docker is installed"
}

# Check if Docker Compose is installed
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_status "Docker Compose is installed"
}

# Deploy with Docker Compose
deploy_docker() {
    echo "🐳 Deploying with Docker Compose..."
    
    check_docker
    check_docker_compose
    
    # Create production environment file if it doesn't exist
    if [ ! -f .env.production ]; then
        print_warning "Creating .env.production file..."
        cat > .env.production << EOF
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_NAME=IoT Devices Dashboard
NODE_ENV=production
EOF
        print_warning "Please update .env.production with your actual API URL"
    fi
    
    # Build and start containers
    print_status "Building and starting containers..."
    docker-compose up --build -d
    
    print_status "Application deployed successfully!"
    print_status "Access your application at: http://localhost:3001"
    print_status "To view logs: docker-compose logs -f"
    print_status "To stop: docker-compose down"
}

# Deploy to Vercel
deploy_vercel() {
    echo "▲ Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Installing..."
        npm install -g vercel
    fi
    
    print_status "Building application..."
    yarn build
    
    print_status "Deploying to Vercel..."
    vercel --prod
    
    print_status "Deployment completed!"
}

# Deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_error "Netlify CLI is not installed. Installing..."
        npm install -g netlify-cli
    fi
    
    print_status "Building application..."
    yarn build
    
    print_status "Deploying to Netlify..."
    netlify deploy --prod --dir=dist
    
    print_status "Deployment completed!"
}

# Build for production
build_production() {
    echo "🔨 Building for production..."
    
    print_status "Installing dependencies..."
    yarn install
    
    print_status "Building application..."
    yarn build
    
    print_status "Build completed! Files are in the 'dist' directory"
}

# Show help
show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  docker     Deploy using Docker Compose (recommended)"
    echo "  vercel     Deploy to Vercel"
    echo "  netlify    Deploy to Netlify"
    echo "  build      Build for production only"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 docker"
    echo "  $0 vercel"
    echo "  $0 build"
}

# Main script logic
case "${1:-help}" in
    docker)
        deploy_docker
        ;;
    vercel)
        deploy_vercel
        ;;
    netlify)
        deploy_netlify
        ;;
    build)
        build_production
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
