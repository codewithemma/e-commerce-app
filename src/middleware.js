import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      if (req.nextUrl.pathname === "/user/admin") {
        return token?.role === "superadmin" || token?.role === "admin";
      }
      return Boolean(token);
    },
    async redirect({ req, res, url }) {
      if (url.pathname.startsWith("/user/admin")) {
        const session = await req.session();
        if (
          !session ||
          !session.user ||
          session.user.role !== "admin" ||
          session.user.role !== "superadmin"
        ) {
          return res.redirect("/");
        }
      }
    },
  },
});

export const config = { matcher: ["/user/:path*"] };
