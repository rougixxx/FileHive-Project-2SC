import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("auth_token");
  let isValidToken = false;
  if (accessToken) {
    isValidToken = await verify(accessToken);
  }

  if (!isValidToken) {
    // Delete the cookie    
    const response = NextResponse.next({
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    response.cookies.delete("auth_token");
    // If access token does not exist, redirect to sign-in page
    return response;
  } else if (
    isValidToken &&
    requireGuest.some((path) => pathname.startsWith(path))
  ) {
    // If access token exists, redirect to home page
    return NextResponse.redirect(new URL("/home", request.url));
  } else {
    // If access token exists, access the page normally
    return NextResponse.next();
  }
}

const requireAuth = ["/home", "/settings", "/profile"];
const requireGuest = [
  "/sign-in",
  "/sign-up",
  "/email-verification/*/*",
  "/reset-password/*/*",
  "/forgot-password",
  "/verify-email",
];

async function verify(accessToken: any) {
  try {
    await fetch(`http://localhost:8000/verify-token`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
    return true;
  } catch (error: any) {    
    return false;
  }
}
