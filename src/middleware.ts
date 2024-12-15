import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;

  if (!isLoggedIn && nextUrl.pathname.startsWith("/wishes")) {
    return NextResponse.redirect(new URL("/onboard", request.url));
  }

  if (isLoggedIn && nextUrl.pathname.startsWith("/onboard")) {
    return NextResponse.redirect(new URL("/wishes", request.url));
  }
}
