# 🚀 Rio International - Deployment Guide

## Quick Deploy (Easiest Method - Render.com)

### Prerequisites
- GitHub account
- Render.com account (free tier available)

### Step 1: Initialize Git & Push to GitHub

```bash
# Run the automated deployment script
./deploy.sh
```

Or manually:

```bash
# Initialize git
git init
git branch -M main
git add .
git commit -m "Initial commit - Rio International Travel Agency"

# Create GitHub repo at https://github.com/new (name: rio-international)
# Then connect:
git remote add origin https://github.com/YOUR_USERNAME/rio-international.git
git push -u origin main
```

### Step 2: Deploy on Render.com (Recommended - Free & Easy)

1. **Sign up** at [render.com](https://render.com)
2. Click **"New +"** → **"Blueprint"**
3. **Connect GitHub** repository (rio-international)
4. Render auto-detects `render.yaml` configuration
5. Click **"Apply"** to deploy
6. Wait 5-10 minutes for deployment

**Your app URLs:**
- Frontend: `https://rio-frontend.onrender.com`
- Backend: `https://rio-backend.onrender.com`

### Step 3: Seed Database (After Deployment)

```bash
# In Render.com dashboard, go to rio-backend service
# Click "Shell" tab and run:
cd backend
npx prisma migrate deploy
node prisma/seed-visa-extended.js
```

---

## Alternative: Manual Deployment

### Option A: Vercel (Frontend) + Render (Backend + DB)

**Frontend on Vercel:**
```bash
cd frontend
npm install
npm run build
# Deploy with Vercel CLI or dashboard
```

**Backend on Render:**
- Create Web Service from GitHub repo
- Build: `cd backend && npm install && npx prisma generate`
- Start: `cd backend && npm start`
- Add PostgreSQL database
- Set environment variables

### Option B: Railway.app

1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Add PostgreSQL database
4. Configure services manually

---

## Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=<provided-by-render>
JWT_SECRET=<generate-random-string>
FRONTEND_URL=<your-frontend-url>
```

### Frontend (.env)
```env
VITE_API_URL=<your-backend-url>/api
```

---

## Database Setup

The `render.yaml` blueprint automatically provisions PostgreSQL. After deployment:

1. Go to Render dashboard → rio-backend service
2. Open "Shell" tab
3. Run migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   node prisma/seed-visa-extended.js
   ```

---

## Troubleshooting

### Build Fails
- Check logs in Render dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `dependencies` not `devDependencies`

### Database Connection Error
- Verify DATABASE_URL environment variable
- Check if PostgreSQL database is running
- Ensure prisma schema matches database

### CORS Issues
- Check FRONTEND_URL in backend .env
- Verify VITE_API_URL in frontend .env

---

## Post-Deployment Checklist

- [ ] Frontend loads successfully
- [ ] Backend API responds at `/health`
- [ ] Database migrations completed
- [ ] 22 visa packages seeded
- [ ] Autocomplete search works
- [ ] Filtering by category works
- [ ] Individual visa package pages load

---

## Monitoring & Updates

**Update code:**
```bash
git add .
git commit -m "Update message"
git push
# Render auto-deploys on push
```

**View logs:**
- Render dashboard → Service → Logs tab

**Database access:**
- Render dashboard → Database → Connection details
- Use psql or any PostgreSQL client

---

## Estimated Costs

**Free Tier (Sufficient for testing):**
- Render: Free tier (750hrs/month, sleeps after inactivity)
- Database: 90 days free, then $7/month
- Total: **FREE** for 90 days

**Production (Always-on):**
- Backend: $7/month (Starter plan)
- Database: $7/month
- Frontend: FREE (static hosting)
- Total: **$14/month**

---

## Support

For issues:
1. Check Render logs
2. Verify environment variables
3. Test API endpoints manually
4. Check database connection

**Common Commands:**
```bash
# View backend logs
render logs -s rio-backend

# Restart service
render restart -s rio-backend

# Check database
psql <DATABASE_URL>
```
