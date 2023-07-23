import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/utils/prisma";

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

export const authOption = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // if (account.provider === "google") {
      //   return profile.email_verified && profile.email.endsWith("@example.com");
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
