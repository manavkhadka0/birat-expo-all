import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import Header from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: " मेरो देश, मेरै उत्पादन अभियान",
  description: " मेरो देश, मेरै उत्पादन अभियान",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.className} antialiased`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
