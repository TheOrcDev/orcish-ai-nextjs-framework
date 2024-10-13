"use client";

import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Badge } from "@/components/ui";
import { trpc } from "@/server/client";

export default function UserInfo() {
  const tokens = trpc.tokens.getTokens.useQuery();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        {!tokens.isPending ? (
          <>
            <Link href="/buy-tokens">
              <Badge>{tokens?.data} tokens</Badge>
            </Link>
            <UserButton
              appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
              }}
            />
          </>
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </SignedIn>
    </div>
  );
}
