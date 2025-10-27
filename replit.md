# FullStackEDU - Hebrew Full-Stack Learning Platform

## Overview

FullStackEDU is a comprehensive educational web application designed for teaching Full-Stack development in Hebrew with RTL (right-to-left) support. The platform provides a structured learning path through 7 courses covering HTML, CSS, Bootstrap, JavaScript, React, Node.js, and MongoDB. The application features user authentication, progress tracking, interactive quizzes, and a sequential lesson unlock system where students must pass quizzes before advancing to the next lesson.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**: React with Vite for fast development and optimized production builds. The application uses TypeScript for type safety and modern JavaScript features.

**UI Component System**: Shadcn/ui components built on Radix UI primitives, providing accessible, customizable, and composable UI elements. The design system follows the "New York" style variant with Tailwind CSS for styling.

**RTL Support**: Full right-to-left language support configured at the HTML level (`lang="he" dir="rtl"`), with Hebrew-specific font families (Heebo and Assistant) loaded from Google Fonts.

**State Management**: 
- React Context API for authentication state (AuthContext)
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Local component state for UI interactions

**Routing**: Wouter for lightweight client-side routing with protected route implementation that redirects unauthenticated users to login.

**Key Design Decisions**:
- Component-based architecture with reusable UI primitives
- Separation of concerns between presentational and container components
- Custom hooks for shared logic (e.g., `use-mobile`, `use-toast`)
- Progressive disclosure pattern for lesson content (locked/in-progress/done states)

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript support for type safety and modern JavaScript features.

**Development Server**: TSX watch mode for hot reloading during development, with Vite middleware integration for seamless frontend-backend coordination.

**API Design**: RESTful API endpoints following resource-based routing patterns:
- `/api/auth/*` - Authentication endpoints (register, login)
- `/api/courses/*` - Course management and listing
- `/api/lessons/*` - Lesson content and quiz access
- `/api/progress/*` - User progress tracking and history
- `/api/comments/*` - Discussion and Q&A system
- `/api/certificates/*` - Certificate issuance and retrieval

**Authentication & Authorization**:
- JWT (JSON Web Tokens) for stateless authentication with 7-day expiration
- bcryptjs for secure password hashing (10 salt rounds)
- Custom auth middleware that validates Bearer tokens and attaches userId to requests
- Protected API routes that require valid authentication tokens

**Validation**: Zod schemas for request validation on both client and server, ensuring type-safe data contracts.

**Key Design Decisions**:
- Middleware-based architecture for cross-cutting concerns (logging, authentication)
- Server-side quiz validation to prevent answer manipulation
- Separation of business logic into route handlers with database operations
- Environment-based configuration for development vs. production modes

### Data Storage

**Database**: MongoDB with Mongoose ODM for schema definition and data validation.

**Development Strategy**: MongoDB Memory Server for local development, providing a lightweight in-memory database that doesn't require external MongoDB installation. Production uses standard MongoDB connection via `MONGODB_URI` environment variable.

**Schema Design**:

1. **User**: Core authentication entity
   - Email (unique, lowercase, trimmed)
   - Password hash (bcrypt)
   - Display name for personalization
   - Creation timestamp

2. **Course**: Learning content organization
   - Slug-based routing for SEO-friendly URLs
   - Hebrew title and description
   - Order field for sequential presentation
   - Topics array for categorization
   - Level range and cover icon for UI display

3. **Lesson**: Individual learning units
   - Course association via slug
   - Ordered presentation within course
   - Content stored as HTML/Markdown in Hebrew
   - Code examples with expected outputs
   - Required score threshold (100 for completion)

4. **Quiz**: Assessment mechanism
   - Lesson association via ObjectId reference
   - Questions array with Hebrew prompts
   - Multiple choice options with correct answer index
   - Server-side answer validation only

5. **Progress**: User learning state tracking
   - User and lesson association (compound index)
   - Status states: locked, in-progress, done
   - Score tracking (0-100)
   - Answer history with correctness flags
   - Update timestamps for activity tracking

6. **Comment**: Discussion and Q&A system
   - Lesson association via slug
   - User association with display name
   - Threaded replies via parentCommentId
   - Mentor response flag for instructor answers
   - Creation and update timestamps

7. **Certificate**: Course completion recognition
   - User and course association (unique constraint)
   - Course title (Hebrew) for certificate display
   - User display name for personalization
   - Completion date tracking
   - Unique certificate number generation
   - Only issued when all course lessons are completed with status "done"

**Indexing Strategy**: Compound indexes on `userId + courseSlug + lessonSlug` for efficient progress queries.

**Data Integrity**: Mongoose schema validation ensures data consistency at the database level, complementing application-level Zod validation.

### External Dependencies

**UI Component Libraries**:
- @radix-ui/* - Primitive component library for accessible UI building blocks
- shadcn/ui component system for pre-built, customizable components
- Lucide React for consistent icon system

**Authentication & Security**:
- bcryptjs - Password hashing and comparison
- jsonwebtoken - JWT token generation and verification
- Zod - Runtime type validation for API requests

**Database**:
- mongoose - MongoDB object modeling and schema validation
- mongodb-memory-server - In-memory MongoDB for development/testing
- @neondatabase/serverless - PostgreSQL adapter (noted for potential future migration)

**State Management & Data Fetching**:
- @tanstack/react-query - Server state management with caching
- React Hook Form - Form state management with validation
- @hookform/resolvers - Integration between React Hook Form and Zod

**Styling**:
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Type-safe component variants
- tailwind-merge - Intelligent class merging utility

**Development Tools**:
- Vite - Fast build tool and dev server
- @replit/vite-plugin-* - Replit-specific development enhancements
- TypeScript - Type safety across the stack
- tsx - TypeScript execution for Node.js

**Build & Deployment**:
- esbuild - Fast JavaScript bundler for server code
- Production mode uses standard MongoDB connection
- Development mode uses MongoDB Memory Server for zero-setup development

**Key Architectural Choices**:
- Monorepo structure with shared types between client/server
- Environment-based database switching (memory vs. production)
- JWT-based authentication eliminates need for session storage
- Server-side quiz validation prevents client-side answer manipulation
- Progress tracking enables personalized learning paths with prerequisite enforcement

## Recent Technical Fixes

### Quiz Component Undefined Access Protection (October 2025)

**Problem**: Runtime error "Cannot read properties of undefined (reading '0')" occurred when Quiz component tried accessing `quiz.questions[currentQuestion]` before data loaded.

**Root Cause**: Multiple code paths accessed `quiz.questions` without verifying the quiz object and its questions array were fully loaded and non-empty.

**Solution Implemented**:
1. **Enhanced useEffect Guard** (line 40): Added comprehensive checks before initializing selectedAnswers:
   ```typescript
   if (quiz && quiz.questions && quiz.questions.length > 0 && selectedAnswers.length === 0)
   ```

2. **Strengthened Top-Level Guard** (line 78): Expanded early-return condition to include all necessary checks:
   ```typescript
   if (!lessonSlug || isLoading || !quiz || !quiz.questions || quiz.questions.length === 0)
   ```

3. **Removed Redundant Guard**: Eliminated duplicate loading check (previously line 243) that became unreachable after strengthened top-level guard.

**Result**: All access to `quiz.questions` is now protected by guards that verify:
- Query is not loading (`!isLoading`)
- Quiz object exists (`!!quiz`)
- Questions array exists (`!!quiz.questions`)
- Questions array is not empty (`quiz.questions.length > 0`)

This prevents undefined access errors during component initialization, data fetching, and navigation transitions.

### Certificate System Implementation (October 2025)

**Feature**: Complete certificate system allowing users to earn certificates upon course completion.

**Implementation**:
1. **Database Schema**: Created Certificate model with user/course association, unique constraint, and certificate number generation
2. **API Endpoints**:
   - GET `/api/certificates` - Retrieves all user certificates
   - POST `/api/certificates/:courseSlug` - Issues certificate with strict validation
3. **Validation Logic**: Certificate issuance requires completion of **all** course lessons:
   - Fetches all lessons for the course
   - Verifies user has "done" progress record for each lesson
   - Uses Set to prevent duplicate progress records from bypassing requirements
   - Returns clear error messages showing total and missing lesson counts
4. **Frontend Integration**:
   - Certificates page with download functionality (Canvas-based PNG generation)
   - Course page shows "Get Certificate" button when course is completed
   - Navbar includes link to certificates page
   - Empty states and loading skeletons for better UX

**Security Enhancement**: Initial implementation only counted completed progress records, allowing potential bypass through duplicate records. Fixed by validating presence of exactly one "done" record per lesson slug.

### Discussion System Enhancements (October 2025)

**Improvements**: Enhanced LessonDiscussion component with better UX and inline validation.

**Changes Implemented**:
1. **Loading Skeleton**: Replaced null return with structured skeleton showing comment form and placeholder comments
2. **Inline Form Validation**: Added FormMessage components to display Zod validation errors directly below form fields
3. **Reply Form Reset**: Implemented handleReplyToChange to automatically reset reply form when switching between comment threads
4. **User Feedback**: All changes improve form interaction clarity and prevent confusion when engaging with discussions