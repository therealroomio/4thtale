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
      onMouseLeave={() => setIsHovered(false)}>
      <div
        ref={containerRef}
        className="no-scrollbar relative flex gap-4 overflow-x-scroll rounded-2xl p-4"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}>
        {items.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="group relative h-52 w-72 shrink-0 overflow-hidden rounded-xl border border-black/8 bg-neutral-100">
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
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:py-20 lg:py-24">
        <header className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium uppercase tracking-[0.14em]">
            <span className="rounded-full bg-black px-4 py-2 text-white">
              Mueez Khurshid
            </span>
            <span className="rounded-full border border-black/10 px-4 py-2 text-black">
              Graphic Designer · Toronto
            </span>
            <span className="rounded-full border border-black/10 px-4 py-2 text-black">
              Brand Identity · Editorial · Digital
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight text-black sm:text-5xl lg:text-6xl">
                Graphic design that balances calm minimalism with deliberate
                impact.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-700">
                Mueez builds visual systems, brand identities, and editorial
                experiences that stay current without feeling trendy. Currently
                crafting for founders, cultural spaces, and product teams across
                Toronto and beyond.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                  View selected work
                </a>
                <a
                  href="mailto:hello@mueez.studio"
                  className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white">
                  Book a project call
                </a>
              </div>
            </div>
            <div className="grid gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-6 py-5 text-sm font-medium uppercase tracking-[0.12em] text-neutral-700 shadow-inner">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span>Based in</span>
                <span className="text-black">Toronto · EST</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span>Availability</span>
                <span className="text-black">Feb & Mar 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Services</span>
                <span className="text-black">
                  Identity · Campaign · Product
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-6" id="work">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Selected visuals
              </p>
              <h2 className="text-2xl font-semibold text-black">
                Scroll, hover, or drag to explore. Built for motion.
              </h2>
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-600">
              Infinite gallery
            </span>
          </div>
          <MarqueeStrip />
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              About
            </p>
            <h3 className="text-3xl font-semibold text-black">
              Mueez designs identities that work across print, product, and
              environments.
            </h3>
            <p className="text-lg leading-relaxed text-neutral-700">
              He pairs calm, white-space-first layouts with sharp typography and
              adaptable grids. Tight collaboration, quick iterations, and
              production-ready files keep teams moving fast while guarding
              visual consistency.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Brand Systems",
                "Editorial & Catalogue",
                "Digital Product UI",
                "Campaign Art Direction",
                "Design Ops & Guidelines",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-neutral-50 px-4 py-2 text-sm font-semibold text-black">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
            <h4 className="text-base font-semibold uppercase tracking-[0.12em] text-neutral-600">
              Approach
            </h4>
            <ol className="flex flex-col gap-3 text-base leading-relaxed text-neutral-800">
              <li>
                01 · Discovery sessions to clarify voice, audience, and visual
                references.
              </li>
              <li>
                02 · Rapid sketches and moodframes that translate strategy into
                tangible directions.
              </li>
              <li>
                03 · Systems-first rollout: typography, grids, motion rules, and
                production-ready assets.
              </li>
              <li>
                04 · Handover with toolkits, templates, and usage guidelines for
                internal teams.
              </li>
            </ol>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Services & formats
              </p>
              <h3 className="text-2xl font-semibold text-black">
                Built to ship fast, last longer, and stay consistent.
              </h3>
            </div>
            <a
              href="mailto:hello@mueez.studio"
              className="text-sm font-semibold underline underline-offset-4">
              Request a fit call
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Identity & Logo Systems",
                desc: "Core marks, typographic pairings, grids, and launch-ready brand kits.",
              },
              {
                title: "Editorial & Campaign",
                desc: "Art direction, layout, and print-ready files for lookbooks and catalogs.",
              },
              {
                title: "Digital Product Design",
                desc: "UI systems, component libraries, and motion guidance for product teams.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-neutral-50 p-5 text-neutral-800">
                <h4 className="text-lg font-semibold text-black">
                  {card.title}
                </h4>
                <p className="text-sm leading-relaxed text-neutral-700">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            <span>Trusted by founders, studios, and cultural teams</span>
            <span className="h-px w-10 bg-neutral-300" />
            <span>Available worldwide</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Art-led retail & pop-up identities",
              "Album and cover design with motion variants",
              "Brand toolkits for SaaS launches",
              "Visual direction for gallery events",
              "Pitch decks aligned to refreshed brand systems",
              "Print-ready lookbooks with tactile finishes",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-white p-4 text-sm font-semibold leading-relaxed text-neutral-800 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-black/10 bg-black px-6 py-10 text-white">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                Next project
              </p>
              <h3 className="text-3xl font-semibold">
                Let&apos;s shape a visual system that feels inevitable.
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-white/80">
                Whether it&apos;s a full identity refresh or a focused campaign,
                Mueez delivers clear direction, fast iterations, and assets your
                team can deploy immediately.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <a
                href="mailto:hello@mueez.studio"
                className="rounded-full bg-white px-6 py-3 text-black transition hover:-translate-y-0.5">
                hello@mueez.studio
              </a>
              <a
                href="https://mueez.framer.website/"
                className="text-white/80 underline underline-offset-4 hover:text-white"
                target="_blank"
                rel="noreferrer">
                View legacy portfolio ↗
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
