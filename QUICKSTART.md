# Quick Start Guide

Get the Career Roadmap LMS up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- Docker installed (for PostgreSQL)
- Git

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/rajeshchau/Carrer-roadmap.git
cd Carrer-roadmap

# Install dependencies
npm install
```

## Step 2: Environment Setup

The `.env` file is already created with development settings. For production, update the values:

```bash
# Review and update .env file
cat .env

# Generate a secure JWT secret for production
openssl rand -base64 32
```

## Step 3: Start Database

```bash
# Start PostgreSQL using Docker
docker-compose up -d

# Wait a few seconds for database to be ready
sleep 5
```

## Step 4: Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate -- --name init

# Seed with sample data
npm run prisma:seed
```

Expected output:
```
✔ Generated Prisma Client
✔ Migrations applied
✓ Created admin user: admin@career-roadmap.com
✓ Created Web Development roadmap template
✓ Created Data Science roadmap template
✓ Seed completed successfully!
```

## Step 5: Start the Application

```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.1.6
- Local: http://localhost:3000
- Ready in 2s
```

The application includes integrated API routes at `/api/*`.

## Step 6: Access the Application

1. **Visit**: http://localhost:3000
2. **Sign Up**: Create a new user account
3. **Complete Quiz**: Answer the onboarding questions
4. **View Dashboard**: See your personalized roadmap

## Test Admin Panel

1. **Login**: http://localhost:3000/auth/login
2. **Credentials**:
   - Email: admin@career-roadmap.com
   - Password: admin123
3. **Admin Panel**: You'll be redirected to /admin

## Quick Test

Run this in a new terminal to test the API:

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Create a test user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

## Troubleshooting

### Database connection error
```bash
# Check if PostgreSQL is running
docker ps

# View PostgreSQL logs
docker compose logs postgres
```

### Port already in use
```bash
# Kill process on port 3000 (Next.js)
lsof -ti:3000 | xargs kill -9
```

### Prisma errors
```bash
# Regenerate Prisma client
npm run prisma:generate

# Reset database (WARNING: destroys all data)
npx prisma migrate reset
```

## Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [TESTING.md](./TESTING.md) for testing guide
- Review [SECURITY.md](./SECURITY.md) for security considerations

## One-Line Setup (Advanced)

Run the automated setup script:
```bash
chmod +x setup.sh
./setup.sh
```

## Stop Everything

```bash
# Stop Next.js server (Ctrl+C in terminal)

# Stop and remove PostgreSQL container
docker-compose down

# To also remove the database volume (destroys data)
docker-compose down -v
```

## Default Accounts

### Admin Account
- Email: admin@career-roadmap.com
- Password: admin123

### Test Any User Journey
1. Sign up at http://localhost:3000/auth/signup
2. Choose "Beginner" skill level
3. Select "Web Development" domain
4. Select "6 months" timeline
5. Generate roadmap and start learning!

## Support

If you encounter issues:
1. Check the console for error messages
2. Review the logs from backend and frontend terminals
3. Run `./check-env.sh` to verify your environment
4. Consult [TESTING.md](./TESTING.md) for common issues

Happy Learning! 🎓
