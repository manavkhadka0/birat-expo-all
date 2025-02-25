"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-gradient-to-br min-h-[calc(100vh-130px)] flex flex-col justify-center items-center from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0A1E4B]">
            {/* mero desh merei udpadan */}
            मेरो देश, मेरै उत्पादन अभियान
          </h1>
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 relative">
              Empowering Local,
              <br />
              Inspiring Global.
            </h2>
            <div className="relative mt-7 py-3">
              <Image
                src="/Rectangle.svg"
                alt=""
                width={300}
                height={8}
                className="absolute -bottom-2 left-0"
              />
            </div>
            <p className="text-gray-600 mt-8">
              A Campaign Initiated for the Promotion of Domestic Products
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-[#0A1E4B] hover:bg-blue-900" asChild>
              <Link href={"/mdmu/apply"}>Apply For Logo</Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#0A1E4B] text-[#0A1E4B]"
              onClick={() => scrollToSection("#about")}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <Image
            src="/mdmu/logo.png"
            alt="MDMU Logo"
            width={400}
            height={400}
            className="w-full max-w-[400px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
