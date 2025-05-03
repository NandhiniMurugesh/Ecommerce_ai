import { clerkMiddleware } from "@clerk/nextjs/server";


// Use this if you're using the latest Clerk:
export default clerkMiddleware({
    publicRoutes: ["/", "/products", "/sign-in", "/sign-up", "/cart","/api/email"]

});

// This is required:
export const config = {
  matcher: [
    // Protected routes that Clerk should check
   "/((?!.*\\..*|_next).*)", "/"
  ],
};




