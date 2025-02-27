import type { Metadata } from "next";
import "@/app/globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "B2B Marketplace",
  description: "B2B Marketplace",
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.className}  antialiased`}>
        <NextTopLoader height={3} color="#002B49" />
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
