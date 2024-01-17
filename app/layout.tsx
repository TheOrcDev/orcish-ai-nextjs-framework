import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OFooter, OHeader } from "@/components";

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
      <OHeader />
      <body className={inter.className}>{children}</body>
      <OFooter />
    </html>
  );
}
