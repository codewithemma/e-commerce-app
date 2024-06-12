import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/auth/admin") {
        return token?.role === "superadmin" || token?.role === "admin";
      }
      return Boolean(token);
    },
  },
});

export const config = { matcher: ["/protected/:path*"] };
