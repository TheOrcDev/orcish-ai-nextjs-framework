"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

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
      <h1>Orcish AI Next.js Framework</h1>

      {status === "authenticated" ? (
        <div className="p-5 rounded-full">{session?.user?.name}</div>
      ) : (
        <a href="/api/auth/signin">login</a>
      )}
    </header>
  );
}
