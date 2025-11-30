# Full Admin V1 - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Libraries & Dependencies](#libraries--dependencies)
3. [Installation & Setup](#installation--setup)
4. [Project Structure](#project-structure)
5. [Authentication System](#authentication-system)
6. [Theme & Color Configuration](#theme--color-configuration)
7. [Features](#features)
8. [Where to Start Editing](#where-to-start-editing)
9. [API Routes](#api-routes)
10. [Database Schema](#database-schema)

---

## 🎯 Project Overview

**Full Admin V1** is a comprehensive full-stack admin panel built with Next.js 16, featuring:

- **Multi-role Authentication** (Guest, Admin, SuperAdmin, Owner)
- **Internationalization** (English & Arabic support)
- **Theme System** (Light, Dark, and custom color themes)
- **Role-based Access Control** (RBAC)
- **Modern UI** with shadcn/ui components
- **PostgreSQL Database** with Prisma ORM
- **Clerk Authentication** integration

---

## 📦 Libraries & Dependencies

### Core Framework

- **Next.js** (16.0.5) - React framework with App Router
- **React** (19.2.0) - UI library
- **TypeScript** (5.x) - Type safety

### Authentication

- **@clerk/nextjs** (^6.35.5) - Authentication and user management
  - Handles sign-in, sign-up, and session management
  - Integrated with middleware for route protection

### Database & ORM

- **Prisma** (^7.0.1) - Next-generation ORM
- **@prisma/client** (^7.0.1) - Prisma Client
- **@prisma/adapter-pg** (^7.0.1) - PostgreSQL adapter
- **PostgreSQL** - Database (configure via `DATABASE_URL`)

### UI & Styling

- **Tailwind CSS** (^4) - Utility-first CSS framework
- **shadcn/ui** - Component library (Avatar, Button, Card, Dialog, etc.)
- **next-themes** (^0.4.6) - Theme provider with dark mode
- **lucide-react** (^0.555.0) - Icon library
- **framer-motion** (^12.23.24) - Animation library
- **react-colorful** (^5.6.1) - Color picker component
- **sonner** (^2.0.7) - Toast notifications

### Internationalization

- **next-intl** (^4.5.6) - i18n for Next.js
  - Supports English (`en`) and Arabic (`ar`)
  - RTL support for Arabic

### State Management & Data Fetching

- **@tanstack/react-query** (^5.90.11) - Data synchronization and caching
- **axios** (^1.13.2) - HTTP client

### Utilities

- **clsx** (^2.1.1) - Conditional className utility
- **tailwind-merge** (^3.4.0) - Merge Tailwind classes
- **class-variance-authority** (^0.7.1) - Component variants
- **dotenv** (^17.2.3) - Environment variables

### Development Tools

- **ESLint** (^9) - Code linting
- **Prettier** (^3.7.3) - Code formatting
- **TypeScript** - Type checking

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** database
- **Clerk Account** (for authentication)

### Step 1: Install Dependencies

```bash
cd full-admin-v1
npm install
```

### Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# API Configuration (optional)
NEXT_PUBLIC_API_URL="http://localhost:3000"

# App Configuration (optional)
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_DEFAULT_LOCALE="en"

# Developer URL (optional)
NEXT_PUBLIC_DEVELOPER_URL="https://your-url.com"
```

### Step 3: Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Open Prisma Studio (optional)
npm run db:studio
```

### Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm run build:production # Production build with cleanup
npm run build:deploy     # Build + database push

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking
```

---

## 📁 Project Structure

```
full-admin-v1/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── (admin)/              # Admin routes (protected)
│   │   │   ├── _Components/      # Admin components
│   │   │   │   ├── config/       # Configuration files
│   │   │   │   │   ├── admin-config.ts      # Admin panel config
│   │   │   │   │   ├── dashboard-config.ts  # Dashboard layout
│   │   │   │   │   ├── navigation.ts        # Sidebar navigation
│   │   │   │   │   ├── theme.config.ts      # Theme definitions
│   │   │   │   │   └── theme-colors.config.ts # Custom colors
│   │   │   │   ├── sidebar/      # Sidebar components
│   │   │   │   ├── providers/   # Context providers
│   │   │   │   ├── AdminAuthGuard.tsx  # Auth protection
│   │   │   │   └── admin-layout.tsx    # Admin layout wrapper
│   │   │   ├── admin/            # Admin dashboard
│   │   │   │   ├── page.tsx     # Dashboard page
│   │   │   │   └── users/       # User management
│   │   │   └── layout.tsx       # Admin layout
│   │   ├── (auth)/               # Authentication routes
│   │   │   ├── login/            # Login page
│   │   │   └── sign-up/          # Sign-up page
│   │   ├── (root)/               # Public/root routes
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── api/                      # API routes
│   │   └── users/                # User API endpoints
│   └── layout.tsx                # App root layout
├── components/                    # Shared components
│   ├── ui/                       # shadcn/ui components
│   ├── auth/                     # Auth components
│   ├── layout/                   # Layout components
│   └── providers/                # Context providers
├── contexts/                     # React contexts
│   ├── userContext.tsx           # User state management
│   └── AdminAuthProvider.tsx     # Admin auth context
├── lib/                          # Utility functions
│   ├── db.ts                     # Prisma client
│   ├── axios.ts                  # Axios configuration
│   ├── utils.ts                  # Helper functions
│   └── auth-utils.ts             # Auth utilities
├── services/                     # Business logic
│   └── user.service.ts           # User service
├── prisma/                       # Database
│   └── schema.prisma             # Prisma schema
├── messages/                      # i18n translations
│   ├── en.json                   # English translations
│   └── ar.json                   # Arabic translations
├── i18n/                         # i18n configuration
│   ├── routing.ts                # Route configuration
│   └── navigation.ts             # Navigation config
├── middleware.ts                 # Next.js middleware
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies
```

---

## 🔐 Authentication System

### Authentication Provider: **Clerk**

The project uses **Clerk** for authentication, which provides:

- Email/password authentication
- Social login (configurable)
- Session management
- User management

### User Roles

The system supports 4 user roles (defined in Prisma schema):

1. **GUEST** - Default role, limited access
2. **ADMIN** - Standard admin access
3. **SUPERADMIN** - Extended admin privileges
4. **OWNER** - Full system access

### Authentication Flow

1. **Public Routes**: `/login`, `/sign-up`
2. **Protected Routes**: All other routes require authentication
3. **Admin Routes**: Require admin role (ADMIN, SUPERADMIN, or OWNER)
4. **Role-based Access**: Navigation and features are filtered by role

### Login Features

- **Email/Password** authentication via Clerk
- **Social Login** (if configured in Clerk dashboard)
- **Session Persistence** - Sessions are maintained across page refreshes
- **Auto-redirect** - Unauthenticated users are redirected to login
- **Role Verification** - Users are verified against database roles

### Authentication Files

- `middleware.ts` - Route protection and auth checks
- `app/[locale]/(admin)/_Components/AdminAuthGuard.tsx` - Component-level auth guard
- `contexts/userContext.tsx` - User state management
- `lib/auth-utils.ts` - Authentication utilities

### Setting Up Clerk

1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. Add them to `.env`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   ```

---

## 🎨 Theme & Color Configuration

### Theme System

The project uses **next-themes** for theme management with support for:

1. **Light Theme** - Default light mode
2. **Dark Theme** - Dark mode
3. **Green Theme** - Custom green color scheme
4. **Purple Theme** - Custom purple color scheme
5. **Red Theme** - Custom red color scheme
6. **System Theme** - Follows OS preference

### Color Configuration Files

#### 1. Theme Definitions

**File**: `app/[locale]/(admin)/_Components/config/theme.config.ts`

Defines available themes:

```typescript
export const themes: ThemeConfig[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "green-theme", label: "Green Theme", icon: Palette },
  // ... more themes
];
```

#### 2. Custom Theme Colors

**File**: `app/[locale]/(admin)/_Components/config/theme-colors.config.ts`

Manages custom colors stored in localStorage:

- `primary` - Primary color
- `secondary` - Secondary color
- `text` - Text color

Functions available:

- `getCustomThemeColors()` - Get all custom colors
- `setCustomThemeColor()` - Set a color for a theme
- `applyCustomThemeColor()` - Apply color to CSS variables
- `resetCustomThemeColor()` - Reset a color

#### 3. Global CSS Variables

**File**: `app/[locale]/globals.css`

Defines CSS variables for themes:

```css
:root {
  --setup-primary: rgba(240, 233, 233, 0.959);
  --setup-secondary: #48cae4;
  --setup-text: black;
}

.dark {
  --setup-primary: /* dark mode colors */;
  --setup-secondary: /* dark mode colors */;
  --setup-text: /* dark mode colors */;
}
```

### How to Customize Colors

#### Option 1: Edit CSS Variables (Global)

Edit `app/[locale]/globals.css`:

```css
:root {
  --setup-primary: your-color;
  --setup-secondary: your-color;
  --setup-text: your-color;
}
```

#### Option 2: Use Theme Color Picker (Runtime)

The admin panel includes a **ThemeColorPicker** component that allows users to:

- Pick custom colors for each theme
- Save colors to localStorage
- Apply colors instantly

#### Option 3: Add New Theme

1. Add theme to `theme.config.ts`:

```typescript
{
  id: 'blue-theme',
  label: 'Blue Theme',
  icon: Palette,
}
```

2. Add CSS class in `globals.css`:

```css
.blue-theme {
  --setup-primary: /* your colors */;
  --setup-secondary: /* your colors */;
  --setup-text: /* your colors */;
}
```

### Theme Picker Location

The theme picker is typically located in the **sidebar** or **header** of the admin panel, allowing users to switch themes on the fly.

---

## ✨ Features

### Admin Panel Features

1. **Dashboard**
   - Welcome message with user greeting
   - Statistics cards (configurable)
   - Quick actions (navigation shortcuts)
   - Role-based visibility

2. **User Management**
   - View all users
   - Edit user roles
   - Delete users
   - Toggle user roles

3. **Navigation**
   - Collapsible sidebar
   - Mobile-responsive menu
   - Role-based menu items
   - Quick access items

4. **Theme System**
   - Multiple theme options
   - Custom color picker
   - Dark mode support
   - System theme detection

5. **Internationalization**
   - English and Arabic support
   - RTL layout for Arabic
   - Language switcher

6. **Authentication**
   - Secure login/signup
   - Role-based access control
   - Session management
   - Protected routes

### API Features

- RESTful API endpoints
- User CRUD operations
- Role management
- Clerk integration endpoints

---

## 📝 Where to Start Editing

### 1. **Root Routes** (`app/[locale]/(root)/`)

**Purpose**: Public-facing pages

**What's here**:

- Home page (`page.tsx`)
- Public pages

**To edit**:

- Modify `app/[locale]/page.tsx` for the home page
- Add new public routes in `app/[locale]/(root)/`

### 2. **Authentication Routes** (`app/[locale]/(auth)/`)

**Purpose**: Login and sign-up pages

**What's here**:

- `/login` - Login page
- `/sign-up` - Sign-up page

**Files to edit**:

- `app/[locale]/(auth)/login/[[...sign-in]]/page.tsx` - Login page
- `app/[locale]/(auth)/login/[[...sign-in]]/_components/` - Login components
- `app/[locale]/(auth)/sign-up/[[...sign-up]]/page.tsx` - Sign-up page

**Components**:

- `WelcomeHeader.tsx` - Welcome message
- `LoginCard.tsx` - Login form
- `SignUpCard.tsx` - Sign-up form
- `AccessRestrictionNotice.tsx` - Access notice
- `FooterInfo.tsx` - Footer information

### 3. **Admin Routes** (`app/[locale]/(admin)/`)

**Purpose**: Protected admin panel

**What's here**:

- `/admin` - Admin dashboard
- `/admin/users` - User management

**Files to edit**:

#### Dashboard (`app/[locale]/(admin)/admin/`)

- `page.tsx` - Main dashboard page
- `components/StatsCards.tsx` - Statistics cards
- `components/QuickActions.tsx` - Quick action buttons
- `components/WelcomeMessage.tsx` - Welcome message

#### User Management (`app/[locale]/(admin)/admin/users/`)

- `page.tsx` - Users list page
- `_components/UsersTable.tsx` - Users table component

#### Configuration Files

- `_Components/config/admin-config.ts` - Admin panel configuration
- `_Components/config/dashboard-config.ts` - Dashboard layout
- `_Components/config/navigation.ts` - Sidebar navigation
- `_Components/config/theme.config.ts` - Theme definitions

### 4. **API Routes** (`app/api/`)

**Purpose**: Backend API endpoints

**What's here**:

- `/api/users` - User endpoints
  - `GET /api/users` - Get all users
  - `GET /api/users/me` - Get current user
  - `POST /api/users/create` - Create user
  - `GET /api/users/[id]` - Get user by ID
  - `PUT /api/users/[id]/update` - Update user
  - `DELETE /api/users/[id]/delete` - Delete user
  - `POST /api/users/[id]/toggle-role` - Toggle user role

**To add new API routes**:

1. Create new folder in `app/api/`
2. Add `route.ts` file
3. Export HTTP methods (GET, POST, PUT, DELETE)

### 5. **Components** (`components/`)

**Purpose**: Reusable UI components

**What's here**:

- `components/ui/` - shadcn/ui components
- `components/auth/` - Authentication components
- `components/layout/` - Layout components

**To add new components**:

- Use shadcn CLI: `npx shadcn@latest add [component-name]`
- Or create manually in `components/ui/`

### 6. **Database** (`prisma/`)

**Purpose**: Database schema and migrations

**What's here**:

- `schema.prisma` - Database schema

**To modify database**:

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` or `npm run db:migrate`
3. Run `npm run db:generate`

**Current Schema**:

```prisma
model user {
  id        String   @id @default(uuid())
  clerkId   String?  @unique
  name      String?
  email     String   @unique
  role      UserType @default(GUEST)
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserType {
  GUEST
  ADMIN
  SUPERADMIN
  OWNER
}
```

### 7. **Styling** (`app/[locale]/globals.css`)

**Purpose**: Global styles and theme variables

**To customize**:

- Edit CSS variables for colors
- Add new theme classes
- Modify global styles

### 8. **Internationalization** (`messages/`)

**Purpose**: Translation files

**Files**:

- `messages/en.json` - English translations
- `messages/ar.json` - Arabic translations

**To add translations**:

1. Add keys to both files
2. Use `useTranslations()` hook in components

---

## 🔌 API Routes

### User API Endpoints

#### Get All Users

```
GET /api/users/all
```

#### Get Current User

```
GET /api/users/me
```

#### Get User by ID

```
GET /api/users/[id]
```

#### Create User

```
POST /api/users/create
Body: { email, name, role? }
```

#### Update User

```
PUT /api/users/[id]/update
Body: { name?, email?, role?, image? }
```

#### Delete User

```
DELETE /api/users/[id]/delete
```

#### Toggle User Role

```
POST /api/users/[id]/toggle-role
Body: { role: 'ADMIN' | 'SUPERADMIN' | 'OWNER' | 'GUEST' }
```

#### Find or Create User (Clerk)

```
POST /api/users/find-or-create
Body: { clerkId, email, name, image? }
```

---

## 🗄️ Database Schema

### User Model

```prisma
model user {
  id        String   @id @default(uuid())
  clerkId   String?  @unique      # Clerk user ID
  name      String?               # User name
  email     String   @unique      # User email
  role      UserType @default(GUEST)  # User role
  image     String?               # Profile image URL
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserType {
  GUEST       # Default role, limited access
  ADMIN       # Standard admin
  SUPERADMIN  # Extended admin
  OWNER       # Full access
}
```

### Database Operations

**Prisma Client** is configured in `lib/db.ts`:

- Uses PostgreSQL adapter
- Singleton pattern for development
- Connection pooling in production

**Usage**:

```typescript
import { db } from "@/lib/db";

// Get all users
const users = await db.user.findMany();

// Create user
const user = await db.user.create({
  data: { email, name, role: "ADMIN" },
});
```

---

## 🎯 Quick Start Guide

### For New Developers

1. **Clone and Install**

   ```bash
   git clone <repository>
   cd full-admin-v1
   npm install
   ```

2. **Set Up Environment**
   - Copy `.env.example` to `.env`
   - Add your Clerk keys
   - Add your database URL

3. **Set Up Database**

   ```bash
   npm run db:push
   npm run db:generate
   ```

4. **Start Development**

   ```bash
   npm run dev
   ```

5. **First Steps**
   - Visit `http://localhost:3000/en/login`
   - Sign up with Clerk
   - Check database for your user
   - Update user role to `ADMIN` or `OWNER` in database
   - Access admin panel at `/admin`

### Common Tasks

**Add a new page**:

1. Create folder in `app/[locale]/(admin)/admin/`
2. Add `page.tsx`
3. Add route to `navigation.ts`

**Add a new API endpoint**:

1. Create folder in `app/api/`
2. Add `route.ts` with HTTP methods

**Modify navigation**:

- Edit `app/[locale]/(admin)/_Components/config/navigation.ts`

**Change dashboard layout**:

- Edit `app/[locale]/(admin)/_Components/config/dashboard-config.ts`

**Add statistics card**:

- Edit `app/[locale]/(admin)/_Components/config/admin-config.ts`
- Add to `stats.cards` array

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

---

## 🤝 Contributing

This project was developed by **Mahmoud Matter**. For contributions or questions, please refer to the project repository.

---

## 📄 License

[Add your license information here]

---

**Last Updated**: 2024
**Version**: 1.0.0
