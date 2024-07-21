import Image from "next/image";
import { ModeToggle } from "../mode-toggle/mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="absolute flex w-full items-center justify-between p-5">
      <Image
        width={50}
        height={50}
        src={"/orcish-ai-nextjs-framework.png"}
        alt="Orcish AI NextJS Framework"
        priority
      />

      <div className="flex gap-3">
        <ModeToggle />

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
