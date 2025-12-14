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
      className={`fixed left-1/2 top-4 z-[var(--z-fixed)] w-[92%] -translate-x-1/2 transition-all duration-300 sm:top-5 sm:w-[90%] md:top-6 md:w-[88%] lg:w-[85%] xl:w-[82%] 2xl:w-[80%] ${
        isScrolled
          ? "bg-white/95 shadow-[var(--shadow-lg)] backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      } rounded-full border border-gray-200`}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-1.5 text-base font-bold tracking-tight transition-opacity hover:opacity-70 sm:gap-2 sm:text-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-xs text-white sm:h-8 sm:w-8 sm:rounded-lg sm:text-sm">
            4T
          </div>
          <span className="hidden sm:inline">4thtale</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 md:flex lg:gap-6 xl:gap-8">
          <a
            href="#"
            className="text-xs font-medium transition-colors hover:text-gray-600 md:text-sm"
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
              className="flex items-center gap-0.5 text-xs font-medium transition-colors hover:text-gray-600 md:gap-1 md:text-sm"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 md:h-4 md:w-4 ${
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
              <div className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 animate-fadeIn md:mt-3 md:w-64">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[var(--shadow-xl)] md:rounded-2xl">
                  <div className="p-1.5 md:p-2">
                    {SERVICES.map((service, index) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className={`block rounded-lg px-3 py-2.5 text-xs font-medium transition-colors hover:bg-gray-100 md:rounded-xl md:px-4 md:py-3 md:text-sm ${
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
            className="text-xs font-medium transition-colors hover:text-gray-600 md:text-sm"
          >
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition-all hover:scale-105 hover:shadow-md md:px-5 md:py-2.5 md:text-sm lg:block"
        >
          Get In Touch
        </a>

        {/* Mobile Menu Button */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 sm:h-9 sm:w-9 md:hidden"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
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
        <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-5 sm:py-4 md:hidden">
          <div className="flex flex-col gap-3 sm:gap-4">
            <a
              href="#"
              className="text-xs font-medium transition-colors hover:text-gray-600 sm:text-sm"
              onClick={() => setIsServicesOpen(false)}
            >
              Home
            </a>

            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                Services
              </span>
              {SERVICES.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block pl-2 text-xs font-medium text-gray-700 transition-colors hover:text-black sm:pl-3 sm:text-sm"
                  onClick={() => setIsServicesOpen(false)}
                >
                  {service.name}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="text-xs font-medium transition-colors hover:text-gray-600 sm:text-sm"
              onClick={() => setIsServicesOpen(false)}
            >
              Contact
            </a>

            <a
              href="#contact"
              className="mt-1 rounded-full bg-black px-5 py-2 text-center text-xs font-medium text-white sm:mt-2 sm:px-6 sm:py-2.5 sm:text-sm"
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
