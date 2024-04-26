import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectDB } from "./connect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "Username" },
    //     email: { label: "Email", type: "email", placeholder: "Email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
    //     if (user) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      console.log(profile);

      try {
        await connectDB();
        const userExist = await User.findOne({
          email: profile.email,
        });
        if (!userExist) {
          const user = await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
          });
          await user.save();
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
