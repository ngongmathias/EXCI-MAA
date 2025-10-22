import { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

// Define types for the organigram nodes
type OrgNode = {
  id: string;
  title: string;
  level: 'root' | 'division' | 'subdivision';
  services?: string[];
  children?: OrgNode[];
};

// Build organigram data from i18n keys
const buildTypicalOrganigramData = (t: (key: string, options?: any) => any): OrgNode => {
  const officeManagerTitle = t('typicalOfficeOrganigram.officeManager.title');

  const auditTitle = t('typicalOfficeOrganigram.audit.title');
  const auditLegalTitle = t('typicalOfficeOrganigram.audit.legal.title');
  const auditLegalServices: string[] = t('typicalOfficeOrganigram.audit.legal.services', { returnObjects: true });
  const auditContractualTitle = t('typicalOfficeOrganigram.audit.contractual.title');
  const auditContractualServices: string[] = t('typicalOfficeOrganigram.audit.contractual.services', { returnObjects: true });

  const advisoryTitle = t('typicalOfficeOrganigram.advisory.title');
  const taxSocialTitle = t('typicalOfficeOrganigram.advisory.taxSocial.title');
  const taxSocialServices: string[] = t('typicalOfficeOrganigram.advisory.taxSocial.services', { returnObjects: true });
  const trainingTitle = t('typicalOfficeOrganigram.advisory.training.title');
  const trainingServices: string[] = t('typicalOfficeOrganigram.advisory.training.services', { returnObjects: true });
  
  const managementTitle = t('typicalOfficeOrganigram.management.title');
  const financeTitle = t('typicalOfficeOrganigram.advisory.finance.title');
  const financeServices: string[] = t('typicalOfficeOrganigram.advisory.finance.services', { returnObjects: true });
  const accountingTitle = t('typicalOfficeOrganigram.management.accounting.title');
  const accountingServices: string[] = t('typicalOfficeOrganigram.management.accounting.services', { returnObjects: true });
  const facilityTitle = t('typicalOfficeOrganigram.management.facility.title');
  const facilityServices: string[] = t('typicalOfficeOrganigram.management.facility.services', { returnObjects: true });

  return {
    id: 'office-manager',
    title: officeManagerTitle,
    level: 'root',
    children: [
      {
        id: 'audit',
        title: auditTitle,
        level: 'division',
        children: [
          {
            id: 'audit-legal',
            title: auditLegalTitle,
            level: 'subdivision',
            services: auditLegalServices.map((s) => `${s}`),
          },
          {
            id: 'audit-contractual',
            title: auditContractualTitle,
            level: 'subdivision',
            services: auditContractualServices.map((s) => `${s}`),
          },
        ],
      },
      {
        id: 'advisory',
        title: advisoryTitle,
        level: 'division',
        children: [
          {
            id: 'advisory-tax-social',
            title: taxSocialTitle,
            level: 'subdivision',
            services: taxSocialServices.map((s) => `${s}`),
          },
          {
            id: 'advisory-trainings',
            title: trainingTitle,
            level: 'subdivision',
            services: trainingServices.map((s) => `${s}`),
          },
        ],
      },
      {
        id: 'management',
        title: managementTitle,
        level: 'division',
        children: [
          {
            id: 'management-finance',
            title: financeTitle,
            level: 'subdivision',
            services: financeServices.map((s) => `${s}`),
          },
          {
            id: 'management-accounting-tax',
            title: accountingTitle,
            level: 'subdivision',
            services: accountingServices.map((s) => `${s}`),
          },
          {
            id: 'management-facility-mycodebar',
            title: facilityTitle,
            level: 'subdivision',
            services: facilityServices.map((s) => `${s}`),
          },
        ],
      },
    ],
  };
};

// Helper component for the main blue boxes
const OrgBox: FC<{ node: OrgNode }> = ({ node }) => {
  let bgColor = 'bg-blue-400'; // Default for root
  if (node.level === 'division') bgColor = 'bg-blue-400';
  if (node.level === 'subdivision') bgColor = 'bg-blue-400';

  return (
    <motion.div
      className={`flex items-center justify-center p-2 text-center text-white font-semibold rounded-md shadow-md ${bgColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minWidth: node.level === 'root' ? '200px' : '150px', minHeight: '50px' }}
    >
      {node.title}
    </motion.div>
  );
};

// Helper component for the light blue service boxes
const ServiceBox: FC<{ services: string[] }> = ({ services }) => (
  <motion.div
    className="mt-4 p-4 bg-blue-100 text-gray-800 text-sm rounded-lg shadow-sm border border-blue-200"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    style={{ width: '100%' }}
  >
    <ul className="list-inside space-y-1">
      {services.map((service, index) => (
        <li key={index} className="text-left">{service}</li>
      ))}
    </ul>
  </motion.div>
);

// Connector lines
const VerticalLine: FC<{ height?: string }> = ({ height = 'h-8' }) => (
  <div className="flex justify-center">
    <div className={`w-0.5 bg-gray-500 ${height}`} />
  </div>
);

const HorizontalLine: FC = () => (
  <div className="w-full h-0.5 bg-gray-500" />
);

const TypicalOfficeOrganigram: FC = () => {
  const { t } = useLanguage();
  const typicalOrganigramData = useMemo(() => buildTypicalOrganigramData(t), [t]);
  
  return (
    <section className="bg-white py-8 pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with logos and title */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-blue-400 text-white py-2 px-6 text-center font-bold text-xl rounded-md shadow-md mx-2 flex-grow">
            {t('typicalOfficeOrganigram.title')}
          </div>
        </div>

        {/* Root: Office Manager / Director */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-400 text-white p-2 px-6 text-center font-semibold rounded-md border-2 border-blue-700 shadow-md mb-2" style={{ width: '240px' }}>
            {typicalOrganigramData.title}
          </div>
          <VerticalLine height="h-6" />
        </div>

        {/* Second Level: Divisions (AUDIT, ADVISORY, MANAGEMENT) */}
        <div className="relative flex justify-center w-full mb-12">
          <HorizontalLine /> {/* Horizontal line connecting divisions */}
          <div className="absolute top-0 flex justify-between w-full px-4">
            {typicalOrganigramData.children?.map((division, index) => (
              <div key={division.id} className="flex flex-col items-center" style={{ width: '30%' }}>
                <VerticalLine height="h-4" /> {/* Short vertical line up to horizontal */}
                <div className="bg-blue-400 text-white p-2 px-4 text-center font-semibold rounded-md border-2 border-blue-400 shadow-md mb-4 w-full">
                  {division.title}
                </div>
                <VerticalLine height="h-6" /> {/* Vertical line down to subdivisions */}

                {/* Third Level: Sub-divisions and Services */}
                <div className="grid grid-cols-1 gap-y-6 mt-2 w-full">
                  {division.children?.map((subdivision) => (
                    <div key={subdivision.id} className="flex flex-col items-center w-full">
                      <div className="bg-blue-400 text-white p-2 text-center font-semibold rounded-md border-2 border-blue-400 shadow-md w-full mb-1">
                        {subdivision.title}
                      </div>
                      {subdivision.services && (
                        <div className="bg-blue-50 border-2 border-blue-200 p-3 rounded-md text-xs w-full shadow-sm">
                          {subdivision.services.map((service, idx) => (
                            <div key={idx} className="mb-2 text-left" style={{ lineHeight: '1.2' }}>
                              {service.startsWith('-') ? service : `- ${service}`}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypicalOfficeOrganigram;
