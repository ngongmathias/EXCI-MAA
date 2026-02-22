import { FC } from 'react';
import Meta from '../../common/Meta';
import ServiceDetailLayout from './ServiceDetailLayout';

const PayrollHRPage: FC = () => (
    <>
        <Meta
            title="Payroll & HR Compliance"
            description="End-to-end payroll processing, social security filings, and HR compliance services across multiple African jurisdictions."
        />
        <ServiceDetailLayout
            accentColor="blue"
            badgeLabel="Payroll & HR Compliance"
            title="Payroll & HR Compliance"
            tagline="Accurate, on-time payroll and full statutory compliance — across every jurisdiction where you operate."
            whatWeDo={{
                intro:
                    'We manage the full payroll lifecycle and ensure compliance with local labour laws, social security obligations, and statutory filing requirements. Our service removes the risk of penalties and administrative burden from your team.',
                bullets: [
                    'Monthly payroll processing (gross-to-net computation)',
                    'Payslip generation and employee communication',
                    'Social security and CNPS/CNSS registration and filings',
                    'Income tax withholding (PAYE) calculation and remittance',
                    'Statutory leave, allowance, and benefit calculations',
                    'Termination and severance computation',
                    'HR compliance reviews and employment contract advisory',
                    'Labour law advisory for new market entries',
                ],
            }}
            whoItIsFor={[
                'Multinationals employing staff across multiple African countries',
                'SMEs without a dedicated HR or payroll function',
                'Companies expanding into new markets and establishing their first payroll',
                'NGOs and donor projects with specific reporting requirements',
                'Foreign companies with local employees subject to domestic labour law',
            ]}
            deliverables={[
                'Monthly payroll register and payslips',
                'PAYE / withholding tax payment confirmations',
                'Social security filing receipts',
                'Payroll journal for accounting integration',
                'HR compliance assessment report',
                'Employment contract templates (jurisdiction-specific)',
            ]}
            process={[
                {
                    step: 1,
                    title: 'Setup & Data Collection',
                    description: 'Collect employee data, align on compensation structures, confirm statutory deduction requirements per jurisdiction.',
                },
                {
                    step: 2,
                    title: 'Monthly Processing',
                    description: 'Process payroll, apply all statutory deductions and allowances, generate payslips and reports.',
                },
                {
                    step: 3,
                    title: 'Filing & Remittance',
                    description: 'Submit social security and tax filings, confirm payment receipts, and maintain a compliance calendar.',
                },
                {
                    step: 4,
                    title: 'Reporting & Reconciliation',
                    description: 'Deliver payroll journals for accounting, annual payroll summaries, and year-end regulatory filings.',
                },
            ]}
            timeline="Ongoing monthly. New setup: 1–2 weeks."
            faqs={[
                {
                    question: 'Do you handle payroll across multiple African countries?',
                    answer: 'Yes. Our offices and partner network cover Cameroon, DRC, Congo, Côte d\'Ivoire, Rwanda, Uganda, Tanzania, and others. We coordinate a unified payroll calendar across all locations.',
                },
                {
                    question: 'What happens if there is a payroll error?',
                    answer: 'We take responsibility for errors resulting from our processing. We correct and reimburse any related penalties that arise from our mistakes, per our engagement terms.',
                },
                {
                    question: 'Can you help with employment contracts and HR policies?',
                    answer: 'Yes. Our HR compliance team reviews and drafts employment contracts, internal policies, and staff handbooks tailored to the local labour law framework.',
                },
                {
                    question: 'How do you handle confidentiality of employee data?',
                    answer: 'Payroll data is handled under strict confidentiality. Payslips are delivered securely, and access is limited to authorised personnel only.',
                },
            ]}
        />
    </>
);

export default PayrollHRPage;
