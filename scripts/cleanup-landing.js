#!/usr/bin/env node

/**
 * Cleanup Landing Page Script
 *
 * This script removes the landing page, setup guide, and documentation
 * after you've finished setting up your project.
 *
 * It moves all landing-related files to a trash directory and
 * replaces the root page with a simple "Ready to build" message.
 *
 * Usage: npm run cleanup:landing
 */

const {
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} = require('fs');
const { join } = require('path');

// Get project root
const projectRoot = join(__dirname, '..');
const appLocaleDir = join(projectRoot, 'app', '[locale]');
const trashDir = join(projectRoot, '.trash');

// Directories and files to move to trash
const itemsToTrash = [
  '(root)', // Landing page components and pages
  'setup', // Setup guide
  'docs', // Documentation viewer
];

// Public folder items to move (images, etc.)
const publicItemsToTrash = [
  'admin-dashboard', // Admin dashboard screenshots
  'login', // Login page screenshots
];

// Files to update
const rootPagePath = join(appLocaleDir, 'page.tsx');

console.log('🧹 Starting cleanup process...\n');

// Check if items exist
const existingItems = itemsToTrash.filter(item => {
  const itemPath = join(appLocaleDir, item);
  return existsSync(itemPath);
});

if (existingItems.length === 0) {
  console.log(
    '✅ No landing page files found. Cleanup may have already been run.'
  );
  process.exit(0);
}

try {
  // Create trash directory if it doesn't exist
  if (!existsSync(trashDir)) {
    mkdirSync(trashDir, { recursive: true });
    console.log('📁 Created .trash directory\n');
  }

  // Move items to trash
  console.log('📦 Moving files to .trash...');
  existingItems.forEach(item => {
    const sourcePath = join(appLocaleDir, item);
    const destPath = join(trashDir, item);

    if (existsSync(destPath)) {
      // If already exists in trash, remove it first
      rmSync(destPath, { recursive: true, force: true });
    }

    renameSync(sourcePath, destPath);
    console.log(`   ✓ Moved ${item} → .trash/${item}`);
  });

  // Create new simple root page
  console.log('\n📝 Creating new root page...');
  const newPageContent = `import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://next-admin-kit-nine.vercel.app';

  return generateSEOMetadata({
    title: process.env.NEXT_PUBLIC_PROJECT_NAME || 'next-admin-kit-nine',
    description:
      process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ||
      'Your admin panel application',
    image: '/og-image.png',
    url: \`/\${locale}\`,
    type: 'website',
    locale: locale,
    alternateLocales: ['en', 'ar']
      .filter(loc => loc !== locale)
      .map(loc => ({
        locale: loc,
        url: \`/\${loc}\`,
      })),
  });
}

export default async function HomePage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-setup-primary'>
      <div className='text-center'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-setup-text mb-4'>
          Ready to build awesome app
        </h1>
        <p className='text-lg text-setup-text/70 mt-4'>
          Your admin panel is set up and ready for development
        </p>
      </div>
    </div>
  );
}
`;

  // Write new page
  writeFileSync(rootPagePath, newPageContent, 'utf-8');
  console.log('   ✓ Created new root page.tsx');

  // Move public folder items
  const publicDir = join(projectRoot, 'public');
  const publicTrashDir = join(trashDir, 'public');

  if (existsSync(publicDir)) {
    console.log('\n📸 Moving public folder images...');
    let publicMovedCount = 0;

    publicItemsToTrash.forEach(item => {
      const sourcePath = join(publicDir, item);
      if (existsSync(sourcePath)) {
        if (!existsSync(publicTrashDir)) {
          mkdirSync(publicTrashDir, { recursive: true });
        }

        const destPath = join(publicTrashDir, item);

        if (existsSync(destPath)) {
          rmSync(destPath, { recursive: true, force: true });
        }

        renameSync(sourcePath, destPath);
        console.log(`   ✓ Moved public/${item} → .trash/public/${item}`);
        publicMovedCount++;
      }
    });

    if (publicMovedCount === 0) {
      console.log('   ℹ No public images found to move');
    }
  }

  console.log('\n✅ Cleanup completed successfully!\n');
  console.log('📋 Summary:');
  console.log(
    `   • Moved ${existingItems.length} item(s) from app/[locale]/ to .trash/`
  );
  console.log('   • Moved public folder images to .trash/public/');
  console.log('   • Created new simple root page');
  console.log(
    '   • Landing page, setup guide, docs, and images are now in .trash/'
  );
  console.log(
    "\n💡 Tip: You can delete the .trash directory if you don't need those files anymore."
  );
  console.log(
    '   Or keep it as a backup in case you need to reference the landing page later.\n'
  );
} catch (error) {
  console.error('❌ Error during cleanup:', error);
  process.exit(1);
}
