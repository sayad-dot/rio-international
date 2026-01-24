# Authentication System Documentation

## Overview
This document describes the complete authentication system implementation for Rio International Travel Agency.

## Features Implemented

### Backend Authentication

1. **User Registration** (`POST /api/auth/register`)
   - Validates user input (name, email, password)
   - Checks for existing users
   - Hashes passwords using bcryptjs
   - Creates user in database
   - Returns JWT token and user data

2. **User Login** (`POST /api/auth/login`)
   - Validates credentials
   - Checks account status
   - Verifies password
   - Returns JWT token and user data

3. **User Profile** (`GET /api/auth/me`)
   - Protected route (requires authentication)
   - Returns current user information

4. **Update Profile** (`PUT /api/auth/profile`)
   - Protected route
   - Updates user information (name, phone, nationality, etc.)

5. **Change Password** (`PUT /api/auth/change-password`)
   - Protected route
   - Validates current password
   - Updates to new password

6. **Logout** (`POST /api/auth/logout`)
   - Protected route
   - Clears authentication cookie

7. **Email Verification** (`POST /api/auth/verify-email`)
   - Protected route
   - Marks email as verified

### Frontend Authentication

1. **Login Page** (`/login`)
   - Beautiful UI with form validation
   - Email and password fields
   - Remember me option
   - Error handling and loading states
   - Redirects to home on success

2. **Registration Page** (`/register`)
   - Multi-field registration form
   - Real-time password strength indicator
   - Terms and conditions checkbox
   - Comprehensive validation
   - Responsive design with visual appeal

3. **Auth Context**
   - Global authentication state management
   - Login/Register/Logout functions
   - User data persistence
   - Auto-login on page refresh

4. **Protected Routes**
   - Route guards for authenticated users
   - Admin-only routes
   - Automatic redirect to login

## API Endpoints

### Public Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logged in successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Protected Endpoints

All protected endpoints require the `Authorization` header:
```http
Authorization: Bearer <your-jwt-token>
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890",
  "nationality": "American"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## Database Schema

### Users Table
```prisma
model users {
  id             String    @id
  email          String    @unique
  password       String?
  firstName      String
  lastName       String
  phone          String?
  role           Role      @default(CUSTOMER)
  emailVerified  Boolean   @default(false)
  isActive       Boolean   @default(true)
  profileImage   String?
  dateOfBirth    DateTime?
  nationality    String?
  passportNumber String?
  loyaltyPoints  Int       @default(0)
  googleId       String?   @unique
  provider       String?   @default("local")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime
}

enum Role {
  CUSTOMER
  ADMIN
  AGENT
}
```

## Security Features

1. **Password Hashing**
   - Uses bcryptjs with salt rounds
   - Passwords never stored in plain text

2. **JWT Authentication**
   - Stateless authentication
   - Configurable expiration (default: 7 days)
   - Token stored in localStorage and cookies

3. **Input Validation**
   - Email format validation
   - Password minimum length (6 characters)
   - Required field validation

4. **Protected Routes**
   - Middleware authentication
   - Role-based access control
   - Account status verification

5. **HTTP-Only Cookies**
   - Secure cookie storage in production
   - CSRF protection with SameSite

## Frontend Components

### AuthContext
- Located: `frontend/src/contexts/AuthContext.jsx`
- Provides: `user`, `loading`, `login`, `register`, `logout`, `isAuthenticated`, `isAdmin`

### Login Page
- Located: `frontend/src/pages/auth/LoginPage.jsx`
- Features: Email/password login, remember me, error handling

### Register Page
- Located: `frontend/src/pages/auth/RegisterPage.jsx`
- Features: Full registration form, password strength meter, terms acceptance

### Protected Route
- Located: `frontend/src/App.jsx`
- Usage: Wraps routes requiring authentication

## Usage Examples

### Frontend - Using Auth Context

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      console.log('Logged in:', result.user);
    } else {
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.firstName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Backend - Protecting Routes

```javascript
import { protect, authorize } from '../middleware/auth.js';

// Protect route - requires authentication
router.get('/profile', protect, getProfile);

// Protect and authorize - requires admin role
router.get('/admin/users', protect, authorize('ADMIN'), getAllUsers);
```

## Testing

### Manual Testing

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Registration:**
   - Navigate to http://localhost:5173/register
   - Fill in the form
   - Click "Create Account"
   - Should redirect to home page with user logged in

4. **Test Login:**
   - Logout if logged in
   - Navigate to http://localhost:5173/login
   - Enter credentials
   - Click "Sign In"
   - Should redirect to home page

### Automated Testing

Run the test script:
```bash
./test-auth.sh
```

This script tests:
- User registration
- User login
- Profile retrieval
- Profile update
- Logout
- Unauthorized access

## Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/rio_international
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Error Handling

### Common Errors

1. **400 Bad Request**
   - Invalid input data
   - Missing required fields
   - Password too short

2. **401 Unauthorized**
   - Invalid credentials
   - Missing or expired token
   - Account deactivated

3. **403 Forbidden**
   - Insufficient permissions
   - Admin route accessed by non-admin

4. **404 Not Found**
   - User not found
   - Resource doesn't exist

5. **500 Internal Server Error**
   - Database connection issues
   - Server misconfiguration

## Best Practices

1. **Security**
   - Always use HTTPS in production
   - Set secure environment variables
   - Implement rate limiting
   - Add CSRF protection

2. **User Experience**
   - Clear error messages
   - Loading states
   - Form validation feedback
   - Password strength indicators

3. **Code Quality**
   - Use async/await
   - Proper error handling
   - Consistent naming conventions
   - Code comments for complex logic

## Future Enhancements

1. **Email Verification**
   - Send verification email on registration
   - Verify email token endpoint

2. **Password Reset**
   - Forgot password functionality
   - Reset token generation
   - Email with reset link

3. **OAuth Integration**
   - Google Sign-In
   - Facebook Login
   - Social authentication

4. **Two-Factor Authentication**
   - SMS verification
   - Authenticator app support

5. **Session Management**
   - Refresh tokens
   - Token blacklisting
   - Multiple device support

6. **Account Management**
   - Delete account
   - Export user data
   - Privacy settings

## Troubleshooting

### Issue: "User not found" after registration
**Solution:** Check database connection and verify user was created

### Issue: Token not working
**Solution:** Verify JWT_SECRET matches in .env and check token expiration

### Issue: CORS errors
**Solution:** Ensure FRONTEND_URL in backend .env matches frontend URL

### Issue: Password validation fails
**Solution:** Ensure password is at least 6 characters long

## Support

For issues or questions:
- Check this documentation
- Review error logs
- Verify environment variables
- Check database connectivity

---

**Version:** 1.0.0  
**Last Updated:** January 21, 2026  
**Author:** Rio International Development Team
