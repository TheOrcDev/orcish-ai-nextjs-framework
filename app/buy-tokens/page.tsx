import { currentUser } from "@clerk/nextjs/server";

import { BuyTokens } from "@/components/features";
import React from "react";

export default async function BuyTokensPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress ?? "";

  if (!user) {
    return <h2>Login</h2>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-24">
      <BuyTokens email={email} />
    </div>
  );
}
