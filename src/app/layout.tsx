import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextHub",
  description: "Hub for open-source projects!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-sm">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
              <Navbar />
            </div>
          </header>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
