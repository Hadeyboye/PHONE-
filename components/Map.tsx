'use client';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

export default function Map({ center = { lat: 37.7749, lng: -122.4194 } }: { center?: { lat: number; lng: number } }) {
  const position: LatLngExpression = [center.lat, center.lng];

  return (
    <div className="h-[420px] rounded-3xl overflow-hidden border border-zinc-800">
      <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }} >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}
