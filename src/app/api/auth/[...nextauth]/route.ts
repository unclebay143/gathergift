import { authOptions } from "@/utils/nextAuth.config";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
