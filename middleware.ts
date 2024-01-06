import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
export const { auth: middleware } = NextAuth(authConfig);

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
