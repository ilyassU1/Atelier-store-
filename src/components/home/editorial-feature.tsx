import { CatalogImage } from "@/components/catalog-image";
import Link from "next/link";
import { outerwearFeature } from "@/lib/catalog";

// Asymmetric magazine-style spread: a dominant image, with copy and a
// smaller detail shot in the opposite column.
export function EditorialFeature() {
  const [main, detail] = outerwearFeature.images;

  return (
    <section aria-labelledby="feature-title" className="section hairline">
      <div className="shell grid items-center gap-10 md:grid-cols-12 md:gap-8">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted md:col-span-6 lg:col-span-7 lg:aspect-square">
          <CatalogImage
            src={main.src}
            alt={main.alt}
            fill
            sizes="(min-width: 64rem) 58vw, (min-width: 48rem) 50vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>

        <div className="flex flex-col md:col-span-6 lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-muted">{outerwearFeature.eyebrow}</p>
          <h2 id="feature-title" className="mt-3 text-heading-xl">
            {outerwearFeature.title}
          </h2>
          <p className="mt-5 max-w-sm text-body-lg text-muted">
            {outerwearFeature.body}
          </p>
          <div className="mt-8">
            <Link href={outerwearFeature.href} className="btn btn-secondary">
              Discover the edit
            </Link>
          </div>
          <div className="relative mt-14 hidden aspect-[3/4] w-1/2 self-end overflow-hidden bg-surface-muted lg:block">
            <CatalogImage
              src={detail.src}
              alt={detail.alt}
              fill
              sizes="17vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
