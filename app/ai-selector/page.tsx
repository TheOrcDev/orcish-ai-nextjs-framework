import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { AISelector } from "@/components/features";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";

export default function AiSelectroPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between gap-5 p-24">
        <Link href={"/"}>
          <Button>
            <ArrowLeftIcon className="size-5" /> Back
          </Button>
        </Link>
        <AISelector />
      </main>
    </>
  );
}
