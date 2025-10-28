import { FC } from 'react';
import { Award, CheckCircle } from 'lucide-react';
import MotionInView from '../../enhanced/MotionInView';
import { companyInfo } from '../../../data/companyInfo';

const AccreditationsSection: FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionInView>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Global Professional Accreditations
            </h2>
            <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our firm holds prestigious certifications and memberships from leading professional bodies across the globe
            </p>
          </div>
        </MotionInView>

        <MotionInView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {companyInfo.professionalAccreditations.map((accreditation, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">{accreditation}</p>
              </div>
            ))}
          </div>
        </MotionInView>

        {/* Languages */}
        <MotionInView>
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              We Serve Clients in Multiple Languages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {companyInfo.languages.map((language, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
                >
                  {language}
                </div>
              ))}
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default AccreditationsSection;
