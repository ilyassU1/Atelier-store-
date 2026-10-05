import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/home/section-heading";
import type { Product } from "@/lib/catalog";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="new-arrivals-title" className="section pt-0">
      <div className="shell">
        <SectionHeading
          id="new-arrivals-title"
          eyebrow="New In"
          title="This season's arrivals"
          action={
            <Link href="/collections/new-in" className="eyebrow nav-link">
              View all
            </Link>
          }
        />
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
