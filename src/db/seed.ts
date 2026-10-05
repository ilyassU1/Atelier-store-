// Sample catalog for a fresh database: `pnpm db:seed`. Rows are matched on
// slug and only inserted when missing, so re-running never overwrites
// anything edited in the database (stock included).

import { config } from "dotenv";

import { category, product, productCategory } from "./schema";

config({ path: [".env.local", ".env"] });

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}

// Listed in display order: `sort_order` follows the position here.
const categories = [
  {
    slug: "new-in",
    name: "New In",
    description:
      "This season's arrivals: outerwear, leather goods and jewellery, just landed.",
  },
  {
    slug: "women",
    name: "Women",
    description: "Soft tailoring and cashmere, cut to be lived in.",
  },
  {
    slug: "men",
    name: "Men",
    description: "Leather, heavyweight cotton and pieces built to last.",
  },
  {
    slug: "bags",
    name: "Bags",
    description:
      "Structured leather bags that keep their line, season after season.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Bags, eyewear and jewellery to finish the look.",
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    description: "Gold, pearls and stones, made to be worn every day.",
  },
  {
    slug: "outerwear",
    name: "Outerwear",
    description:
      "Jackets and layers to see you from the first frost to the last.",
  },
  {
    slug: "knitwear",
    name: "Knitwear",
    description: "Cashmere and brushed cotton in soft, quiet tones.",
  },
];

type SeedProduct = {
  slug: string;
  name: string;
  // Slug of the primary category.
  category: string;
  // Slugs of the other listings the product is filed under.
  listings: string[];
  priceCents: number;
  stock: number;
  badge?: string;
  image: { src: string; alt: string };
  description: string;
  details: string[];
};

// Listed in display order: the storefront orders products by id.
const products: SeedProduct[] = [
  {
    slug: "draped-cashmere-poncho",
    name: "Draped Cashmere Poncho",
    category: "women",
    listings: ["new-in", "outerwear", "knitwear"],
    priceCents: 125000,
    stock: 8,
    badge: "New",
    image: {
      src: unsplash("1434389677669-e08b4cac3105"),
      alt: "Cream knitted poncho with fringed hem on a hanger",
    },
    description:
      "A generous poncho knitted from pure cashmere and finished with a hand-knotted fringe. Cut to drape loosely over tailoring or a fine knit.",
    details: [
      "100% cashmere",
      "Hand-knotted fringed hem",
      "One size",
      "Dry clean only",
      "Made in Scotland",
    ],
  },
  {
    slug: "structured-top-handle-bag",
    name: "Structured Top-Handle Bag",
    category: "accessories",
    listings: ["new-in", "bags"],
    priceCents: 195000,
    stock: 5,
    image: {
      src: unsplash("1594223274512-ad4803739b7c"),
      alt: "Teal pebbled-leather top-handle bag with a gold clasp",
    },
    description:
      "A compact top-handle bag in pebbled calfskin, built on a rigid frame so it keeps its shape. Closes with a polished gold-tone clasp.",
    details: [
      "Pebbled calfskin leather",
      "Gold-tone clasp fastening",
      "W 24 × H 18 × D 10 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    category: "men",
    listings: ["new-in", "outerwear"],
    priceCents: 240000,
    stock: 3,
    badge: "New",
    image: {
      src: unsplash("1551028719-00167b16eac5"),
      alt: "Black leather biker jacket on a hanger",
    },
    description:
      "The biker jacket, pared back. Cut from supple lambskin with an asymmetric zip and a close, slightly cropped fit.",
    details: [
      "100% lambskin leather",
      "Asymmetric zip fastening",
      "Fits true to size",
      "Specialist leather clean",
      "Made in Italy",
    ],
  },
  {
    slug: "pleated-silk-trouser",
    name: "Pleated Silk Trouser",
    category: "women",
    listings: ["new-in"],
    priceCents: 89000,
    stock: 6,
    image: {
      src: unsplash("1594633312681-425c7b97ccd1"),
      alt: "Model wearing dusty pink pleated cuffed trousers",
    },
    description:
      "High-waisted trousers in washed silk, with deep front pleats and a turned-up cuff. Fluid through the leg and easy to dress up or down.",
    details: [
      "100% silk",
      "Double front pleats",
      "Cuffed hem",
      "Dry clean only",
      "Made in Italy",
    ],
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "accessories",
    listings: ["new-in"],
    priceCents: 42000,
    stock: 0,
    image: {
      src: unsplash("1511499767150-a48a237f0083"),
      alt: "Round gold-frame sunglasses with dark green lenses",
    },
    description:
      "Round frames in fine gold-tone metal, fitted with deep green lenses. Light on the face and supplied with a leather case.",
    details: [
      "Gold-tone metal frame",
      "Green lenses with 100% UV protection",
      "Adjustable nose pads",
      "Made in Italy",
    ],
  },
  {
    slug: "brushed-cotton-sweatshirt",
    name: "Brushed Cotton Sweatshirt",
    category: "men",
    listings: ["new-in", "knitwear"],
    priceCents: 46000,
    stock: 12,
    image: {
      src: unsplash("1620799140408-edc6dcb6d633"),
      alt: "White crewneck sweatshirt laid flat",
    },
    description:
      "A crewneck sweatshirt in heavyweight cotton, brushed on the inside for softness. Relaxed through the body with ribbed trims.",
    details: [
      "100% cotton, brushed loopback",
      "Ribbed collar, cuffs and hem",
      "Machine wash cold",
      "Made in Portugal",
    ],
  },
  {
    slug: "leather-saddle-satchel",
    name: "Leather Saddle Satchel",
    category: "accessories",
    listings: ["new-in", "bags"],
    priceCents: 210000,
    stock: 2,
    badge: "Exclusive",
    image: {
      src: unsplash("1605733513597-a8f8341084e6"),
      alt: "Grey leather satchel with gold buckles",
    },
    description:
      "A saddle satchel in smooth grey calfskin, fastened with two gold-tone buckles. Roomy enough for every day, structured enough to keep its line.",
    details: [
      "Smooth calfskin leather",
      "Gold-tone buckle fastenings",
      "W 28 × H 21 × D 9 cm",
      "Made in Spain",
    ],
  },
  {
    slug: "sculpted-gold-hoops",
    name: "Sculpted Gold Hoops",
    category: "accessories",
    listings: ["new-in", "jewellery"],
    priceCents: 68000,
    stock: 9,
    image: {
      src: unsplash("1617038220319-276d3cfab638"),
      alt: "Pair of sculpted gold hoop earrings resting on a stone",
    },
    description:
      "Hoops with an irregular, hand-sculpted surface that catches the light. Substantial to look at, hollow-formed so they sit lightly.",
    details: [
      "18kt gold vermeil",
      "Diameter 3 cm",
      "Post and butterfly fastening",
      "Made in Italy",
    ],
  },
  {
    slug: "cabochon-cocktail-rings",
    name: "Cabochon Cocktail Rings",
    category: "accessories",
    listings: ["jewellery"],
    priceCents: 74000,
    stock: 7,
    image: {
      src: unsplash("1608042314453-ae338d80c427"),
      alt: "Gold rings set with turquoise and carnelian cabochons around a pebble",
    },
    description:
      "Cocktail rings set with smooth-domed cabochons of turquoise and carnelian. Each stone is cut by hand, so no two are quite alike.",
    details: [
      "18kt gold vermeil",
      "Turquoise or carnelian cabochon",
      "Sold individually",
      "Made in Italy",
    ],
  },
  {
    slug: "freshwater-pearl-necklace",
    name: "Freshwater Pearl Necklace",
    category: "accessories",
    listings: ["new-in", "jewellery"],
    priceCents: 95000,
    stock: 4,
    badge: "New",
    image: {
      src: unsplash("1515562141207-7a88fb7ce338"),
      alt: "Pearl necklace draped inside a jewellery box",
    },
    description:
      "A single strand of freshwater pearls, individually knotted on silk thread. Sits at the collarbone.",
    details: [
      "Freshwater pearls, 7–8 mm",
      "Hand-knotted on silk thread",
      "Length 42 cm",
      "14kt gold clasp",
    ],
  },
  {
    slug: "sapphire-drop-earrings",
    name: "Sapphire Drop Earrings",
    category: "accessories",
    listings: ["jewellery"],
    priceCents: 320000,
    stock: 1,
    image: {
      src: unsplash("1535632066927-ab7c9ab60908"),
      alt: "Sapphire and crystal drop earrings on a green leaf",
    },
    description:
      "Drop earrings set with deep blue sapphires beneath a cluster of clear crystals. Made for the evening.",
    details: [
      "Blue sapphires and clear crystals",
      "Rhodium-plated sterling silver setting",
      "Drop 4 cm",
      "Post and butterfly fastening",
    ],
  },
  {
    slug: "pave-infinity-bracelet",
    name: "Pavé Infinity Bracelet",
    category: "accessories",
    listings: ["jewellery"],
    priceCents: 145000,
    stock: 6,
    image: {
      src: unsplash("1611591437281-460bfbe1220a"),
      alt: "Gold bracelet with pavé-set crystal infinity links",
    },
    description:
      "A fine chain bracelet joined by infinity links, each pavé-set with crystals. Wear it alone or layered.",
    details: [
      "18kt gold vermeil",
      "Pavé-set crystals",
      "Adjustable length 16–19 cm",
      "Lobster clasp",
    ],
  },
  {
    slug: "crescent-pendant-necklace",
    name: "Crescent Pendant Necklace",
    category: "accessories",
    listings: ["jewellery"],
    priceCents: 52000,
    stock: 10,
    image: {
      src: unsplash("1599643478518-a784e5dc4c8f"),
      alt: "Layered gold chains with a crescent pendant and a blue crystal",
    },
    description:
      "Two fine chains worn as one: the first carries a crescent pendant, the second a single blue crystal.",
    details: [
      "18kt gold vermeil",
      "Blue crystal charm",
      "Chain lengths 40 and 45 cm",
      "Lobster clasp",
    ],
  },
];

async function main() {
  // Imported here so the env files above are loaded before the client reads
  // DATABASE_URL.
  const { db } = await import("./index");

  await db
    .insert(category)
    .values(categories.map((row, index) => ({ ...row, sortOrder: index })))
    .onConflictDoNothing({ target: category.slug });

  const categoryIds = new Map(
    (
      await db.select({ id: category.id, slug: category.slug }).from(category)
    ).map((row) => [row.slug, row.id]),
  );
  const categoryId = (slug: string) => {
    const id = categoryIds.get(slug);
    if (id === undefined) throw new Error(`Unknown category "${slug}"`);
    return id;
  };

  await db
    .insert(product)
    .values(
      products.map((row) => ({
        slug: row.slug,
        name: row.name,
        description: row.description,
        details: row.details,
        priceCents: row.priceCents,
        stock: row.stock,
        badge: row.badge,
        imageUrl: row.image.src,
        imageAlt: row.image.alt,
        categoryId: categoryId(row.category),
      })),
    )
    .onConflictDoNothing({ target: product.slug });

  const productIds = new Map(
    (
      await db.select({ id: product.id, slug: product.slug }).from(product)
    ).map((row) => [row.slug, row.id]),
  );

  await db
    .insert(productCategory)
    .values(
      products.flatMap((row) =>
        row.listings.map((slug) => ({
          productId: productIds.get(row.slug)!,
          categoryId: categoryId(slug),
        })),
      ),
    )
    .onConflictDoNothing();

  console.log(
    `Seed complete: ${categories.length} categories and ${products.length} products present.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
