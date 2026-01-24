# Quick Start Guide - Authentication System

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Git

### Step 1: Clone and Install

```bash
# Navigate to project
cd "/media/sayad/Ubuntu-Data/RIO International"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Setup Database

```bash
# From backend directory
cd backend

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run prisma:seed
```

### Step 3: Configure Environment

**Backend (.env)**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/rio_international
JWT_SECRET=your-secret-key-change-this
FRONTEND_URL=http://localhost:5173
PORT=5000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Test Authentication

1. **Open browser:** http://localhost:5173

2. **Register a new account:**
   - Click "Register" or go to http://localhost:5173/register
   - Fill in the form:
     - Name: John Doe
     - Email: john@example.com
     - Phone: +1234567890
     - Password: password123
   - Accept terms
   - Click "Create Account"

3. **You're logged in!** 🎉
   - Should redirect to homepage
   - User info stored in localStorage
   - JWT token attached to all requests

4. **Test Login:**
   - Logout (if logged in)
   - Go to http://localhost:5173/login
   - Enter credentials
   - Click "Sign In"

## 📋 Available Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/tours` - Tours listing
- `/visa-packages` - Visa packages
- `/about` - About page
- `/contact` - Contact page

### Protected Routes (Requires Login)
- `/profile` - User profile
- `/profile/bookings` - User bookings

### Admin Routes (Requires Admin Role)
- `/admin` - Admin dashboard

## 🔑 Test Credentials

After registration, you can create an admin user manually in the database:

```sql
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

## 🧪 Testing API with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile (requires token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run `npm install` again

### Frontend shows CORS error
- Ensure backend is running on port 5000
- Check FRONTEND_URL in backend .env
- Verify API_URL in frontend .env

### Login doesn't work
- Check browser console for errors
- Verify token in localStorage
- Check backend logs for errors

### Database errors
- Run `npx prisma migrate reset`
- Run `npx prisma generate`
- Check database connection string

## 📚 Documentation

- **Full Authentication Docs:** See [AUTHENTICATION.md](./AUTHENTICATION.md)
- **Setup Guide:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **API Documentation:** Coming soon

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Database connected successfully
- [ ] Can access http://localhost:5173
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] User info shows after login
- [ ] Can access protected routes
- [ ] Can logout successfully

## 🎯 Next Steps

1. **Customize the UI**
   - Update colors in tailwind.config.js
   - Add your logo
   - Modify page content

2. **Add Features**
   - Email verification
   - Password reset
   - Social login (Google, Facebook)

3. **Deploy**
   - Deploy backend to Render/Railway
   - Deploy frontend to Vercel/Netlify
   - Setup production database

## 💡 Tips

- Use Chrome DevTools to inspect network requests
- Check browser console for errors
- Use Prisma Studio to view database: `npx prisma studio`
- Enable React Query DevTools for debugging

## 🆘 Need Help?

If you encounter issues:

1. Check error messages carefully
2. Review logs in terminal
3. Verify environment variables
4. Check database connection
5. Clear browser cache/localStorage
6. Restart both servers

---

**Happy Coding! 🚀**
