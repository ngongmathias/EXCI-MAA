import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Globe, DollarSign, Calendar, Users } from 'lucide-react';

const Training: FC = () => {
  const trainingCategories = [
    {
      title: 'Accounting / Taxation / Social',
      courses: [
        'How to keep and organize business accounts',
        'How to create or prepare a tax return and its annexes',
        'VAT deductibility and reporting rules',
        'How to anticipate and manage your tax audits',
        'The VAT problem in CONGO, CAMEROON, RWANDA, BURUNDI, GABON',
        'Establish your operating account and cash flow plan with confidence',
        'Techniques for detecting fraud in tax returns',
        'Impact of ARD and tax deficits on taxable income',
        'Framework between the DAS, declarations and the DSF: Case of a CNSS control',
        'Creation of an accounting allocation manual'
      ],
      price: '$299',
      duration: '3 days'
    },
    {
      title: 'Statutory audit / Management control',
      courses: [
        'Why audit your accounts?',
        'Accounting and Financial Audit Methodology',
        'What is the impact of the audit on the tax return?',
        'Theory and practice of internal auditing in SMEs, Banks and Insurance',
        'Theory and practice of management control',
        'Dashboards and performance evaluation',
        'External audit (Audit firm)',
        'Internal Audit – Planning and Execution',
        'Statutory audit',
        'Optimal management of your cash flow, particularly your overdraft',
        'Understanding treasury expectations from the subsidiary and head office perspective',
        'Balance your supplier payments with your customer collections',
        'Evaluation of your information system – ICT IS',
        'Understand ERPs, their processes and see if your business may need them',
        'Review of fundamental concepts in internal control',
        'Review of fundamental concepts in internal auditing',
        'Detect and prevent fraud',
        'Risk management in the advertising sector'
      ],
      price: '$399',
      duration: '5 days'
    },
    {
      title: 'Advice',
      courses: [
        'The practice of consolidated accounts and the treatment of deferred taxes',
        'Understanding the basics and major issues of international taxation: Transfer pricing',
        'Evaluation of companies in the OHADA area',
        'Balance sheet revaluation: a necessity for all companies',
        'Practice of merger, demerger and liquidation in the OHADA area',
        'How to practice account consolidation in the OHADA area',
        'Writing a bankable business plan',
        'Business creation methodology',
        'Mergers – Acquisitions',
        'Legal, social and tax audit',
        'Support for drafting an internal control procedures manual'
      ],
      price: '$349',
      duration: '4 days'
    },
    {
      title: 'Various themes',
      courses: [
        'How to handle difficult customers',
        'Unleash your charisma and develop your leadership in business and beyond',
        'Quality in the office / Company',
        'How to become a Financial/Management Controller or CFO and effective techniques',
        'Use accounting and management control to control banking risks',
        'OHADA Business Law',
        'Corporate taxation',
        'Master and audit permanent banking control',
        'Compliance audit of regulatory systems in insurance'
      ],
      price: '$199',
      duration: '2 days'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Training Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Below we present our various training offers:
          </p>
          
          {/* Training Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Training locations: Our sessions take place in our offices in Douala and Pointe-Noire, for groups of less than ten people.</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">International training: We have the capacity to organize training in all the countries where we are present.</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Financial terms: Costs may vary depending on the geographical location where the training is provided.</span>
            </div>
          </div>
        </div>

        {/* Training Categories */}
        <div className="space-y-12">
          {trainingCategories.map((category, index) => (
            <div key={index} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{category.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max 10 participants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-blue-600">{category.price}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/training"
                  className="btn-primary mt-4 lg:mt-0 inline-flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Submit your request</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Advance Your Career?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our professional training programs and gain the skills needed to excel in accounting, 
              auditing, and business consulting.
            </p>
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Book Your Training</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;