import { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { countryBySlug } from '../data/countries';

const CountryPage: FC = () => {
  const { slug } = useParams();
  const country = slug ? countryBySlug(slug) : undefined;

  if (!country) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Country not found</h1>
        <Link to="/global-offices" className="text-blue-600 hover:underline">Back to Global Offices</Link>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/global-offices" className="hover:text-blue-600">Global Offices</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{country.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{country.name}</h1>
            <p className="text-gray-600 mb-6">Our office is located in the capital city of {country.capitalName}. Explore the gallery to see highlights.</p>
            <div className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-200">
              <img
                key={country.slug}
                src={
                  ({
                    'cameroon': '/images/Cities/Cameroon-Yaounde.jpg',
                    'canada': '/images/Cities/Canada.jpg',
                    'rwanda': '/images/Cities/rwanda.jpg',
                    'france': '/images/Cities/France-paris.jpg',
                    'burundi': '/images/Cities/Burundi.jpeg',
                    'united-states': '/images/Cities/USA-washington.jpeg',
                    'democratic-republic-of-congo': '/images/Cities/DRC.jpeg',
                  } as Record<string, string>)[country.slug] ?? `/images/capitals/${country.slug}.jpg`
                }
                alt={`${country.capitalName}, ${country.name}`}
                className="w-full h-auto object-cover fade-in-only"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/logos/logo-placeholder.svg';
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Office Details</h2>
            <ul className="space-y-3 text-gray-700">
              <li><span className="font-medium">Country:</span> {country.name}</li>
              <li><span className="font-medium">Capital:</span> {country.capitalName}</li>
              {country.phones && country.phones.length > 0 && (
                <li>
                  <span className="font-medium">Phone:</span>
                  <div className="mt-1 space-y-1">
                    {country.phones.map((p) => (
                      <div key={p} className="text-gray-800">{p}</div>
                    ))}
                  </div>
                </li>
              )}
              <li><span className="font-medium">Services:</span> Accounting, Auditing, Tax Consulting</li>
              <li><span className="font-medium">Contact:</span> info@excimaa.com</li>
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryPage;


