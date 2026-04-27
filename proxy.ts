import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const config = {
    matcher: ['/login', '/signup', '/home', '/folders/:folderid*', '/']
}

export async function proxy(request: NextRequest) {
    const token = await getToken({ 
        req: request,
        secret: process.env.AUTH_SECRET,
     })
    const url = request.nextUrl

    // if loggedin block the pages
    if (    
        token &&
        (url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/signup') ||
            url.pathname === '/')

    ) {
        return NextResponse.redirect(new URL('/home', request.url));

    }

    // if not logged in block 
    if (
        !token &&
        (url.pathname.startsWith('/home') ||
            url.pathname.startsWith('/folders'))

    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next()

}