"use client";

import { usePropertyStore } from "@/lib/store";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function PropertyGrid() {
  const listings = usePropertyStore((s) => s.listings);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((item) => (
        <article key={item.id} className="rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-slate-500">
            {item.locality}, {item.city}
          </p>
          <p className="mt-2 text-lg font-bold">{inr.format(item.priceInr)}</p>
          <p className="text-sm">
            {item.bhk > 0 ? `${item.bhk} BHK` : "Plot"} - {item.areaSqft} sqft
          </p>
          <p className="mt-2 text-sm">Investment score: {item.investmentScore}/100</p>
        </article>
      ))}
      {listings.length === 0 && <p className="text-sm text-slate-500">No properties found.</p>}
    </div>
  );
}
