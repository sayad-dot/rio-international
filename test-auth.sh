#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="http://localhost:5000/api"

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Authentication System Test Script${NC}"
echo -e "${BLUE}=======================================${NC}\n"

# Function to make API calls
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4
    local description=$5
    
    echo -e "${BLUE}Testing: ${description}${NC}"
    
    if [ -n "$token" ]; then
        response=$(curl -s -X $method "${API_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data")
    else
        response=$(curl -s -X $method "${API_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    echo -e "Response: $response\n"
    echo "$response"
}

# Test 1: Health Check
echo -e "${GREEN}1. Health Check${NC}"
curl -s http://localhost:5000/health | jq .
echo -e "\n"

# Test 2: Register a new user
echo -e "${GREEN}2. Register New User${NC}"
REGISTER_DATA='{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+8801234567890",
  "password": "password123"
}'

REGISTER_RESPONSE=$(test_endpoint "POST" "/auth/register" "$REGISTER_DATA" "" "User Registration")
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.token // empty')

if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✓ Registration successful!${NC}"
    echo -e "Token: ${TOKEN:0:20}...\n"
else
    echo -e "${RED}✗ Registration failed${NC}\n"
fi

# Test 3: Login with the registered user
echo -e "${GREEN}3. Login${NC}"
LOGIN_DATA='{
  "email": "john.doe@example.com",
  "password": "password123"
}'

LOGIN_RESPONSE=$(test_endpoint "POST" "/auth/login" "$LOGIN_DATA" "" "User Login")
LOGIN_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token // empty')

if [ -n "$LOGIN_TOKEN" ]; then
    echo -e "${GREEN}✓ Login successful!${NC}"
    echo -e "Token: ${LOGIN_TOKEN:0:20}...\n"
    TOKEN=$LOGIN_TOKEN
else
    echo -e "${RED}✗ Login failed${NC}\n"
fi

# Test 4: Get current user profile
if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}4. Get User Profile${NC}"
    test_endpoint "GET" "/auth/me" "" "$TOKEN" "Get User Profile"
fi

# Test 5: Update profile
if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}5. Update User Profile${NC}"
    UPDATE_DATA='{
      "firstName": "John",
      "lastName": "Doe Updated",
      "nationality": "Bangladeshi"
    }'
    test_endpoint "PUT" "/auth/profile" "$UPDATE_DATA" "$TOKEN" "Update Profile"
fi

# Test 6: Logout
if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}6. Logout${NC}"
    test_endpoint "POST" "/auth/logout" "" "$TOKEN" "User Logout"
fi

# Test 7: Try to access protected route without token
echo -e "${GREEN}7. Access Protected Route Without Token (Should Fail)${NC}"
test_endpoint "GET" "/auth/me" "" "" "Unauthorized Access Attempt"

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Test Complete!${NC}"
echo -e "${BLUE}=======================================${NC}"
