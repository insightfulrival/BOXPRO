import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Update Supabase auth session
  await updateSession(request);
  // Handle i18n routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ro|en)/:path*'],
};
