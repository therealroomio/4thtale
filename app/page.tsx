"use client";

import Image from "next/image";
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
  },
  {
    title: "Jeddah Delta Hotel",
    year: "2024",
    image: "/images/image_24.png",
  },
  { title: "Flow Water", year: "2025", image: "/images/image_37.png" },
  {
    title: "Crocs ComplexCon",
    year: "2025",
    image: "/images/image_21.gif",
  },
  { title: "LEGO x Nike", year: "2025", image: "/images/image_22.gif" },
  {
    title: "FIFA World Cup 2026",
    year: "2024",
    image: "/images/image_25.png",
  },
  {
    title: "Lacoste Melrose",
    year: "2024",
    image: "/images/image_31.png",
  },
  {
    title: "CUBE Exchange",
    year: "2025",
    image: "/images/image_23.gif",
  },
  {
    title: "Group Therapy",
    year: "2025",
    image: "/images/image_30.png",
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
  const dragState = useRef({ startX: 0, scrollLeft: 0, pointerId: 0 });

  const items = useMemo(
    () => [...MARQUEE_IMAGES, ...MARQUEE_IMAGES],
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: number;
    const speed = 0.6;

    const tick = () => {
      const el = containerRef.current;
      if (el && !isHovered && !isDragging) {
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
  }, [isDragging, isHovered]);

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
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-24 sm:gap-20 sm:px-6 md:gap-24 lg:px-20 lg:py-32">
        {/* Hero Section */}
        <header className="reveal-base flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center sm:min-h-[70vh] sm:gap-8" ref={setRevealRef as any}>
          <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Mueez Khurshid
          </h1>
          <h2 className="text-2xl font-normal sm:text-3xl md:text-4xl lg:text-5xl">
            Toronto Based Creative
          </h2>
          <a
            href="#contact"
            className="group mt-2 inline-flex items-center gap-2 text-base font-medium underline underline-offset-4 transition-transform hover:-translate-y-0.5 sm:mt-4 sm:text-lg"
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
        <section className="reveal-base space-y-8 sm:space-y-12" ref={setRevealRef as any}>
          <h3 className="px-4 text-center text-base font-normal text-neutral-700 sm:text-lg lg:text-xl">
            Over 100 design projects created for top brands including
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-60 grayscale sm:gap-8 lg:gap-12">
            {BRAND_LOGOS.map((logo, index) => (
              <div key={index} className="relative h-8 w-20 sm:h-10 sm:w-24">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 80px, 100px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Latest Work Section */}
        <section className="reveal-base space-y-6 sm:space-y-8" id="work" ref={setRevealRef as any}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
              • Work
            </p>
            <h3 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              Latest work
            </h3>
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              Dive into my most recent work — a mix of design exploration,
              brand innovation, and 3D crafted experiences that blur the lines
              between physical and digital.
            </p>
            <a
              href="#contact"
              className="group mt-1 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 underline underline-offset-4 sm:mt-2 sm:text-base"
            >
              See all latest work
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {WORKS.map((work) => (
              <div
                key={work.title}
                className="group overflow-hidden rounded-xl bg-white transition-transform duration-200 hover:-translate-y-1 sm:rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-4 text-sm font-semibold sm:px-5 sm:py-5 sm:text-base">
                  <span>{work.title}</span>
                  <span className="text-neutral-500">{work.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="reveal-base space-y-8 sm:space-y-10" id="services" ref={setRevealRef as any}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
                • Services
              </p>
              <h3 className="text-3xl font-bold sm:text-4xl md:text-5xl">What I Do</h3>
            </div>
          </div>
          <div className="grid gap-10 sm:gap-12 lg:gap-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={`grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100 sm:rounded-2xl ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 sm:gap-3 sm:text-sm">
                    <span>{service.number}</span>
                    <span className="h-px w-8 bg-neutral-300 sm:w-10" />
                    <span>{service.title}</span>
                  </div>
                  <p className="text-lg leading-relaxed text-neutral-800 sm:text-xl lg:text-2xl">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-600 sm:text-sm">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-300 px-3 py-1.5 sm:px-4 sm:py-2"
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
        <section className="reveal-base space-y-8 sm:space-y-12" ref={setRevealRef as any}>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
              • About Me
            </p>
            <h3 className="mt-3 text-3xl font-bold sm:mt-4 sm:text-4xl md:text-5xl">
              Mueez Khurshid
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 sm:mt-6 sm:text-lg">
              Professional designer with 10+ years of experience leading teams
              across experiential design, architecture, and digital worlds.
            </p>
          </div>
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-xl bg-black sm:rounded-2xl">
            <Image
              src="/images/image_34.png"
              alt="Mueez Khurshid portrait"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "10+", label: "Years of Design and Digital Experience." },
              { number: "100+", label: "Successful projects with well known clients." },
              { number: "30+", label: "Brands and startups that trusted me to shape their identity." },
              { number: "900+", label: "Fire's put out when clients needed it most." },
            ].map((stat, index) => (
              <div
                key={index}
                className="space-y-2 text-center"
              >
                <div className="text-4xl font-bold sm:text-5xl lg:text-6xl">
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
        <footer id="contact" className="reveal-base space-y-6 border-t border-neutral-200 pt-8 sm:space-y-8 sm:pt-12" ref={setRevealRef as any}>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base font-medium text-neutral-700 sm:text-lg">
                Creative engineering for thoughtful brands
              </h4>
              <div className="space-y-1 text-sm text-neutral-600 sm:space-y-2">
                <p>Toronto Ontario, Canada</p>
                <a
                  href="mailto:mueez.kh@gmail.com"
                  className="block font-medium text-black hover:underline"
                >
                  mueez.kh@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 lg:items-end">
              <div className="flex flex-wrap gap-4 sm:gap-6">
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
              <div className="flex gap-3 sm:gap-4">
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
