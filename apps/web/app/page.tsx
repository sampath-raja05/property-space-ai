import dynamic from "next/dynamic";
import ChatAssistant from "@/components/chat-assistant";
import PropertyFilter from "@/components/property-filter";
import PropertyGrid from "@/components/property-grid";
import ReportExport from "@/components/report-export";

const MapView = dynamic(() => import("@/components/map-view"), { ssr: false });

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-6 p-6">
      <header className="rounded-xl bg-slate-900 p-6 text-white">
        <h1 className="text-2xl font-bold">Property Space AI</h1>
        <p className="text-sm text-slate-200">
          Map-first analytics platform for Indian real estate intelligence
        </p>
      </header>

      <PropertyFilter />
      <div className="flex justify-end">
        <ReportExport />
      </div>
      <MapView />
      <PropertyGrid />
      <ChatAssistant />
    </main>
  );
}
