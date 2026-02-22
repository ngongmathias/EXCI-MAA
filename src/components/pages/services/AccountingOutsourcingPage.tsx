import { FC } from 'react';
import Meta from '../../common/Meta';
import ServiceDetailLayout from './ServiceDetailLayout';

const AccountingOutsourcingPage: FC = () => (
    <>
        <Meta
            title="Accounting & Outsourcing"
            description="Bookkeeping, management reporting, consolidation, and IFRS/OHADA conversion support for businesses across Africa."
        />
        <ServiceDetailLayout
            accentColor="blue"
            badgeLabel="Accounting & Outsourcing"
            title="Accounting & Outsourcing"
            tagline="Accurate books, timely reports, and a finance function that scales with your business — without the overhead."
            whatWeDo={{
                intro:
                    'We provide full-scope accounting and finance outsourcing services, from day-to-day bookkeeping through to group consolidation and management reporting. Our teams embed into your operations and deliver consistent, audit-ready output.',
                bullets: [
                    'Bookkeeping and monthly close (transaction processing, bank reconciliations)',
                    'Management accounts and KPI packs (monthly / quarterly)',
                    'Consolidation and group reporting for multi-entity structures',
                    'IFRS and OHADA (SYSCOHADA) conversion and compliance',
                    'Accounts payable and receivable management',
                    'Fixed asset register maintenance',
                    'Year-end audit preparation and support packages',
                    'CFO-on-demand and interim financial management',
                ],
            }}
            whoItIsFor={[
                'Start-ups and SMEs that need a finance function without a full-time team',
                'Multinationals with African subsidiaries requiring standardised reporting',
                'NGOs and donor projects that need clean, audit-ready books',
                'Groups preparing for statutory audit or investor due diligence',
                'Companies transitioning between accounting frameworks (e.g., OHADA to IFRS)',
            ]}
            deliverables={[
                'Monthly management accounts package',
                'Bank reconciliation statements',
                'KPI dashboard / financial dashboard',
                'Consolidated financial statements',
                'IFRS/OHADA conversion report and restated figures',
                'Audit preparation file',
            ]}
            process={[
                {
                    step: 1,
                    title: 'Onboarding & Chart of Accounts Setup',
                    description: 'Review existing records, agree reporting structure and deadlines, connect to your systems or establish new workflows.',
                },
                {
                    step: 2,
                    title: 'Ongoing Processing',
                    description: 'Process transactions, reconcile accounts, and maintain the ledger on an agreed cycle (weekly, monthly).',
                },
                {
                    step: 3,
                    title: 'Reporting & Review',
                    description: 'Deliver management accounts, KPI packs, and any group submissions by agreed deadlines. Review calls with management as needed.',
                },
                {
                    step: 4,
                    title: 'Year-End & Audit Support',
                    description: 'Prepare the year-end file, lead-schedule packs, and liaise with external auditors to ensure a smooth audit process.',
                },
            ]}
            timeline="Ongoing monthly service. Onboarding: 2–4 weeks."
            faqs={[
                {
                    question: 'Which accounting software do you work with?',
                    answer: 'We work with Sage, QuickBooks, Xero, SAP, and custom ERP systems. We can also bring our own tools if required.',
                },
                {
                    question: 'Can you handle OHADA accounting alongside IFRS?',
                    answer: 'Yes. Our teams are trained in both SYSCOHADA and IFRS. We can maintain dual sets of books or prepare reconciliations between the two frameworks.',
                },
                {
                    question: 'How do you protect data confidentiality?',
                    answer: 'All client data is handled under strict confidentiality agreements. Access is role-based and our systems follow standard data security protocols.',
                },
                {
                    question: 'Can this replace our in-house finance team?',
                    answer: 'For many clients, yes. We can act as a fully outsourced finance function or supplement an existing team during peak periods or transitions.',
                },
            ]}
        />
    </>
);

export default AccountingOutsourcingPage;
