import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 1. Agar user logged in hai aur login/signup page pe jane ki koshish kare
    // Toh use wapas dashboard pe bhej do (Professional Redirect)
    const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");
    
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Ye function check karta hai ki user authorized hai ya nahi
      authorized: ({ token }) => !!token, 
    },
    pages: {
      signIn: "/auth/login", // Unauthenticated users ko yahan redirect karega
    },
  }
);

// 🎯 Matching Routes: Aapke schema ke hisab se saare paths yahan lock hain
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/tasks/:path*",
    "/epics/:path*",
    "/ai/:path*",
    "/team/:path*",
    "/costs/:path*",
    "/risks/:path*",
    // Auth pages ko bhi matcher mein dala hai taki logged-in user logic apply ho sake
    "/auth/login",
    "/auth/signup",
  ],
};