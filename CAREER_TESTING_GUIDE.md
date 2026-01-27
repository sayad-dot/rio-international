# Career System Testing Guide

## Quick Start
Both servers are running:
- **Frontend**: http://localhost:5174 (or 5173)
- **Backend**: http://localhost:5000

## Test Scenario 1: Browse and Apply for Jobs (Public User)

### Steps:
1. Open http://localhost:5174/career
2. Scroll down to view job listings
3. You should see 5 job positions:
   - Travel Consultant (2 openings)
   - Visa Processing Officer (3 openings)
   - Tour Operations Manager (1 opening)
   - Customer Service Representative (4 openings)
   - Digital Marketing Specialist (1 opening)

4. Click "Apply Now" on any job
5. Fill out the application form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +880 1234567890
   - Experience: 3 years
   - Cover Letter: Write a brief cover letter

6. Click "Submit Application"
7. You should see a success message
8. Modal closes automatically after 2 seconds

### Expected Results:
✅ Jobs load from database
✅ Job details display correctly
✅ Application modal opens
✅ Form validation works
✅ Success message appears
✅ Application saved to database

## Test Scenario 2: Admin Job Management

### Steps:
1. Login to admin panel:
   - Go to http://localhost:5174/auth/admin/login
   - Use your admin credentials
   
2. Navigate to Career → Job Postings
   - Check sidebar menu
   - Click on "Job Postings"

3. View all jobs in table:
   - Should see 5 jobs listed
   - Check Status (Active/Inactive)
   - Check number of openings

4. Create new job:
   - Click "Create Job" button
   - Fill form:
     ```
     Title: Sales Executive
     Department: Sales
     Type: Full-time
     Location: Dhaka, Bangladesh
     Salary: ৳25,000 - ৳45,000
     Positions: 2
     Description: Drive sales and build relationships...
     Requirements (one per line):
       - 2+ years sales experience
       - Excellent communication
       - Results-oriented
     Responsibilities (one per line):
       - Meet sales targets
       - Build client relationships
       - Present travel packages
     Benefits (one per line):
       - Commission structure
       - Travel perks
       - Health insurance
     Active: ✓ Checked
     ```
   - Click "Create Job"
   - Job should appear in table

5. Edit existing job:
   - Click edit icon on any job
   - Change salary range or positions
   - Click "Update Job"
   - Changes should reflect in table

6. Toggle job status:
   - Click on "Active" badge
   - Should change to "Inactive"
   - Click again to reactivate

7. Delete job:
   - Click delete icon
   - Confirm deletion
   - Job removed from table

### Expected Results:
✅ Admin can view all jobs
✅ Create job modal works
✅ New job appears in list
✅ Edit job loads data correctly
✅ Updates save successfully
✅ Status toggle works
✅ Delete removes job

## Test Scenario 3: Admin Application Management

### Steps:
1. From admin panel, navigate to Career → Applications

2. View applications table:
   - Should see the application you submitted earlier
   - Check applicant name, email, phone
   - Check applied date
   - Status should be "PENDING"

3. Filter applications:
   - Try Status filter → Select "PENDING"
   - Try Job Position filter → Select a job
   - Applications should filter accordingly

4. View application details:
   - Click "View Details" (eye icon)
   - Modal opens showing:
     - Applicant information
     - Cover letter content
     - Applied date

5. Update application status:
   - In detail modal, click status buttons:
     - Try "REVIEWING"
     - Try "SHORTLISTED"
     - Try "INTERVIEW_SCHEDULED"
   - Status should update immediately
   - Check if status reflected in table

6. Add admin notes:
   - In detail modal, scroll to "Admin Notes"
   - Add note: "Strong candidate, schedule interview"
   - Click "Save Notes"
   - Success message appears

7. Close modal and verify:
   - Status updated in table
   - Filter works with new status

### Expected Results:
✅ Applications table loads
✅ Filters work correctly
✅ Detail modal shows complete info
✅ Status updates work
✅ Admin notes save
✅ Changes persist after refresh

## Test Scenario 4: API Testing (Optional)

### Using curl or Postman:

**Get all jobs (Public):**
```bash
curl http://localhost:5000/api/jobs
```

**Get specific job:**
```bash
curl http://localhost:5000/api/jobs/1
```

**Submit application (Public):**
```bash
curl -X POST http://localhost:5000/api/jobs/1/apply \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+880 9876543210",
    "experience": "5 years",
    "coverLetter": "I am interested in this position..."
  }'
```

**Admin endpoints (requires JWT token):**
```bash
# First login to get token
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "yourpassword"
  }'

# Use token for admin requests
curl http://localhost:5000/api/admin/jobs \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Expected Results:
✅ API returns proper JSON responses
✅ Public endpoints accessible without auth
✅ Admin endpoints require authentication
✅ Error messages are clear and helpful

## Test Scenario 5: Error Handling

### Steps to test error cases:

1. **Form validation:**
   - Try submitting application without filling all fields
   - Should see validation errors

2. **Network errors:**
   - Stop backend server
   - Try submitting application
   - Should see error message

3. **Unauthorized access:**
   - Logout from admin
   - Try to access /admin/career/jobs
   - Should redirect to login

4. **Empty states:**
   - Delete all jobs
   - Visit /career
   - Should see "No open positions" message

### Expected Results:
✅ Validation errors display properly
✅ Network errors handled gracefully
✅ Unauthorized users redirected
✅ Empty states show helpful messages

## Performance Checks

### Loading States:
- ✅ Career page shows spinner while loading jobs
- ✅ Admin tables show spinner while fetching data
- ✅ Submit buttons disabled during submission

### Responsiveness:
- ✅ Test on mobile (DevTools → Toggle device toolbar)
- ✅ Tables should be scrollable on small screens
- ✅ Modals should fit mobile screens
- ✅ Forms should be easy to fill on mobile

## Database Verification

### Check data directly:
```bash
cd backend
npx prisma studio
```

This opens Prisma Studio at http://localhost:5555

### Verify:
- Jobs table has 5 records (or 6 if you created one)
- JobApplications table has your test applications
- Relations between jobs and applications work
- Status enum values are correct

## Common Issues and Solutions

### Issue: Jobs not loading
**Solution**: 
- Check backend server is running
- Check database connection
- Verify seed script ran successfully

### Issue: Application submission fails
**Solution**:
- Check browser console for errors
- Verify backend API is accessible
- Check form data is valid

### Issue: Admin pages not accessible
**Solution**:
- Ensure you're logged in as admin
- Check JWT token is valid
- Verify admin role in database

### Issue: Changes not reflecting
**Solution**:
- Hard refresh browser (Ctrl+Shift+R)
- Check for console errors
- Verify API calls are successful

## Success Criteria

All features working means:
- [x] Public career page displays jobs
- [x] Application submission works
- [x] Admin can manage jobs (CRUD)
- [x] Admin can review applications
- [x] Filtering and status updates work
- [x] Mobile responsive design works
- [x] Error handling is graceful
- [x] Data persists in database

## Next Steps After Testing

If all tests pass:
1. ✅ System is production-ready
2. ✅ Can deploy to production server
3. ✅ Can add more features as needed

If issues found:
1. Document the issue
2. Check relevant logs (browser console, server logs)
3. Review implementation files
4. Fix and re-test

---

**Happy Testing! 🚀**

If you find any issues during testing, they can be addressed immediately.
