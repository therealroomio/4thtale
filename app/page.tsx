"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./Navbar";

// Marquee strip images
const MARQUEE_IMAGES = [
  { src: "/images/image_33.png", alt: "Palm Angels storefront" },
  { src: "/images/image_24.png", alt: "Jeddah modern building" },
  { src: "/images/image_6.jpeg", alt: "Nike sneakers with flowers" },
  { src: "/images/image_7.png", alt: "Xbox with gradient lighting" },
  { src: "/images/image_3.jpeg", alt: "Purple transparent chair" },
  { src: "/images/image_26.png", alt: "Lacoste green installation" },
  { src: "/images/image_4.png", alt: "Dark moody product shot" },
];

// Brand logos
const BRAND_LOGOS = [
  { src: "/images/logo1.png", alt: "Pepsi" },
  { src: "/images/logo2.png", alt: "Converse" },
  { src: "/images/logo3.png", alt: "FIFA" },
  { src: "/images/logo4.png", alt: "Innisfree" },
  { src: "/images/logo5.png", alt: "Nike" },
  { src: "/images/logo6.png", alt: "Adidas" },
  { src: "/images/logo7.png", alt: "Puma" },
  { src: "/images/logo8.png", alt: "Zara" },
  { src: "/images/logo9.png", alt: "Brand" },
];

// Latest work projects
const WORKS = [
  {
    title: "Saucony Run As One",
    year: "2025",
    image: "/images/image_19.gif",
    slug: "saucony-run-as-one",
  },
  {
    title: "Jeddah Delta Hotel",
    year: "2024",
    image: "/images/image_24.png",
    slug: "jeddah-delta-hotel",
  },
  {
    title: "Flow Water",
    year: "2025",
    image: "/images/image_37.png",
    slug: "flow-water",
  },
  {
    title: "Crocs ComplexCon",
    year: "2025",
    image: "/images/image_21.gif",
    slug: "crocs-complexcon",
  },
  {
    title: "LEGO x Nike",
    year: "2025",
    image: "/images/image_22.gif",
    slug: "lego-x-nike",
  },
  {
    title: "FIFA World Cup 2026",
    year: "2024",
    image: "/images/image_25.png",
    slug: "fifa-world-cup-2026",
  },
  {
    title: "Lacoste Melrose",
    year: "2024",
    image: "/images/image_31.png",
    slug: "lacoste-melrose",
  },
  {
    title: "CUBE Exchange",
    year: "2025",
    image: "/images/image_23.gif",
    slug: "cube-exchange",
  },
  {
    title: "Group Therapy",
    year: "2025",
    image: "/images/image_30.png",
    slug: "group-therapy",
  },
];

// Services
const SERVICES = [
  {
    number: "01",
    title: "Art Direction",
    desc: "Helping direct the look, feel, and emotion of your brand. Every frame, every detail, purposefully designed.",
    image: "/images/image_33.png",
    tags: ["Art Direction", "Story Telling", "Brand Identity"],
  },
  {
    number: "02",
    title: "3D Renderings",
    desc: "Transforming concepts into immersive 3D worlds that feel tangible, emotive, and built to tell a story.",
    image: "/images/image_27.png",
    tags: ["3D Rendering", "3D Modeling", "Physical Installations"],
  },
  {
    number: "03",
    title: "Animations",
    desc: "Motion systems that engage across ads, socials, and product.",
    image: "/images/image_3.jpeg",
    tags: ["Brand Identity", "Animation", "Lighting"],
  },
];

function useReveal() {
  const refs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return setRef;
}

function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);
  const dragState = useRef({ startX: 0, scrollLeft: 0, pointerId: 0 });

  const items = useMemo(
    () => [...MARQUEE_IMAGES, ...MARQUEE_IMAGES],
    []
  );

  // Detect if device supports hover (desktop) vs touch-only (mobile)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsHover(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: number;
    const speed = 0.6;

    const tick = () => {
      const el = containerRef.current;
      // On mobile (no hover support), only pause during dragging
      // On desktop (hover support), pause on both hover and dragging
      const shouldPause = isDragging || (supportsHover && isHovered);
      if (el && !shouldPause) {
        el.scrollLeft += speed;
        const midpoint = el.scrollWidth / 2;
        if (el.scrollLeft >= midpoint) {
          el.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isDragging, isHovered, supportsHover]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    dragState.current = {
      startX: event.clientX,
      scrollLeft: containerRef.current.scrollLeft,
      pointerId: event.pointerId,
    };
    containerRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const dx = event.clientX - dragState.current.startX;
    containerRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const endDrag = () => {
    if (!isDragging || !containerRef.current) return;
    containerRef.current.releasePointerCapture(dragState.current.pointerId);
    setIsDragging(false);
  };

  return (
    <div
      className="overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="no-scrollbar flex gap-4 overflow-x-scroll"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {items.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="group relative h-48 w-64 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-56 sm:w-72 md:h-64 md:w-80 md:rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
              className="h-full w-full object-cover"
              draggable={false}
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const setRevealRef = useReveal();

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="flex w-full flex-col gap-12 px-4 py-20 sm:gap-16 sm:px-6 md:gap-20 md:px-8 lg:gap-24 lg:px-12 xl:gap-28 xl:px-16 2xl:px-20">
        {/* Hero Section */}
        <header className="reveal-base flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-4 text-center sm:min-h-[70vh] sm:gap-6 md:gap-8" ref={setRevealRef as any}>
          <h1 className="w-full text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem]">
            Mueez Khurshid
          </h1>
          <h2 className="w-full text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Toronto Based Creative
          </h2>
          <a
            href="#contact"
            className="group mt-2 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-transform hover:-translate-y-0.5 sm:mt-4 sm:text-base md:text-lg"
          >
            Get In Touch
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </header>

        {/* Marquee Strip Section */}
        <section className="reveal-base space-y-6" ref={setRevealRef as any}>
          <MarqueeStrip />
        </section>

        {/* Brand Logos Section */}
        <section className="reveal-base w-full space-y-6 sm:space-y-8 md:space-y-10" ref={setRevealRef as any}>
          <h3 className="w-full text-center text-sm font-normal text-neutral-700 sm:text-base md:text-lg lg:text-xl">
            Over 100 design projects created for top brands including
          </h3>
          <div className="flex w-full flex-wrap items-center justify-center gap-4 opacity-60 grayscale sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {BRAND_LOGOS.map((logo, index) => (
              <div key={index} className="relative h-6 w-16 sm:h-8 sm:w-20 md:h-10 md:w-24 lg:h-12 lg:w-28">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Latest Work Section */}
        <section className="reveal-base w-full space-y-5 sm:space-y-6 md:space-y-8" id="work" ref={setRevealRef as any}>
          <div className="flex w-full flex-col gap-2 sm:gap-3 md:gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
              • Work
            </p>
            <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem]">
              Latest work
            </h3>
            <p className="w-full text-sm leading-relaxed text-neutral-700 sm:text-base md:text-lg lg:max-w-4xl">
              Dive into my most recent work — a mix of design exploration,
              brand innovation, and 3D crafted experiences that blur the lines
              between physical and digital.
            </p>
            <a
              href="#contact"
              className="group mt-1 inline-flex items-center gap-2 text-xs font-medium text-neutral-700 underline underline-offset-4 sm:mt-2 sm:text-sm md:text-base"
            >
              See all latest work
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
          <div className="grid w-full gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-8">
            {WORKS.map((work) => (
              <Link
                key={work.title}
                href={`/work/${work.slug}`}
                className="group w-full overflow-hidden rounded-lg bg-white transition-transform duration-200 hover:-translate-y-1 sm:rounded-xl md:rounded-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex w-full items-center justify-between px-3 py-3 text-xs font-semibold sm:px-4 sm:py-4 sm:text-sm md:px-5 md:py-5 md:text-base">
                  <span>{work.title}</span>
                  <span className="text-neutral-500">{work.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="reveal-base w-full space-y-6 sm:space-y-8 md:space-y-10" id="services" ref={setRevealRef as any}>
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
                • Services
              </p>
              <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">What I Do</h3>
            </div>
          </div>
          <div className="grid w-full gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={`grid w-full gap-5 sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12 ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-100 sm:rounded-xl md:rounded-2xl ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-col justify-center gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 sm:gap-3 sm:text-sm">
                    <span>{service.number}</span>
                    <span className="h-px w-6 bg-neutral-300 sm:w-8 md:w-10" />
                    <span>{service.title}</span>
                  </div>
                  <p className="text-base leading-relaxed text-neutral-800 sm:text-lg md:text-xl lg:text-2xl">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-600 sm:gap-2 sm:text-sm">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-300 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Me Section */}
        <section className="reveal-base w-full space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12" ref={setRevealRef as any}>
          <div className="w-full text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
              • About Me
            </p>
            <h3 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl md:mt-4 md:text-4xl lg:text-5xl">
              Mueez Khurshid
            </h3>
            <p className="mx-auto mt-3 w-full text-sm leading-relaxed text-neutral-700 sm:mt-4 sm:text-base md:mt-6 md:text-lg lg:max-w-4xl">
              Professional designer with 10+ years of experience leading teams
              across experiential design, architecture, and digital worlds.
            </p>
          </div>
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-lg bg-black sm:rounded-xl md:rounded-2xl lg:max-w-6xl">
            <Image
              src="/images/image_34.png"
              alt="Mueez Khurshid portrait"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
            {[
              { number: "10+", label: "Years of Design and Digital Experience." },
              { number: "100+", label: "Successful projects with well known clients." },
              { number: "30+", label: "Brands and startups that trusted me to shape their identity." },
              { number: "900+", label: "Fire's put out when clients needed it most." },
            ].map((stat, index) => (
              <div
                key={index}
                className="space-y-1.5 text-center sm:space-y-2"
              >
                <div className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                  {stat.number}
                </div>
                <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="reveal-base w-full space-y-5 border-t border-neutral-200 pt-6 sm:space-y-6 sm:pt-8 md:space-y-8 md:pt-10 lg:pt-12" ref={setRevealRef as any}>
          <div className="grid w-full gap-5 sm:gap-6 md:gap-8 lg:grid-cols-2">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h4 className="text-sm font-medium text-neutral-700 sm:text-base md:text-lg">
                Creative engineering for thoughtful brands
              </h4>
              <div className="space-y-1 text-xs text-neutral-600 sm:space-y-1.5 sm:text-sm">
                <p>Toronto Ontario, Canada</p>
                <a
                  href="mailto:mueez.kh@gmail.com"
                  className="block font-medium text-black hover:underline"
                >
                  mueez.kh@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4 lg:items-end">
              <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
                <a
                  href="#"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  About
                </a>
                <a
                  href="#work"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  Works
                </a>
                <a
                  href="#contact"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  Privacy policy
                </a>
              </div>
              <div className="flex gap-2.5 sm:gap-3 md:gap-4">
                <a
                  href="https://www.behance.net/mueezkh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  Behance
                </a>
                <a
                  href="https://www.instagram.com/4thtale/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  Instagram
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium hover:underline sm:text-sm"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
