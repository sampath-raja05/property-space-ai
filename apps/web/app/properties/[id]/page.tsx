import { sampleProperties } from "@/lib/mock-data";

type Params = { id: string };

export default async function PropertyDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const property = sampleProperties.find((item) => item.id === id);

  if (!property) {
    return <main className="p-6">Property not found.</main>;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p className="text-sm text-slate-600">
        {property.locality}, {property.city}
      </p>
      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="mb-2 text-sm font-semibold">Analytics Snapshot</h2>
        <p>Investment score: {property.investmentScore}/100</p>
        <p>Estimated valuation trend: +7.4% YoY</p>
        <p>Neighborhood demand proxy: Moderate-High</p>
      </section>
    </main>
  );
}
