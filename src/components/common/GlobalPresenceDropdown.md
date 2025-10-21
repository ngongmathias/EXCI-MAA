# GlobalPresenceDropdown Component

A reusable React component that provides an interactive dropdown for selecting global office locations with an integrated Leaflet map.

## Features

- **Interactive Dropdown**: Select from all six global office locations
- **Leaflet Map Integration**: Visual representation of all office locations
- **Dynamic Map View**: Map automatically centers on selected office
- **Office Details**: Displays comprehensive information about selected office
- **Responsive Design**: Works on desktop and mobile devices
- **Internationalization**: Supports multiple languages via i18n

## Usage

```tsx
import GlobalPresenceDropdown from '../components/common/GlobalPresenceDropdown';

// Basic usage
<GlobalPresenceDropdown />

// With custom styling
<GlobalPresenceDropdown className="my-custom-class" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply to the component |

## Office Locations

The component displays six global office locations:

1. **Douala, Cameroon** - Main office
2. **Toronto, Canada** - North American operations
3. **Kigali, Rwanda** - East African operations
4. **Washington DC, USA** - Government relations
5. **Paris, France** - European operations
6. **Bujumbura, Burundi** - Regional consulting

## Map Features

- **Interactive Markers**: Click on markers to view office details
- **Popup Information**: Each marker shows office name, address, contact info, and services
- **Dynamic Centering**: Map automatically centers on selected office
- **Zoom Control**: Users can zoom in/out and pan around the map
- **Responsive**: Map adapts to container size

## Dependencies

- `react-leaflet`: React components for Leaflet maps
- `leaflet`: JavaScript library for interactive maps
- `@types/leaflet`: TypeScript definitions for Leaflet

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. Passing custom `className` prop
2. Overriding CSS classes in your global styles
3. Using Tailwind's utility classes

## Internationalization

The component supports multiple languages through the `useLanguage` hook. Make sure to add the following translations to your language files:

```json
{
  "globalOffices": {
    "selectOffice": "Select an office",
    "viewAllOffices": "View All Offices"
  }
}
```

## Example Integration

```tsx
// In a page component
import React from 'react';
import GlobalPresenceDropdown from '../components/common/GlobalPresenceDropdown';

const GlobalOfficesPage = () => {
  return (
    <div className="min-h-screen">
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Global Presence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our offices around the world and discover the services we offer in each location
            </p>
          </div>
          <GlobalPresenceDropdown />
        </div>
      </div>
    </div>
  );
};

export default GlobalOfficesPage;
```


