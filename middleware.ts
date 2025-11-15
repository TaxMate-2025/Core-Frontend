import { NextRequest, NextResponse } from 'next/server'

// Define your restricted routes
const DEV_ONLY_ROUTES = [
    '/dashboard',
    '/advanced-tax-calculator',
    '/business-tax-calculator',
    '/feedback',
]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the current path is a dev-only route
    const isDevRoute = DEV_ONLY_ROUTES.some(route =>
        pathname.startsWith(route)
    )

    if (isDevRoute) {
        // Allow access in development environment
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.next()
        }

        // In production, check for dev access key or redirect
        const devKey = request.nextUrl.searchParams.get('dev')
        const validDevKey = process.env.DEV_ACCESS_KEY

        if (devKey === validDevKey) {
            return NextResponse.next()
        }

        // Redirect to home page for unauthorized access
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
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