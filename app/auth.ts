import NextAuth from "next-auth";
import { authOptions } from "@/app/auth/options"; // authOptionsは別ファイルで定義

export const { GET, POST } = NextAuth(authOptions); 