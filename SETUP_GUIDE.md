# Phase 1 & 2 - Complete Setup Guide

Follow these steps **in order** to complete the setup:

---

## Step 1: Set Up PostgreSQL Database

### Option A: If you know your PostgreSQL password

```bash
# Connect to PostgreSQL as your user
psql -U sayad -d postgres

# Or if you need to use postgres superuser
sudo -u postgres psql
```

Then in PostgreSQL shell:
```sql
-- Create the database
CREATE DATABASE rio_travel;

-- Create user if needed (use your system username)
CREATE USER sayad WITH PASSWORD 'your_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rio_travel TO sayad;

-- Connect to the new database
\c rio_travel

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO sayad;

-- Exit
\q
```

### Option B: If you don't remember your password, reset it

```bash
sudo -u postgres psql
```

Then:
```sql
-- Set/reset password for your user
ALTER USER sayad WITH PASSWORD 'your_new_password';

-- Create database
CREATE DATABASE rio_travel;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rio_travel TO sayad;

\q
```

---

## Step 2: Update Backend .env File

Edit: `/media/sayad/Ubuntu-Data/RIO International/backend/.env`

Replace the DATABASE_URL line with your actual credentials:

```bash
# Replace 'username' with 'sayad'
# Replace 'password' with your PostgreSQL password
DATABASE_URL="postgresql://sayad:your_actual_password@localhost:5432/rio_travel?schema=public"
```

Example:
```bash
DATABASE_URL="postgresql://sayad:mypass123@localhost:5432/rio_travel?schema=public"
```

---

## Step 3: Initialize Backend Database

```bash
cd "/media/sayad/Ubuntu-Data/RIO International/backend"

# Install dependencies (already done)
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations (creates tables)
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

---

## Step 4: Start Backend Server

```bash
cd "/media/sayad/Ubuntu-Data/RIO International/backend"
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ Database connected successfully
```

Keep this terminal running!

---

## Step 5: Start Frontend Server (Already Running)

In a **new terminal**:

```bash
cd "/media/sayad/Ubuntu-Data/RIO International/frontend"
npm run dev
```

You should see:
```
VITE v7.3.0  ready in 188 ms
➜  Local:   http://localhost:5173/
```

---

## Step 6: Test the Application

1. Open browser: `http://localhost:5173`
2. You should see the Rio International homepage
3. Try navigating to different pages
4. Test the login/register pages (won't work until backend routes are implemented in Phase 4)

---

## Quick Reference

### Backend URLs
- API Base: `http://localhost:5000`
- API Routes (when implemented): `http://localhost:5000/api/*`

### Frontend URLs
- Home: `http://localhost:5173/`
- Tours: `http://localhost:5173/tours`
- Login: `http://localhost:5173/login`
- Register: `http://localhost:5173/register`

### Useful Commands

```bash
# View database in browser
cd backend && npx prisma studio

# Reset database (WARNING: deletes all data)
cd backend && npx prisma migrate reset

# View Prisma migrations
cd backend && ls -la prisma/migrations

# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if stopped
sudo systemctl start postgresql
```

---

## Troubleshooting

### Error: "password authentication failed"
- Your PostgreSQL password is incorrect
- Follow Step 1, Option B to reset it

### Error: "database 'rio_travel' does not exist"
- Follow Step 1 to create the database

### Error: "prisma migrate dev" fails
- Make sure DATABASE_URL in .env is correct
- Make sure PostgreSQL is running: `sudo systemctl status postgresql`

### Frontend shows blank page
- Check browser console for errors (F12)
- Make sure frontend server is running on port 5173

### Backend won't start
- Check if port 5000 is already in use: `lsof -i :5000`
- Check .env file has all required variables

---

## ✅ Verification Checklist

- [ ] PostgreSQL is installed and running
- [ ] Database `rio_travel` exists
- [ ] Backend .env file has correct DATABASE_URL
- [ ] `npx prisma generate` runs without errors
- [ ] `npx prisma migrate dev` creates tables successfully
- [ ] Backend server starts on port 5000
- [ ] Frontend server starts on port 5173
- [ ] Homepage loads in browser at http://localhost:5173
- [ ] Navigation works (header menu clicks)
- [ ] Login/Register pages are accessible

---

## What's Next?

Once all the above steps are complete, **Phase 1 & 2 are done!** ✅

You'll be ready for:
- **Phase 3**: Build actual homepage content
- **Phase 4**: Implement authentication API endpoints
- **Phase 5**: Build tour package system

---

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Verify each step was completed
3. Check if all services are running
4. Review the .env file for typos
