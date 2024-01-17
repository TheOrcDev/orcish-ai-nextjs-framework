import Image from "next/image";

export default function OHeader() {
  return (
    <header className="p-5 flex items-center justify-between">
      <Image
        width={50}
        height={50}
        src={"/orcish-ai-nextjs-framework.png"}
        alt="Orcish AI NextJS Framework"
      />
      <h1>Orcish AI Next.js Framework</h1>
      <a href="/api/auth/signin">login</a>
    </header>
  );
}
