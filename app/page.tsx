import { AISelector } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex w-full flex-col items-center gap-5 text-center">
        <h1>Orcish AI Next.js Framework</h1>
        <AISelector />
      </div>
    </main>
  );
}
