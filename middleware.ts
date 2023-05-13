import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATH: any = {
  "/sign-in": true,
  "/sign-up": true,
};

export async function middleware(request: NextRequest) {
  //   const { cookies } = request;
  //   const token = cookies.get("token");

  //   const url = request.nextUrl.clone();
  //   const isMatchAuthPath = AUTH_PATH[request.nextUrl.pathname];

  //   if (token) {
  //     if (isMatchAuthPath) {
  //       url.pathname = "/";
  //       return NextResponse.redirect(url);
  //     }
  //     return NextResponse.next();
  //   }

  //   if (!token) {
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
  return NextResponse.next();
}
