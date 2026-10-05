import "server-only";

import { and, desc, eq, exists, ne, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { cache } from "react";
import { db } from "@/db";
import { category, product, productCategory } from "@/db/schema";
import type { Product } from "@/lib/catalog";

// Products with their primary category, shaped as the storefront's `Product`.
function selectProducts() {
  return db
    .select({
      slug: product.slug,
      name: product.name,
      category: {
        slug: category.slug,
        name: category.name,
        sortOrder: category.sortOrder,
      },
      priceCents: product.priceCents,
      stock: product.stock,
      image: { src: product.imageUrl, alt: product.imageAlt },
      badge: product.badge,
      description: product.description,
      details: product.details,
    })
    .from(product)
    .innerJoin(category, eq(product.categoryId, category.id));
}

// `cache` dedupes the lookup between generateMetadata and the page.
export const getProduct = cache(
  async (slug: string): Promise<Product | undefined> => {
    const [row] = await selectProducts().where(eq(product.slug, slug)).limit(1);
    return row;
  },
);

export async function getProductSlugs() {
  return db.select({ slug: product.slug }).from(product).orderBy(product.id);
}

// Other products to suggest alongside one: its own category first, then the
// rest of the catalog.
export async function getRelatedProducts(
  current: Product,
  limit = 8,
): Promise<Product[]> {
  return selectProducts()
    .where(ne(product.slug, current.slug))
    .orderBy(desc(eq(category.slug, current.category.slug)), product.id)
    .limit(limit);
}

export const getCategory = cache(async (slug: string) => {
  const [row] = await db
    .select({
      slug: category.slug,
      name: category.name,
      description: category.description,
    })
    .from(category)
    .where(eq(category.slug, slug))
    .limit(1);
  return row;
});

export async function getCategorySlugs() {
  return db
    .select({ slug: category.slug })
    .from(category)
    .orderBy(category.sortOrder);
}

// Every product whose primary category is the listing, plus the products
// filed under it through product_category.
export async function getCategoryProducts(
  slug: string,
  limit?: number,
): Promise<Product[]> {
  const listing = alias(category, "listing");
  const query = selectProducts()
    .where(
      or(
        eq(category.slug, slug),
        exists(
          db
            .select({ one: sql`1` })
            .from(productCategory)
            .innerJoin(listing, eq(productCategory.categoryId, listing.id))
            .where(
              and(
                eq(productCategory.productId, product.id),
                eq(listing.slug, slug),
              ),
            ),
        ),
      ),
    )
    .orderBy(product.id);
  return limit === undefined ? query : query.limit(limit);
}
