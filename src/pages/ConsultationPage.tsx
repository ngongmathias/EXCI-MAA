import { FC } from 'react';
import ConsultationForm from '../components/pages/consultation/ConsultationForm';
import MotionInView from '../components/enhanced/MotionInView';

const ConsultationPage: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionInView>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Request a Consultation</h1>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Tell us about your company, where you operate, and the services you need. Our team will follow up promptly.
              </p>
            </div>
          </MotionInView>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationPage;


