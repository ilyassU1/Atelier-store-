import { CatalogImage } from "@/components/catalog-image";
import Link from "next/link";
import { stories } from "@/lib/catalog";
import { SectionHeading } from "@/components/home/section-heading";

export function JournalStories() {
  return (
    <section aria-labelledby="journal-title" className="section hairline">
      <div className="shell">
        <SectionHeading
          id="journal-title"
          eyebrow="The Journal"
          title="Stories from the atelier"
          action={
            <Link href="/journal" className="eyebrow nav-link">
              Read the journal
            </Link>
          }
        />
        <ul className="mt-10 grid gap-x-4 gap-y-12 md:mt-12 md:grid-cols-3">
          {stories.map((story) => (
            <li key={story.slug}>
              <Link href={story.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
                  <CatalogImage
                    src={story.image.src}
                    alt={story.image.alt}
                    fill
                    sizes="(min-width: 48rem) 33vw, 100vw"
                    className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-5 text-muted">{story.category}</p>
                <h3 className="mt-2 text-heading-md">{story.title}</h3>
                <span className="caption nav-link mt-3 inline-block group-hover:bg-size-[100%_1px]">
                  Read the story
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
