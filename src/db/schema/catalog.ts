import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// A shoppable listing at /collections/[slug].
export const category = pgTable("category", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const product = pgTable(
  "product",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    details: text("details").array().notNull(),
    priceCents: integer("price_cents").notNull(),
    // Units available to order; 0 means sold out.
    stock: integer("stock").default(0).notNull(),
    badge: text("badge"),
    imageUrl: text("image_url").notNull(),
    imageAlt: text("image_alt").notNull(),
    // The primary category: breadcrumb, grid tabs and related products.
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("product_categoryId_idx").on(table.categoryId),
    check("product_price_cents_check", sql`${table.priceCents} >= 0`),
    check("product_stock_check", sql`${table.stock} >= 0`),
  ],
);

// Listings a product is filed under on top of its primary category.
export const productCategory = pgTable(
  "product_category",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.productId, table.categoryId] }),
    index("product_category_categoryId_idx").on(table.categoryId),
  ],
);

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
  productCategories: many(productCategory),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  productCategories: many(productCategory),
}));

export const productCategoryRelations = relations(
  productCategory,
  ({ one }) => ({
    product: one(product, {
      fields: [productCategory.productId],
      references: [product.id],
    }),
    category: one(category, {
      fields: [productCategory.categoryId],
      references: [category.id],
    }),
  }),
);
