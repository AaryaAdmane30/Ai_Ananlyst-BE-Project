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


1️⃣ Install Prisma & Client
npm install prisma --save-dev
npm install @prisma/client

📌 2️⃣ Initialize Prisma

Creates prisma folder + schema

npx prisma init
Whenever you update schema.prisma


6️⃣ Apply Schema to DB Without Migration (Dev quick sync)
npx prisma db push


7️⃣ View Database in Browser
npx prisma studio


Push DB + Migration
npx prisma migrate dev --name first_migration

npx prisma migrate dev

Step 4: Authentication Module (JWT)
Generate module:
Bashnest g module auth
nest g controller auth
nest g service auth



You can now:

Hit POST http://localhost:3000/auth/register

Hit POST http://localhost:3000/auth/login



nest g module users
nest g controller users
nest g service users

nest g module team-members
nest g controller team-members
nest g service team-members

nest g module skills
nest g controller skills
nest g service skills

nest g module projects
nest g controller projects
nest g service projects

nest g module epics
nest g controller epics
nest g service epics

nest g module tasks
nest g controller tasks
nest g service tasks

nest g module ai
nest g controller ai
nest g service ai


Register: POST /auth/register {email, password, role}
Login: POST /auth/login → Get JWT
Create TeamMember: POST /team-members {name, role, userId}
Upload Resume: POST /team-members/:id/upload-resume (with file)
Create Epic: POST /epics {description, projectId}
Process Epic: POST /epics/:id/process



3. Core Modules

Generated using NestJS CLI:

nest g module users
nest g module team-members
nest g module skills
nest g module projects
nest g module epics
nest g module tasks
nest g module ai





Create User
POST http://localhost:3000/users

{
  "name": "Aarya",
  "email": "aarya@example.com",
  "password": "password123",
  "role": "MANAGER",
  "companyName": "TCS",
  "contactInfo": "9876543210"
}


Assuming you have a route like:

GET http://localhost:3000/users



Get Single User

Method: GET

URL: http://localhost:3000/users/736d5e5e-3c72-4eb2-be26-24c445221f5e (replace with your actual user ID)

Headers:

Authorization: Bearer <your_access_token>



Get a valid JWT from login.

Add header:

Authorization: Bearer <JWT_TOKEN>

👥 TEAM MEMBER

TeamMember is linked to User
Meaning → create User FIRST, then TeamMember.

Create Team Member
POST http://localhost:3000/team-members

{
  "userId": "USER_UUID",
  "role": "Backend Developer",
  "availabilityHours": 40,
  "currentWorkload": 5
}

🧠 SKILLS

Belongs to TeamMember

Add Skill to Member
POST http://localhost:3000/skills

{
  "skillName": "Node.js",
  "level": "Expert",
  "experienceYears": 2,
  "memberId": "TEAM_MEMBER_UUID"
}

🏗 PROJECT

Project belongs to User (Manager)

Create Project
POST http://localhost:3000/projects

{
  "name": "AI Analyst System",
  "description": "Smart engineering productivity + cost optimizer",
  "managerId": "USER_UUID",
  "startDate": "2026-01-10",
  "status": "PLANNED",
  "laborCost": 0,
  "reworkCost": 0,
  "infrastructureCost": 0,
  "totalSavings": 0
}

📚 EPIC

Epics belong to Projects

POST http://localhost:3000/epics

{
  "title": "Backend Architecture",
  "description": "Core system foundation",
  "projectId": "PROJECT_UUID"
}

✅ TASK

Tasks belong to Epic
Can be assigned to Team Member (optional)

POST http://localhost:3000/tasks

{
  "title": "Build Authentication",
  "description": "JWT + Guards + Roles",
  "requiredSkills": ["Node.js", "NestJS", "JWT"],
  "priority": "HIGH",
  "status": "PENDING",
  "estimatedHours": 12,
  "epicId": "EPIC_UUID",
  "assignedToId": "TEAM_MEMBER_UUID"
}

📈 PERFORMANCE HISTORY

Belongs to Team Member

POST http://localhost:3000/performance-history

{
  "taskType": "API Development",
  "avgCompletionTime": 12,
  "qualityScore": 8,
  "completedTasks": 5,
  "memberId": "TEAM_MEMBER_UUID"
}

🤖 AI RECORDS

Belongs to Project

POST http://localhost:3000/ai

{
  "projectId": "PROJECT_UUID",
  "laborCost": 25000,
  "reworkCost": 3000,
  "infrastructureCost": 7000,
  "totalSavings": 8000,
  "description": "Optimize sprint assignments",
  "createdBy": "MANAGER_USER_ID"
}


1️ Create User
2️ Convert User → TeamMember
3️ Add Skills
4️ Create Project
5️ Add Epics
6️ Add Tasks
7️Performance History
8️ AI Suggestions