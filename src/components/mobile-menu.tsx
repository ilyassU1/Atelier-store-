"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

type NavItem = { label: string; href: string };

export function MobileMenu({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="-ml-2 p-2"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          <div className="shell flex h-16 items-center justify-between border-b">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              className="-mr-2 p-2"
              aria-label="Close menu"
              autoFocus
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto py-8">
            <ul className="flex flex-col gap-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-heading-lg font-light"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="hairline mt-10 flex flex-col gap-4 pt-8">
              <li>
                <Link href="/account" className="eyebrow" onClick={() => setOpen(false)}>
                  Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="eyebrow" onClick={() => setOpen(false)}>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/client-services" className="eyebrow" onClick={() => setOpen(false)}>
                  Client services
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
