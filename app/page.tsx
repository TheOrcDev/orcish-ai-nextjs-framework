import { AISelector } from "@/components/features";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-5 p-24">
      <h1>Orcish AI Next.js Framework</h1>
      <AISelector />
    </main>
  );
}
