"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle/ModeToggle";
// import Button from "../Button/Button";

export default function Header() {
  const { status } = useSession();

  return (
    <header className="p-5 flex items-center justify-between">
      <Image
        width={50}
        height={50}
        src={"/orcish-ai-nextjs-framework.png"}
        alt="Orcish AI NextJS Framework"
      />

      <div className="flex">
        <ModeToggle />
      </div>
      {/* {status === "authenticated" ? (
        <div className="flex">
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <a href="/api/auth/signin">
          <Button>Login</Button>
        </a>
      )} */}
    </header>
  );
}
