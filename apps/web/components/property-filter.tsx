"use client";

import { usePropertyStore } from "@/lib/store";

export default function PropertyFilter() {
  const { city, setCity, setPriceRange, setBhk, setPropertyType, togglePolygonMode, bhk, polygonMode } =
    usePropertyStore();

  return (
    <div className="glass rounded-xl p-4 shadow-lg">
      <h2 className="mb-3 text-sm font-semibold">Filters</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-md border border-slate-300 bg-white/80 p-2 text-sm text-slate-800"
          placeholder="City (e.g. Pune)"
        />
        <input
          type="number"
          defaultValue={0}
          className="rounded-md border border-slate-300 bg-white/80 p-2 text-sm text-slate-800"
          placeholder="Min Price"
          onBlur={(e) => setPriceRange(Number(e.target.value || 0), 30000000)}
        />
        <select
          value={bhk ?? ""}
          onChange={(e) => setBhk(e.target.value ? Number(e.target.value) : null)}
          className="rounded-md border border-slate-300 bg-white/80 p-2 text-sm text-slate-800"
        >
          <option value="">Any BHK</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
        </select>
        <select
          onChange={(e) => setPropertyType((e.target.value as "Apartment" | "Villa" | "Plot" | "Commercial") || "")}
          className="rounded-md border border-slate-300 bg-white/80 p-2 text-sm text-slate-800"
          defaultValue=""
        >
          <option value="">Any Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>
      <button
        onClick={togglePolygonMode}
        className="mt-3 rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
      >
        {polygonMode ? "Disable" : "Enable"} Polygon Search (Pune test polygon)
      </button>
    </div>
  );
}
