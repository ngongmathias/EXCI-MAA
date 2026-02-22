import { FC } from 'react';
import Meta from '../../common/Meta';
import ServiceDetailLayout from './ServiceDetailLayout';

const AuditAssurancePage: FC = () => (
    <>
        <Meta
            title="Audit & Assurance"
            description="Statutory audit, limited review engagements, AUP, and internal audit services across Africa and beyond — where duly licensed."
        />
        <ServiceDetailLayout
            accentColor="blue"
            badgeLabel="Audit & Assurance"
            title="Audit & Assurance Services"
            tagline="Independent, rigorous, and conducted to the highest professional standards across all applicable jurisdictions."
            disclaimer="Audit services are provided only where the relevant local entity or partner is duly registered and licensed under applicable law."
            whatWeDo={{
                intro:
                    'We provide a full range of audit and assurance services to organisations that require independent verification of their financial statements, compliance with contracts, or operational effectiveness. Our engagements are planned around your specific risk profile and reporting requirements.',
                bullets: [
                    'Statutory financial statement audit and audit opinion issuance (where licensed)',
                    'Limited review / assurance engagements',
                    'Agreed-Upon Procedures (AUP) and compliance attestations',
                    'Grant, donor & contract compliance attestations',
                    'Internal audit & operational reviews (risk-based plans, fieldwork, reporting)',
                    'Internal control evaluation (design and operating effectiveness)',
                    'Compliance testing against laws, contracts, policies, and regulatory requirements',
                    'Audit-ready financial reporting support (closing schedules, reconciliations, documentation)',
                ],
            }}
            whoItIsFor={[
                'Companies required by law or shareholders to have annual audits',
                'NGOs and donor-funded projects requiring grant compliance audits',
                'Banks, lenders, and investors requiring third-party assurance',
                'International entities with subsidiaries in OHADA or IFRS jurisdictions',
                'Government and public bodies seeking independent performance review',
                'Boards and audit committees seeking an objective internal audit function',
            ]}
            deliverables={[
                'Signed audit report / assurance conclusion (where applicable)',
                'Management letter with findings and recommendations',
                'Board / audit committee presentation',
                'Issues log with agreed management action plan',
                'AUP report or agreed-upon findings summary',
                'Internal audit report with risk rating and remediation roadmap',
            ]}
            process={[
                {
                    step: 1,
                    title: 'Scoping & Engagement Planning',
                    description:
                        'Define objectives, jurisdictions, reporting standards (IFRS / OHADA / local GAAP), timelines, and deliverables. Confirm independence requirements and access arrangements.',
                },
                {
                    step: 2,
                    title: 'Fieldwork & Testing',
                    description:
                        'Conduct walkthroughs, risk assessment, substantive and controls testing as appropriate. Maintain an issues log and discuss findings with management on an ongoing basis.',
                },
                {
                    step: 3,
                    title: 'Reporting & Close-out',
                    description:
                        'Deliver a formal report with findings, recommendations, and management action plan. For assurance engagements, issue the appropriate conclusion where licensed.',
                },
                {
                    step: 4,
                    title: 'Follow-up & Continuous Support (Optional)',
                    description:
                        'Support remediation efforts, re-testing of previously identified issues, and periodic compliance monitoring across reporting cycles.',
                },
            ]}
            timeline="4–12 weeks depending on entity size, complexity, and jurisdiction"
            faqs={[
                {
                    question: 'Are you licensed to audit in my country?',
                    answer:
                        'Audit authority is jurisdiction-specific. EXCI-MAA operates through local entities or licensed partner firms in each market. We will confirm the applicable license status during scoping. We only issue statutory audit opinions where we are duly registered.',
                },
                {
                    question: 'What reporting standards do you apply?',
                    answer:
                        'We support IFRS, OHADA (SYSCOHADA), and local GAAP as required. Our teams are experienced with multi-standard engagements for international groups reporting across jurisdictions.',
                },
                {
                    question: 'How do you manage independence for group audits?',
                    answer:
                        'Group audit independence is assessed at the engagement level before acceptance. We maintain documented independence policies and apply ethical standards consistent with IESBA requirements.',
                },
                {
                    question: 'Can you audit donor-funded NGOs or projects?',
                    answer:
                        'Yes. We have extensive experience with donor-specific requirements including EU, USAID, World Bank, and bilateral grant audits. We issue AUP reports and compliance attestations tailored to donor formats.',
                },
                {
                    question: 'What is your typical fee structure?',
                    answer:
                        'Fees are fixed-price per engagement based on scope, entity size, and complexity. We provide a detailed engagement proposal before any work begins — no surprise billing.',
                },
            ]}
        />
    </>
);

export default AuditAssurancePage;
