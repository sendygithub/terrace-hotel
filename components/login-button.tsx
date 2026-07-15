"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {session.user?.name?.charAt(0) || "U"}
          </div>
        )}
        <div className="text-sm">
          <p className="font-medium text-gray-800">{session.user?.name}</p>
          <p className="text-gray-500 text-xs">{session.user?.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="py-1.5 px-3 bg-red-500 text-white text-xs rounded-sm hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="py-2 px-4 bg-orange-400 text-white rounded-sm hover:bg-orange-500 text-sm"
    >
      Sign In with Google
    </button>
  );
}
