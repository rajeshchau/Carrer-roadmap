import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@career-roadmap.com' },
    update: {},
    create: {
      email: 'admin@career-roadmap.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create Web Development Roadmap Template
  const webDevTemplate = await prisma.roadmapTemplate.create({
    data: {
      title: 'Full Stack Web Developer',
      description: 'Complete roadmap to become a full-stack web developer',
      domain: 'Web Development',
      skillLevel: 'Beginner',
      timeline: '6 months',
      steps: {
        create: [
          {
            order: 1,
            title: 'HTML & CSS Fundamentals',
            description: 'Learn the building blocks of web development',
            duration: '2 weeks',
            resources: {
              create: [
                {
                  title: 'HTML Tutorial - W3Schools',
                  description: 'Comprehensive HTML tutorial',
                  url: 'https://www.w3schools.com/html/',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'CSS Complete Course - freeCodeCamp',
                  description: 'Full CSS course for beginners',
                  url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
                {
                  title: 'Advanced CSS and Sass - Udemy',
                  description: 'Advanced CSS techniques and Sass',
                  url: 'https://www.udemy.com/course/advanced-css-and-sass/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
          {
            order: 2,
            title: 'JavaScript Basics',
            description: 'Master JavaScript fundamentals',
            duration: '3 weeks',
            resources: {
              create: [
                {
                  title: 'JavaScript Basics - MDN',
                  description: 'Mozilla Developer Network JavaScript guide',
                  url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'JavaScript Full Course - YouTube',
                  description: 'Complete JavaScript course',
                  url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
                {
                  title: 'JavaScript: The Complete Guide - Udemy',
                  description: 'In-depth JavaScript course',
                  url: 'https://www.udemy.com/course/javascript-the-complete-guide/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
          {
            order: 3,
            title: 'React.js Framework',
            description: 'Build modern UIs with React',
            duration: '4 weeks',
            resources: {
              create: [
                {
                  title: 'React Official Documentation',
                  description: 'Official React docs and tutorials',
                  url: 'https://react.dev/',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'React Course - freeCodeCamp',
                  description: 'Free React course for beginners',
                  url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
                {
                  title: 'React - The Complete Guide - Udemy',
                  description: 'Comprehensive React course',
                  url: 'https://www.udemy.com/course/react-the-complete-guide/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
          {
            order: 4,
            title: 'Node.js & Express',
            description: 'Build backend APIs with Node.js',
            duration: '4 weeks',
            resources: {
              create: [
                {
                  title: 'Node.js Documentation',
                  description: 'Official Node.js documentation',
                  url: 'https://nodejs.org/en/docs/',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'Node.js Tutorial - Traversy Media',
                  description: 'Node.js crash course',
                  url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
                {
                  title: 'Node.js - The Complete Guide - Udemy',
                  description: 'Complete Node.js development course',
                  url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
          {
            order: 5,
            title: 'Databases & SQL',
            description: 'Learn database design and SQL',
            duration: '3 weeks',
            resources: {
              create: [
                {
                  title: 'SQL Tutorial - W3Schools',
                  description: 'Interactive SQL tutorial',
                  url: 'https://www.w3schools.com/sql/',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'PostgreSQL Tutorial - freeCodeCamp',
                  description: 'Complete PostgreSQL course',
                  url: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
                {
                  title: 'The Complete SQL Bootcamp - Udemy',
                  description: 'Master SQL and database design',
                  url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
          {
            order: 6,
            title: 'Full Stack Project',
            description: 'Build a complete full-stack application',
            duration: '4 weeks',
            resources: {
              create: [
                {
                  title: 'Build a Full Stack App',
                  description: 'Step-by-step full stack project',
                  url: 'https://www.freecodecamp.org/news/full-stack-project-tutorial/',
                  type: 'PROJECT',
                  tier: 'FREE',
                },
                {
                  title: 'MERN Stack Project',
                  description: 'Build a MERN stack application',
                  url: 'https://www.youtube.com/watch?v=ngc9gnGgUdA',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
                {
                  title: 'Advanced Full Stack Projects - Udemy',
                  description: 'Build production-ready applications',
                  url: 'https://www.udemy.com/course/mern-stack-course/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log('Created Web Development roadmap template');

  // Create Data Science Roadmap Template
  const dataScienceTemplate = await prisma.roadmapTemplate.create({
    data: {
      title: 'Data Science Professional',
      description: 'Comprehensive roadmap to become a data scientist',
      domain: 'Data Science',
      skillLevel: 'Beginner',
      timeline: '6 months',
      steps: {
        create: [
          {
            order: 1,
            title: 'Python Fundamentals',
            description: 'Learn Python programming basics',
            duration: '3 weeks',
            resources: {
              create: [
                {
                  title: 'Python Tutorial - Official Docs',
                  description: 'Official Python tutorial',
                  url: 'https://docs.python.org/3/tutorial/',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'Python for Beginners - freeCodeCamp',
                  description: 'Complete Python course',
                  url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
              ],
            },
          },
          {
            order: 2,
            title: 'Statistics & Mathematics',
            description: 'Essential statistics for data science',
            duration: '4 weeks',
            resources: {
              create: [
                {
                  title: 'Statistics Tutorial - Khan Academy',
                  description: 'Free statistics course',
                  url: 'https://www.khanacademy.org/math/statistics-probability',
                  type: 'COURSE',
                  tier: 'FREE',
                },
                {
                  title: 'Statistics for Data Science - Udemy',
                  description: 'Applied statistics course',
                  url: 'https://www.udemy.com/course/statistics-for-data-science/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
          {
            order: 3,
            title: 'Data Analysis with Pandas',
            description: 'Master data manipulation with Pandas',
            duration: '3 weeks',
            resources: {
              create: [
                {
                  title: 'Pandas Documentation',
                  description: 'Official Pandas documentation',
                  url: 'https://pandas.pydata.org/docs/',
                  type: 'ARTICLE',
                  tier: 'FREE',
                },
                {
                  title: 'Pandas Tutorial - YouTube',
                  description: 'Complete Pandas course',
                  url: 'https://www.youtube.com/watch?v=vmEHCJofslg',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
              ],
            },
          },
          {
            order: 4,
            title: 'Machine Learning Basics',
            description: 'Introduction to machine learning',
            duration: '5 weeks',
            resources: {
              create: [
                {
                  title: 'Machine Learning - Coursera',
                  description: 'Andrew Ng ML course',
                  url: 'https://www.coursera.org/learn/machine-learning',
                  type: 'COURSE',
                  tier: 'FREE',
                },
                {
                  title: 'ML from Scratch - YouTube',
                  description: 'Build ML algorithms from scratch',
                  url: 'https://www.youtube.com/watch?v=aircAruvnKk',
                  type: 'VIDEO',
                  tier: 'FREE',
                },
              ],
            },
          },
          {
            order: 5,
            title: 'Data Science Project',
            description: 'Complete end-to-end data science project',
            duration: '5 weeks',
            resources: {
              create: [
                {
                  title: 'Data Science Projects - Kaggle',
                  description: 'Practice with real datasets',
                  url: 'https://www.kaggle.com/competitions',
                  type: 'PROJECT',
                  tier: 'FREE',
                },
                {
                  title: 'Complete Data Science Project - Udemy',
                  description: 'Build production ML models',
                  url: 'https://www.udemy.com/course/data-science-project/',
                  type: 'COURSE',
                  tier: 'PREMIUM',
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log('Created Data Science roadmap template');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
