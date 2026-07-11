import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const configuredClerkMiddleware = clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) await auth.protect();
  if (isAdminRoute(request)) {
    const { userId } = await auth();
    const adminIds = (process.env.ADMIN_USER_IDS ?? "")
      .split(",")
      .filter(Boolean);
    if (!userId || !adminIds.includes(userId))
      return NextResponse.redirect(new URL("/", request.url));
  }
});

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  // Keep the credential-free preview usable. Production routes are protected as soon as both keys exist.
  if (
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    !process.env.CLERK_SECRET_KEY
  ) {
    return NextResponse.next();
  }
  return configuredClerkMiddleware(request, event);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"]
};
