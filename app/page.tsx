import { AISelector } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-col text-center gap-5">
        <h1>Orcish AI Next.js Framework</h1>
        <AISelector />
      </div>
    </main>
  );
}
