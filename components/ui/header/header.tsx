"use client";

// import { useSession } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle/mode-toggle";
// import Button from "../Button/Button";

export default function Header() {
  // const { status } = useSession();

  return (
    <header className="absolute flex w-full items-center justify-between p-5">
      <Image
        width={50}
        height={50}
        src={"/orcish-ai-nextjs-framework.png"}
        alt="Orcish AI NextJS Framework"
        priority
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
