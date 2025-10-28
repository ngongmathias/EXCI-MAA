// Enhanced Services from Firm Profile
// Comprehensive service offerings of EXCI-MAA

export interface ServiceCategory {
  id: string;
  category: string;
  icon: string;
  description: string;
  services: string[];
}

export const enhancedServices: ServiceCategory[] = [
  {
    id: 'audit-assurance',
    category: 'Audit & Assurance',
    icon: '🔍',
    description: 'Comprehensive audit services ensuring compliance and transparency',
    services: [
      'Control of Financial Information',
      'Statutory audits',
      'Audit of company accounts, combined and consolidated accounts',
      'Splits, mergers and corporate restructuring audits',
      'Contractual audits',
      'Audit of NGO projects',
      'Forecast accounts',
      'Audit of oil costs',
      'Internal control and risk assessment',
      'Regulatory compliance audits',
    ],
  },
  {
    id: 'tax-legal',
    category: 'Tax & Legal Services',
    icon: '⚖️',
    description: 'Expert tax planning and legal advisory services',
    services: [
      'Tax arbitration',
      'Tax Advice & Tax Compliance',
      'Transfer pricing',
      'International taxation',
      'Legal advice: Constitution, OHADA Update, Audit, Legal Secretariat',
      'Fiscal Law: Due diligence',
      'Social Law: Recruitment, Employment Contract, Paycheck Declarations, Audit',
      'Tax declarations and filings',
    ],
  },
  {
    id: 'advisory-consulting',
    category: 'Advisory & Consulting',
    icon: '💼',
    description: 'Strategic business advisory and management consulting',
    services: [
      'Analytics and Operations Optimization',
      'Business plans and Strategy development',
      'Audits and management consultancy',
      'Transactions-Financial Mutations-Legal assistance',
      'Governance and risk management',
      'Bankruptcy Advice and Corporate Reorganization',
      'Business development consulting',
      'Performance improvement',
    ],
  },
  {
    id: 'technology-systems',
    category: 'Technology & Digital Solutions',
    icon: '💻',
    description: 'Modern ERP implementation and digital transformation',
    services: [
      'Digital Business & Integrated Management System',
      'SAP implementation and support',
      'ORACLE solutions',
      'MAGNITUDE systems',
      'SAGE X3 implementation',
      'HARDCAT-Fixed Asset Management (Asset Management with Bar Codes)',
      'ERP Implementation and IT Solutions',
      'Digital transformation consulting',
    ],
  },
  {
    id: 'accounting-finance',
    category: 'Accounting & Finance',
    icon: '📊',
    description: 'Complete accounting and financial management services',
    services: [
      'Accounting and Tax assistance',
      'Annual or projected financial statements',
      'Setting up an accounting organization',
      'Management Software Bookkeeping',
      'Declaration of taxes',
      'Business plan development',
      'Credit Portfolio Analysis',
      'Rating and Evaluations',
      'Financial modeling',
    ],
  },
  {
    id: 'training',
    category: 'Training & Development',
    icon: '🎓',
    description: 'Professional training and capacity building programs',
    services: [
      'International and local taxation systems',
      'Transfer pricing training',
      'Financial statements and year-end procedures',
      'Management of fixed assets and purchases',
      'International treaties and agreements',
      'Group accounting and consolidation of Financial Statements',
      'Insurance Financial Statements and Reporting Templates',
      'International Financial Reporting Standards (IFRS)',
      'Public Sector Accounting (IPSAS)',
      'Internal control Fraud Detection and Prevention',
      'Business development and project management',
      'Financial management',
      'Taxation in the digital economy',
    ],
  },
  {
    id: 'specialized',
    category: 'Specialized Services',
    icon: '⭐',
    description: 'Industry-specific and specialized solutions',
    services: [
      'Insurance experience Center',
      'Facility Management & Mycodebar',
      'Facilities Management',
      'Electronic management of stock and assets by bar codes',
      'Oil and gas sector consulting',
      'Mining sector advisory',
      'Banking sector specialist services',
    ],
  },
];
