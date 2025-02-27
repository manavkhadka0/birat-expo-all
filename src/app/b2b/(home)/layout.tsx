import { Footer } from "@/app/b2b/components/sections/layout/footer/footer";
import { DefaultNav } from "@/app/b2b/components/sections/layout/navigation/default-nav";

export default function WishOfferLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DefaultNav />
      {children}
      <Footer />
    </>
  );
}
