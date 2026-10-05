import Link from "next/link";

// Trail of links to the ancestors of the current page, which closes the
// list as plain text.
export function Breadcrumb({
  trail,
  current,
}: {
  trail: { label: string; href: string }[];
  current: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="shell py-4 md:py-5">
      <ol className="caption flex flex-wrap gap-x-2 gap-y-1 text-muted">
        {trail.map((item) => (
          <li key={item.href} className="flex gap-2">
            <Link href={item.href} className="link">
              {item.label}
            </Link>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li aria-current="page" className="text-foreground">
          {current}
        </li>
      </ol>
    </nav>
  );
}
