// import { StatusCodes } from "http-status-codes";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/user/admin") {
        return token?.role === "superadmin" || token?.role === "admin";
      }
      // if (req.nextUrl.pathname === "/api") {
      //   return new NextResponse("Forbidden", { status: StatusCodes.FORBIDDEN });
      // }
      return Boolean(token);
    },
  },
});

export const config = { matcher: ["/user/:path*"] };
