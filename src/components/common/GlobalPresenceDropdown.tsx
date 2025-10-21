import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { offices } from '../../data/offices';
import { Office } from '../../lib/types';
import { useLanguage } from '../../contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GlobalPresenceDropdownProps {
  className?: string;
}

// Component to handle map view changes when office is selected
const MapController: React.FC<{ selectedOffice: Office | null }> = ({ selectedOffice }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedOffice) {
      map.setView([selectedOffice.coordinates.lat, selectedOffice.coordinates.lng], 10);
    }
  }, [selectedOffice, map]);

  return null;
};

const GlobalPresenceDropdown: React.FC<GlobalPresenceDropdownProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Calculate center point for initial map view
  const centerLat = offices.reduce((sum, office) => sum + office.coordinates.lat, 0) / offices.length;
  const centerLng = offices.reduce((sum, office) => sum + office.coordinates.lng, 0) / offices.length;

  const handleOfficeSelect = (office: Office) => {
    setSelectedOffice(office);
    setIsDropdownOpen(false);
  };

  const handleViewAll = () => {
    setSelectedOffice(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Dropdown Button */}
      <div className="relative">
       

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            <button
              onClick={handleViewAll}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 text-gray-700 font-medium"
            >
              {t('globalOffices.viewAllOffices')}
            </button>
            {offices.map((office) => (
              <button
                key={office.id}
                onClick={() => handleOfficeSelect(office)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                  selectedOffice?.id === office.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <div className="font-medium">{office.name}</div>
                <div className="text-sm text-gray-500">{office.city}, {office.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="mt-6 h-96 w-[180vh] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={selectedOffice ? 10 : 2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Map Controller for handling view changes */}
          <MapController selectedOffice={selectedOffice} />
          
          {/* Markers for all offices */}
          {offices.map((office) => (
            <Marker
              key={office.id}
              position={[office.coordinates.lat, office.coordinates.lng]}
              icon={new Icon({
                iconUrl: selectedOffice?.id === office.id 
                  ? 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png'
                  : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg text-gray-800">{office.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{office.address}</p>
                  <p className="text-gray-600 text-sm">{office.city}, {office.country}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Phone:</span> {office.phone}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Email:</span> {office.email}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Services:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {office.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Office Details */}
      {selectedOffice && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedOffice.name}</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {selectedOffice.address}, {selectedOffice.city}, {selectedOffice.country}
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {selectedOffice.phone}
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {selectedOffice.email}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Services Offered</h4>
              <div className="flex flex-wrap gap-2">
                {selectedOffice.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPresenceDropdown;


