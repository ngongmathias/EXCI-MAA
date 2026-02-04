import React from 'react';
import AccountingNewsSection from '../components/pages/insights/AccountingNewsSection';
import DatabaseTest from '../components/debug/DatabaseTest';

const AccountingNewsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Accounting & Financial News
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest developments from IFAC, IASB, FASB, and leading accounting publications worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Debug Section - Temporary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DatabaseTest />
      </div>

      {/* Main Content */}
      <AccountingNewsSection />
    </div>
  );
};

export default AccountingNewsPage;
