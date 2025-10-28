# FullStackEDU - Hebrew Full-Stack Learning Platform

## Overview
FullStackEDU is an educational web application for teaching Full-Stack development in Hebrew with RTL support. It offers 7 courses (HTML, CSS, Bootstrap, JavaScript, React, Node.js, MongoDB), structured into multi-page lessons with rich content and code examples. Key features include user authentication, progress tracking, interactive quizzes that gate lesson progression, and a certificate system upon course completion. **Code result windows display visual browser rendering output (actual HTML/CSS rendered as it appears in the browser), not text explanations.** The platform aims to provide a structured and engaging learning experience for Hebrew speakers.

## Recent Changes (October 28, 2025)
- **Expanded HTML Course from 8 to 10 lessons** by adding two new lessons:
  - **Lesson 2: "הכנת סביבת עבודה ב-VS Code"** - Workspace setup covering folder creation, opening projects in VS Code, creating index.html files, installing useful extensions (Auto Rename Tag, HTML CSS Support, Prettier), and running Live Server.
  - **Lesson 10: "קיצורי דרך ועצות ב-VS Code"** - Productivity tips including the `!` shortcut for HTML5 boilerplate, Emmet abbreviations (div.class, #id, ul>li*5, etc.), essential keyboard shortcuts (Ctrl+S, Ctrl+D for multi-cursor), and best practices for efficient HTML development.
- **Updated lesson numbering**: Previous lessons 2-8 shifted to 3-9 to accommodate the new lesson 2.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with Vite and TypeScript.
- **UI**: Shadcn/ui components (based on Radix UI) with Tailwind CSS, following the "New York" style.
- **RTL Support**: Full right-to-left language support with Hebrew fonts (Heebo, Assistant).
- **State Management**: React Context API for authentication, TanStack Query for server state, local component state for UI.
- **Routing**: Wouter for client-side routing, including protected routes.
- **Design Decisions**: Component-based, separation of concerns, custom hooks, progressive disclosure for lesson content.
- **Code Output Rendering**: Code example outputs are rendered as live HTML/CSS using `dangerouslySetInnerHTML` to show actual browser rendering (visual output instead of text descriptions).
- **Syntax Highlighting**: Code blocks use highlight.js with VS Code Dark theme (vs2015) for syntax highlighting, supporting HTML, CSS, and JavaScript with LTR text alignment. Code text color is #d4d4d4 (light gray) on #1e1e1e background for optimal readability.
- **Quiz Answer Randomization**: Quiz answers are shuffled randomly using Fisher-Yates algorithm when quiz loads. Each retry re-shuffles answers. Display order maps to original indices for server validation. Results screen maintains the same shuffled order shown during the quiz.

### Backend
- **Server**: Express.js on Node.js with TypeScript.
- **Development**: TSX watch mode for hot reloading, Vite middleware integration.
- **API**: RESTful API endpoints for auth, courses, lessons, progress, comments, and certificates.
- **Authentication**: JWT for stateless authentication (7-day expiration), bcryptjs for password hashing, custom auth middleware.
- **Validation**: Zod schemas for both client and server request validation.
- **Design Decisions**: Middleware-based architecture, server-side quiz validation, separation of business logic, environment-based configuration.

### Data Storage
- **Database**: MongoDB with Mongoose ODM.
- **Development Database**: MongoDB Memory Server for local development.
- **Schemas**:
    - **User**: Email, password hash, display name.
    - **Course**: Slug, Hebrew title/description, order, topics, level, icon.
    - **Lesson**: Course association, order, `pages[]` (each with titleHE, contentHE, codeExamples[]).
    - **Quiz**: Lesson association, questions[] (Hebrew prompts, options, correct answer index).
    - **Progress**: User/lesson association, status (locked, in-progress, done), score, answer history.
    - **Comment**: Lesson association, user, parentCommentId for replies, mentor response flag.
    - **Certificate**: User/course association, course title, user display name, completion date, unique certificate number (issued only when all course lessons are done).
- **Indexing**: Compound indexes for efficient progress queries.
- **Integrity**: Mongoose schema validation combined with Zod validation.

## External Dependencies

### UI/Styling
- **Component Libraries**: @radix-ui/*, shadcn/ui.
- **Icons**: Lucide React.
- **Styling**: Tailwind CSS, class-variance-authority, tailwind-merge.

### Authentication & Security
- **Hashing**: bcryptjs.
- **JWT**: jsonwebtoken.
- **Validation**: Zod.

### Database
- **ODM**: mongoose.
- **In-memory DB**: mongodb-memory-server.

### State Management & Forms
- **Server State**: @tanstack/react-query.
- **Form Management**: React Hook Form, @hookform/resolvers.

### Development & Build Tools
- **Build Tool**: Vite.
- **Replit Integration**: @replit/vite-plugin-*.
- **Language**: TypeScript.
- **Node.js TS Execution**: tsx.
- **Bundler**: esbuild.