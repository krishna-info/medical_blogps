import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if route strictly requires membership (e.g. /premium/ slug prefix)
  const isPremiumRoute = request.nextUrl.pathname.includes('-premium-');
  
  if (isPremiumRoute) {
    const token = request.cookies.get('member_token')?.value;
    
    // NOTE: We defer deep cryptographic JWT validation to the page/server-component 
    // level instead of Middleware because Netlify Edge Runtime lacks full CompressionStream support for `jose`
    if (!token) {
      return NextResponse.redirect(new URL('/membership', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*'],
};
