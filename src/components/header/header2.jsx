"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  MessageSquareText,
  ChevronDown,
  Bell,
} from "lucide-react";
import Cookies from "js-cookie";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Header2 = ({ firstName, profilePicture, userType }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Projects",
      href: userType === "individual" ? "/dashboard/individual" : "/projects",
    },
    { name: "Community", href: "/community" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    document.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  return (
    <header className="bg-[#00A6E6] w-full">
      <div className="max-w-[90%] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href={"/"}>
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

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-3">
            {/* <button
              className="p-2 text-white hover:text-sky-100 transition-colors"
               onClick={() => router.push('/paymentpage')}
            >
              {planName}
            </button> */}
            <button
              onClick={() => router.push("/dashboard/craftsman")}
              className="flex items-center   text-white hover:bg-sky-600 rounded-md"
            >
              <MessageSquareText className="h-5 w-5 mr-2" />
              
            </button>
            <button
              onClick={() => router.push("/chat")}
              className="flex items-center   text-white hover:bg-sky-600 rounded-md"
            >
              <Bell className="h-5 w-5 mr-2" />
              
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 p-2 text-white hover:text-sky-100 transition-colors">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="h-[48px] w-[48px] rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6" />
                )}
                <span>{firstName}</span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-[#ffffff] rounded-md shadow-lg border border-gray-300"
                style={{
                  zIndex: 1000,
                  marginTop: "8px",
                }}
              >
                <DropdownMenuItem
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#27AAE2]"
                  onClick={() => router.push("/profile")}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#27AAE2]"
                  onClick={() => {
                    const route =
                      userType === "individual"
                        ? "/dashboard/individual"
                        : "/dashboard/craftsman";
                    router.push(route);
                  }}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#27AAE2]"
                  onClick={() => router.push("/feedback")}
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Feedback
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#27AAE2]"
                  onClick={() => router.push("/profile/settings")}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 border-t border-gray-200" />
                <DropdownMenuItem
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#27AAE2]"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
                  onClick={() => router.push("/chat")}
                  className="flex items-center w-full px-3 py-2 text-white hover:bg-sky-600 rounded-md"
                >
                  <MessageSquareText className="h-5 w-5 mr-2" />
                  Chat
                </button>
                <button
                  onClick={() => router.push("/profile")}
                  className="flex items-center w-full px-3 py-2 text-white hover:bg-sky-600 rounded-md"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    const route =
                      userType === "individual"
                        ? "/dashboard/individual"
                        : "/dashboard/craftsman";
                    router.push(route);
                  }}
                  className="flex items-center w-full px-3 py-2 text-white hover:bg-sky-600 rounded-md"
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => router.push("/profile/settings")}
                  className="flex items-center w-full px-3 py-2 text-white hover:bg-sky-600 rounded-md"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-white hover:bg-sky-600 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header2;
