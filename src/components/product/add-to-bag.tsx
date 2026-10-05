"use client";

import { useState } from "react";

// Not wired to a cart yet — confirms locally only.
export function AddToBag({
  productName,
  soldOut,
}: {
  productName: string;
  soldOut: boolean;
}) {
  const [added, setAdded] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-full"
        disabled={soldOut}
        onClick={() => setAdded(true)}
      >
        {soldOut ? "Sold out" : added ? "Added to bag" : "Add to bag"}
      </button>
      <p className="sr-only" role="status">
        {added && `${productName} added to your bag.`}
      </p>
    </>
  );
}
