import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith("/user/admin")) {
        return token?.role === "superadmin" || token?.role === "admin";
      }
      return Boolean(token);
    },
  },
});

export const config = { matcher: ["/user/:path*"] };
