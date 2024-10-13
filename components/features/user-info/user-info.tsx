"use client";

import Link from "next/link";

import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Badge, Skeleton } from "@/components/ui";
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
        <Link href="/buy-tokens">
          <Badge className="flex items-center text-base">
            {tokens.isPending ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              tokens?.data
            )}{" "}
            tokens
          </Badge>
        </Link>
        <ClerkLoading>
          <Skeleton className="size-8 rounded-full" />
        </ClerkLoading>
        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </SignedIn>
    </div>
  );
}
