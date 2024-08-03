"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { trpc } from "@/server/client";
import { Badge } from "@/components/ui";

export default function UserInfo() {
  const tokens = trpc.tokens.getTokens.useQuery();

  return (
    <div className="flex items-center gap-2">
      <Badge>{tokens?.data} tokens</Badge>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
