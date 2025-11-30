# Full Admin V1 - Dependencies & Setup

> 📚 **For complete documentation**, see [DOCUMENTATION.md](./DOCUMENTATION.md) which includes:
>
> - Complete project overview
> - Installation & setup guide
> - Project structure (root, auth, admin)
> - Authentication system details
> - Theme & color configuration
> - Features list
> - Where to start editing
> - API routes documentation
> - Database schema

This document lists all installed dependencies and their configurations for the Full Admin V1 project.

## 📦 Installed Dependencies

### Core Framework

- **next** (^16.0.5) - React framework for production
- **react** (^19.2.0) - React library
- **react-dom** (^19.2.0) - React DOM renderer

### Database & ORM

- **prisma** (^7.0.1) - Next-generation ORM for Node.js and TypeScript
- **@prisma/client** (^7.0.1) - Prisma Client for database queries
- **@prisma/adapter-pg** (^7.0.1) - PostgreSQL adapter for Prisma

### HTTP Client

- **axios** (^1.13.2) - Promise-based HTTP client for making API requests

### Authentication

- **@clerk/nextjs** (^6.35.5) - Authentication and user management for Next.js

### Internationalization

- **next-intl** (^4.5.6) - Internationalization (i18n) library for Next.js

### State Management & Data Fetching

- **@tanstack/react-query** (^5.90.11) - Powerful data synchronization for React (formerly React Query)

### UI & Styling

- **next-themes** (^0.4.6) - Theme provider for Next.js with dark mode support
- **lucide-react** (^0.555.0) - Beautiful & consistent icon toolkit for React
- **framer-motion** (^12.23.24) - Production-ready motion library for React
- **clsx** (^2.1.1) - Utility for constructing className strings conditionally
- **tailwind-merge** (^3.4.0) - Merge Tailwind CSS classes without style conflicts

### Environment & Configuration

- **dotenv** (^17.2.3) - Loads environment variables from .env file

### Development Dependencies

- **@tailwindcss/postcss** (^4) - Tailwind CSS PostCSS plugin
- **tailwindcss** (^4) - Utility-first CSS framework
- **typescript** (^5) - Typed superset of JavaScript
- **@types/node** (^20) - TypeScript definitions for Node.js
- **@types/react** (^19) - TypeScript definitions for React
- **@types/react-dom** (^19) - TypeScript definitions for React DOM
- **eslint** (^9) - JavaScript and TypeScript linter
- **eslint-config-next** (^16.0.5) - ESLint configuration for Next.js

## 🔧 Configuration Details

### Prisma Setup

- **Schema Location**: `prisma/schema.prisma`
- **Database Provider**: PostgreSQL
- **Client Output**: Default (`node_modules/.prisma/client`)
- **Configuration File**: `lib/db.ts` - Configured with PostgreSQL adapter

**Prisma Scripts:**

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Shadcn/UI Setup

- **Config File**: `components.json`
- **Style**: Default
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **Component Location**: `@/components/ui`
- **Utils Location**: `@/lib/utils`

**To add shadcn components:**

```bash
npx shadcn@latest add [component-name]
```

### Next-Intl Setup

- **Config File**: `next.config.ts` - Uses `createNextIntlPlugin`
- **Messages Location**: `messages/` (en.json, ar.json)
- **Routing Config**: `i18n/routing.ts`
- **Middleware**: `middleware.ts`

### Next-Themes Setup

- **Provider Location**: `components/layout/providers.tsx`
- **Attribute**: `class`
- **Default Theme**: `system`
- **System Theme**: Enabled

### React Query Setup

- **Provider Location**: `components/layout/providers.tsx`
- **Default Stale Time**: 60 seconds
- **Retry**: 1 attempt
- **Refetch on Window Focus**: Disabled

### Clerk Authentication Setup

- **Provider Location**: `components/providers/ClerkProvider.tsx`
- **Environment Variable**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### Axios Setup

- **Config Location**: `lib/axios.ts`
- **Base URL**: Automatically detects environment (dev/prod)
- **Timeout**: 30 seconds
- **Credentials**: Enabled (withCredentials: true)
- **Interceptors**: Configured for request/response logging and auth headers

### Framer Motion

- **Package**: `framer-motion` (^12.23.24)
- **Usage**: Import components from `framer-motion` or `motion/react`

**Example:**

```tsx
import { motion } from "framer-motion";
// or
import { motion } from "motion/react";
```

### Lucide React

- **Package**: `lucide-react` (^0.555.0)
- **Usage**: Import icons directly

**Example:**

```tsx
import { User, Settings, Home } from "lucide-react";
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Prisma generate)
- `npm run build:production` - Production build with cleanup
- `npm run build:deploy` - Production build with database push
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 📁 Project Structure

```
full-admin-v1/
├── app/                    # Next.js app directory
│   └── [locale]/          # Internationalized routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── providers/        # Context providers
│   └── layout/           # Layout components
├── contexts/             # React contexts
├── lib/                  # Utility functions
│   ├── db.ts            # Prisma database client
│   ├── axios.ts         # Axios configuration
│   └── utils.ts         # Utility functions (cn helper)
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma    # Database schema
├── messages/            # Next-intl translation files
├── i18n/                # Internationalization config
└── components.json      # Shadcn UI configuration
```

## 🔐 Environment Variables

Required environment variables (add to `.env` file):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

# API (optional)
NEXT_PUBLIC_API_URL="http://localhost:3000"

# App Configuration (optional)
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_DESCRIPTION="Your App Description"
NEXT_PUBLIC_APP_ICON="/favicon.ico"
```

## ✅ Setup Verification

All packages have been installed and configured:

- ✅ Prisma initialized with PostgreSQL configuration
- ✅ Shadcn/UI initialized with components.json
- ✅ Next-themes provider configured
- ✅ React Query provider configured
- ✅ ClerkProvider configured
- ✅ Next-intl configured
- ✅ Axios configured with interceptors
- ✅ Framer Motion installed
- ✅ Lucide React installed
- ✅ All utility packages (clsx, tailwind-merge, dotenv) installed

## 📝 Notes

- The project uses Tailwind CSS v4 with PostCSS configuration
- Prisma Client is automatically generated on `npm install` (postinstall script)
- All providers are wrapped in `components/layout/providers.tsx`
- The project supports RTL (Right-to-Left) for Arabic locale
- Dark mode is supported via next-themes
