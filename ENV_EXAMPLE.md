# Environment Variables Template

Since `.env.example` is in `.gitignore`, here's the template for your environment variables.

Create a `.env` file in the root directory with the following variables:

```env
# ============================================
# Full Admin V1 - Environment Variables
# ============================================
# Copy this content to .env and fill in your values

# ============================================
# Database Configuration
# ============================================
# PostgreSQL connection string
# Format: postgresql://username:password@host:port/database
# Example: postgresql://postgres:password@localhost:5432/fulladmin
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# ============================================
# Clerk Authentication
# ============================================
# Get these from https://dashboard.clerk.com
# 1. Create a new application in Clerk Dashboard
# 2. Go to API Keys section
# 3. Copy the Publishable Key and Secret Key

# Clerk Publishable Key (Public - safe to expose in frontend)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"

# Clerk Secret Key (Private - keep this secret!)
CLERK_SECRET_KEY="sk_test_your_secret_key_here"

# ============================================
# API Configuration
# ============================================
# Your API base URL (optional, defaults to localhost:3000 in development)
# Used for API calls in production
NEXT_PUBLIC_API_URL="http://localhost:3000"

# ============================================
# Application Configuration
# ============================================
# Project name (displayed in admin panel header and browser title)
NEXT_PUBLIC_PROJECT_NAME="Full Admin V1"

# Project description (used in meta tags)
NEXT_PUBLIC_PROJECT_DESCRIPTION="Complete admin panel starter with Next.js, Prisma, Clerk, RBAC, Themes & i18n"

# Project icon/favicon location (relative to public folder)
NEXT_PUBLIC_PROJECT_ICON_LOCATION="/favicon.ico"

# Application version (displayed in admin panel)
NEXT_PUBLIC_VERSION="1.0.0"

# Default locale (en or ar)
NEXT_PUBLIC_DEFAULT_LOCALE="en"

# ============================================
# Developer/Support Configuration
# ============================================
# Developer URL (optional - for support/help links)
# Example: https://github.com/yourusername/full-admin-v1
NEXT_PUBLIC_DEVELOPER_URL="https://github.com/yourusername/full-admin-v1"

# ============================================
# Node Environment
# ============================================
# Automatically set by Next.js, but you can override if needed
# Options: development, production, test
# NODE_ENV="development"
```

## Quick Setup

1. Copy the content above
2. Create a `.env` file in the root directory
3. Paste the content
4. Fill in your actual values (especially `DATABASE_URL` and Clerk keys)
5. Save the file

## Getting Clerk Keys

1. Visit [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application (or use existing)
3. Go to **API Keys** section
4. Copy:
   - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** → `CLERK_SECRET_KEY`

## Database URL Format

```
postgresql://[username]:[password]@[host]:[port]/[database]
```

Example:

```
postgresql://postgres:mypassword@localhost:5432/fulladmin
```
