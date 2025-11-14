'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6"

const socialIcons = [
  {
    icon: <FaInstagram className="w-6 h-6" />,
    alt: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: <FaFacebook className="w-6 h-6" />,
    alt: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: <FaSquareXTwitter className="w-6 h-6" />,
    alt: "Twitter",
    href: "https://twitter.com",
  },
]

const Footer = () => {
  const [year, setYear] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setYear(new Date().getFullYear())
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle email subscription logic here
    console.log('Email submitted:', email)
  }

  return (
    <footer className="w-full bg-[#00A6E6] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation */}
        <nav className="flex justify-end text-[10px] md:text-[16px]">
          <ul className="flex gap-8 text-white">
            <li>
              <Link href="/aboutus" className="hover:opacity-80">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:opacity-80">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/termsofservices" className="hover:opacity-80">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:opacity-80">
                Support
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6">
            {/* Company Name */}
            <h2 className="text-white text-2xl font-bold tracking-wider">
              PRO--CONNECT.COM
            </h2>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80"
                  aria-label={icon.alt}
                >
                  {icon.icon}
                </a>
              ))}
            </div>

            {/* Footer Copyright */}
            <p className="text-white">
              Copyright © {year || "2024"}. All Rights Reserved
            </p>
          </div>

          {/* Email Subscription */}
          <form onSubmit={handleSubmit} className="w-full max-w-md mt-[55px]">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 rounded-md focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end">
            <button
                type="submit"
                className="bg-[#2196E3] mt-5 text-white px-6 py-2 rounded-md hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Subscribe
              </button>
              </div>
          </form>
        </div>

        {/* Developed by DevsUnit - Center Aligned */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white text-center text-sm md:text-base">
            Developed by{' '}
            <a
              href="https://www.devsunit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:opacity-80 transition-opacity duration-200 underline decoration-2 underline-offset-2"
            >
              DevsUnit
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

