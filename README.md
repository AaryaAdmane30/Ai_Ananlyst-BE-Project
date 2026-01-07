# AI-Analyst 🚀

**An Agentic AI-Powered Autonomous Software Development Lifecycle Management System**

##  Project Overview

AI-Analyst is an intelligent, agentic framework that automates the entire Software Development Life Cycle (SDLC) using Large Language Models (LLM). It reduces manual effort, minimizes rework, optimizes resource allocation, and cuts project costs by over 50%.

The system transforms high-level project goals into executable plans — completely autonomously.

### Key Features
- **AI-Powered Resume Parsing** → Upload PDF → AI extracts structured skills
- **Automatic Task Decomposition** → Manager creates Epic → AI breaks it into micro-tasks with effort estimates, dependencies, and required skills
- **Intelligent Task Assignment** → Matches tasks to developers based on skills, workload, and past performance
- **Proactive Risk Detection** → Identifies overloaded developers, long dependency chains, missing skills
- **Cost Optimization** → Tracks labor, rework, and shows real savings %
- **Role-Based Access** → Manager, Developer, Admin
- **Performance History** → AI learns from past tasks for better future planning

## 🛠 Tech Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma 7 (Latest)
- **Authentication**: JWT
- **AI Integration**: OpenAI GPT-4 / Grok API
- **File Handling**: Multer + pdf-parse

### Frontend (Planned/Next Step)
- Next.js 16 + Tailwind CSS + Zustand

## 📊 Database Schema (Prisma 7)

- `User` (MANAGER | DEVELOPER | ADMIN)
- `TeamMember` (skill profile + workload)
- `Skill` (name, level, experience)
- `Project` (with cost fields: laborCost, reworkCost, totalSavings)
- `Epic`
- `Task` (requiredSkills[], dependencies, priority)
- `PerformanceHistory` (for AI learning)

## 🚀 Current Status (January 2026)

**Backend Fully Functional & Running!**

- PostgreSQL database: `AiAnalystDB`
- All tables created and synced via Prisma
- Authentication (Register/Login) working
- Resume upload → AI skill extraction ready
- Epic creation → AI task decomposition ready
- Assignment, Risk, and Cost agents in development

## 📸 Screenshots (To Add Soon)
- pgAdmin showing AiAnalystDB tables
- Postman API testing
- Prisma Studio live view
- AI-generated tasks from epic

## 🔧 Setup & Run (Local Development)

### Prerequisites
- Node.js (v20+)
- PostgreSQL 18
- OpenAI or Grok API key

### Steps
1. Clone the repo
   ```bash
   git clone <your-repo-url>
   cd ai-analyst-backend




   Sync databaseBashnpx prisma db push
npx prisma generate
Start serverBashnpm run start:dev




Step 1: Update Dependencies (Add All Required Packages)
Run this to install everything we need (NestJS modules, JWT, file handling, PDF parsing, etc.):
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator 
class-transformer multer pdf-parse @nestjs/config axios

npm install -D @types/multer @types/pdf-parse



Step 4: Authentication Module (JWT)
Generate module:
Bashnest g module auth
nest g controller auth
nest g service auth



You can now:

Hit POST http://localhost:3000/auth/register

Hit POST http://localhost:3000/auth/login