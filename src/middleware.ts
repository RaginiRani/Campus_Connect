import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const token = await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET,
    });

    const {pathname} = req.nextUrl;

    //protected routes
    const protectedRoutes = ["/dashboard", "/admin"];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    )

    //not logged in -> login page
    if(isProtected && !token){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    //student trying to access admin
    if(pathname.startsWith("/admin") && token?.role !== "admin"){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*"
    ]
};