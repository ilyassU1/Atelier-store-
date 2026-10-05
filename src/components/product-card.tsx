import { CatalogImage } from "@/components/catalog-image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({
  product,
  sizes,
  eager = false,
}: {
  product: Product;
  sizes: string;
  // Load the photo immediately; set for cards above the fold.
  eager?: boolean;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="product-media relative">
        <CatalogImage
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : undefined}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1 md:left-4 md:top-4">
            {product.badge}
          </span>
        )}
      </div>
      <div className="px-3 pb-8 pt-3 md:px-4 md:pt-4">
        <h3 className="caption">{product.name}</h3>
        <p className="caption mt-1 text-muted">{formatPrice(product.priceCents)}</p>
      </div>
    </Link>
  );
}
