import Image from "next/image";
import { ModeToggle } from "../mode-toggle/mode-toggle";

export default function Header() {
  return (
    <header className="absolute flex w-full items-center justify-between p-5">
      <Image
        width={50}
        height={50}
        src={"/orcish-ai-nextjs-framework.png"}
        alt="Orcish AI NextJS Framework"
        priority
      />

      <ModeToggle />
    </header>
  );
}
