"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/home/section-heading";
import type { Product } from "@/lib/catalog";

// Horizontally scrolling product row. Touch/trackpad scroll with snap
// everywhere; arrow buttons for pointer users from md up.
export function ProductRail({
  eyebrow,
  title,
  href,
  products,
}: {
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="rail-title" className="section">
      <div className="shell">
        <SectionHeading
          id="rail-title"
          eyebrow={eyebrow}
          title={title}
          action={
            <div className="flex items-center gap-6">
              <Link href={href} className="eyebrow nav-link">
                Shop all
              </Link>
              <div className="hidden gap-2 md:flex">
                <button
                  type="button"
                  aria-label="Scroll left"
                  className="btn btn-secondary p-3"
                  onClick={() => scroll(-1)}
                >
                  <ArrowLeftIcon width={16} height={16} />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  className="btn btn-secondary p-3"
                  onClick={() => scroll(1)}
                >
                  <ArrowRightIcon width={16} height={16} />
                </button>
              </div>
            </div>
          }
        />
      </div>

      <ul
        ref={trackRef}
        className="mx-auto mt-10 flex max-w-(--container-max) snap-x snap-mandatory scroll-px-(--gutter) gap-2 overflow-x-auto px-(--gutter) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <li
            key={product.slug}
            className="w-[72%] shrink-0 snap-start sm:w-[42%] md:w-[31%] xl:w-[calc(25%-0.375rem)]"
          >
            <ProductCard
              product={product}
              sizes="(min-width: 80rem) 25vw, (min-width: 48rem) 31vw, (min-width: 40rem) 42vw, 72vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
