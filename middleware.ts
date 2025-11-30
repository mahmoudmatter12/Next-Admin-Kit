import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Define public routes (accessible without authentication)
// These patterns match with locale prefixes (e.g., /en/login, /ar/login)
const isPublicRoute = createRouteMatcher([
  '/(en|ar)/login(.*)',
  '/(en|ar)/sign-up(.*)',
  // Add more public routes here if needed
]);

// Configure internationalization middleware
const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: 'always',
});

export default clerkMiddleware(async (auth, req) => {
  const { pathname, searchParams } = req.nextUrl;
  const isApiRoute = pathname.startsWith('/api');

  // Handle API routes - protect all except GET requests
  if (isApiRoute) {
    const method = req.method;

    // Allow GET requests without authentication
    if (method === 'GET') {
      return NextResponse.next();
    }

    // Allow POST requests to /api/messages without authentication
    if (method === 'POST' && pathname.includes('/api/messages')) {
      return NextResponse.next();
    }

    // Require authentication for all other methods (POST, PUT, DELETE, PATCH, etc.)
    const authResult = await auth();

    if (!authResult.userId) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Optional: Add role-based checks for specific API routes
    // if (pathname.startsWith("/api/admin") && authResult.orgRole !== "admin") {
    //   return NextResponse.json(
    //     { error: "Forbidden", message: "Admin access required" },
    //     { status: 403 }
    //   );
    // }

    return NextResponse.next();
  }

  // Redirect root to login directly (since everything requires auth)
  // if (pathname === '/en' || pathname === '/ar' || pathname === '/') {
  //   const authResult = await auth();
  //   if (!authResult.userId) {
  //     return NextResponse.redirect(
  //       new URL(
  //         `/${routing.defaultLocale}/login${
  //           searchParams ? `?${searchParams}` : ''
  //         }`,
  //         req.url
  //       )
  //     );
  //   }
  //   // If authenticated, redirect to default locale homepage
  //   return NextResponse.redirect(
  //     new URL(
  //       `/${routing.defaultLocale}${pathname}${
  //         searchParams ? `?${searchParams}` : ''
  //       }`,
  //       req.url
  //     )
  //   );
  // }

  // Process internationalization - this adds locale prefix to the pathname
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    // If intl middleware returns a redirect, let it happen
    // The redirected request will go through this middleware again and check auth
    return intlResponse;
  }

  // Check if route is public (after locale has been processed)
  const isPublic = isPublicRoute(req);

  // Protect all routes except public routes
  if (!isPublic) {
    const authResult = await auth();

    // Redirect unauthenticated users to login
    if (!authResult.userId) {
      // Extract locale from pathname (e.g., /en/... or /ar/...)
      const localeMatch = pathname.match(/^\/(en|ar)\//);
      const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

      const signInUrl = new URL(`/${locale}/login`, req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Optional: Check user role or other permissions
    // if (authResult.orgRole !== 'admin') {
    //   return NextResponse.redirect(new URL('/unauthorized', req.url));
    // }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next|.*\\..*).*)',
    // Include API routes
    '/(api|trpc)(.*)',
  ],
};
