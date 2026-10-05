import Link from "next/link";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";

export const primaryNav = [
  { label: "New In", href: "/collections/new-in" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Accessories", href: "/collections/accessories" },
];

export function SiteHeader() {
  return (
    <>
      <div className="bg-foreground py-2 text-center text-background">
        <p className="caption px-(--gutter)">
          Complimentary shipping and returns on all orders
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
          <div className="flex items-center gap-1">
            <MobileMenu nav={primaryNav} />
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex gap-7">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="eyebrow nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link
            href="/"
            aria-label="Atelier — home"
            className="text-xl font-light uppercase tracking-[0.35em] md:text-2xl"
          >
            Atelier
          </Link>

          <div className="flex items-center justify-end gap-1 md:gap-3">
            <Link href="/search" aria-label="Search" className="p-2">
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden p-2 md:block"
            >
              <UserIcon />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden p-2 md:block"
            >
              <HeartIcon />
            </Link>
            <Link
              href="/bag"
              aria-label="Shopping bag, 0 items"
              className="flex items-center gap-1 p-2"
            >
              <BagIcon />
              <span className="caption">0</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
