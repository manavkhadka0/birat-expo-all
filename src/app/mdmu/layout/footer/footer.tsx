import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A1E4B] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/cim-logo.webp"
                alt="CIM Logo"
                className="rounded-full bg-white p-2"
                width={80}
                height={80}
              />
              <Image
                src="/mdmu/logo.png"
                alt="MDMU Logo"
                className="rounded-full bg-white p-[1px]"
                width={80}
                height={80}
              />
            </div>
            <p className="text-sm">Empowering Local, Inspiring Global</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mdmu/#about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/mdmu/#objectives" className="hover:text-gray-300">
                  Objectives
                </Link>
              </li>
              <li>
                <Link href="/mdmu/#advantages" className="hover:text-gray-300">
                  Advantages
                </Link>
              </li>
              <li>
                <Link href="/mdmu/apply" className="hover:text-gray-300">
                  Apply for Logo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Chamber of Industries Morang, Biratnagar, Nepal</li>
              <li>Phone: 021-515712</li>
              <li>Email: biratexpo2024@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/BIRATEXPO2025"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/biratexpo2025"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MDMU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
