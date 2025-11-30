# 🚀 Full Admin V1 - Complete Setup Guide

This guide will walk you through setting up Full Admin V1 from scratch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [First Login & Admin Access](#first-login--admin-access)
6. [Next Steps](#next-steps)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** and npm installed
- **PostgreSQL** database running
- **Clerk Account** (free tier available at [clerk.com](https://clerk.com))
- **Git** (for cloning the repository)

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/mahmoudmatter12/next-admin-kit-nine.git
cd next-admin-kit-nine
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages and automatically generate the Prisma Client.

### Step 3: Copy Environment File

```bash
cp ENV_EXAMPLE.md .env
# Or manually create .env file and copy content from ENV_EXAMPLE.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables

#### Database
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

**Format**: `postgresql://[username]:[password]@[host]:[port]/[database]`

#### Clerk Authentication
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
CLERK_SECRET_KEY="sk_test_your_secret_key_here"
```

**How to get Clerk keys:**
1. Visit [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application (or use existing)
3. Go to **API Keys** section
4. Copy the **Publishable Key** and **Secret Key**

### Optional Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Application Configuration
NEXT_PUBLIC_PROJECT_NAME="Full Admin V1"
NEXT_PUBLIC_PROJECT_DESCRIPTION="Complete admin panel starter"
NEXT_PUBLIC_PROJECT_ICON_LOCATION="/favicon.ico"
NEXT_PUBLIC_VERSION="1.0.0"
NEXT_PUBLIC_DEFAULT_LOCALE="en"

# Developer URL (for GitHub links)
NEXT_PUBLIC_DEVELOPER_URL="https://github.com/yourusername/full-admin-v1"
```

See `ENV_EXAMPLE.md` for the complete template.

---

## 🗄️ Database Setup

### Step 1: Generate Prisma Client

```bash
npm run db:generate
```

This generates the Prisma Client based on your schema.

### Step 2: Push Schema to Database

```bash
npm run db:push
```

This creates the tables in your PostgreSQL database.

**Alternative: Use Migrations**

```bash
npm run db:migrate
```

### Step 3: Verify Connection

You can open Prisma Studio to verify your database:

```bash
npm run db:studio
```

This opens a visual database browser at `http://localhost:5555`.

---

## 🔑 First Login & Admin Access

### Step 1: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 2: Sign Up

1. Visit `http://localhost:3000/en/login` (or `/ar/login` for Arabic)
2. Click "Create New Account" or go to `/sign-up`
3. Sign up with your email and password (or use social login if configured)

### Step 3: Set Admin Role

**Important**: New users are created with `GUEST` role by default. You need to update your role to access the admin panel.

#### Option A: Using Prisma Studio

1. Open Prisma Studio:
   ```bash
   npm run db:studio
   ```
2. Navigate to the `user` table
3. Find your user (by email)
4. Click on the user to edit
5. Change the `role` field to `ADMIN` or `OWNER`
6. Save the changes

#### Option B: Using SQL

```sql
UPDATE "user" 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

#### Option C: Using Prisma Client (in code)

```typescript
import { db } from '@/lib/db';

await db.user.update({
  where: { email: 'your-email@example.com' },
  data: { role: 'ADMIN' }
});
```

### Step 4: Access Admin Panel

1. Log out and log back in (or refresh the page)
2. Visit `http://localhost:3000/en/admin` (or `/ar/admin`)
3. You should now have access to the admin dashboard!

---

## 🎯 Next Steps

### 1. Customize Your Project

- **Project Name**: Update `NEXT_PUBLIC_PROJECT_NAME` in `.env`
- **Navigation**: Edit `app/[locale]/(admin)/_Components/config/navigation.ts`
- **Dashboard**: Configure `app/[locale]/(admin)/_Components/config/dashboard-config.ts`
- **Themes**: Add custom themes in `app/[locale]/(admin)/_Components/config/theme.config.ts`

### 2. Add More Users

- Users can sign up via `/sign-up`
- Update their roles in the database to grant admin access
- Or use the admin panel (if you have OWNER role) to manage users

### 3. Customize Themes

- Use the theme picker in the admin header
- Customize colors via the color picker
- Add new themes in `theme.config.ts`

### 4. Add Localization

- Edit `messages/en.json` for English translations
- Edit `messages/ar.json` for Arabic translations
- Add new locales in `i18n/routing.ts`

### 5. Cleanup Landing Page (Optional)

After you've finished setting up your project and read all the documentation, you can remove the landing page, setup guide, and documentation viewer:

```bash
npm run cleanup:landing
```

**What this does:**
- Moves all landing page components to `.trash/` directory
- Moves setup guide to `.trash/`
- Moves documentation viewer to `.trash/`
- Replaces the root page with a simple "Ready to build awesome app" message

**Note:** The files are moved to `.trash/` (not deleted) so you can recover them if needed. You can delete the `.trash/` directory later if you don't need those files.

### 6. Build for Production

```bash
npm run build
npm run build:production  # With cleanup
npm run build:deploy       # Build + database push
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error**: `Can't reach database server`

**Solutions**:
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists
- Check firewall/network settings

### Clerk Authentication Issues

**Error**: `Invalid Clerk keys`

**Solutions**:
- Verify keys are copied correctly (no extra spaces)
- Check if keys are from the correct environment (test vs production)
- Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` starts with `pk_`
- Ensure `CLERK_SECRET_KEY` starts with `sk_`

### Prisma Client Not Generated

**Error**: `PrismaClient is not generated`

**Solution**:
```bash
npm run db:generate
```

### Role Not Updating

**Issue**: Changed role in database but still can't access admin

**Solutions**:
- Log out and log back in
- Clear browser cache
- Check if user context is refetching (try "Recheck Admin Access" button)
- Verify the role was saved correctly in database

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev
```

### TypeScript Errors

**Error**: Type errors after installation

**Solution**:
```bash
npm run type-check
# Fix any errors, then:
npm run db:generate
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

---

## 💡 Tips

1. **Development**: Use `npm run dev` for hot reloading
2. **Database**: Use Prisma Studio (`npm run db:studio`) for easy database management
3. **Themes**: Try different themes from the header dropdown
4. **Localization**: Test both English and Arabic locales
5. **Roles**: Understand the role hierarchy: GUEST < ADMIN < SUPERADMIN < OWNER

---

## 🆘 Need Help?

- Check the [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed information
- Review the code comments in configuration files
- Check the [Troubleshooting](#troubleshooting) section above

---

**Happy Coding! 🎉**

