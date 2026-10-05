import { getStockState, type StockState } from "@/lib/catalog";

// The palette is neutral-only, so availability reads from how full the
// marker is (solid, half, empty) rather than from a status color.
const markerFill: Record<StockState, string> = {
  "in-stock": "bg-foreground",
  "low-stock": "bg-linear-to-r from-foreground from-50% to-transparent to-50%",
  "sold-out": "",
};

export function StockStatus({ stock }: { stock: number }) {
  const state = getStockState(stock);
  const label =
    state === "sold-out"
      ? "Sold out"
      : state === "low-stock"
        ? `Low stock — only ${stock} left`
        : "In stock";

  return (
    <p className="caption flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`size-2 border border-foreground ${markerFill[state]}`}
      />
      {label}
    </p>
  );
}
