"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from 'lucide-react';

const Header1 = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Community", href: "/community" },
  ];

  return (
    <header className="bg-[#00A6E6] w-full">
      <div className="max-w-[90%] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href={'/'}>
          <div className="flex items-center">
            <Image
              src="/prologo.png"
              alt="ProConnect Logo"
              width={200}
              height={200}
              className="w-auto h-8"
            />
            <span className="ml-2 md:ml-0 lg:ml-2 text-white font-bold text-sm md:text-base lg:text-xl">
              PRO CONNECT
            </span>
          </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 md:space-x-3 lg:space-x-6">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-white text-sm md:text-base hover:text-sky-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-3">
            <button
              onClick={() => router.push("/auth/login")}
              className="px-3 lg:px-4 py-1.5 md:py-2 text-[#00A6E6] bg-white rounded-full hover:bg-sky-50 transition-colors text-sm lg:text-base"
            >
              Log in
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              className="px-3 lg:px-4 py-1.5 md:py-2 text-white bg-[#0081B4] rounded-full hover:bg-[#006A94] transition-colors text-sm lg:text-base"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="block px-3 py-2 text-white hover:bg-sky-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    router.push("/auth/login");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-[#00A6E6] bg-white rounded-full hover:bg-sky-50 transition-colors text-sm"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    router.push("/auth/register");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-white bg-[#0081B4] rounded-full hover:bg-[#006A94] transition-colors text-sm"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header1;