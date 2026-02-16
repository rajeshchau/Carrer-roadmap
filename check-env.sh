#!/bin/bash

echo "🔍 Career Roadmap LMS - Environment Check"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not installed"
    errors=$((errors+1))
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not installed"
    errors=$((errors+1))
fi

# Check Docker
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓${NC} Docker installed: $DOCKER_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Docker not installed (optional but recommended)"
fi

# Check if .env file exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}⚠${NC} .env file not found - will use .env.example"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓${NC} Created .env from .env.example"
    fi
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Dependencies not installed - run 'npm install'"
fi

# Check if Prisma client is generated
if [ -d "node_modules/@prisma/client" ]; then
    echo -e "${GREEN}✓${NC} Prisma client generated"
else
    echo -e "${YELLOW}⚠${NC} Prisma client not generated - run 'npm run prisma:generate'"
fi

# Check if PostgreSQL is running (if Docker is available)
if command -v docker &> /dev/null; then
    if docker ps | grep -q career-roadmap-db; then
        echo -e "${GREEN}✓${NC} PostgreSQL container running"
    else
        echo -e "${YELLOW}⚠${NC} PostgreSQL container not running - run 'docker-compose up -d'"
    fi
fi

# Check if ports are available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC} Port 3000 is in use (Next.js)"
else
    echo -e "${GREEN}✓${NC} Port 3000 available (Next.js)"
fi

echo ""
echo "=========================================="
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}All required dependencies are installed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run 'docker-compose up -d' to start PostgreSQL"
    echo "2. Run 'npm run prisma:migrate' to set up the database"
    echo "3. Run 'npm run prisma:seed' to add sample data"
    echo "4. Run 'npm run dev' to start the application"
else
    echo -e "${RED}Please install missing dependencies before proceeding.${NC}"
fi
