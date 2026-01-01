import NextAuth from "next-auth";

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

  interface User {
    id: string;
    role: "student" | "admin";
    semester?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "student" | "admin";
    semester?: number;
  }
}
