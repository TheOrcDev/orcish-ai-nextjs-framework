import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/ui";
import "./globals.css";
import NextAuthProvider from "./context/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

import { TRPCProvider, ThemeProvider } from "@/components/providers";

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
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className}`}>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthProvider>
              <div className="fixed inset-0 -z-10 bg-gradient-to-t from-white to-gray-200 dark:from-gray-800 dark:to-black" />
              <Header />
              {children}
              <Footer />
            </NextAuthProvider>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
