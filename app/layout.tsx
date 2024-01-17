import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI NextJS Framework",
  description: "Framework for using AI completions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-5 flex items-center justify-between">
          <Image
            width={50}
            height={50}
            src={"/orcish-ai-nextjs-framework.png"}
            alt="Orcish AI NextJS Framework"
          />
          <h1>Orcish AI Next.js Framework</h1>
          <a href="/api/auth/signin">login</a>
        </div>
        {children}
      </body>
    </html>
  );
}
