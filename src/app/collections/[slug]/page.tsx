import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { ServicesStrip } from "@/components/home/services-strip";
import { ProductGrid } from "@/components/product-grid";
import {
  getCategory,
  getCategoryProducts,
  getCategorySlugs,
} from "@/lib/products";

export const revalidate = 60;

export function generateStaticParams() {
  return getCategorySlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};

  return { title: category.name, description: category.description };
}

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  return (
    <main>
      <section aria-labelledby="collection-title" className="section pt-0">
        <Breadcrumb
          trail={[{ label: "Home", href: "/" }]}
          current={category.name}
        />
        <div className="shell pt-6 md:pt-10">
          <p className="eyebrow text-muted">Collection</p>
          <h1 id="collection-title" className="mt-3 text-display">
            {category.name}
          </h1>
          <p className="mt-4 max-w-md text-body-lg text-muted">
            {category.description}
          </p>
        </div>

        <ProductGrid
          key={slug}
          products={await getCategoryProducts(slug)}
          showCount
          eagerCount={4}
        />
      </section>
      <ServicesStrip />
    </main>
  );
}
