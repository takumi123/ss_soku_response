// auth.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// パスワードをハッシュ化する関数
async function hashPassword(password: string): Promise<string> {
  // bcryptを使用してパスワードをハッシュ化
  const saltRounds = 10; // ハッシュ化の強度を設定
  return bcrypt.hash(password, saltRounds);
}

const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }

        // APIにハッシュ化したパスワードを送信
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: await hashPassword(credentials.password as string),
          }),
        });

        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
});

export { auth, handlers, signIn, signOut };
export const { GET, POST } = handlers;
