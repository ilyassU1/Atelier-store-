import { CatalogImage } from "@/components/catalog-image";
import Link from "next/link";
import { hero } from "@/lib/catalog";

// Full-bleed campaign opener. Two portrait images side by side from md up;
// a single image on small screens.
export function Hero() {
  const [primary, secondary] = hero.images;

  return (
    <section
      aria-labelledby="hero-title"
      className="on-image relative h-[calc(100svh-6.5rem)] min-h-[34rem] max-h-[64rem] overflow-hidden bg-neutral-900"
    >
      <div className="absolute inset-0 grid md:grid-cols-2">
        <div className="relative">
          <CatalogImage
            src={primary.src}
            alt={primary.alt}
            fill
            preload
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div className="relative hidden md:block">
          <CatalogImage
            src={secondary.src}
            alt={secondary.alt}
            fill
            loading="eager"
            sizes="50vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent md:from-black/60 md:via-black/10"
      />

      <div className="shell relative flex h-full flex-col items-center justify-end pb-12 text-center md:pb-16">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="mt-4 text-display">
          {hero.title}
        </h1>
        <p className="mt-4 max-w-md text-body-lg text-muted">{hero.body}</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/collections/women" className="btn btn-primary">
            Shop women
          </Link>
          <Link href="/collections/men" className="btn btn-secondary">
            Shop men
          </Link>
        </div>
      </div>
    </section>
  );
}
