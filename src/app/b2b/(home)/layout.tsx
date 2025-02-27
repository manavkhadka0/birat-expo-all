import { Footer } from "@/app/business-clinic/components/Footer";
import { DefaultNav } from "../components/sections/layout/navigation/default-nav";

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
