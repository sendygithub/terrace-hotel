import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";



declare module "next-auth" {
    interface session {
     user: User & DefaultSession ["user"];
    role: string;
    }
  interface user {
    role : string;
  }
}



declare module "next-auth/jwt"{
    interface JWT {
        sub : string;
        role : string;
    }
}

// //dari chatGPT
// // global.d.ts
// import { PrismaClient } from "@prisma/client";

// declare global {
//   // Biarkan TypeScript tahu kalau globalThis bisa punya properti prisma
//   var prisma: PrismaClient | undefined;
// }

// // Perlu export kosong supaya ini dianggap modul
// export {};
