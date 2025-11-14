import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// List of public routes that don't require authentication
const publicRoutes = ['/', '/aboutus', '/privacy-policy', '/termsofservices', '/support', '/auth/login', '/auth/register','/payment-success'];

// Function to verify the JWT token
// async function verifyToken(token) {
//   if (!token) return false;

//   try {
//     // Replace 'your-secret-key' with your actual JWT secret key
//     const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secretKey);

//     // Check if the token is expired
//     const currentTimestamp = Math.floor(Date.now() / 1000);
//     if (payload.exp && payload.exp < currentTimestamp) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return false;
//   }
// }

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // Verify the token
//   const isAuthenticated = await verifyToken(token);
const isAuthenticated = !!token;

  // Allow access to public routes without authentication
  if (publicRoutes.includes(pathname)) {
    // Redirect authenticated users away from login/register pages
    if (isAuthenticated && (pathname === '/auth/login' || pathname === '/auth/register')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Allow access to all files from the `public` folder
  if (pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|json|txt|woff|woff2|eot|ttf|otf|mp4|mp3|wav|ogg|webm|pdf)$/)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page for protected routes
  if (!isAuthenticated) {
    // Clear the invalid token if present
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (`/api/**`)
     * - Static files (`/_next/static/**`, `/_next/image/**`, `/favicon.ico`)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

