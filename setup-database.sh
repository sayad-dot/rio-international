#!/bin/bash

# Rio International - Database Setup Helper Script

echo "🗄️  Rio International - PostgreSQL Database Setup"
echo "=================================================="
echo ""

# Check if PostgreSQL is running
if ! sudo systemctl is-active --quiet postgresql; then
    echo "⚠️  PostgreSQL is not running. Starting it..."
    sudo systemctl start postgresql
    sleep 2
fi

echo "Creating database 'rio_travel'..."
echo ""
echo "You'll be prompted for your PostgreSQL password."
echo "If this is your first time, you might need to set it up."
echo ""

# Try to create database as current user
createdb rio_travel 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database 'rio_travel' created successfully!"
    echo ""
    echo "Now update your backend/.env file:"
    echo "DATABASE_URL=\"postgresql://$USER:YOUR_PASSWORD@localhost:5432/rio_travel?schema=public\""
    echo ""
    echo "Replace YOUR_PASSWORD with your actual PostgreSQL password."
else
    echo "⚠️  Could not create database with your user."
    echo ""
    echo "Trying with postgres superuser..."
    echo "You'll be prompted for the postgres user password."
    echo ""
    
    # Try with postgres user
    sudo -u postgres psql -c "CREATE DATABASE rio_travel;" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Database 'rio_travel' created successfully!"
        echo ""
        echo "Now granting permissions to user '$USER'..."
        
        # Grant permissions
        sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE rio_travel TO $USER;" 2>/dev/null
        sudo -u postgres psql -d rio_travel -c "GRANT ALL ON SCHEMA public TO $USER;" 2>/dev/null
        
        echo "✅ Permissions granted!"
        echo ""
        echo "Update your backend/.env file:"
        echo "DATABASE_URL=\"postgresql://$USER:YOUR_PASSWORD@localhost:5432/rio_travel?schema=public\""
    else
        echo "❌ Failed to create database."
        echo ""
        echo "Please create it manually:"
        echo "1. Run: sudo -u postgres psql"
        echo "2. Execute: CREATE DATABASE rio_travel;"
        echo "3. Execute: GRANT ALL PRIVILEGES ON DATABASE rio_travel TO $USER;"
        echo "4. Execute: \\q"
    fi
fi

echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with correct DATABASE_URL"
echo "2. Run: cd backend && npx prisma generate"
echo "3. Run: npx prisma migrate dev --name init"
echo "4. Run: npm run dev"
