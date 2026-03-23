"use client";

import { usePropertyStore } from "@/lib/store";

export default function ReportExport() {
  const listings = usePropertyStore((s) => s.listings);

  const exportCsv = () => {
    const lines = ["id,title,city,locality,price_inr,bhk,area_sqft,investment_score"];
    listings.forEach((item) =>
      lines.push(
        `${item.id},${item.title},${item.city},${item.locality},${item.priceInr},${item.bhk},${item.areaSqft},${item.investmentScore}`
      )
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "property-report.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="rounded-md bg-slate-800 px-3 py-2 text-sm text-white" onClick={exportCsv}>
      Export CSV Report
    </button>
  );
}
