import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";

import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./actions/authActions";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          if (
            !user ||
            !user.passwordHash ||
            !(await compare(password, user.passwordHash))
          ) {
            return null;
          } else {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
