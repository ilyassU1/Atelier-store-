import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

const footerColumns = [
  {
    title: "Client Services",
    links: [
      { label: "Contact us", href: "/client-services" },
      { label: "Shipping", href: "/client-services/shipping" },
      { label: "Returns & exchanges", href: "/client-services/returns" },
      { label: "Book an appointment", href: "/client-services/appointments" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "About Atelier", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of sale", href: "/legal/terms" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Cookie settings", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="hairline mt-auto">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <h2 className="text-heading-md">Sign up for Atelier updates</h2>
          <p className="mt-3 max-w-sm text-muted">
            Be first to hear about new collections, private sales and stories
            from the atelier.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7"
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow">{column.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="caption nav-link text-muted hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="shell overflow-hidden" aria-hidden="true">
        <p className="select-none pl-[0.06em] text-center text-[19vw] font-light uppercase leading-[0.8] tracking-[0.06em] 2xl:text-[16.5rem]">
          Atelier
        </p>
      </div>

      <div className="hairline">
        <div className="shell flex flex-col gap-2 py-6 text-muted sm:flex-row sm:justify-between">
          <p className="caption">© 2026 Atelier. All rights reserved.</p>
          <p className="caption">United States · English · USD</p>
        </div>
      </div>
    </footer>
  );
}
