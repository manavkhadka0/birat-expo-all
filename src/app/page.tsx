import Gear from "@/components/Gear";
import WebsiteBox from "@/components/WebsiteBox";
import Image from "next/image";

const websites = [
  {
    name: "B2B",
    logo: "/all/b2b.svg",
    description:
      "Connecting businesses for successful partnerships and growth.",
    url: "/b2b",
  },
  {
    name: "BUSINESSCLIINC",
    logo: "/all/bc.png",
    description: "Expert business consulting for sustainable success.",
    url: "/business-clinic",
  },

  {
    name: "MDMU",
    logo: "/all/mdmu.png",
    description: "Mero Desh Merai Upadhan.",
    url: "/mdmu",
  },
  {
    name: "QHSEF",
    logo: "/all/logo.png",
    description: "Quality, Health, Safety, and Environmental solutions.",
    url: "/qhsef",
  },
  {
    name: "JOB BRIZ",
    logo: "/all/jobbriz.png",
    description:
      "Your gateway to career opportunities and professional growth.",
    url: "https://jobbriz-fe.vercel.app/",
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="relative overflow-hidden bg-red-500  py-6">
        <Gear className="absolute -left-16 -top-16 h-48 w-48 animate-gear-spin text-white/10" />
        <Gear className="absolute -right-16 -top-16 h-48 w-48 animate-gear-spin text-white/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="/all/image.png"
              alt="Main Logo"
              width={120}
              height={120}
              className="rounded-full bg-white p-2"
            />
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <h1 className="mb-12 text-center text-4xl font-bold text-gray-900">
          CIM Center For Excellence
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {websites.map((website) => (
            <WebsiteBox
              key={website.name}
              name={website.name}
              logo={website.logo}
              description={website.description}
              url={website.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
