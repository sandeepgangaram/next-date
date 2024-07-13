import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";

import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./actions/authActions";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          if (!user || !(await compare(password, user.passwordHash))) {
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
