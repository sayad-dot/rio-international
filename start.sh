#!/bin/bash

# Rio International - Quick Start Script

echo "🚀 Rio International Travel Agency - Quick Start"
echo "================================================"
echo ""

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Check if Node.js is installed
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Backend setup
echo "🔧 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Please create one based on .env.example"
    echo "   DATABASE_URL, JWT_SECRET, and PORT are required."
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

echo "🗄️  Setting up database..."
npx prisma generate
npx prisma migrate dev --name init

echo "✅ Backend setup complete!"
echo ""

# Frontend setup
echo "🎨 Setting up frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "✅ Frontend setup complete!"
echo ""

# Start servers
echo "🚀 Starting development servers..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

cd ..

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Start frontend in background
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Keep script running
wait
