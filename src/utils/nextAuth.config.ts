import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { User } from "@/model/users";
import connectMongoose from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        await connectMongoose();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Wrong credentials. Try again.");
        }

        const passwordCorrect = await compare(password, user.password);

        if (passwordCorrect) {
          return user;
        }

        throw new Error("Wrong credentials. Try again.");
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as {
        last_name?: string | null;
        email?: string | null;
        profile_picture?: string | null;
      };
      return session;
    },
  },
};

export function getServerSessionWithAuthOptions(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
