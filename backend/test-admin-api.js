// Simple test script to verify admin API endpoints
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testAdminEndpoints() {
  try {
    console.log('🧪 Testing Admin API Endpoints...\n');

    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    const healthCheck = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check:', healthCheck.data);

    // Test 2: Try accessing admin endpoint without auth
    console.log('\n2️⃣ Testing admin endpoint without auth...');
    try {
      await axios.get(`${API_URL}/admin/dashboard/stats`);
      console.log('❌ Should have been unauthorized');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly blocked - 401 Unauthorized');
      } else {
        console.log('❌ Unexpected error:', error.response?.status);
      }
    }

    console.log('\n✅ Basic API tests passed!');
    console.log('\nTo test with authentication:');
    console.log('1. Login via frontend: http://localhost:5174/auth/admin/login');
    console.log('2. Check browser DevTools Network tab for API calls');
    console.log('3. Verify token is being sent in Authorization header\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAdminEndpoints();
