import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "NestJS Auth",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) return null;

          // ✅ Ensure token exists
          if (!data?.access_token || !data?.user) return null;

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            accessToken: data.access_token, // ✅ JWT from NestJS
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      // user will exist only at login time
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      // attach token to session so frontend can use it
      (session.user as any).id = token.id;
      (session.user as any).role = token.role;
      (session.user as any).accessToken = token.accessToken;
      return session;
    },
  },

  // ✅ IMPORTANT: NextAuth secret should be only NextAuth secret
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
