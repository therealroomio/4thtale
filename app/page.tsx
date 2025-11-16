"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const IMAGES = [
  {
    src: "/images/image_1.jpg",
    alt: "Row of classic cars with one lit interior",
  },
  {
    src: "/images/image_2.png",
    alt: "Green Lacoste retail counter with neon signage",
  },
  {
    src: "/images/image_3.jpeg",
    alt: "Stacked posters with graphic typography",
  },
  {
    src: "/images/image_4.png",
    alt: "Bold editorial spread with cyan highlights",
  },
  {
    src: "/images/image_5.jpg",
    alt: "Minimal album cover mockups on a surface",
  },
  {
    src: "/images/image_6.jpeg",
    alt: "Abstract colorful spheres on a dark background",
  },
  { src: "/images/image_7.png", alt: "Gradient editorial cover artwork" },
  {
    src: "/images/image_8.png",
    alt: "Poster wall with blue type compositions",
  },
  { src: "/images/image_9.jpeg", alt: "Bright sample pack cover design" },
];

const HERO_FEATURES = [
  {
    title: "Visual Identity Lab",
    desc: "Material-driven identity systems—palette, type, textures, and signature.",
    image: "/images/image_8.png",
  },
  {
    title: "Covers",
    desc: "Over 250 editorial designs delivered this year.",
    image: "/images/image_9.jpeg",
  },
  {
    title: "Foam Serum Launch",
    desc: "Product CGI across hero, ads, and socials.",
    image: "/images/image_5.jpg",
  },
  {
    title: "Modular Websites",
    desc: "Component-driven builds with responsive grids and subtle motion.",
    image: "/images/image_4.png",
  },
];

const WORKS = [
  { title: "Saucony Run As One", year: "2025", image: "/images/image_6.jpeg" },
  { title: "Jeddah Delta Hotel", year: "2024", image: "/images/image_4.png" },
  { title: "Flow Water", year: "2025", image: "/images/image_5.jpg" },
  { title: "Crocs ComplexCon", year: "2025", image: "/images/image_7.png" },
  { title: "LEGO x Nike", year: "2025", image: "/images/image_2.png" },
  { title: "FIFA World Cup 2026", year: "2024", image: "/images/image_1.jpg" },
];

const SERVICES = [
  {
    number: "01",
    title: "Art Direction",
    desc: "Look, feel, and emotion for brands—every frame deliberate.",
    image: "/images/image_8.png",
    tags: ["Art Direction", "Storytelling", "Brand Identity"],
  },
  {
    number: "02",
    title: "3D Renderings",
    desc: "Immersive 3D worlds that translate strategy into tangible visuals.",
    image: "/images/image_6.jpeg",
    tags: ["3D Rendering", "Modeling", "Installations"],
  },
  {
    number: "03",
    title: "Animation",
    desc: "Motion systems that engage across ads, socials, and product.",
    image: "/images/image_3.jpeg",
    tags: ["Brand Identity", "Animation", "Lighting"],
  },
  {
    number: "04",
    title: "Package & Editorial",
    desc: "Long-form layouts and packaging built to stay beautiful and legible.",
    image: "/images/image_5.jpg",
    tags: ["Magazine Design", "Social Marketing", "Editorial Layouts"],
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

  const items = useMemo(() => [...IMAGES, ...IMAGES], []);

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
      className="rounded-2xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="no-scrollbar relative flex gap-4 overflow-x-scroll rounded-2xl p-4"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {items.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="group relative h-52 w-72 shrink-0 overflow-hidden rounded-xl border border-black/8 bg-neutral-100"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="h-full w-full object-cover"
              draggable={false}
              priority={index < 4}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/70 px-4 py-3 text-xs font-medium uppercase tracking-[0.08em] backdrop-blur">
              <span>Graphic Design</span>
              <span>Toronto</span>
            </div>
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
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:py-20 lg:py-24">
        <header className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
              <span className="rounded-full bg-black px-4 py-2 text-white">
                Mueez Khurshid
              </span>
              <span className="rounded-full border border-black/10 px-4 py-2 text-black">
                Toronto Based Creative
              </span>
              <span className="rounded-full border border-black/10 px-4 py-2 text-black">
                Graphic · 3D · Motion
              </span>
            </div>
            <a
              href="#contact"
              className="hidden rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-black hover:text-white sm:inline-flex"
            >
              Get in touch
            </a>
          </div>
          <div className="reveal-base space-y-6" ref={setRevealRef as any}>
            <h1 className="text-[2.9rem] font-semibold leading-tight sm:text-5xl lg:text-[3.6rem]">
              Creative engineering for thoughtful brands rooted in product and culture.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-700">
              Visual identity, editorial, and 3D-driven campaigns shipped with clarity, pace,
              and systems thinking. Building for founders, cultural spaces, and product teams
              who want work that lasts.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
              >
                See latest work
              </a>
              <a
                href="#services"
                className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
              >
                Services
              </a>
            </div>
          </div>
          <div className="reveal-base grid gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-6 py-5 text-sm font-medium uppercase tracking-[0.12em] text-neutral-700 shadow-inner" ref={setRevealRef as any}>
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <span>Based in</span>
              <span className="text-black">Toronto · EST</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <span>Availability</span>
              <span className="text-black">Feb &amp; Mar 2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Scope</span>
              <span className="text-black">Identity · Motion · Product</span>
            </div>
          </div>
        </header>

        <section className="reveal-base space-y-6" ref={setRevealRef as any}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Selected visuals
              </p>
              <h2 className="text-2xl font-semibold text-black">
                Scroll, hover, or drag to explore.
              </h2>
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-600">
              Infinite gallery
            </span>
          </div>
          <MarqueeStrip />
        </section>

        <section className="reveal-base grid gap-6" ref={setRevealRef as any}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Highlights
              </p>
              <h3 className="text-2xl font-semibold text-black">Identity lab</h3>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {HERO_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group grid gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:grid-cols-[140px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 40vw, 160px"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-semibold">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-neutral-700">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-base space-y-6" id="work" ref={setRevealRef as any}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Work
              </p>
              <h3 className="text-2xl font-semibold text-black">Latest work</h3>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
                Design exploration, brand innovation, and crafted experiences that blur physical and digital.
              </p>
            </div>
            <a
              className="hidden rounded-full border border-black px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white sm:inline-flex"
              href="#contact"
            >
              See all work
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {WORKS.map((work) => (
              <div
                key={work.title}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    priority={work.title === "Saucony Run As One"}
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold">
                  <span>{work.title}</span>
                  <span className="text-neutral-500">{work.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-base space-y-10" id="services" ref={setRevealRef as any}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Services
              </p>
              <h3 className="text-2xl font-semibold text-black">What I do</h3>
            </div>
            <a
              href="#contact"
              className="text-sm font-semibold underline underline-offset-4"
            >
              Book a project
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_14px_34px_rgba(0,0,0,0.05)] sm:grid-cols-[220px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 sm:aspect-[4/5]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 40vw, 220px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600">
                    <span>{service.number}</span>
                    <span className="h-px w-10 bg-neutral-300" />
                    <span>{service.title}</span>
                  </div>
                  <p className="text-base leading-relaxed text-neutral-800">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 px-3 py-1"
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

        <section className="reveal-base grid gap-10 lg:grid-cols-[1.1fr_1fr]" ref={setRevealRef as any}>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              About
            </p>
            <h3 className="text-3xl font-semibold text-black">Mueez Khurshid</h3>
            <p className="text-lg leading-relaxed text-neutral-700">
              Professional designer with a decade of experience across experiential design,
              architecture, and digital worlds. Building calm, high-impact visuals through
              systems, motion, and material-driven details.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "10+ years design & digital experience",
                "100+ successful projects delivered",
                "40+ brands & startups supported",
                "Fire drills solved when teams needed it most",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src="/images/image_2.png"
                alt="Studio portrait"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
              {["Toronto", "Worldwide", "Remote", "In-Person"].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-black/10 bg-white px-3 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.05)]"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="reveal-base rounded-3xl border border-black/10 bg-black px-6 py-10 text-white"
          ref={setRevealRef as any}
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                Contact
              </p>
              <h3 className="text-3xl font-semibold">
                Let's build the next campaign, product, or identity.
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-white/80">
                Fast collaboration, deliberate visuals, and production-ready assets that
                keep your team moving.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <a
                href="mailto:hello@mueez.studio"
                className="rounded-full bg-white px-6 py-3 text-black transition hover:-translate-y-0.5"
              >
                hello@mueez.studio
              </a>
              <div className="text-white/80">
                Toronto, Ontario · Canada
                <br />
                Available worldwide
              </div>
              <div className="flex gap-3">
                <a
                  href="https://www.behance.net/mueezkh"
                  className="underline underline-offset-4 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Behance
                </a>
                <a
                  href="https://www.instagram.com/4thtale/"
                  className="underline underline-offset-4 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
