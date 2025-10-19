import React, { FC, useMemo, useState } from 'react';
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

// Group Organizational Chart structure sourced from i18n
const useOrgTree = (t: (key: string, options?: any) => any): OrgNode => {
  const chairmanTitle = t('organizationalStructure.chairman.title');
  const chairmanSubtitle = t('organizationalStructure.chairman.subtitle');
  const chairmanDescription = t('organizationalStructure.chairman.description');

  const adminTitle = t('organizationalStructure.adminPartner.title');
  const adminDescription = t('organizationalStructure.adminPartner.description');
  const qcTitle = t('organizationalStructure.qualityCompliance.title');
  const qcSubtitle = t('organizationalStructure.qualityCompliance.subtitle');
  const qcDescription = t('organizationalStructure.qualityCompliance.description');

  const auditTitle = t('organizationalStructure.auditPartner.title');
  const auditDescription = t('organizationalStructure.auditPartner.description');
  const countryDirectorTitle = t('organizationalStructure.countryDirector.title');
  const countryDirectorDescription = t('organizationalStructure.countryDirector.description');
  const specialistsTitle = t('organizationalStructure.specialists.title');
  const specialistsSubtitle = t('organizationalStructure.specialists.subtitle');
  const specialistsDescription = t('organizationalStructure.specialists.description');

  const managementTitle = t('organizationalStructure.managementPartner.title');
  const managementDescription = t('organizationalStructure.managementPartner.description');

  return {
    id: 'chairman',
    title: chairmanTitle,
    subtitle: chairmanSubtitle,
    level: 'top',
    description: chairmanDescription,
    children: [
      {
        id: 'admin-partner',
        title: adminTitle,
        level: 'partner',
        description: adminDescription,
        children: [
          {
            id: 'quality-compliance',
            title: qcTitle,
            subtitle: qcSubtitle,
            level: 'specialist',
            description: qcDescription
          }
        ]
      },
      {
        id: 'audit-partner',
        title: auditTitle,
        level: 'partner',
        description: auditDescription,
        children: [
          {
            id: 'country-director',
            title: countryDirectorTitle,
            level: 'operations',
            description: countryDirectorDescription
          },
          {
            id: 'specialists',
            title: specialistsTitle,
            subtitle: specialistsSubtitle,
            level: 'external',
            description: specialistsDescription,
            isCollateral: true
          }
        ]
      },
      {
        id: 'management-partner',
        title: managementTitle,
        level: 'partner',
        description: managementDescription,
        children: []
      }
    ]
  };
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
  const orgTree = useMemo(() => useOrgTree(t), [t]);

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
            {t('organizationalStructure.title')}
          </h2>
          <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-700">
            {t('organizationalStructure.subtitle')}
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
                  title: t('organizationalStructure.specialists.title'),
                  level: 'external',
                  description: t('organizationalStructure.specialists.description'),
                  subtitle: t('organizationalStructure.specialists.subtitle')
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


