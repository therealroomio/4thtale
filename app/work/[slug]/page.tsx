import { notFound } from "next/navigation";

// Portfolio work data (sync with main page)
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

export async function generateStaticParams() {
  return WORKS.map((work) => ({
    slug: work.slug,
  }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = WORKS.find((w) => w.slug === params.slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Blank template - content will be added later */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-20">
        <h1 className="text-5xl font-bold">{work.title}</h1>
        <p className="mt-4 text-xl text-neutral-600">{work.year}</p>
      </div>
    </div>
  );
}
