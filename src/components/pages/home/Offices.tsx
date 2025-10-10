import { FC } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Offices: FC = () => {
  const offices = [
    {
      country: 'Democratic Republic of Congo',
      address: 'No. 1A - 1st Floor Maria Pharmacy Building, near CFAO BP: 4018 Pointe-Noire - Republic of Congo',
      phone: '+1(416) 624 2510 / +242 06 444 0729',
      email: 'pkemeni@excimaa.ca',
      flag: '🇨🇩'
    },
    {
      country: 'United States',
      address: '3700 Cypress Spring PI, Louisville, Ky 40245 US',
      phone: '+1 502 299 247',
      email: 'ptchamake@excimaa.ca',
      flag: '🇺🇸'
    },
    {
      country: 'Rwanda',
      address: 'Imm .Aigle Blanc, KN 05 Ave Airport Gasabo District',
      phone: '+250 787 779 965',
      email: 'mnkwain@excimaa.ca',
      flag: '🇷🇼'
    },
    {
      country: 'Canada',
      address: '1395 Marshall Crescent Milton, ON, L9T 6N4',
      phone: '+1 4166242510',
      email: 'pkemeni@excimaa.ca',
      flag: '🇨🇦'
    },
    {
      country: 'France',
      address: '5 Square du Nord 95500 Gonesse France',
      phone: '+33 652 452 1402',
      email: 'pkemeni@excimaa.ca',
      flag: '🇫🇷'
    },
    {
      country: 'Cameroon',
      address: 'BP 2606 Boulevard de la République – Douala (Cameroon)',
      phone: '+237 698 835 251',
      email: 'pngatcha@excimaa.ca',
      flag: '🇨🇲'
    },
    {
      country: 'United Arab Emirates',
      address: 'Dubai, UAE',
      phone: '+971 50 123 4567',
      email: 'dubai@excimaa.ca',
      flag: '🇦🇪'
    },
    {
      country: 'Burundi',
      address: 'Boulevard Melchior NDADAYE N°68A (Be Forward Building) Asian District',
      phone: '+257 79 34 39 93',
      email: 'Ofodji@excimaa.ca / Ddusabe@excimaa.ca',
      flag: '🇧🇮'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Offices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With offices across multiple countries, we provide local expertise with global reach. 
            Find the office nearest to you.
          </p>
        </div>

        {/* Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <div key={index} className="card group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{office.flag}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {office.country}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {office.address}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
                  >
                    {office.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <a
                    href={`mailto:${office.email.split(' / ')[0]}`}
                    className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200 break-all"
                  >
                    {office.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">
                    Mon-Fri: 9:00 AM - 6:00 PM
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full btn-secondary text-sm">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section Placeholder */}
        <div className="mt-16 bg-gray-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interactive Office Map
          </h3>
          <p className="text-gray-600 mb-6">
            Click on any location to view office details and get directions.
          </p>
          <div className="bg-white rounded-lg p-8 shadow-inner">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  We&apos;re working on an interactive map to help you find our offices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offices;