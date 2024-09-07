import { NextRequest, NextResponse } from "next/server";

export default function middleware(request : NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/" || path === "/publicRoutes/signup" || path === "/publicRoutes/signin" ;
    const token = request.cookies.get('token')?.value ?? "";
    
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/blogs', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/' , request.nextUrl))
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/publicRoutes/signup",
        "/publicRoutes/signin",
        "/blogs/:id*",
        "/blogs",
        "/blogs/create-blog"
    ],
};
