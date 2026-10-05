import { CatalogImage } from "@/components/catalog-image";
import Link from "next/link";
import { collections } from "@/lib/catalog";
import { SectionHeading } from "@/components/home/section-heading";

export function CollectionTiles() {
  return (
    <section aria-labelledby="collections-title" className="section">
      <div className="shell">
        <SectionHeading
          id="collections-title"
          eyebrow="Collections"
          title="Shop by collection"
        />
        <ul className="mt-10 grid gap-2 md:mt-12 md:grid-cols-3">
          {collections.map((collection) => (
            <li key={collection.slug}>
              <Link
                href={collection.href}
                className="on-image group relative block aspect-[4/5] overflow-hidden bg-neutral-900 md:aspect-[3/4]"
              >
                <CatalogImage
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  sizes="(min-width: 48rem) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-8 text-center">
                  <h3 className="text-heading-lg">{collection.title}</h3>
                  <span className="eyebrow nav-link group-hover:bg-size-[100%_1px]">Shop now</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
