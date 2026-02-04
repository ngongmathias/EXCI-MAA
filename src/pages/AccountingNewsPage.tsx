import React from 'react';
import AccountingNewsSectionFallback from '../components/pages/insights/AccountingNewsSectionFallback';

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

      {/* Main Content */}
      <AccountingNewsSectionFallback />
    </div>
  );
};

export default AccountingNewsPage;
