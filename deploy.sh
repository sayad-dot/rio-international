#!/bin/bash

# Deploy to Render.com automatically
# This script initializes git, commits, and prepares for deployment

echo "🚀 Rio International - Deployment Setup"
echo "========================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "📦 Initializing Git repository..."
  git init
  git branch -M main
else
  echo "✅ Git already initialized"
fi

# Add all files
echo "📝 Staging files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit - Rio International Travel Agency with 22 visa packages"

# Instructions
echo ""
echo "✅ Local setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a GitHub repository at https://github.com/new"
echo "   Repository name: rio-international"
echo ""
echo "2. Connect to GitHub (replace YOUR_USERNAME):"
echo "   git remote add origin https://github.com/YOUR_USERNAME/rio-international.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy on Render.com:"
echo "   - Go to https://render.com/login"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub repository"
echo "   - Render will auto-detect render.yaml"
echo "   - Click 'Apply' to deploy!"
echo ""
echo "🎉 That's it! Your app will be live in ~5 minutes"
