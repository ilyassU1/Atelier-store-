// Editorial content for the storefront, plus the product types and helpers
// shared with client components. Products and categories live in the
// database: query them through src/lib/products.ts. Photography is served
// from Unsplash via <CatalogImage>.

export type ImageAsset = {
  src: string;
  alt: string;
};

// A product's primary category; `sortOrder` orders the grid's category tabs.
export type ProductCategory = {
  slug: string;
  name: string;
  sortOrder: number;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceCents: number;
  // Units available to order; 0 means sold out.
  stock: number;
  image: ImageAsset;
  badge: string | null;
  description: string;
  details: string[];
};

export type StockState = "in-stock" | "low-stock" | "sold-out";

export type Collection = {
  slug: string;
  title: string;
  href: string;
  image: ImageAsset;
};

export type Story = {
  slug: string;
  category: string;
  title: string;
  href: string;
  image: ImageAsset;
};

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(cents: number) {
  return priceFormat.format(cents / 100);
}

// At or below this many units a product is flagged as running low.
const LOW_STOCK_THRESHOLD = 3;

export function getStockState(stock: number): StockState {
  if (stock <= 0) return "sold-out";
  return stock <= LOW_STOCK_THRESHOLD ? "low-stock" : "in-stock";
}

export const hero = {
  eyebrow: "Autumn–Winter 2026",
  title: "The Quiet Season",
  body: "Considered tailoring, softened outerwear and pieces made to be lived in for years.",
  images: [
    {
      src: unsplash("1539109136881-3be0616acf4b"),
      alt: "Model in a pale blue overcoat in front of a gothic cathedral",
    },
    {
      src: unsplash("1554412933-514a83d2f3c8"),
      alt: "Model in a black buttoned coat and wide-brimmed hat",
    },
  ],
};

export const collections: Collection[] = [
  {
    slug: "women",
    title: "Women",
    href: "/collections/women",
    image: {
      src: unsplash("1595777457583-95e059d581b8"),
      alt: "Woman in a flowing red gown walking through a garden",
    },
  },
  {
    slug: "men",
    title: "Men",
    href: "/collections/men",
    image: {
      src: unsplash("1594938298603-c8148c4dae35"),
      alt: "Man in a blue windowpane-check three-piece suit",
    },
  },
  {
    slug: "bags",
    title: "Bags",
    href: "/collections/bags",
    image: {
      src: unsplash("1598532163257-ae3c6b2524b6"),
      alt: "Cognac woven leather tote with a gold chain strap",
    },
  },
];

export const outerwearFeature = {
  eyebrow: "The Edit",
  title: "Outerwear, reconsidered",
  body: "Double-faced wool, brushed checks and coats cut to sit just so over tailoring. Twelve pieces to see you from the first frost to the last.",
  href: "/collections/outerwear",
  images: [
    {
      src: unsplash("1485968579580-b6d095142e6e"),
      alt: "Woman in a dark plaid wool coat on a city street",
    },
    {
      src: unsplash("1507679799987-c73779587ccf"),
      alt: "Close-up of a man buttoning a navy suit jacket",
    },
  ],
};

export const knitwearBanner = {
  eyebrow: "Campaign",
  title: "The Knitwear Edit",
  body: "Cashmere, merino and alpaca in a palette of oat, camel and stone.",
  href: "/collections/knitwear",
  image: {
    src: unsplash("1558769132-cb1aea458c5e"),
    alt: "Rail of knitwear in soft neutral tones",
  },
};

export const stories: Story[] = [
  {
    slug: "packing-for-the-riviera",
    category: "Travel",
    title: "Packing for the Riviera",
    href: "/journal/packing-for-the-riviera",
    image: {
      src: unsplash("1515372039744-b8f02a3ae446"),
      alt: "Woman in a white off-shoulder dress on sunlit steps",
    },
  },
  {
    slug: "the-evening-edit",
    category: "In Conversation",
    title: "On dressing for the evening",
    href: "/journal/the-evening-edit",
    image: {
      src: unsplash("1566174053879-31528523f8ae"),
      alt: "Woman in an aubergine off-shoulder gown against a violet backdrop",
    },
  },
  {
    slug: "winter-wardrobe-notes",
    category: "Style Notes",
    title: "Five coats, one winter",
    href: "/journal/winter-wardrobe-notes",
    image: {
      src: unsplash("1483985988355-763728e1935b"),
      alt: "Woman in a burgundy coat carrying shopping bags",
    },
  },
];

export const services = [
  {
    title: "Complimentary shipping",
    body: "On every order, delivered in our signature packaging.",
  },
  {
    title: "Returns within 30 days",
    body: "Free collection from your door, no questions asked.",
  },
  {
    title: "Personalisation",
    body: "Hot-stamped initials on selected leather goods.",
  },
  {
    title: "Client advisors",
    body: "Styling advice by phone, chat or appointment.",
  },
];
