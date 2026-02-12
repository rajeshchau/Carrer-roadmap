#!/bin/bash

echo "🚀 Career Roadmap LMS - Quick Setup Script"
echo "==========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Docker and Node.js are installed"
echo ""

# Start PostgreSQL with Docker
echo "📦 Starting PostgreSQL database..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Run database migrations
echo "🗄️  Running database migrations..."
npm run prisma:migrate -- --name init

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run prisma:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start the backend server: npm run backend:dev"
echo "2. In a new terminal, start the frontend: npm run dev"
echo "3. Visit http://localhost:3000 to see the application"
echo ""
echo "🔑 Admin credentials:"
echo "   Email: admin@career-roadmap.com"
echo "   Password: admin123"
echo ""
