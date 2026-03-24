import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/membership';

export async function middleware(request: NextRequest) {
  // Check if route strictly requires membership (e.g. /premium/ slug prefix)
  const isPremiumRoute = request.nextUrl.pathname.includes('-premium-');
  
  if (isPremiumRoute) {
    const token = request.cookies.get('member_token')?.value;
    
    if (!token || !(await verifyJWT(token))) {
      return NextResponse.redirect(new URL('/membership', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*'],
};
