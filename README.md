# Rio International - Travel Agency Website

A modern, full-stack travel agency website built with React, Node.js, Express, and PostgreSQL.

## 🚀 Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

### Backend
- **Node.js & Express** - Server framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📁 Project Structure

```
RIO International/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   ├── tour/
    │   │   ├── booking/
    │   │   └── admin/
    │   ├── pages/
    │   ├── contexts/
    │   ├── hooks/
    │   ├── services/
    │   ├── config/
    │   ├── lib/
    │   └── utils/
    ├── .env
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rio_travel"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=5000
NODE_ENV=development
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Development Phases

### ✅ Phase 1 & 2: Foundation & Core UI (COMPLETED)
- [x] Project initialization and configuration
- [x] PostgreSQL + Prisma setup
- [x] Express server with middleware
- [x] Tailwind CSS with custom theme
- [x] React Router configuration
- [x] React Query setup
- [x] Core UI components (Button, Card, Modal, Input, Badge, Spinner)
- [x] Responsive layout (Header, Footer, MainLayout)
- [x] Authentication context
- [x] Basic pages structure

### 🚧 Next Steps - Phase 3: Homepage & Landing
- [ ] Hero section with search
- [ ] Featured tours showcase
- [ ] Popular destinations grid
- [ ] Testimonials slider
- [ ] Newsletter subscription

### 📋 Upcoming Phases
- **Phase 4**: Authentication System
- **Phase 5**: Tour Packages & Listings
- **Phase 6**: Booking System
- **Phase 7**: User Dashboard
- **Phase 8**: Admin Panel
- **Phase 9**: Additional Features
- **Phase 10**: Payment Integration
- **Phase 11**: Testing & Optimization
- **Phase 12**: Deployment

## 🌟 Key Features

### For Customers
- Browse international and domestic tour packages
- Hajj & Umrah packages
- Advanced search and filtering
- Secure booking system
- Multiple payment methods (bKash, Nagad, Rocket, Cards)
- User dashboard with booking history
- Review and rating system

### For Admin
- Tour package management
- Booking management
- User management
- Content management
- Analytics and reports
- Email notifications

### Bangladesh-Specific Features
- Local payment methods integration
- Bengali language support
- Local destinations (Cox's Bazar, Sundarbans, etc.)
- BDT currency display
- Hajj/Umrah specialized section
- Corporate travel packages

## 🔒 Environment Variables

### Backend
```env
DATABASE_URL=              # PostgreSQL connection string
JWT_SECRET=                # JWT secret key
PORT=                      # Server port (default: 5000)
NODE_ENV=                  # development/production
```

### Frontend
```env
VITE_API_URL=             # Backend API URL
```

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Backend
- **Railway**: Connect GitHub repo and deploy
- **Render**: Connect GitHub repo and deploy

### Frontend
- **Vercel**: Import from GitHub and deploy automatically

### Database
- **Railway**: PostgreSQL add-on
- **Supabase**: Managed PostgreSQL

## 🤝 Contributing

This project follows a phased development approach. Each phase builds upon the previous one.

## 📄 License

Private - Rio International © 2025

## 📞 Support

For questions or support, contact: info@riointernational.com

---

**Status**: Phase 1 & 2 Completed ✅
**Next**: Phase 3 - Homepage & Landing Pages
