import { MapContainer, Marker, Polyline, Popup, TileLayer, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GlassPanel from "../common/GlassPanel";

const dangerIcon = L.divIcon({
  className: "custom-marker",
  html: '<div style="width:18px;height:18px;border-radius:999px;background:#ff5c7a;box-shadow:0 0 18px rgba(255,92,122,0.75);"></div>',
});

const exitIcon = L.divIcon({
  className: "custom-marker",
  html: '<div style="width:18px;height:18px;border-radius:999px;background:#49fca3;box-shadow:0 0 18px rgba(73,252,163,0.75);"></div>',
});

export default function EvacuationMap({ lat, lon, exit, routePoints, exits }) {
  const center = [lat, lon];

  return (
    <GlassPanel className="h-[520px] overflow-hidden p-2">
      <MapContainer center={center} zoom={17} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={dangerIcon}>
          <Popup>Stampede risk zone</Popup>
        </Marker>
        <Circle center={center} radius={60} pathOptions={{ color: "#ff5c7a", fillColor: "#ff5c7a", fillOpacity: 0.2 }} />
        {exits.map((point) => (
          <Marker key={point.name} position={point.position} icon={exitIcon}>
            <Popup>{`Exit ${point.name}`}</Popup>
          </Marker>
        ))}
        <Polyline positions={routePoints} pathOptions={{ color: exit === "A" ? "#49fca3" : "#3cf2ff", weight: 6 }} />
      </MapContainer>
    </GlassPanel>
  );
}
