import Image from "next/image";
import Link from "next/link";

import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              width={50}
              height={50}
              src={"/orcish-ai-nextjs-framework.png"}
              alt="Orcish AI NextJS Framework"
              priority
            />
          </div>
          Orcish AI Next.js Framework
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
