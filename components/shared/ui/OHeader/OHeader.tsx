"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import OButton from "../OButton/OButton";

export default function OHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="p-5 flex items-center justify-between">
      <Image
        width={50}
        height={50}
        src={"/orcish-ai-nextjs-framework.png"}
        alt="Orcish AI NextJS Framework"
      />

      {status === "authenticated" ? (
        <div className="flex">
          <OButton onClick={() => signOut()}>Sign out</OButton>
        </div>
      ) : (
        <a href="/api/auth/signin">
          <OButton>Login</OButton>
        </a>
      )}
    </header>
  );
}
