import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductRail } from "@/components/home/product-rail";
import { ServicesStrip } from "@/components/home/services-strip";
import { ProductDetail } from "@/components/product/product-detail";
import {
  getProduct,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/products";

export const revalidate = 60;

export function generateStaticParams() {
  return getProductSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <main>
      <ProductDetail product={product} />
      <ProductRail
        eyebrow="More to discover"
        title="You may also like"
        href={`/collections/${product.category.slug}`}
        products={await getRelatedProducts(product)}
      />
      <ServicesStrip />
    </main>
  );
}
