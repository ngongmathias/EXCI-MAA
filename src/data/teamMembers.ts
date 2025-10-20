export interface TeamMember {
    id: string;
    name: string;
    title: string;
    qualifications: string[];
    bio: string;
    image: string;
    officeId: string;
    email?: string;
    phone?: string;
    specialties: string[];
  }
  
  export const teamMembers: TeamMember[] = [
    // CAMEROON TEAM
    {
      id: 'pierre-kemeni',
      name: 'Pierre KEMENI',
      title: 'Managing Director & Chairman',
      qualifications: ['MBA', 'CPA', 'CGA', 'FCAA', 'DEC'],
      bio: 'Partner, Managing Director at EXCI-MAA Group. COSUMAF Licensed Chartered Accountant & Statutory Auditor. Registered with ICPAR, ONECCA, CPA Canada, Quebec, Ontario & UK. Former Engagement Director at Deloitte Toronto. Specialist in Management, SYSCOHADA, Account Conversion. Senior International Consultant and Trainer.',
      image: '/images/team/pierre-kemeni.jpg',
      officeId: '1', // Douala
      email: 'pkemeni@excimaa.ca',
      phone: '+237 698 835 251',
      specialties: [
        'International Accounting',
        'Financial Audit',
        'Management Consulting',
        'SYSCOHADA Specialist',
        'Account Conversion',
        'Banking Sector Specialist'
      ]
    },
    {
      id: 'patrick-ngatcha',
      name: 'Patrick NGATCHA',
      title: 'Partner - General Manager',
      qualifications: ['DEC', 'DSCG', 'Master CCA', 'MSTCF'],
      bio: 'Chartered accountant registered with the Institute of Chartered Accountants of Paris Ile de France. Statutory Auditor. Expert in Tax and Financial Audit, Acquisition audit, Consolidation (regulation 99-02 / IFRS).',
      image: '/images/team/patrick-ngatcha.jpg',
      officeId: '1', // Douala
      email: 'pngatcha@excimaa.ca',
      phone: '+237 698 835 251',
      specialties: [
        'Business Development',
        'Financial Consulting',
        'Tax Planning',
        'IFRS',
        'Consolidation',
        'Acquisition Audit'
      ]
    },
    {
      id: 'cloudin-ngong',
      name: 'Lazare Tchouameni',
      title: 'Supervisor - Chartered Accountancy Department',
      qualifications: ['MSc Accounting and Finance'],
      bio: 'Financial Analyst with expertise in Tax and Financial Auditing. Supervises the Chartered Accountancy department operations.',
      image: '/images/team/lazare-TCHOUAMENI.jpg',
      officeId: '1', // Douala
      email: 'cngong@excimaa.ca',
      specialties: [
        'Financial Analysis',
        'Tax Auditing',
        'Financial Auditing',
        'Department Supervision'
      ]
    },
    {
      id: 'janot-hiag',
      name: 'Janot HIAG',
      title: 'Actuarial Evaluator & Oil Cost Auditor',
      qualifications: ['Actuarial Certification'],
      bio: 'Specialist in Oil Cost Auditing, Revenue Security, Asset Inventory and Revaluation, Operational and Legal Auditing, and Statutory Auditing.',
      image: '/images/team/janot-hiag.jpg',
      officeId: '1', // Douala
      email: 'jhiag@excimaa.ca',
      specialties: [
        'Oil Cost Auditing',
        'Revenue Security',
        'Asset Revaluation',
        'Operational Audit',
        'Legal Audit'
      ]
    },
  
    {
      id: 'jean-nahimana',
      name: 'Jean Berchmas',
      title: 'Partner - Financial & Tax Audit',
      qualifications: ['CPA', 'FMVA®', 'BIDA®'],
      bio: 'Chartered Accountant, Member of ICPAR. Financial and Tax Auditor. Senior Accounts Analyst and Financial Modelist with extensive experience in financial planning and analysis.',
      image: 'images/team/jean-berchmas.jpg',
      officeId: '3', // Kigali
      email: 'jnahimana@excimaa.ca',
      specialties: [
        'Financial Audit',
        'Tax Audit',
        'Financial Modeling',
        'Accounts Analysis'
      ]
    },
    {
      id: 'martin-nkwain',
      name: 'Marcel NKWAIN',
      title: 'Regional Manager - East Africa',
      qualifications: ['IPA(UA)', 'IFA(UK)'],
      bio: 'HARDCAT Expert in Fixed Asset Management. Financial and Tax Auditor. International Consultant and Trainer leading EXCI-MAA operations in East Africa.',
      image: '/images/team/marcel-nkwain.jpg',
      officeId: '3', // Kigali
      email: 'mnkwain@excimaa.ca',
      phone: '+250 787 779 965',
      specialties: [
        'Fixed Asset Management',
        'Regional Management',
        'Financial Audit',
        'Tax Audit',
        'International Training'
      ]
    },
  
    // USA TEAM (Washington DC)
    {
      id: 'paul-tchamake',
      name: 'Paul Ngatcha',
      title: 'Partner - International Tax & Transfer Pricing',
      qualifications: ['Ms', 'CPA (USA, France)'],
      bio: 'Certified Chartered Accountant (American and French Regime). International Tax Specialist, ASC 740 (US GAAP Standards). Over 15 years of international financial and tax reporting practice with Big 4 experience at KPMG and PwC USA. Specialist in Transfer Pricing and BEPS.',
      image: '/images/team/olivier-fodji.jpg',
      officeId: '4', // Washington DC
      email: 'ptchamake@excimaa.ca',
      specialties: [
        'International Tax',
        'Transfer Pricing',
        'BEPS',
        'US GAAP',
        'ASC 740',
        'Cross-border Taxation'
      ]
    },
  
    // BURUNDI TEAM
    // {
    //   id: 'diane-dusabe',
    //   name: 'Diane DUSABE',
    //   title: 'Office Manager - Burundi',
    //   qualifications: ['BBA', 'Accounting'],
    //   bio: 'Experienced office manager overseeing EXCI-MAA operations in Burundi. Specializes in client relations and local business development.',
    //   image: '/team/diane-dusabe.jpg',
    //   officeId: '6', // Bujumbura
    //   email: 'ddusabe@excimaa.ca',
    //   phone: '+257 793 439 93',
    //   specialties: [
    //     'Office Management',
    //     'Client Relations',
    //     'Business Development',
    //     'Local Operations'
    //   ]
    // },
    // {
    //   id: 'onesphore-ofodji',
    //   name: 'Onesphore OFODJI',
    //   title: 'Senior Consultant - Burundi',
    //   qualifications: ['CPA', 'MBA'],
    //   bio: 'Senior business consultant specializing in regional market development and financial advisory services for businesses in Burundi.',
    //   image: '/images/team/olivier-fodji.jpg',
    //   officeId: '6', // Bujumbura
    //   email: 'ofodji@excimaa.ca',
    //   specialties: [
    //     'Business Consulting',
    //     'Financial Advisory',
    //     'Market Development',
    //     'Strategic Planning'
    //   ]
    // },
  
    // // CONGO DRC TEAM
    // {
    //   id: 'congo-director',
    //   name: 'Regional Director',
    //   title: 'Director - DRC Operations',
    //   qualifications: ['CPA', 'MBA'],
    //   bio: 'Leading EXCI-MAA operations in the Democratic Republic of Congo, focusing on audit services and business consulting.',
    //   image: '/team/congo-director.jpg',
    //   officeId: '7', // Kinshasa
    //   email: 'kinshasa@excimaa.ca',
    //   phone: '+243 970 284 006',
    //   specialties: [
    //     'Audit Services',
    //     'Business Consulting',
    //     'Regional Operations',
    //     'Tax Advisory'
    //   ]
    // },
  
    // // GABON TEAM
    // {
    //   id: 'gabon-manager',
    //   name: 'Regional Manager',
    //   title: 'Manager - Gabon Operations',
    //   qualifications: ['Expert Comptable', 'CEMAC'],
    //   bio: 'Managing EXCI-MAA services in Gabon with focus on financial audit and corporate advisory for local and international clients.',
    //   image: '/team/gabon-manager.jpg',
    //   officeId: '8', // Libreville
    //   email: 'libreville@excimaa.ca',
    //   phone: '+241 11 76 82 23',
    //   specialties: [
    //     'Financial Audit',
    //     'Corporate Advisory',
    //     'CEMAC Regulations',
    //     'Local Compliance'
    //   ]
    // },
  
    // // DUBAI TEAM
    // {
    //   id: 'dubai-consultant',
    //   name: 'Senior Consultant',
    //   title: 'Senior Business Consultant - Dubai',
    //   qualifications: ['CPA', 'ACCA'],
    //   bio: 'Specialized in international business setup and tax planning for companies expanding into Middle East markets.',
    //   image: '/team/dubai-consultant.jpg',
    //   officeId: '9', // Dubai
    //   email: 'dubai@excimaa.ca',
    //   phone: '+971 50 123 4567',
    //   specialties: [
    //     'Business Setup',
    //     'Tax Planning',
    //     'International Expansion',
    //     'Middle East Markets'
    //   ]
    // },
  
    // // FRANCE TEAM
    // {
    //   id: 'france-partner',
    //   name: 'Partner',
    //   title: 'Partner - France Operations',
    //   qualifications: ['Expert Comptable', 'Commissaire aux Comptes'],
    //   bio: 'Leading European operations with expertise in EU compliance and cross-border consulting.',
    //   image: '/team/france-partner.jpg',
    //   officeId: '5', // Paris
    //   email: 'paris@excimaa.ca',
    //   phone: '+33 652 452 1402',
    //   specialties: [
    //     'EU Compliance',
    //     'Cross-border Consulting',
    //     'European Accounting',
    //     'International Tax'
    //   ]
    // },
  
    // // CANADA TEAM (Additional to Pierre who's also here)
    // {
    //   id: 'canada-consultant',
    //   name: 'Senior Consultant',
    //   title: 'Immigration & Tax Consultant',
    //   qualifications: ['CPA', 'RCIC'],
    //   bio: 'Specializing in Canadian immigration services and international tax planning for new immigrants and businesses.',
    //   image: '/team/canada-consultant.jpg',
    //   officeId: '2', // Toronto
    //   email: 'toronto@excimaa.ca',
    //   phone: '+1 416 624 2510',
    //   specialties: [
    //     'Immigration Services',
    //     'International Tax',
    //     'Financial Planning',
    //     'Business Immigration'
    //   ]
    // }
  ];
  
  // Helper function to get team members by office
  export const getTeamMembersByOffice = (officeId: string): TeamMember[] => {
    return teamMembers.filter(member => member.officeId === officeId);
  };