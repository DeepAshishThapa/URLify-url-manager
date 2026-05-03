import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export const config = {
  matcher: ["/home/:path*", "/folders/:path*", "/login", "/signup"],
}

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  const pathname = request.nextUrl.pathname

  if (!token && (pathname.startsWith("/home") || pathname.startsWith("/folders"))) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  return NextResponse.next()
}