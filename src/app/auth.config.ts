import { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // ここでユーザー認証を実装します
        const user = { 
          id: "1", 
          name: "User", 
          email: credentials?.email as string | null 
        };
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
};
