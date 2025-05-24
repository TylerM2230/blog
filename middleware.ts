import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Basic rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const rateLimit = request.headers.get('X-RateLimit-Limit')
  const rateLimitRemaining = request.headers.get('X-RateLimit-Remaining')

  if (rateLimit && rateLimitRemaining && parseInt(rateLimitRemaining) <= 0) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  // Prevent clickjacking
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none'")

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 