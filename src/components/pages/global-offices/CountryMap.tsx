import { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

type CountryMapProps = {
  center: { lat: number; lng: number };
  zoom?: number;
  label: string;
  mapId?: string;
};

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
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border border-gray-200">
      {mounted && (
        <MapContainer key={mapId ?? `${center.lat},${center.lng},${zoom}`} center={[center.lat, center.lng]} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[center.lat, center.lng]} icon={markerIcon}>
            <Popup>
              {label}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default CountryMap;


