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
import connectViaMongoose from "@/lib/mongodb";
import { Log } from "@/model/logs";
import type { User as UserType } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      name: "Google",
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
        await connectViaMongoose();
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
      session.user = token.user as UserType;
      return session;
    },

    async signIn({ profile: userProfile, account }) {
      await connectViaMongoose();
      const isGoogleAuthProvider = account?.provider === "google";

      const user = await User.findOne({
        email: userProfile?.email,
      });

      const isNewUser = !user;

      if (isNewUser) {
        let newUserData;

        if (isGoogleAuthProvider) {
          newUserData = {
            lastName: userProfile?.name,
            firstName: userProfile?.given_name,
            email: userProfile?.email,
            photo: userProfile?.picture,
            authProvider: "google",
          };

          const newUserCreated = await User.create(newUserData);
          if (newUserCreated) {
            const userId = newUserCreated._id;
            await Log.create({
              type: "onboarding",
              user: userId,
              title: "Created an account 🎉",
            });
          }
        }

        return true;
      }

      await Log.create({
        user: user._id,
        title: "Logged in",
      });
      return true;
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
