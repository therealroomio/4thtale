"use client";

import { useEffect, useState } from "react";

const SERVICES = [
  { name: "Art Direction", href: "#services" },
  { name: "3D Rendering & Modeling", href: "#services" },
  { name: "Animation & Motion", href: "#services" },
  { name: "Brand Identity", href: "#services" },
  { name: "Physical Installations", href: "#services" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-6 z-[var(--z-fixed)] w-[95%] max-w-6xl -translate-x-1/2 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-[var(--shadow-lg)] backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      } rounded-full border border-gray-200`}
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight transition-opacity hover:opacity-70"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            4T
          </div>
          <span className="hidden sm:inline">4thtale</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-sm font-medium transition-colors hover:text-gray-600"
          >
            Home
          </a>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-gray-600"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 animate-fadeIn">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[var(--shadow-xl)]">
                  <div className="p-2">
                    {SERVICES.map((service, index) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 ${
                          index !== SERVICES.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-gray-600"
          >
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-md lg:block"
        >
          Get In Touch
        </a>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 md:hidden"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isServicesOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isServicesOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-gray-600"
              onClick={() => setIsServicesOpen(false)}
            >
              Home
            </a>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Services
              </span>
              {SERVICES.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block pl-3 text-sm font-medium text-gray-700 transition-colors hover:text-black"
                  onClick={() => setIsServicesOpen(false)}
                >
                  {service.name}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-gray-600"
              onClick={() => setIsServicesOpen(false)}
            >
              Contact
            </a>

            <a
              href="#contact"
              className="mt-2 rounded-full bg-black px-6 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => setIsServicesOpen(false)}
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
