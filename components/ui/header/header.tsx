import Image from "next/image";
import Link from "next/link";

import { UserInfo } from "@/components/features";
import { getTokens } from "@/server/tokens";

import { ModeToggle } from "../mode-toggle/mode-toggle";

export default async function Header() {
  const tokens = await getTokens();

  return (
    <header className="absolute flex w-full items-center justify-between p-5">
      <Link href={"/"}>
        <Image
          width={50}
          height={50}
          src={"/orcish-ai-nextjs-framework.png"}
          alt="Orcish AI NextJS Framework"
          priority
        />
      </Link>
      <div className="flex gap-3">
        <ModeToggle />
        <UserInfo tokens={tokens} />
      </div>
    </header>
  );
}
