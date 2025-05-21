"use client";

import { Loader2, LogOut, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth.client";

interface UserInfoProps {
  tokens: number;
}

export default function UserInfo({ tokens }: UserInfoProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },

        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const navItems = [
    {
      label: "My Account",
      href: "/profile",
      icon: User,
    },
    {
      label: `${tokens} tokens`,
      href: "/buy-tokens",
      icon: Wallet,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {isPending || isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Avatar>
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <DropdownMenuItem className="flex items-center gap-2">
                <item.icon className="size-5" />
                {item.label}
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="size-5" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
