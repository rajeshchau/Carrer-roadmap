# Career Roadmap LMS 🎓

AI-powered Personalized Career Roadmap LMS that generates curated Free & Premium learning paths based on user goals, skill level, and timeline — with progress tracking and admin roadmap management.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📚 Quick Links

- **[Quick Start Guide](./QUICKSTART.md)** - Get started in 5 minutes
- **[Testing Guide](./TESTING.md)** - Comprehensive testing documentation
- **[Security Policy](./SECURITY.md)** - Security considerations and best practices

## 🚀 Features

### For Learners
- **🔐 Secure Authentication**: JWT-based signup and login
- **📝 Onboarding Quiz**: Personalized assessment of skill level, career goals, timeline, and domain
- **🗺️ AI-Powered Roadmaps**: Rule-based roadmap generation matching your profile
- **📊 Progress Tracking**: Visual dashboard to track your learning journey
- **💎 Free & Premium Resources**: Access to both free and premium learning materials
- **✅ Step Completion**: Mark steps as completed and see your progress grow

### For Administrators
- **🛠️ Template Management**: Create and manage roadmap templates
- **📚 Step & Resource Management**: Add learning steps and resources to templates
- **🎯 Domain Configuration**: Configure roadmaps for different domains (Web Dev, Data Science, etc.)
- **⚙️ Full CRUD Operations**: Complete control over roadmap templates

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

### Backend (Integrated in Next.js)
- **Next.js Route Handlers (`app/api/*`)**
- **TypeScript**
- **JWT Authentication**
- **Prisma-powered server logic**

### Database
- **PostgreSQL**
- **Prisma ORM 5**

## 📁 Project Structure

```
carrer-roadmap/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages (signup/login)
│   ├── quiz/              # Onboarding quiz
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── app/api/               # Next.js API Route Handlers
│   ├── auth/              # Login / signup / profile
│   ├── quiz/              # Quiz submit / result
│   ├── roadmap/           # Roadmap generation / retrieval
│   ├── progress/          # Progress updates
│   └── admin/             # Admin template management
├── components/            # Reusable React components
├── lib/                   # Frontend utilities
│   ├── api.ts            # API client functions
│   └── auth.ts           # Auth helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── public/               # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/rajeshchau/Carrer-roadmap.git
cd Carrer-roadmap
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the `.env.example` file to create your `.env` file:

```bash
cp .env.example .env
```

The default values are configured for local development with Docker. For production, update these values:

```env
# Database - Use a cloud PostgreSQL provider for Vercel (Neon, Supabase, Vercel Postgres, etc.)
DATABASE_URL="postgresql://postgres:password@localhost:5432/career_roadmap?schema=public"

# JWT Secret - Change this to a strong random string in production
JWT_SECRET="your-secret-key-change-in-production"

# Next.js API URL
NEXT_PUBLIC_API_URL="/api"
```

### 4. Set Up the Database

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL using Docker Compose
docker-compose up -d
```

This will start PostgreSQL on port 5432 with the credentials from .env

#### Option B: Using existing PostgreSQL
If you have PostgreSQL installed locally, create the database:
```bash
createdb career_roadmap
```

#### Run Prisma migrations
```bash
npm run prisma:migrate
```

#### Seed the database with sample data
```bash
npm run prisma:seed
```

This will create:
- Admin user: `admin@career-roadmap.com` (password: `admin123`)
- Demo learner: `demo@career-roadmap.com` (password: `demo123`)
- Web Development roadmap template with 6 steps
- Data Science roadmap template with 5 steps
- Free and Premium resources for each step

### 5. Run the Application

```bash
npm run dev
```

The application will run on http://localhost:3000 with integrated API routes at `/api/*`.

## 🧪 Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide.

Quick test:
1. Visit http://localhost:3000
2. Sign up with a new account
3. Complete the onboarding quiz
4. Generate your roadmap
5. Track your progress

## 🐳 Docker Support

The project includes Docker Compose configuration for easy PostgreSQL setup:

```bash
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# View logs
docker-compose logs -f
```

## 🎯 Usage Guide

### For Learners

1. **Sign Up**: Visit http://localhost:3000 and click "Sign Up"
2. **Complete Onboarding Quiz**: After signup, complete the quiz to define your learning profile
3. **Generate Roadmap**: On the dashboard, click "Generate Roadmap" to get your personalized learning path
4. **Track Progress**: Check off steps as you complete them and watch your progress grow
5. **Access Resources**: Click on resources to access free and premium learning materials

### For Administrators

1. **Login**: Use admin credentials (`admin@career-roadmap.com` / `admin123`)

> Quick test login for learner pages: `demo@career-roadmap.com` / `demo123`.
2. **Access Admin Panel**: You'll be redirected to `/admin`
3. **Create Templates**: Click "Create Template" to add new roadmap templates
4. **Manage Templates**: View, edit, or delete existing templates
5. **Add Steps**: Add learning steps with resources to each template

## 📊 Database Schema

The application uses the following main models:

- **User**: User accounts with role-based access (USER/ADMIN)
- **QuizResult**: Stores user's onboarding quiz answers
- **RoadmapTemplate**: Roadmap templates created by admins
- **RoadmapStep**: Individual learning steps within a template
- **Resource**: Learning resources (articles, videos, courses) for each step
- **UserRoadmap**: Links users to their assigned roadmaps
- **Progress**: Tracks completion status of each step

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt (10 rounds)
- Role-based access control (USER/ADMIN)
- Protected API routes with middleware
- Environment variable configuration
- Secure JWT secret validation (server fails to start if not provided)

### Production Considerations

For production deployment, consider adding:
- **Rate limiting**: Use express-rate-limit to prevent brute-force attacks
- **HTTPS**: Always use SSL/TLS in production
- **CORS configuration**: Restrict allowed origins
- **Input validation**: Add comprehensive input sanitization (e.g., express-validator)
- **Helmet.js**: Add security headers
- **Database connection pooling**: Configure Prisma for production
- **Logging**: Add proper logging and monitoring
- **Environment-specific configs**: Separate dev/staging/prod configurations

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Quiz
- `POST /api/quiz/submit` - Submit onboarding quiz (protected)
- `GET /api/quiz/result` - Get quiz results (protected)

### Roadmap
- `POST /api/roadmap/generate` - Generate personalized roadmap (protected)
- `GET /api/roadmap/my-roadmaps` - Get user's roadmaps (protected)
- `GET /api/roadmap/:id` - Get roadmap details (protected)

### Progress
- `POST /api/progress/update` - Update step completion (protected)
- `GET /api/progress/:roadmapId` - Get progress statistics (protected)

### Admin (protected, admin-only)
- `GET /api/admin/templates` - List all templates
- `POST /api/admin/templates` - Create template
- `PUT /api/admin/templates/:id` - Update template
- `DELETE /api/admin/templates/:id` - Delete template
- `POST /api/admin/templates/:templateId/steps` - Create step
- `PUT /api/admin/steps/:id` - Update step
- `DELETE /api/admin/steps/:id` - Delete step

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start Next.js development server (includes API routes)
npm run build        # Build for production
npm start            # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with sample data
npm run prisma:studio    # Open Prisma Studio (database GUI)
```

## 🚀 Vercel Deployment

This application is fully compatible with Vercel's serverless platform.

### Prerequisites
- Vercel account
- Cloud PostgreSQL database (recommended providers):
  - **Vercel Postgres** - Integrated with Vercel
  - **Neon** - Serverless PostgreSQL
  - **Supabase** - Open-source alternative

### Deployment Steps

1. **Set up a Cloud Database**
   
   Choose one of the following:
   
   **Option A: Vercel Postgres** (Recommended for Vercel)
   - Create a new Postgres database in your Vercel project
   - Copy the `DATABASE_URL` connection string

   **Option B: Neon**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

   **Option C: Supabase**
   - Sign up at [supabase.com](https://supabase.com)
   - Create a new project
   - Get the connection string from Settings > Database

2. **Deploy to Vercel**
   
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure Environment Variables**
   
   In your Vercel project settings, add:
   
   ```env
   DATABASE_URL="your-cloud-database-connection-string"
   JWT_SECRET="your-strong-random-secret"
   NEXT_PUBLIC_API_URL="/api"
   ```
   
   Generate a secure JWT secret:
   ```bash
   openssl rand -base64 32
   ```

4. **Run Database Migrations**
   
   After deployment, run migrations:
   ```bash
   # If using Vercel Postgres
   vercel env pull .env.local
   npm run prisma:migrate deploy
   npm run prisma:seed
   ```

5. **Access Your Application**
   
   Your app will be available at `https://your-project.vercel.app`

### Important Notes
- The API routes are automatically deployed as serverless functions
- All API endpoints are available at `/api/*`
- Database connection pooling is handled by Prisma
- For production, ensure `JWT_SECRET` is a strong random string

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

Created for the Career Roadmap LMS project.

---

**Note**: This is a learning management system designed to help individuals create personalized career development plans. Make sure to change the JWT secret and admin password in production!
