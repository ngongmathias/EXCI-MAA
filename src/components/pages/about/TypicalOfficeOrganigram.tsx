import { FC } from 'react';
import { motion } from 'framer-motion';

// Define types for the organigram nodes
type OrgNode = {
  id: string;
  title: string;
  level: 'root' | 'division' | 'subdivision';
  services?: string[];
  children?: OrgNode[];
};

// Data structure for the organigram, matching the image exactly
const typicalOrganigramData: OrgNode = {
  id: 'office-manager',
  title: 'Office Manager / Director',
  level: 'root',
  children: [
    {
      id: 'audit',
      title: 'AUDIT',
      level: 'division',
      children: [
        {
          id: 'audit-legal',
          title: 'Legal',
          level: 'subdivision',
          services: [
            '- Statutory audits',
            '- Audit of company accounts, combined and consolidated accounts',
            '- splits, mergers etc',
          ],
        },
        {
          id: 'audit-contractual',
          title: 'Contractual',
          level: 'subdivision',
          services: [
            '- Audit of NGO projects',
            '- Forecast accounts',
            '- Audit of oil costs',
            '- Internal control',
          ],
        },
      ],
    },
    {
      id: 'advisory',
      title: 'ADVISORY',
      level: 'division',
      children: [
        {
          id: 'advisory-tax-social',
          title: 'Tax & Social',
          level: 'subdivision',
          services: [
            'Legal advice::',
            'Constitution, OHADA Update, Audit, Legal Secretariat ...',
            'Fiscal Law:',
            'Due diligence',
            'Tax Advice & Tax Compliance, Audit',
            'Social Law:',
            'Recruitment,',
            'Employment Contract',
            'Paycheck',
            'Declarations, Audit',
          ],
        },
        {
          id: 'advisory-trainings',
          title: 'TrainingS',
          level: 'subdivision',
          services: [
            '- Trainings',
            '- Choice of Themes in our annual panel',
          ],
        },
        {
          id: 'advisory-finance',
          title: 'Finance',
          level: 'subdivision',
          services: [
            '- Business plan',
            '- Credit Portfolio Analysis',
            '- Rating',
            '- Evaluations',
          ],
        },
      ],
    },
    {
      id: 'management',
      title: 'MANAGEMENT',
      level: 'division',
      children: [
        {
          id: 'management-accounting-tax',
          title: 'Accounting and Tax assistance',
          level: 'subdivision',
          services: [
            '- Annual or projected financial statements',
            '- Setting up an accounting organization',
            '- Management Software',
            'Bookkeeping',
            '- Declaration of taxes',
          ],
        },
        {
          id: 'management-facility-mycodebar',
          title: 'Facility Management & Mycodebar',
          level: 'subdivision',
          services: [
            '- Facilities Management',
            '- Electronic management of stock and assets by bar codes',
          ],
        },
      ],
    },
  ],
};

// Helper component for the main blue boxes
const OrgBox: FC<{ node: OrgNode }> = ({ node }) => {
  let bgColor = 'bg-blue-600'; // Default for root
  if (node.level === 'division') bgColor = 'bg-blue-500';
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
  >
    <ul className="list-disc list-inside space-y-1">
      {services.map((service, index) => (
        <li key={index}>{service}</li>
      ))}
    </ul>
  </motion.div>
);

// Connector lines
const VerticalLine: FC<{ height?: string }> = ({ height = 'h-8' }) => (
  <div className="flex justify-center">
    <div className={`w-0.5 bg-gray-400 ${height}`} />
  </div>
);

const HorizontalLine: FC = () => (
  <div className="w-full h-0.5 bg-gray-400" />
);

const TypicalOfficeOrganigram: FC = () => {
  return (
    <section className="bg-gray-50 py-16 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            TYPICAL ORGANIGRAM OF AN OFFICE
          </h2>
          <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Root: Office Manager / Director */}
        <div className="flex flex-col items-center mb-8">
          <OrgBox node={typicalOrganigramData} />
          <VerticalLine />
        </div>

        {/* Second Level: Divisions (AUDIT, ADVISORY, MANAGEMENT) */}
        <div className="relative flex justify-center w-full mb-24">
          <HorizontalLine /> {/* Horizontal line connecting divisions */}
          <div className="absolute top-0 flex justify-around w-full max-w-6xl px-4">
            {typicalOrganigramData.children?.map((division) => (
              <div key={division.id} className="flex flex-col items-center mx-4">
                <VerticalLine height="h-4" /> {/* Short vertical line up to horizontal */}
                <OrgBox node={division} />
                <VerticalLine /> {/* Vertical line down to subdivisions */}

                {/* Third Level: Sub-divisions and Services */}
                <div className="flex flex-col items-center w-full mt-4 space-y-4">
                  {division.children?.map((subdivision) => (
                    <div key={subdivision.id} className="flex flex-col items-center">
                      <OrgBox node={subdivision} />
                      {subdivision.services && <ServiceBox services={subdivision.services} />}
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
