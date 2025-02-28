import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Gear from "./Gear";

interface WebsiteBoxProps {
  name: string;
  logo: string;
  description: string;
  url: string;
}

export default function WebsiteBox({
  name,
  logo,
  description,
  url,
}: WebsiteBoxProps) {
  return (
    <Card className="group relative overflow-hidden border-2 border-primary/20 bg-white">
      <Gear className="absolute -right-8 -top-8 h-24 w-24 text-primary/10 transition-transform duration-700 ease-in-out group-hover:rotate-180" />
      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/20 bg-white p-4">
            <Image
              src={logo || "/placeholder.svg"}
              alt={`${name} Logo`}
              fill
              className="object-contain p-2"
            />
          </div>
          <h2 className="text-2xl font-bold text-primary">{name}</h2>
          <p className="text-center text-gray-600">{description}</p>
          <a
            href={url}
            className="mt-4 rounded-full bg-red-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500/90"
          >
            View Website
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
