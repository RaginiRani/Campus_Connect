import connect from "@/lib/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend Session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "admin";
      semester?: number;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "student" | "admin";
    semester?: number;
  }
}

// Type for authorize callback return
interface AuthUser {
  id: string;
  role: "student" | "admin";
  semester?: number;
  name?: string;
  email?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        // ✅ Cast to AuthUser to include optional semester
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          semester: user.semester || undefined,
        } as AuthUser;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;
        token.id = u.id;
        token.role = u.role;
        token.semester = u.semester;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "student" | "admin";
        session.user.semester = token.semester as number | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
