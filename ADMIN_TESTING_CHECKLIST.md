# Admin Dashboard Testing Checklist ✅

## Current Status
- ✅ Backend server running on **http://localhost:5000**
- ✅ Frontend server running on **http://localhost:5174**
- ✅ All syntax errors fixed
- ✅ Routes configured correctly

---

## Pre-Testing Setup

### Required: Create Test Admin User

Before testing the admin panel, you need an admin user in the database. You have two options:

#### Option 1: Register via UI (Recommended)
1. Navigate to: http://localhost:5174/auth/admin/register
2. Fill in the form:
   - Employee ID: `EMP-0001` (must follow EMP-XXXX format)
   - First Name: Your first name
   - Last Name: Your last name
   - Email: `admin@test.com` (or any email)
   - Phone: `01700000000`
   - Password: `admin123` (min 6 characters)
   - Confirm Password: `admin123`
3. Click "Register as Admin"
4. You should be automatically logged in and redirected to `/admin/dashboard`

#### Option 2: Use Database Seed (if available)
```bash
cd backend
npm run seed
```

---

## Testing Checklist

### 1. Authentication Flow ✅

#### Admin Registration
- [ ] Navigate to http://localhost:5174/auth/admin/register
- [ ] Test employee ID validation:
  - [ ] Try invalid format (should fail): `123`, `EMP123`, `emp-123`
  - [ ] Try valid format (should succeed): `EMP-0001`, `EMP-1234`
- [ ] Fill form with valid data
- [ ] Submit registration
- [ ] Verify automatic login & redirect to dashboard
- [ ] Check browser localStorage for `token` and `user` items
- [ ] Verify user object has role: `ADMIN`

#### Admin Login
- [ ] Navigate to http://localhost:5174/auth/admin/login
- [ ] Test with invalid credentials (should show error)
- [ ] Test with valid admin credentials (should login)
- [ ] Test with regular customer credentials (should be blocked)
- [ ] Verify redirect to `/admin/dashboard` after successful login
- [ ] Check Network tab in DevTools:
  - [ ] POST request to `/api/auth/login`
  - [ ] Response contains `token` and `user`
  - [ ] Subsequent requests include `Authorization: Bearer <token>` header

#### Protected Routes
- [ ] Logout from admin panel
- [ ] Try accessing `/admin/dashboard` directly (should redirect to login)
- [ ] Login again
- [ ] Verify access is granted

---

### 2. Admin Layout & Navigation ✅

#### Sidebar
- [ ] Verify sidebar displays on desktop
- [ ] Check user profile section shows:
  - [ ] User initials in avatar
  - [ ] User full name
  - [ ] Role badge (Admin or Super Admin)
- [ ] Test navigation menu items:
  - [ ] Dashboard link (with active state)
  - [ ] Bookings link (with badge "12")
  - [ ] Tours link
  - [ ] Visa Packages link
  - [ ] Customers link
  - [ ] Reviews link (with badge "3")
- [ ] Verify active link highlighting (blue gradient background)
- [ ] Test logout button functionality

#### Header
- [ ] Check search bar displays on desktop (hidden on mobile)
- [ ] Verify notification bell with red dot indicator
- [ ] Test hamburger menu button toggles sidebar

#### Mobile Responsiveness
- [ ] Resize browser to mobile width (< 768px)
- [ ] Verify sidebar is hidden by default
- [ ] Click hamburger menu to open sidebar
- [ ] Verify overlay appears behind sidebar
- [ ] Click overlay to close sidebar
- [ ] Test all navigation links work on mobile

---

### 3. Admin Dashboard Page ✅

#### Header Section
- [ ] Verify page title: "Dashboard"
- [ ] Check subtitle: "Welcome back! Here's what's happening."
- [ ] Test date range filter dropdown:
  - [ ] Last 7 days
  - [ ] Last 30 days
  - [ ] Last 90 days
  - [ ] Last year
- [ ] Verify changing date range triggers API call

#### Stats Cards
- [ ] **Total Bookings Card:**
  - [ ] Blue gradient icon (Package icon)
  - [ ] Shows number value
  - [ ] Green arrow up with "+12.5%"
  - [ ] Hover effect (scale up icon, shadow increase)
- [ ] **Total Revenue Card:**
  - [ ] Green gradient icon (Dollar icon)
  - [ ] Shows "BDT X,XXX" format
  - [ ] Trend indicator
- [ ] **Total Customers Card:**
  - [ ] Purple gradient icon (Users icon)
  - [ ] Shows number value
  - [ ] Trend indicator
- [ ] **Pending Reviews Card:**
  - [ ] Orange gradient icon (Star icon)
  - [ ] Shows number value
  - [ ] Red arrow down with "-2.1%"

#### Booking Trends Section
- [ ] Verify card displays
- [ ] Check "Booking Trends" title
- [ ] Verify monthly data list displays
- [ ] Each row shows:
  - [ ] Month name
  - [ ] Booking count
  - [ ] Revenue in BDT format
- [ ] Test hover effect (background color change)

#### Popular Destinations Section
- [ ] Verify card displays
- [ ] Check title "Popular Destinations"
- [ ] Verify numbered badges (1, 2, 3...)
- [ ] Each destination shows:
  - [ ] Location name with map pin icon
  - [ ] Progress bar (gradient blue)
  - [ ] Booking count
- [ ] Verify progress bar widths are relative to top destination

#### Recent Bookings Table
- [ ] Verify table displays
- [ ] Check "View All" button
- [ ] Table headers display correctly:
  - [ ] Customer
  - [ ] Package
  - [ ] Date
  - [ ] Amount
  - [ ] Status
  - [ ] Action
- [ ] Each booking row shows:
  - [ ] Customer avatar with initial
  - [ ] Customer name and email
  - [ ] Package name
  - [ ] Formatted travel date
  - [ ] Amount in "BDT X,XXX" format
  - [ ] Status badge (colored appropriately)
  - [ ] Eye icon button
- [ ] Test row hover effect (gray background)
- [ ] Test eye icon button hover (blue color)

---

### 4. Bookings Management Page ✅

#### Navigation
- [ ] Click "Bookings" in sidebar
- [ ] Verify URL changes to `/admin/bookings`
- [ ] Check active state on sidebar

#### Header Section
- [ ] Verify page title: "Booking Management"
- [ ] Check subtitle: "Manage and track all customer bookings"
- [ ] Verify "Export CSV" button displays
- [ ] Test Export CSV button (should download CSV file)

#### Filters Section
- [ ] **Booking Status Filter:**
  - [ ] All Status (default)
  - [ ] Pending
  - [ ] Confirmed
  - [ ] Cancelled
  - [ ] Completed
- [ ] **Payment Status Filter:**
  - [ ] All Payments
  - [ ] Pending
  - [ ] Partial
  - [ ] Paid
  - [ ] Refunded
- [ ] **Date Filters:**
  - [ ] Date From picker
  - [ ] Date To picker
- [ ] Test applying filters:
  - [ ] Select a status
  - [ ] Verify table updates
  - [ ] Check API call with filter params

#### Data Table
- [ ] **Table Features:**
  - [ ] Search box at top
  - [ ] Sortable columns (arrows appear on hover)
  - [ ] Pagination controls
- [ ] **Search Functionality:**
  - [ ] Type in search box
  - [ ] Verify results filter in real-time
  - [ ] Test searching by customer name, email, package
- [ ] **Sorting:**
  - [ ] Click column header to sort ascending
  - [ ] Click again to sort descending
  - [ ] Verify arrow icon changes direction
- [ ] **Pagination:**
  - [ ] Change "Show" dropdown (10, 25, 50, 100)
  - [ ] Verify page size updates
  - [ ] Test page navigation buttons:
    - [ ] First page (double chevron left)
    - [ ] Previous page (single chevron left)
    - [ ] Page numbers (1, 2, 3...)
    - [ ] Next page (single chevron right)
    - [ ] Last page (double chevron right)
  - [ ] Verify showing "X to Y of Z" text updates

#### Booking Details Modal
- [ ] Click eye icon on any booking row
- [ ] Verify modal opens
- [ ] **Customer Information Section:**
  - [ ] Name displays
  - [ ] Email displays
  - [ ] Phone displays (or N/A)
  - [ ] Number of travelers
- [ ] **Package Details Section:**
  - [ ] Package name
  - [ ] Travel date with calendar icon
  - [ ] Total amount with dollar icon
- [ ] **Update Status Section:**
  - [ ] Booking Status dropdown
  - [ ] Payment Status dropdown
  - [ ] Test changing booking status:
    - [ ] Select new status
    - [ ] Verify alert shows success message
    - [ ] Check table updates automatically
  - [ ] Test changing payment status:
    - [ ] Select new status
    - [ ] Verify alert shows success message
- [ ] **Special Requests Section (if exists):**
  - [ ] Displays customer's special requests
- [ ] Click outside modal or X button to close
- [ ] Verify modal closes properly

---

### 5. API Integration ✅

#### Check Network Tab (DevTools)
- [ ] Open Browser DevTools (F12)
- [ ] Go to Network tab
- [ ] Navigate through admin pages
- [ ] Verify API calls:

**Dashboard:**
- [ ] `GET /api/admin/dashboard/stats?dateRange=30days`
- [ ] `GET /api/admin/dashboard/booking-trends`
- [ ] `GET /api/admin/dashboard/popular-destinations`
- [ ] All return 200 OK status
- [ ] All include `Authorization: Bearer <token>` header

**Bookings:**
- [ ] `GET /api/admin/bookings?status=all&paymentStatus=all`
- [ ] When filtering: query params update correctly
- [ ] Returns 200 OK status
- [ ] Authorization header present

**Status Updates:**
- [ ] `PATCH /api/admin/bookings/:id/status`
- [ ] Request body: `{ "status": "CONFIRMED" }`
- [ ] `PATCH /api/admin/bookings/:id/payment-status`
- [ ] Request body: `{ "paymentStatus": "PAID" }`

#### Error Handling
- [ ] Logout from admin
- [ ] Try accessing admin API in browser: `http://localhost:5000/api/admin/dashboard/stats`
- [ ] Should return 401 Unauthorized
- [ ] Login again
- [ ] Verify API calls work again

---

### 6. Data Integrity ✅

#### Database Queries
Open a terminal and run:
```bash
cd backend
npx prisma studio
```

- [ ] Prisma Studio opens in browser
- [ ] Navigate to `users` table
- [ ] Verify admin user exists with:
  - [ ] role: `ADMIN` or `SUPER_ADMIN`
  - [ ] employeeId: matches registration
  - [ ] hashed password (not plain text)
- [ ] Navigate to `bookings` table (if any data)
- [ ] Verify status updates reflect in database
- [ ] Navigate to `activity_logs` table
- [ ] Verify admin actions are logged

---

### 7. Role-Based Access Control ✅

#### SUPER_ADMIN vs ADMIN
If you have both types of users:
- [ ] Login as regular ADMIN
- [ ] Verify sidebar shows:
  - [ ] Overview section (Dashboard)
  - [ ] Management section (Bookings, Tours, Visa, Customers, Reviews)
  - [ ] **NO** Administration section
- [ ] Logout and login as SUPER_ADMIN
- [ ] Verify sidebar now shows:
  - [ ] All sections from ADMIN
  - [ ] **PLUS** Administration section (Employees, Settings)

#### Test Backend Authorization
Try accessing endpoints with different roles:
```bash
# With ADMIN token (should succeed)
curl -H "Authorization: Bearer <ADMIN_TOKEN>" http://localhost:5000/api/admin/dashboard/stats

# With CUSTOMER token (should fail)
curl -H "Authorization: Bearer <CUSTOMER_TOKEN>" http://localhost:5000/api/admin/dashboard/stats

# Expected: 403 Forbidden or 401 Unauthorized
```

---

### 8. Performance & UX ✅

#### Loading States
- [ ] Logout and login again
- [ ] Watch stats cards on dashboard
- [ ] Verify loading skeleton displays briefly
- [ ] Check smooth transition to real data

#### Responsive Design
Test on different screen sizes:
- [ ] Desktop (>1024px)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (< 768px)
- [ ] Verify all elements adapt properly
- [ ] Check no horizontal scrolling
- [ ] Test touch interactions on mobile

#### Animations & Transitions
- [ ] Hover over stats cards (icon scales up)
- [ ] Hover over sidebar links (background changes)
- [ ] Click sidebar links (smooth active state)
- [ ] Open/close sidebar on mobile (smooth slide)
- [ ] Progress bars animate on load

---

## Known Limitations (Phase 1)

These features are **NOT YET IMPLEMENTED** and will return mock/empty data:
- ❌ Tours management page
- ❌ Visa packages management page
- ❌ Reviews moderation page
- ❌ Customers directory page
- ❌ Employee management (SUPER_ADMIN only)
- ❌ System settings page
- ❌ Real-time notifications
- ❌ Chart.js visualizations (using simple lists instead)
- ❌ CSV export functionality (backend endpoint exists but may need testing)

---

## Common Issues & Solutions

### Issue: "Cannot access admin dashboard"
**Solution:**
- Verify you're logged in as ADMIN or SUPER_ADMIN
- Check localStorage for `token` and `user`
- Verify user role in localStorage: `JSON.parse(localStorage.getItem('user')).role`
- Should be `"ADMIN"` or `"SUPER_ADMIN"`, not `"CUSTOMER"`

### Issue: "401 Unauthorized" errors in console
**Solution:**
- Token might be expired or invalid
- Logout and login again
- Check if token exists: `localStorage.getItem('token')`

### Issue: "Network request failed"
**Solution:**
- Verify backend is running on port 5000
- Check terminal for backend errors
- Verify PostgreSQL database is running
- Check `.env` file has correct DATABASE_URL

### Issue: "No data showing on dashboard"
**Solution:**
- Database might be empty
- Run seed script: `cd backend && npm run seed`
- Or manually create test bookings via regular user flow

### Issue: "Frontend won't start"
**Solution:**
- Check for syntax errors
- Run: `cd frontend && npm install`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 5174 isn't blocked by firewall

### Issue: "Sidebar navigation not working"
**Solution:**
- Check browser console for errors
- Verify all routes are defined in App.jsx
- Check if React Router is working: try manual URL navigation

---

## Next Steps After Testing

Once all tests pass:
1. ✅ Commit changes to Git
2. ✅ Push to GitHub (auto-deploys to Render & Vercel)
3. 🚀 Proceed with **Phase 2** implementation:
   - Tours Management page
   - Visa Packages Management
   - Reviews Moderation
   - Customers Directory
   - Employee Management (SUPER_ADMIN)
   - System Analytics & Settings

---

## Testing Report Template

After testing, document results:

```
# Admin Dashboard Phase 1 - Test Results

**Date:** [Date]
**Tested By:** [Your Name]
**Environment:** Local Development

## Summary
- Tests Passed: X / Y
- Tests Failed: X / Y
- Critical Issues: X
- Minor Issues: X

## Test Results

### Authentication ✅
- [ ] Registration: PASS / FAIL
- [ ] Login: PASS / FAIL
- [ ] Protected Routes: PASS / FAIL

### Dashboard ✅
- [ ] Stats Cards: PASS / FAIL
- [ ] Charts: PASS / FAIL
- [ ] Recent Bookings: PASS / FAIL

### Bookings ✅
- [ ] List View: PASS / FAIL
- [ ] Filters: PASS / FAIL
- [ ] Status Updates: PASS / FAIL
- [ ] CSV Export: PASS / FAIL

### Issues Found
1. [Issue description] - Priority: High/Medium/Low
2. [Issue description] - Priority: High/Medium/Low

### Recommendations
- [Recommendation 1]
- [Recommendation 2]
```

---

## Quick Test Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm run dev

# Open Prisma Studio (new terminal)
cd backend && npx prisma studio

# Check backend logs
# Watch the terminal running backend

# Check frontend console
# Open browser DevTools (F12) → Console tab

# Test API manually
curl http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Ready to test!** Start with Section 1 (Authentication) and work your way through each section systematically. 🚀
