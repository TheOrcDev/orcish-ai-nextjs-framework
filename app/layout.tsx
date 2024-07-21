import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/ui";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

import { TRPCProvider, ThemeProvider } from "@/components/providers";

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
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body className={`${inter.className}`}>
          <TRPCProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="fixed inset-0 -z-10 bg-gradient-to-t from-white to-gray-200 dark:from-gray-800 dark:to-black" />
              {children}
              <Footer />
            </ThemeProvider>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
