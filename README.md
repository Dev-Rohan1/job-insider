# 🚀 JobInsider - MERN Stack Job Portal

A full-featured job portal built with MongoDB, Express.js, React, and Node.js. Streamlining recruitment by connecting employers with top talent through an intuitive platform.

![Application Preview](https://img.youtube.com/vi/VIIaMCBeQF0/maxresdefault.jpg)

[![Live Demo](https://img.shields.io/badge/Visit_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://job-insider-frontend.vercel.app)

## ✨ Key Features

### 👨‍💼 Recruiter Dashboard

- 📝 Create and manage job postings
- 🔍 Filter and search candidate applications
- 📊  Simple dashboard for easily manage job

### 👩‍🎓 Job Seeker Experience

- 🔎Find job by location/job title
- 📚 Butter-Smooth Pagination (try it!)
- 💼 "Similar Jobs" recommendation engine
- 📊 Personalized Dashboard for applicants

### 🔐 Security & Management

- 🛡️ Clerk authentication system and Custom auth
- 📁 Cloudinary resume/document storage
- 📱 Responsive design for all devices

## 🛠️ Technology Stack

**Frontend:**

- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🔑 Clerk Authentication

**Backend:**

- 🏗️ Node.js & Express.js
- 🗄️ MongoDB (Mongoose ODM)
- ☁️ Cloudinary Storage

**DevOps:**

- 🚀 Vercel (Frontend Hosting)
- ⚙️ Vercel (Backend Hosting)

## 🚀 Installation Guide

### Prerequisites

- Node.js v16+
- MongoDB Atlas account
- Clerk developer account
- Cloudinary account

### ⚙️  Frontend Setup

```bash
git clone https://github.com/Dev-Rohan1/job-insider.git
cd frontend
npm install
npm run dev
```

### ⚙️  Backend Setup

```bash
git clone https://github.com/Dev-Rohan1/job-insider.git
cd backend
npm install
npm run server
```

### Frontend Environment (.env)

`VITE_CLERK_PUBLISHABLE_KEY`=""
`VITE_BACKEND_URL`=http://localhost:8080

### Backend Environment (.env)

`PORT`=8080

`MONGODB_CONNECTION_STRING`=""

`WEBHOOK_SECRET_KEY`=your_webhook_secret

`CLERK_PUBLISHABLE_KEY`=""

`CLERK_SECRET_KEY`="

`CLOUDINARY_API_KEY`=""
`CLOUDINARY_API_SECRET`=""
`CLOUDINARY_APP_NAME`=""
