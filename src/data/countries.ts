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
    capitalName: 'Yaoundé',
    capital: { lat: 3.8480, lng: 11.5021 },
    zoom: 6,
    phones: ['+237 698 835 251'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    capitalName: 'Ottawa',
    capital: { lat: 45.4215, lng: -75.6972 },
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
    capitalName: 'Gitega',
    capital: { lat: -3.4286, lng: 29.9256 },
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
    slug: 'democratic-republic-of-congo',
    name: 'Democratic Republic of Congo',
    capitalName: 'Kinshasa',
    capital: { lat: -4.3276, lng: 15.3136 },
    zoom: 6,
    phones: ['+243 970 284 006'],
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