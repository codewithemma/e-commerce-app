import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectDB } from "./connect";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getServerSession } from "next-auth";
import clientPromise from "./db";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          fullName: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        await connectDB();
        const { email, password } = credentials;
        if (email.length === 0 || password.length === 0) {
          throw new Error("Please provide all credentials");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with provided email");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("email or password not valid");
        }
        return {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          image: user.image,
          role: user.role,
          address: user.address,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token.id;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture;
        session.user.address = token.address;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/register",
  },
  debug: true,
};

export const getAuthSession = () => getServerSession(authOptions);
