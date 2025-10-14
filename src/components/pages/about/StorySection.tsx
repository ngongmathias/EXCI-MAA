import { FC } from 'react';
import MotionInView from '../../enhanced/MotionInView';

const StorySection: FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <MotionInView>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Story</h2>
              <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-lg leading-8 text-gray-700 mb-5">
                EXCI-MAA was founded by experts in audit, accounting, taxation, business development, management information systems, and law. With a presence in Canada, the United States, France, the United Kingdom, and across Africa, we bring international expertise tailored to each local context.
              </p>
              <p className="text-lg leading-8 text-gray-700 mb-5">
                We operate across the entire value chain of our clients' activities, ensuring transparency and compliance with stakeholders. Our firm accompanies organizations in multiple countries through a strong network and on-the-ground teams, offering proximity service and solutions adapted to local realities.
              </p>
              <p className="text-lg leading-8 text-gray-700">
                Today, we continue to expand our footprint while staying true to our founding principles: excellence, integrity, and impact. From statutory and contractual audits to risk management and personalized advisory, our teams deliver durable, effective missions that drive sustainable results.
              </p>
            </div>
          </MotionInView>
          <MotionInView>
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What we do</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Support for development, merger, creation or transformation projects</li>
                  <li>Statutory or contractual audit</li>
                  <li>Accounting expertise</li>
                  <li>Internal control analysis and risk management</li>
                  <li>Oil cost audit</li>
                  <li>Personalized consulting for enterprises and SMEs</li>
                </ul>
              </div>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
};

export default StorySection;


