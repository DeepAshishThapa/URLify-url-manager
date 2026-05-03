import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export const config = {
  matcher: ["/", "/login", "/signup", "/home/:path*", "/folders/:path*"],
}

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  if (isLoggedIn && ["/", "/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url))
  }

  if (!isLoggedIn && (pathname.startsWith("/home") || pathname.startsWith("/folders"))) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})