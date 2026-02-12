# Testing Guide for Career Roadmap LMS

## Prerequisites
- PostgreSQL running on port 5432
- Backend server running on port 5000
- Frontend server running on port 3000

## Manual Testing Checklist

### 1. Authentication Flow

#### Test Signup
1. Navigate to http://localhost:3000
2. Click "Sign Up"
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Sign Up"
5. ✅ Should redirect to /quiz

#### Test Login
1. Navigate to http://localhost:3000
2. Click "Login"
3. Enter credentials:
   - Email: test@example.com
   - Password: test123
4. Click "Login"
5. ✅ Should redirect to /dashboard

#### Test Admin Login
1. Navigate to http://localhost:3000/auth/login
2. Enter admin credentials:
   - Email: admin@career-roadmap.com
   - Password: admin123
3. Click "Login"
4. ✅ Should redirect to /admin

### 2. Onboarding Quiz Flow

1. After signup, you should be on /quiz
2. Fill in the quiz:
   - Skill Level: Select "Beginner"
   - Career Goal: Enter "Full Stack Developer"
   - Timeline: Select "6 months"
   - Domain: Select "Web Development"
3. Click "Submit & Generate Roadmap"
4. ✅ Should redirect to /dashboard

### 3. Dashboard & Roadmap

#### View Dashboard
1. Navigate to /dashboard
2. ✅ Should see "No Roadmaps Yet" if first time

#### Generate Roadmap
1. Click "Generate Roadmap"
2. ✅ Should see a roadmap with steps
3. ✅ Should show progress bar at 0%

#### Track Progress
1. Click checkbox next to a step
2. ✅ Step should turn green
3. ✅ Progress bar should update
4. ✅ Refresh page - progress should persist

#### View Resources
1. Expand a step to see resources
2. ✅ Should see both FREE and PREMIUM resources
3. ✅ Resources should have different colored badges
4. Click "View" on a resource
5. ✅ Should open resource URL in new tab

### 4. Admin Panel

#### View Templates
1. Login as admin
2. Navigate to /admin
3. ✅ Should see existing roadmap templates

#### Create Template
1. Click "Create Template"
2. Fill in form:
   - Title: "Mobile Developer"
   - Description: "Learn mobile development"
   - Domain: Select "Mobile Development"
   - Skill Level: Select "Beginner"
   - Timeline: Select "6 months"
3. Click "Create Template"
4. ✅ Should see new template in the list

#### Delete Template
1. Click "Delete" on a template
2. Confirm deletion
3. ✅ Template should be removed

### 5. API Testing

You can test the API endpoints using curl or Postman:

#### Health Check
```bash
curl http://localhost:5000/api/health
```
✅ Should return: `{"status":"ok","message":"Career Roadmap API is running"}`

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"test123","name":"API Test"}'
```
✅ Should return token and user object

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"test123"}'
```
✅ Should return token and user object

## Expected Behavior Summary

### User Journey
1. Signup → Redirected to Quiz
2. Complete Quiz → Redirected to Dashboard
3. Generate Roadmap → See personalized roadmap
4. Track Progress → Check off steps, see progress update
5. View Resources → Access free and premium materials

### Admin Journey
1. Login → Redirected to Admin Panel
2. View Templates → See all roadmap templates
3. Create Template → Add new roadmap templates
4. Manage Templates → Edit or delete templates

## Common Issues and Troubleshooting

### Backend Not Starting
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Check if port 5000 is available

### Frontend Not Loading
- Ensure backend is running first
- Check NEXT_PUBLIC_API_URL in .env
- Clear browser cache

### Database Connection Error
- Verify PostgreSQL is running: `docker ps`
- Check connection string in .env
- Try restarting PostgreSQL: `docker-compose restart`

### Roadmap Not Generating
- Ensure quiz is completed first
- Check that matching template exists in database
- Verify domain, skill level, and timeline match a template

## Performance Checks

- Page load time should be < 2 seconds
- API responses should be < 500ms
- Progress updates should be instant
- No console errors in browser

## Security Checks

- Passwords should not be visible in network tab
- JWT tokens should be stored in localStorage
- Admin routes should be protected
- API endpoints should require authentication
