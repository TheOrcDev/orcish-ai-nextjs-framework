import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { Account, Session, User } from "./lib/definitions";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getUser(email: string): Promise<User | null> {
  try {
    const userWithAccounts = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        accounts: true,
        sessions: true,
      },
    });

    if (!userWithAccounts) {
      return null;
    }

    const { accounts, sessions, ...userData } = userWithAccounts;

    return {
      ...userData,
      accounts: accounts as Account[],
      sessions: sessions as Session[],
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
