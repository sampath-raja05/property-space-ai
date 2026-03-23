"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePropertyStore } from "@/lib/store";

export default function MapView() {
  const listings = usePropertyStore((s) => s.listings);

  return (
    <div className="h-[420px] overflow-hidden rounded-xl border border-slate-200">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((item) => (
          <Marker position={[item.lat, item.lng]} key={item.id}>
            <Popup>
              <strong>{item.title}</strong>
              <br />
              {item.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
