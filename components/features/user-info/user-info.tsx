"use client";

import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Badge, Button, Skeleton } from "@/components/ui";

interface UserInfoProps {
  tokens: number;
}

export default function UserInfo({ tokens }: UserInfoProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <Button variant="outline" asChild>
          <SignInButton />
        </Button>
      </SignedOut>

      <SignedIn>
        <Link href="/buy-tokens">
          <Badge className="flex items-center text-base">{tokens} tokens</Badge>
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
