import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes";

import { ThemeProvider } from "@/components/ui/providers/theme-provider";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Discord Clone using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          font.className,
          "bg-white dark:bg-[#313338]"
        )}>
          <ThemeProvider 
          
          attribute="class" defaultTheme="dark" enableSystem={false} storageKey="discord-theme">
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
