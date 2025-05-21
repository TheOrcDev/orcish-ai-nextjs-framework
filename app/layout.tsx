import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers";
import { Footer } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orcish AI NextJS Framework",
  description: "Framework for quick AI setup to create SAAS products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10 bg-linear-to-t from-white to-gray-200 dark:from-gray-800 dark:to-black" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
