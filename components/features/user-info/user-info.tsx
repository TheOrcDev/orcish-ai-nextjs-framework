"use client";

import Link from "next/link";

import { trpc } from "@/server/client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui";

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
