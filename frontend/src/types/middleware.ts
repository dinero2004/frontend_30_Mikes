import { NextAuthRequest } from "next-auth";
import { auth } from "../auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile"];
const authRoutes = ["/login"];

export default auth((request: NextAuthRequest) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api(?!/auth)|_next/static|_next/image|favicon.ico).*)",
  ],
};
