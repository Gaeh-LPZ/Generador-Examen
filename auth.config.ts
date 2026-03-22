// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.users.findFirst({
          where: { email: credentials.email as string }
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (passwordsMatch) {
          return { 
            id: user.id.toString(), 
            name: user.username, 
            email: user.email 
          };
        }

        return null;
      }
    })
  ]
});