export const servicesData = [
  {
    id: '1',
    titleKey: 'servicesDropdown.services.accountingBookkeeping.title',
    descriptionKey: 'servicesDropdown.services.accountingBookkeeping.description',
    icon: '📊',
    featuresKeys: [
      'serviceModal.features.accounting.bookkeeping',
      'serviceModal.features.accounting.statements',
      'serviceModal.features.accounting.taxCompliance',
      'serviceModal.features.accounting.payroll',
      'serviceModal.features.accounting.reports',
      'serviceModal.features.accounting.budget',
    ],
  },
  {
    id: '2',
    titleKey: 'servicesDropdown.services.auditAssurance.title',
    descriptionKey: 'servicesDropdown.services.auditAssurance.description',
    icon: '🔍',
    featuresKeys: [
      'serviceModal.features.audit.internal',
      'serviceModal.features.audit.taxReviews',
      'serviceModal.features.audit.risk',
      'serviceModal.features.audit.regulatory',
      'serviceModal.features.audit.financial',
      'serviceModal.features.audit.compliance',
    ],
  },
  {
    id: '3',
    titleKey: 'servicesDropdown.services.managerialAdvice.title',
    descriptionKey: 'servicesDropdown.services.managerialAdvice.description',
    icon: '💼',
    featuresKeys: [
      'serviceModal.features.managerial.strategy',
      'serviceModal.features.managerial.planning',
      'serviceModal.features.managerial.optimization',
      'serviceModal.features.managerial.growth',
    ],
  },
  {
    id: '4',
    titleKey: 'servicesDropdown.services.payrollSocial.title',
    descriptionKey: 'servicesDropdown.services.payrollSocial.description',
    icon: '👥',
    featuresKeys: [
      'serviceModal.features.payrollSocial.processing',
      'serviceModal.features.payrollSocial.social',
      'serviceModal.features.payrollSocial.benefits',
      'serviceModal.features.payrollSocial.hr',
    ],
  },
  {
    id: '5',
    titleKey: 'servicesDropdown.services.consolidation.title',
    descriptionKey: 'servicesDropdown.services.consolidation.description',
    icon: '🏢',
    featuresKeys: [
      'serviceModal.features.consolidation.multi',
      'serviceModal.features.consolidation.intercompany',
      'serviceModal.features.consolidation.reporting',
      'serviceModal.features.consolidation.statements',
    ],
  },
  {
    id: '6',
    titleKey: 'servicesDropdown.services.risk.title',
    descriptionKey: 'servicesDropdown.services.risk.description',
    icon: '⚠️',
    featuresKeys: [
      'serviceModal.features.risk.identification',
      'serviceModal.features.risk.mitigation',
      'serviceModal.features.risk.monitoring',
      'serviceModal.features.risk.controls',
    ],
  },
  {
    id: '7',
    titleKey: 'servicesDropdown.services.training.title',
    descriptionKey: 'servicesDropdown.services.training.description',
    icon: '🎓',
    featuresKeys: [
      'serviceModal.features.training.professional',
      'serviceModal.features.training.compliance',
      'serviceModal.features.training.skills',
      'serviceModal.features.training.certification',
      'serviceModal.features.training.workshops',
      'serviceModal.features.training.custom',
    ],
  },
];

// Helper function to get translated service data
export const getTranslatedServices = (t: (key: string) => string) => {
  return servicesData.map(service => ({
    ...service,
    title: t(service.titleKey),
    description: t(service.descriptionKey),
    features: service.featuresKeys.map(key => t(key))
  }));
};

// For backward compatibility
export const services = servicesData;


