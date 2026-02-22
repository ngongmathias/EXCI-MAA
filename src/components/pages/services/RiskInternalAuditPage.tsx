import { FC } from 'react';
import Meta from '../../common/Meta';
import ServiceDetailLayout from './ServiceDetailLayout';

const RiskInternalAuditPage: FC = () => (
    <>
        <Meta
            title="Risk & Internal Audit"
            description="Internal control reviews, risk-based internal audit plans, and fraud risk assessments across African and international organisations."
        />
        <ServiceDetailLayout
            accentColor="blue"
            badgeLabel="Risk & Internal Audit"
            title="Risk & Internal Audit"
            tagline="Objective, evidence-based assurance over governance, risk, and the controls that protect your organisation."
            whatWeDo={{
                intro:
                    'Our Risk & Internal Audit services provide boards, audit committees, and management with independent assurance over the effectiveness of controls, risk management processes, and governance frameworks. We can act as your fully outsourced internal audit function or support an existing team.',
                bullets: [
                    'Risk-based internal audit planning and execution',
                    'Internal control design and operating effectiveness reviews',
                    'IT general controls and system access reviews',
                    'Process walkthroughs and gap assessments',
                    'Compliance testing (regulatory, contractual, policy)',
                    'Enterprise Risk Management (ERM) framework design',
                    'Fraud risk assessment and anti-fraud programme reviews',
                    'Follow-up and remediation support',
                ],
            }}
            whoItIsFor={[
                'Boards and audit committees seeking independent assurance',
                'Companies without an internal audit function (outsourced IA)',
                'Organisations preparing for external audit or regulatory inspection',
                'NGOs and donor-funded projects requiring operational compliance reviews',
                'Banks and financial institutions with regulatory audit obligations',
                'Groups implementing ERM or strengthening governance frameworks',
            ]}
            deliverables={[
                'Risk-based annual internal audit plan',
                'Audit reports with findings, risk ratings, and recommendations',
                'Management action plans and tracking log',
                'Audit committee / board presentation pack',
                'ERM framework documentation and risk register',
                'Internal audit charter / terms of reference',
            ]}
            process={[
                {
                    step: 1,
                    title: 'Risk Assessment & Planning',
                    description: 'Identify and prioritise key risks, agree audit scope and schedule with management and the audit committee.',
                },
                {
                    step: 2,
                    title: 'Fieldwork',
                    description: 'Conduct interviews, walkthroughs, and testing. Maintain a real-time issues log and discuss findings with process owners as work progresses.',
                },
                {
                    step: 3,
                    title: 'Reporting',
                    description: 'Issue a formal audit report with colour-coded risk ratings, root cause analysis, and agreed management actions.',
                },
                {
                    step: 4,
                    title: 'Follow-up & Closure',
                    description: 'Track implementation of management actions, re-test key findings, and report to the audit committee on remediation status.',
                },
            ]}
            timeline="Per audit assignment: 2–6 weeks. Annual IA programme: ongoing."
            faqs={[
                {
                    question: 'Can you replace our internal audit department?',
                    answer: 'Yes. Our outsourced internal audit service provides a fully functioning IA capability — including the annual plan, fieldwork, reporting to the audit committee, and ongoing quality assurance.',
                },
                {
                    question: 'What risk rating system do you use?',
                    answer: 'We use a standard High / Medium / Low rating framework, calibrated to your specific risk appetite. We can also adopt your existing framework if preferred.',
                },
                {
                    question: 'Do you conduct fraud investigations?',
                    answer: 'We conduct fraud risk assessments and can support initial investigations. For full forensic investigations, we work with specialist forensic partners to ensure appropriate independence.',
                },
                {
                    question: 'How do you maintain independence from management?',
                    answer: 'Our engagement model ensures we report functionally to the audit committee, not management. Independence is assessed and documented before each engagement.',
                },
            ]}
        />
    </>
);

export default RiskInternalAuditPage;
