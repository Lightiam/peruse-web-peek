# Website Submission Platform

A comprehensive full-stack web application for managing user submissions with authentication, file uploads, and database storage. Built with React, TypeScript, Node.js, Express, and SQLite.

## 🚀 Features

### Frontend Features
- **Modern React UI** with TypeScript and Tailwind CSS
- **Authentication System** with login/register forms
- **Protected Routes** with JWT-based authentication
- **Submission Form** with drag-and-drop file upload
- **Dashboard** with filtering, search, and pagination
- **Responsive Design** that works on all devices
- **Form Validation** using Zod and react-hook-form
- **Toast Notifications** for user feedback

### Backend Features
- **RESTful API** built with Express and TypeScript
- **JWT Authentication** with bcrypt password hashing
- **File Upload Support** with Multer (images, PDFs, documents)
- **Database Integration** using Prisma ORM with SQLite
- **Data Validation** with Zod schemas
- **Error Handling** and security middleware
- **CORS Configuration** for cross-origin requests

### Database Features
- **SQLite Database** for easy setup and deployment
- **User Management** with secure password storage
- **Submission Storage** with file metadata
- **Relationship Management** between users and submissions
- **Status Tracking** (pending, approved, rejected)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd website-submission-platform
   npm install
   ```

2. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Start the development servers:**
   ```bash
   # Terminal 1: Start backend server
   npm run server:dev
   
   # Terminal 2: Start frontend server  
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Database Studio: `npm run db:studio`

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secure-jwt-secret-key-change-in-production"

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL="http://localhost:5173"
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/verify` - Verify JWT token

### Submission Endpoints

- `GET /api/submissions` - Get all user submissions (with pagination/filtering)
- `GET /api/submissions/:id` - Get specific submission
- `POST /api/submissions` - Create new submission (with file upload)
- `PUT /api/submissions/:id` - Update submission
- `DELETE /api/submissions/:id` - Delete submission
- `GET /api/submissions/:id/download` - Download submission file

## 🎯 Usage Guide

### Getting Started

1. **Register a new account** at `/register`
2. **Login** with your credentials at `/login`
3. **Create your first submission** using the "New Submission" button
4. **Upload files** by dragging and dropping or clicking the upload area
5. **Manage submissions** from the dashboard with filters and search

### Submission Categories

- General
- Feedback
- Support
- Feature Request
- Bug Report
- Other

### File Upload Support

- **Images**: JPG, JPEG, PNG, GIF
- **Documents**: PDF, TXT, DOC, DOCX
- **Size Limit**: 10MB per file

### Submission Status

- **Pending**: Awaiting review
- **Approved**: Submission accepted
- **Rejected**: Submission declined

## 🏗️ Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── server/
│   ├── config/
│   │   └── database.ts        # Prisma client setup
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts           # Authentication routes
│   │   └── submissions.ts    # Submission CRUD routes
│   ├── uploads/              # File upload directory
│   └── index.ts              # Express server setup
├── src/
│   ├── components/ui/        # Shadcn UI components
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication context
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── SubmissionFormPage.tsx
│   ├── services/
│   │   └── submissionService.ts # API service layer
│   └── App.tsx               # Main application component
├── .env                      # Environment variables
└── package.json             # Dependencies and scripts
```

## 🚀 Deployment

### Production Build

```bash
# Build frontend
npm run build

# Start production server
npm run server
```

### Environment Setup

1. Update `.env` with production values
2. Use a secure JWT secret
3. Configure proper CORS origins
4. Set up proper file storage (consider cloud storage)
5. Use a production database (PostgreSQL, MySQL)

## 🔒 Security Features

- **Password Hashing** with bcrypt (12 rounds)
- **JWT Tokens** with 7-day expiration
- **Input Validation** on all endpoints
- **File Type Validation** for uploads
- **CORS Protection** configured
- **Rate Limiting** ready for implementation

## 🛡️ Best Practices Implemented

- **TypeScript** for type safety
- **Error Boundaries** for graceful error handling
- **Form Validation** with Zod schemas
- **Component Composition** with React hooks
- **API Service Layer** for data fetching
- **Protected Routes** for authentication
- **Responsive Design** principles
- **Accessibility** considerations

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start production backend server
- `npm run server:dev` - Start backend development server with hot reload
- `npm run build` - Build frontend for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio database GUI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the GitHub issues
- Review the API documentation
- Examine the code examples in this README

---

**Built with ❤️ using React, TypeScript, Node.js, and modern web technologies.**
