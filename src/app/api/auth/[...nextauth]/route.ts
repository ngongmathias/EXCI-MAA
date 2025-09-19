import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // This is a simple example - in production, you should:
        // 1. Hash passwords properly
        // 2. Use a real database
        // 3. Implement proper user management
        
        const users = [
          {
            id: '1',
            username: 'admin',
            password: 'admin123',
            name: 'Admin User',
            email: 'admin@excimaa.ca',
            role: 'admin'
          },
          {
            id: '2',
            username: 'client',
            password: 'client123',
            name: 'Client User',
            email: 'client@excimaa.ca',
            role: 'client'
          }
        ];

        const user = users.find(
          u => u.username === credentials?.username && u.password === credentials?.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
