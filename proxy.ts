import { NextRequest, NextResponse } from 'next/server'

const DEV_ONLY_ROUTES = [
    '/dashboard',
    '/advanced-tax-calculator',
    '/business-tax-calculator',
    '/feedback',
]

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isDevRoute = DEV_ONLY_ROUTES.some(route =>
        pathname.startsWith(route)
    )

    if (isDevRoute) {
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.next()
        }

        const devKey = request.nextUrl.searchParams.get('dev')
        const validDevKey = process.env.DEV_ACCESS_KEY

        if (devKey && devKey === validDevKey) {
            return NextResponse.next()
        }

        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
