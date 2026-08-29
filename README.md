# ResumeIQ — AI Resume Analyzer & ATS Scanner

> **“Know your resume. Beat the ATS. Land your next opportunity.”**

ResumeIQ is a production-grade, full-stack SaaS web application designed to scan resumes against standard Applicant Tracking Systems (ATS), extract technical and soft skills, detect missing competencies, evaluate keyword density, and perform real-time matching against target job descriptions.

---

## 🚀 Key Features

- **Transparent 100-Point ATS Scoring Engine**:
  - Contact Information (10 pts)
  - Professional Summary (10 pts)
  - Skills & Competencies (20 pts)
  - Work Experience & Impact (20 pts)
  - Technical Projects & Repos (15 pts)
  - Education & Credentials (10 pts)
  - Keyword Relevance & Density (10 pts)
  - ATS Layout & Formatting Compliance (5 pts)
- **PDF Resume Upload & Text Extraction**: High-fidelity text parser extracting text from standard PDF documents with validation for file size and format.
- **Skills Detection & Gap Analysis**:
  - Technical Skills tags
  - Soft Skills tags
  - Missing skills with importance tiers (Critical, High, Preferred), rationale, and actionable integration advice.
- **ATS Keyword Optimization**:
  - Strong keywords already present
  - Recommended keywords to add without keyword stuffing
- **Job Description Matcher**:
  - Paste any target job title & description
  - Generates match score %, matched vs missing skills, keyword overlap, and specific tailoring suggestions.
- **AI-Recommended Job Titles**: Suggests salary-band job titles based on candidate experience depth.
- **Interactive Analytics Dashboard**:
  - Recharts ATS score history progression
  - 8-Section performance radar chart
  - Skill distribution charts
  - Quick action shortcuts
- **Exportable PDF Reports**: Download high-resolution printable ATS scorecard summaries.
- **Supabase Authentication & Row Level Security (RLS)**:
  - Email/password authentication, session persistence, password reset
  - PostgreSQL database with strict user data isolation policies.
- **Resilient AI Pipeline**: Google Gemini AI model integration with automatic fallback to high-precision heuristic analysis engine.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS 3, React Router v6, Lucide React, Recharts, Canvas-Confetti, html2pdf.js |
| **Backend** | Node.js (ES Modules), Express.js, Multer, pdf-parse, Axios, dotenv |
| **Database & Auth** | Supabase, PostgreSQL, Row Level Security (RLS) |
| **AI Engine** | Google Gemini Generative AI (REST API) + Deterministic Fallback Engine |

---

## 📁 Project Structure

```text
resume-iq/
├── client/                     # Frontend React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Sidebar, Topbar, CircularScore, ScoreCard, Modals, Loaders
│   │   │   ├── dashboard/      # StatCard, Recharts progression & radar charts, RecentAnalysesTable
│   │   │   ├── analysis/       # OverviewSection, SkillsBreakdown, MissingSkillsCard, SectionAuditGrid
│   │   │   ├── upload/         # DragDropUploader
│   │   │   └── jobMatcher/     # MatchScoreGauge, MatchDetailsView
│   │   ├── context/            # AuthContext (Supabase + Demo), ToastContext
│   │   ├── layouts/            # PublicLayout, DashboardLayout
│   │   ├── lib/                # api.js, supabase.js, demoData.js
│   │   ├── pages/              # Landing, Login, Register, Dashboard, Upload, Analysis, JobMatcher, History, Reports, Profile
│   │   ├── App.jsx             # React router configuration & route protection
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend Node/Express API
│   ├── controllers/            # analyzeController, jobMatchController, historyController
│   ├── middleware/             # authMiddleware, uploadMiddleware, errorHandler
│   ├── routes/                 # analyze, jobMatch, history
│   ├── services/               # pdfService, aiService, scoringService, supabaseService
│   ├── server.js               # Express application entrypoint
│   └── package.json
│
├── supabase/
│   └── schema.sql              # PostgreSQL tables, RLS policies, triggers, indexes
├── .env.example
└── README.md
```

---

## ⚙️ Environment Variables Setup

Copy `.env.example` to your environment files or configure in server and client:

```bash
# Server (.env)
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# Client (.env)
VITE_API_URL=/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Note**: If `GEMINI_API_KEY` or `SUPABASE_URL` are not provided, ResumeIQ automatically runs in **Resilient Local Demo Mode**, enabling full exploration with zero external configuration blockers.

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Run Database Schema (Supabase)
Execute the SQL statements located in `supabase/schema.sql` within your Supabase SQL Editor. This sets up the tables (`profiles`, `resumes`, `resume_analyses`, `job_matches`) and enables Row Level Security (RLS).

### 3. Start Development Servers
In two separate terminals:

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🧪 Verification & Testing

Run the automated backend test suite:
```bash
cd server
node test-api.js
```

Build the client for production:
```bash
cd client
npm run build
```

---

## 🔒 Security Notes

- All client requests communicate through sanitized backend routes.
- API keys (Gemini AI, Supabase Service Role) are strictly kept on the server and never exposed in the client bundle.
- Supabase Row Level Security ensures users can only query, insert, or delete their own resumes and analysis records.
- Multer restricts uploads to `application/pdf` with a 10MB maximum buffer limit.
