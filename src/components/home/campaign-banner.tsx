import { CatalogImage } from "@/components/catalog-image";
import Link from "next/link";
import { knitwearBanner } from "@/lib/catalog";

export function CampaignBanner() {
  return (
    <section
      aria-labelledby="campaign-title"
      className="on-image relative h-[75svh] min-h-[30rem] max-h-[56rem] overflow-hidden bg-neutral-900"
    >
      <CatalogImage
        src={knitwearBanner.image.src}
        alt={knitwearBanner.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent md:bg-linear-to-r md:from-black/55 md:via-black/15"
      />
      <div className="shell relative flex h-full flex-col justify-end pb-12 md:pb-16">
        <p className="eyebrow">{knitwearBanner.eyebrow}</p>
        <h2 id="campaign-title" className="mt-4 text-display">
          {knitwearBanner.title}
        </h2>
        <p className="mt-4 max-w-sm text-body-lg text-muted">
          {knitwearBanner.body}
        </p>
        <div className="mt-8">
          <Link href={knitwearBanner.href} className="btn btn-primary">
            Shop knitwear
          </Link>
        </div>
      </div>
    </section>
  );
}
