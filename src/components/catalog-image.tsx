"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

// Unsplash serves through its own resizing CDN (imgix), so build each srcset
// entry there instead of proxying through the Next.js optimizer, which would
// fetch the full-size original first.
const unsplashLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
};

export function CatalogImage({ alt, ...props }: ImageProps) {
  return <Image loader={unsplashLoader} alt={alt} {...props} />;
}
