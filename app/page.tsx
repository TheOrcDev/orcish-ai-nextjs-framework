import { Button, Header } from "@/components/ui";
import { SignedIn } from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between gap-5 p-24">
        <h1>Orcish AI Next.js Framework</h1>
        <SignedIn>
          <Link href={"/ai-selector"}>
            <Button>
              AI Selector <ArrowRightIcon className="size-5" />
            </Button>
          </Link>
        </SignedIn>
      </main>
    </>
  );
}
