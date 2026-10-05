import { CampaignBanner } from "@/components/home/campaign-banner";
import { CollectionTiles } from "@/components/home/collection-tiles";
import { EditorialFeature } from "@/components/home/editorial-feature";
import { Hero } from "@/components/home/hero";
import { JournalStories } from "@/components/home/journal-stories";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ProductRail } from "@/components/home/product-rail";
import { ServicesStrip } from "@/components/home/services-strip";
import { getCategoryProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home() {
  const [newArrivals, jewellery] = await Promise.all([
    getCategoryProducts("new-in", 8),
    getCategoryProducts("jewellery"),
  ]);
  // The rail leaves out pieces already shown in the arrivals grid.
  const finishingTouches = jewellery.filter(
    (product) => !newArrivals.some((arrival) => arrival.slug === product.slug),
  );

  return (
    <main>
      <Hero />
      <CollectionTiles />
      <NewArrivals products={newArrivals} />
      <EditorialFeature />
      <CampaignBanner />
      <ProductRail
        eyebrow="Jewellery"
        title="Finishing touches"
        href="/collections/jewellery"
        products={finishingTouches}
      />
      <JournalStories />
      <ServicesStrip />
    </main>
  );
}
