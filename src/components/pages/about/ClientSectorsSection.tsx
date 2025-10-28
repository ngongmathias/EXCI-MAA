import { FC } from 'react';
import { Briefcase } from 'lucide-react';
import MotionInView from '../../enhanced/MotionInView';
import { companyInfo } from '../../../data/companyInfo';

const ClientSectorsSection: FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionInView>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Sectors We Serve
            </h2>
            <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our expertise spans across diverse industries, providing specialized solutions for each sector
            </p>
          </div>
        </MotionInView>

        <MotionInView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.clientSectors.map((sector) => (
              <div
                key={sector.id}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{sector.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{sector.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </MotionInView>

        {/* Notable Clients */}
        <MotionInView>
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Notable Client References
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Oil & Gas */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Oil & Gas</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {companyInfo.clientReferences.oilAndGas.slice(0, 6).map((client, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Banks */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Banking</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {companyInfo.clientReferences.banks.slice(0, 6).map((client, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hotels */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Hospitality</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {companyInfo.clientReferences.hotels.map((client, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Telecom */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Telecommunications</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {companyInfo.clientReferences.telecom.map((client, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>

              {/* NGOs */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Development Partners</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {companyInfo.clientReferences.ngos.map((client, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brewery */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Brewery Industry</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {companyInfo.clientReferences.brewery.map((client, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default ClientSectorsSection;
