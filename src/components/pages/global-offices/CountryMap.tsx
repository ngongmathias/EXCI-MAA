import { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

type CountryMapProps = {
  center: { lat: number; lng: number };
  zoom?: number;
  label: string;
  mapId?: string;
};

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Create a custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CountryMap: FC<CountryMapProps> = ({ center, zoom = 6, label, mapId }) => {
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server side
  if (!mounted) {
    return (
      <div className="w-full h-[420px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border border-gray-200">
      <MapContainer
        key={`${mapId || 'map'}-${center.lat}-${center.lng}-${zoom}`}
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.lat, center.lng]} icon={markerIcon}>
          <Popup>
            <div className="text-center">
              <strong>{label}</strong>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CountryMap;


