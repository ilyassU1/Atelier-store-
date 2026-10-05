import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  id,
  action,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div>
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h2 id={id} className="mt-3 text-heading-xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
