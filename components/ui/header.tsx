"use server";

import { LogIn } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { UserInfo } from "@/components/features";
import { ModeSwitcher } from "@/components/mode-switcher";
import { auth } from "@/lib/auth";
import { getTokens } from "@/server/tokens";

import { Button } from "./button";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
        <ModeSwitcher />

        {session?.user ? (
          <UserInfo tokens={tokens} />
        ) : (
          <Link href="/login">
            <Button variant="outline">
              <LogIn className="size-4 mr-2" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
