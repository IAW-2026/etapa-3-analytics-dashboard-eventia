import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isProtectedRoute = createRouteMatcher([
  '/((?!$).*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})
export const config = {
  matcher: [
    // Ignora archivos estáticos y Next internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|svg|ico|webp|woff2?|ttf)).*)',
    // Ejecuta también en APIs
    '/(api|trpc)(.*)',
  ],
}