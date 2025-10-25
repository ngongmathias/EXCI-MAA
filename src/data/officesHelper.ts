import { offices } from './offices';

// Capital cities mapping
const getCapitalCity = (country: string): string => {
  const capitals: { [key: string]: string } = {
    'Cameroon': 'Yaoundé',
    'Canada': 'Ottawa', 
    'Rwanda': 'Kigali',
    'United States': 'Washington DC',
    'France': 'Paris',
    'Burundi': 'Gitega',
    'Democratic Republic of Congo': 'Kinshasa',
    'Gabon': 'Libreville',
    'United Arab Emirates': 'Abu Dhabi'
  };
  return capitals[country] || country;
};

// Transform offices for dropdown display
export const getOfficesForDropdown = () => {
  return offices.map(office => ({
    id: office.id,
    country: office.country,
    city: office.city,
    capital: getCapitalCity(office.country),
    flag: getCountryFlag(office.country)
  }));
};

// Get country flag emoji
const getCountryFlag = (country: string): string => {
  const flags: { [key: string]: string } = {
    'Cameroon': '🇨🇲',
    'Canada': '🇨🇦',
    'Rwanda': '🇷🇼',
    'United States': '🇺🇸',
    'France': '🇫🇷',
    'Burundi': '🇧🇮',
    'Democratic Republic of Congo': '🇨🇩',
    'Gabon': '🇬🇦',
    'United Arab Emirates': '🇦🇪'
  };
  return flags[country] || '🌍';
};

export { getCapitalCity };