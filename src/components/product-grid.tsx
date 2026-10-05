"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product, ProductCategory } from "@/lib/catalog";

// A category slug, or null for every product.
type Filter = string | null;

// Edge-to-edge product grid. Category tabs appear above it when the
// products span more than one category. `eagerCount` is how many leading
// cards sit above the fold and should load their photo immediately.
export function ProductGrid({
  products,
  showCount = false,
  eagerCount = 0,
}: {
  products: Product[];
  showCount?: boolean;
  eagerCount?: number;
}) {
  const [filter, setFilter] = useState<Filter>(null);

  const categories = [
    ...new Map<string, ProductCategory>(
      products.map((product) => [product.category.slug, product.category]),
    ).values(),
  ].sort((a, b) => a.sortOrder - b.sortOrder);
  const filters: { value: Filter; label: string }[] =
    categories.length > 1
      ? [
          { value: null, label: "All" },
          ...categories.map(({ slug, name }) => ({ value: slug, label: name })),
        ]
      : [];
  const visible =
    filter === null
      ? products
      : products.filter((product) => product.category.slug === filter);

  return (
    <>
      {(filters.length > 0 || showCount) && (
        <div className="shell mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
          {filters.length > 0 && (
            <div className="tab-list items-baseline" role="group" aria-label="Filter by category">
              {filters.map((item) => (
                <button
                  key={item.value ?? "all"}
                  type="button"
                  className="tab cursor-pointer hover:text-foreground"
                  aria-current={filter === item.value ? "true" : undefined}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
          {showCount && (
            <p className="caption ml-auto text-muted" role="status">
              {visible.length} {visible.length === 1 ? "piece" : "pieces"}
            </p>
          )}
        </div>
      )}

      <ul className="product-grid mx-auto mt-8 max-w-(--container-max) px-0 md:px-(--gutter)">
        {visible.map((product, index) => (
          <li key={product.slug}>
            <ProductCard
              product={product}
              eager={index < eagerCount}
              sizes="(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 50vw"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
