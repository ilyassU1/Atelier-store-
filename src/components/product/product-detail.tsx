import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CatalogImage } from "@/components/catalog-image";
import { AddToBag } from "@/components/product/add-to-bag";
import { StockStatus } from "@/components/product/stock-status";
import { formatPrice, getStockState, type Product } from "@/lib/catalog";

// Product photograph beside its buying panel. The image runs edge to edge on
// small screens, like the product grid; from md up the panel sticks beside
// it while the taller image scrolls.
export function ProductDetail({ product }: { product: Product }) {
  const category = product.category.name;
  const categoryHref = `/collections/${product.category.slug}`;

  return (
    <section aria-labelledby="product-title">
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: category, href: categoryHref },
        ]}
        current={product.name}
      />

      <div className="mx-auto grid max-w-(--container-max) items-start gap-y-8 md:grid-cols-12 md:gap-x-8 md:px-(--gutter)">
        <div className="product-media relative md:col-span-6 md:aspect-[4/5] lg:col-span-7">
          <CatalogImage
            src={product.image.src}
            alt={product.image.alt}
            fill
            preload
            sizes="(min-width: 64rem) 58vw, (min-width: 48rem) 50vw, 100vw"
            className="object-cover"
          />
          {product.badge && (
            <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1 md:left-4 md:top-4">
              {product.badge}
            </span>
          )}
        </div>

        <div className="px-(--gutter) md:sticky md:top-28 md:col-span-6 md:px-0 lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-muted">
            <Link href={categoryHref} className="nav-link">
              {category}
            </Link>
          </p>
          <h1 id="product-title" className="mt-3 text-heading-xl">
            {product.name}
          </h1>
          <p className="mt-4 text-body-lg">{formatPrice(product.priceCents)}</p>

          <div className="mt-6">
            <StockStatus stock={product.stock} />
          </div>
          <div className="mt-6">
            <AddToBag
              key={product.slug}
              productName={product.name}
              soldOut={getStockState(product.stock) === "sold-out"}
            />
          </div>

          <p className="mt-10 max-w-md text-muted">{product.description}</p>

          <h2 className="eyebrow mt-10">Details</h2>
          <ul className="mt-4 border-b">
            {product.details.map((detail) => (
              <li key={detail} className="hairline caption py-3 text-muted">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
