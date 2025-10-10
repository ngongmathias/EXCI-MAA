import { Office } from '../lib/types';

export const offices: Office[] = [
  {
    id: '1',
    name: 'EXCI-MAA Douala',
    address: '123 Business District',
    city: 'Douala',
    country: 'Cameroon',
    coordinates: {
      lat: 4.0483,
      lng: 9.7043,
    },
    phone: '+237 698 835 251',
    email: 'douala@excimaa.ca',
    services: ['Accounting', 'Auditing', 'Tax Consulting'],
    image: '/images/offices/douala.jpg',
  },
  {
    id: '2',
    name: 'EXCI-MAA Toronto',
    address: '456 Financial Center',
    city: 'Toronto',
    country: 'Canada',
    coordinates: {
      lat: 43.6532,
      lng: -79.3832,
    },
    phone: '+1 (416) 624-2510',
    email: 'toronto@excimaa.ca',
    services: ['International Accounting', 'Tax Planning', 'Business Consulting'],
    image: '/images/offices/toronto.jpg',
  },
  {
    id: '3',
    name: 'EXCI-MAA Kigali',
    address: '789 Innovation Hub',
    city: 'Kigali',
    country: 'Rwanda',
    coordinates: {
      lat: -1.9441,
      lng: 30.0619,
    },
    phone: '+250 788 123 456',
    email: 'kigali@excimaa.ca',
    services: ['Financial Advisory', 'Risk Management', 'IT Consulting'],
    image: '/images/offices/kigali.jpg',
  },
];


