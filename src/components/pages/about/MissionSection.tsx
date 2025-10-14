import { FC } from 'react';
import MotionInView from '../../enhanced/MotionInView';

const MissionSection: FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionInView>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
            <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
        </MotionInView>

        <MotionInView>
          <div className="mx-auto max-w-4xl text-lg leading-8 text-gray-700 space-y-6">
            <p>
              Our primary mission is to support and accompany companies operating in the African market toward financial excellence. Leveraging deep knowledge of both for-profit and non-profit sectors, we deliver advisory, statutory audit, and consulting engagements tailored to every organization size.
            </p>
            <p>
              Our solutions are designed to address the specific needs of businesses across the African continent, providing end-to-end service and real added value—at a fair budget. Our multidisciplinary and multicultural team ensures bespoke support, adapted to the scale and capabilities of your structure.
            </p>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default MissionSection;


