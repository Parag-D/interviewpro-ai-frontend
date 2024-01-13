import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./constants/common.constants";

// Add Protected routed here
const protectedRoute = [
  "/",
  "/interview",
  "/interview/instructions",
  "/interview/finish",
];

export function middleware(request: NextRequest): NextResponse | undefined {
  if (protectedRoute.includes(request.nextUrl.pathname)) {
    const user = request.cookies.has(ACCESS_TOKEN);
    // TODO: we can verify token here
    const host = process.env.HOST;
    if (!user) {
      const { href, search, origin } = request.nextUrl;
      const url = new URL(
        `${origin}/login?redirectUrl=${encodeURIComponent(
          `${href.replace(origin, "")}`
        )}`
      );
      return NextResponse.redirect(url);
    }
  }

  //   if (request.nextUrl.pathname === "/") {
  //     const user = request.cookies.has(ACCESS_TOKEN);
  //     if (user) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   }
  return undefined;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
