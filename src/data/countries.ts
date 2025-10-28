export interface Country {
  slug: string;
  name: string;
  capitalName: string;
  capital: { lat: number; lng: number };
  zoom: number;
  phones: string[];
}

export const countries: Country[] = [
  {
    slug: 'cameroon',
    name: 'Cameroon',
    capitalName: 'Douala',
    capital: { lat: 4.0511, lng: 9.7679 },
    zoom: 6,
    phones: ['+237 698 835 251'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    capitalName: 'Toronto',
    capital: { lat: 43.6532, lng: -79.3832 },
    zoom: 5,
    phones: ['+1 416 624 2510'],
  },
  {
    slug: 'rwanda',
    name: 'Rwanda',
    capitalName: 'Kigali',
    capital: { lat: -1.9441, lng: 30.0619 },
    zoom: 10,
    phones: ['+250 787 779 965'],
  },
  {
    slug: 'france',
    name: 'France',
    capitalName: 'Paris',
    capital: { lat: 48.8566, lng: 2.3522 },
    zoom: 6,
    phones: ['+33 652 452 1402'],
  },
  {
    slug: 'burundi',
    name: 'Burundi',
    capitalName: 'Bujumbura',
    capital: { lat: -3.3761, lng: 29.3599 },
    zoom: 8,
    phones: ['+257 793 439 93'],
  },
  {
    slug: 'united-states',
    name: 'United States of America',
    capitalName: 'Washington, D.C.',
    capital: { lat: 38.9072, lng: -77.0369 },
    zoom: 6,
    phones: ['+1 502 299 247'],
  },
  {
    slug: 'republic-of-congo',
    name: 'Republic of Congo',
    capitalName: 'Pointe-Noire',
    capital: { lat: -4.7692, lng: 11.8636 },
    zoom: 6,
    phones: ['+242 06 900 0000'],
  },
  {
    slug: 'gabon',
    name: 'Gabon',
    capitalName: 'Libreville',
    capital: { lat: 0.4162, lng: 9.4673 },
    zoom: 8,
    phones: ['+241 11 76 82 23'],
  },
  {
    slug: 'united-arab-emirates',
    name: 'United Arab Emirates',
    capitalName: 'Dubai',
    capital: { lat: 25.2048, lng: 55.2708 },
    zoom: 10,
    phones: ['+971 50 123 4567'],
  },
];

export const countryBySlug = (slug: string): Country | undefined => {
  return countries.find(c => c.slug === slug);
};