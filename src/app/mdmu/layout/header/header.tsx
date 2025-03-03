"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navigationItems = [
  { href: "/mdmu/#about", label: "About" },
  { href: "/mdmu/#objectives", label: "Objectives" },
  { href: "/mdmu/#advantages", label: "Advantages" },
  { href: "/mdmu/#contact", label: "Contact" },
  { href: "/", label: "All Platforms" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const scrollToSection = (href: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = href;
      return;
    }

    const hash = href.replace("/", "");
    const element = document.getElementById(hash.replace("#", ""));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-white py-2 sticky top-0 z-50 h-[80px]">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/mdmu">
          <div className="flex items-center gap-4">
            <Image src="/cim-logo.webp" alt="CIM Logo" width={60} height={60} />
            <Image
              src="/mdmu/logo.png"
              alt="MDMU Logo"
              width={75}
              height={75}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    legacyBehavior
                    passHref
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                  >
                    <NavigationMenuLink className="hover:text-[#2964f0] font-bold px-4 py-3">
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button className="bg-[#0A1E4B] hover:bg-blue-900" asChild>
            <Link href={"/mdmu/apply"}>Apply For Logo</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white text-[#0A1E4B] w-64">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-[#0A1E4B] text-lg px-4 py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => {
                        scrollToSection(item.href);
                      }, 100);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="bg-[#0A1E4B] hover:bg-blue-900" asChild>
                  <Link href={"/mdmu/apply"} onClick={() => setOpen(false)}>
                    Apply For Logo
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;
