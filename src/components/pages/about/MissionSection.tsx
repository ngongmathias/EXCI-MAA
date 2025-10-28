import { FC } from 'react';
import { Target, CheckCircle } from 'lucide-react';
import MotionInView from '../../enhanced/MotionInView';
import { useLanguage } from '../../../contexts/LanguageContext';
import { companyInfo } from '../../../data/companyInfo';

const MissionSection: FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <MotionInView>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <Target className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{companyInfo.mission.title}</h2>
            <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
        </MotionInView>

        <MotionInView>
          <div className="mx-auto max-w-4xl text-lg leading-8 text-gray-700 space-y-6">
            <p className="text-center">
              {companyInfo.mission.description}
            </p>
          </div>
        </MotionInView>

        {/* Background */}
        <MotionInView>
          <div className="mt-12 mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{companyInfo.background.title}</h3>
            <p className="text-lg text-gray-700 text-center">
              {companyInfo.background.description}
            </p>
          </div>
        </MotionInView>

        {/* Keys to Success */}
        <MotionInView>
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Keys to Our Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {companyInfo.keysToSuccess.map((key) => (
                <div
                  key={key.id}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{key.icon}</div>
                    <div className="flex-1">
                      <CheckCircle className="h-5 w-5 text-green-500 mb-2" />
                      <p className="text-gray-800 font-medium">{key.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionInView>

        {/* Quality Statement */}
        <MotionInView>
          <div className="mt-12 bg-blue-600 text-white p-8 rounded-xl text-center max-w-4xl mx-auto">
            <p className="text-xl font-semibold">
              We work in strict compliance with international/national professional standards. Quality, more than a necessity, is erected in value within our firm.
            </p>
            <p className="mt-4 text-lg">
              EXCI-MAA continues to grow everyday thanks to the confidence our clients have in us.
            </p>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default MissionSection;


