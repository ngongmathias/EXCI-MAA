import { FC } from 'react';
import { CheckCircle } from 'lucide-react';
import MotionInView from '../../enhanced/MotionInView';
import { companyInfo } from '../../../data/companyInfo';

const KeysToSuccessSection: FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Keys to Success */}
        <MotionInView>
          <div>
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

export default KeysToSuccessSection;
