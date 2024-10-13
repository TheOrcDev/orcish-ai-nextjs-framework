"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { trpc } from "@/server/client";
import { Badge } from "@/components/ui";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function UserInfo() {
  const tokens = trpc.tokens.getTokens.useQuery();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <Badge>{tokens?.data} tokens</Badge>
        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </SignedIn>
    </div>
  );
}
