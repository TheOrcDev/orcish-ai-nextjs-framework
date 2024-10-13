"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { trpc } from "@/server/client";
import { Badge } from "@/components/ui";

export default function UserInfo() {
  const tokens = trpc.tokens.getTokens.useQuery();

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <Badge>{tokens?.data} tokens</Badge>
        <UserButton />
      </SignedIn>
    </div>
  );
}
