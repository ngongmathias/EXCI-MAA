import React, { FC, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import Modal from '../../../components/ui/Modal';
import { motion } from 'framer-motion';

type OrgNode = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  level?: string;
  children?: OrgNode[];
  isCollateral?: boolean; // For connecting lines that aren't direct reports
};

// Group Organizational Chart structure based on the screenshot
const orgTree: OrgNode = {
  id: 'chairman',
  title: 'Partner',
  subtitle: 'Chairman of the Board of Directors\nDirector of development',
  level: 'top',
  description: 'Overall leadership and strategic direction of EXCI-MAA Group.',
  children: [
    {
      id: 'admin-partner',
      title: 'Partner, General Administration, Finance & HR',
      level: 'partner',
      description: 'Oversees administration, finance, and human resources.',
      children: [
        {
          id: 'quality-compliance',
          title: 'Partner',
          subtitle: 'Quality & Compliance Officer',
          level: 'specialist',
          description: 'Ensures quality standards and compliance across the organization.'
        }
      ]
    },
    {
      id: 'audit-partner',
      title: 'Partner Audit & Consulting',
      level: 'partner',
      description: 'Leads audit and consulting operations.',
      children: [
        {
          id: 'country-director',
          title: 'Country Director accountants Senior and Junior Auditors',
          level: 'operations',
          description: 'Manages country operations with accounting and audit teams.'
        },
        {
          id: 'specialists',
          title: 'Specialists & External Consultants',
          subtitle: '(Doctors, Engineers, Lawyers, Sociologists, Seniors, Juniors ... ETC)',
          level: 'external',
          description: 'Multidisciplinary team of external consultants and specialists.',
          isCollateral: true
        }
      ]
    },
    {
      id: 'management-partner',
      title: 'Partner Management & Organization',
      level: 'partner',
      description: 'Handles management and organizational development.',
      children: []
    }
  ]
};

const NodeCard = ({ node, onClick, isRoot = false, isPartner = false }: { 
  node: OrgNode; 
  onClick: (n: OrgNode) => void; 
  isRoot?: boolean;
  isPartner?: boolean;
}) => {
  const getCardStyle = () => {
    if (isRoot) return 'bg-blue-700 text-white border-blue-700 shadow-lg min-w-[200px]';
    if (isPartner) return 'bg-blue-600 text-white border-blue-600 shadow-md min-w-[180px]';
    return 'bg-blue-600 text-white border-blue-600 shadow-sm min-w-[160px]';
  };

  return (
    <motion.button
      onClick={() => onClick(node)}
      className={`group text-center rounded-lg border-2 transition-all duration-200 hover:scale-105 ${getCardStyle()}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4">
        <div className="text-xs font-bold text-white leading-tight">
          {node.title}
        </div>
        {node.subtitle && (
          <div className="text-xs text-white/90 mt-1 leading-tight whitespace-pre-line">
            {node.subtitle}
          </div>
        )}
      </div>
    </motion.button>
  );
};

// Vertical connector line from top to partners
const VerticalConnector = ({ height = 'h-12' }: { height?: string }) => (
  <div className="flex justify-center mb-6">
    <div className={`w-1 bg-gray-600 ${height}`} />
  </div>
);

// Horizontal connector for partners level
const PartnersConnector = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full max-w-6xl">
    {/* Main horizontal line connecting all partners */}
    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 transform -translate-y-1/2" />
    <div className="flex justify-between items-start relative z-10">
      {children}
    </div>
  </div>
);

// Vertical connector from partner to children
const PartnerToChildrenConnector = ({ hasChildren }: { hasChildren?: boolean }) => (
  <div className="flex justify-center my-6">
    {hasChildren && <div className="w-1 bg-gray-600 h-8" />}
  </div>
);

// Individual vertical connector for each child item
const ChildConnector = () => (
  <div className="flex justify-center mb-2">
    <div className="w-1 bg-gray-600 h-6" />
  </div>
);

const OrganizationalStructure: FC = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<OrgNode | null>(null);

  return (
    <section className="bg-gray-50 py-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            GROUP ORGANIZATIONAL CHART
          </h2>
          <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-700">
            {t(
              'aboutPage.organization.subtitle',
              'EXCI-MAA Group Structure - Click any box to view details.'
            )}
          </p>
        </motion.div>

        {/* Group Organizational Chart Structure */}
        <div className="flex flex-col items-center space-y-12">
          {/* Top Level: Chairman */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NodeCard node={orgTree} onClick={setSelected} isRoot />
          </motion.div>

          {/* Vertical connector from top to partners */}
          <VerticalConnector height="h-16" />

          {/* Second Level: Three Partners */}
          <motion.div 
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PartnersConnector>
              {orgTree.children?.map((partner, index) => (
                <motion.div 
                  key={partner.id}
                  className="flex flex-col items-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {/* Partner Card */}
                  <NodeCard 
                    node={partner} 
                    onClick={setSelected} 
                    isPartner 
                  />
                  
                  {/* Vertical connector from partner */}
                  {partner.children && partner.children.length > 0 && (
                    <PartnerToChildrenConnector hasChildren={true} />
                  )}
                  
                  {/* Children boxes */}
                  {partner.children && partner.children.length > 0 && (
                    <div className="flex flex-col space-y-4 items-center">
                      {partner.children.map((child, childIndex) => (
                        <motion.div 
                          key={child.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 + childIndex * 0.1 }}
                          className="flex flex-col items-center"
                        >
                          <ChildConnector />
                          <NodeCard 
                            node={child} 
                            onClick={setSelected} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </PartnersConnector>
          </motion.div>

          {/* Special Collateral Connection for Management & Organization to Specialists */}
          <motion.div 
            className="relative w-full max-w-6xl mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {/* Horizontal line from Management & Organization to Specialists */}
            <div className="absolute top-1/2 left-3/4 right-0 h-1 bg-gray-600 transform -translate-y-1/2" />
            <div className="flex justify-end">
              <NodeCard 
                node={orgTree.children?.[1]?.children?.[1] || { 
                  id: 'specialists', 
                  title: 'Specialists & External Consultants', 
                  level: 'external', 
                  description: 'External consultants', 
                  subtitle: '(Doctors, Engineers, Lawyers, Sociologists, Seniors, Juniors ... ETC)' 
                }}
                onClick={setSelected} 
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal with detailed information */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected?.description && (
          <p className="text-gray-700 mb-4">{selected.description}</p>
        )}
        {selected?.subtitle && (
          <div className="text-sm text-gray-600 mb-4 whitespace-pre-line">
            {selected.subtitle}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default OrganizationalStructure;


