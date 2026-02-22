import { FC } from 'react';
import Meta from '../../common/Meta';
import ServiceDetailLayout from './ServiceDetailLayout';

const TaxPage: FC = () => (
    <>
        <Meta
            title="Tax Compliance & Advisory"
            description="Corporate tax compliance, VAT, tax structuring, and controversy support across multiple African and international jurisdictions."
        />
        <ServiceDetailLayout
            accentColor="blue"
            badgeLabel="Tax"
            title="Tax Compliance & Advisory"
            tagline="Accurate, timely, and strategically aligned tax services across corporate, indirect, and international tax."
            whatWeDo={{
                intro:
                    'Our tax practice helps businesses meet their compliance obligations while identifying legitimate opportunities to manage their tax position efficiently. We operate across multiple jurisdictions and tax regimes, including OHADA, CEMAC, EAC, and international treaty networks.',
                bullets: [
                    'Corporate income tax return preparation and filing',
                    'VAT / indirect tax compliance and advisory',
                    'Withholding tax management',
                    'Tax structuring for new investments and group reorganisations',
                    'Transfer pricing documentation and advisory',
                    'Tax audit support and controversy management',
                    'Tax due diligence for M&A transactions',
                    'Cross-border tax planning and treaty analysis',
                ],
            }}
            whoItIsFor={[
                'Multinationals establishing or operating across African markets',
                'SMEs seeking to manage tax cost and remain compliant',
                'Private equity and investors evaluating African acquisitions',
                'NGOs navigating tax exemption status across jurisdictions',
                'Groups with cross-border flows requiring transfer pricing governance',
            ]}
            deliverables={[
                'Tax compliance filings (corporate, VAT, withholding)',
                'Tax opinion / advisory memoranda',
                'Transfer pricing documentation package',
                'Tax due diligence report',
                'Controversy response letters and negotiation support',
                'Effective tax rate summary and tax planning roadmap',
            ]}
            process={[
                {
                    step: 1,
                    title: 'Tax Profile & Risk Assessment',
                    description: 'Map all tax obligations by jurisdiction, assess current compliance status, and identify key risk areas or planning opportunities.',
                },
                {
                    step: 2,
                    title: 'Compliance Execution',
                    description: 'Prepare and file all required returns accurately and on schedule. Maintain a compliance calendar to avoid penalties.',
                },
                {
                    step: 3,
                    title: 'Advisory & Planning',
                    description: 'Provide written opinions and structured planning reports aligned with your commercial strategy. All advice is jurisdiction-specific and regulation-grounded.',
                },
                {
                    step: 4,
                    title: 'Controversy Support (If Needed)',
                    description: 'Represent or support management during tax authority enquiries, assessments, or appeals — from response drafting through negotiation.',
                },
            ]}
            timeline="Compliance cycles: monthly/quarterly/annual. Advisory projects: 2–6 weeks."
            faqs={[
                {
                    question: 'Do you handle VAT in multiple countries simultaneously?',
                    answer: 'Yes. We coordinate multi-jurisdiction VAT compliance and can act as a single point of contact for your VAT obligations across our African office network.',
                },
                {
                    question: 'How do you approach transfer pricing?',
                    answer: 'We prepare contemporaneous documentation aligned with OECD guidelines and local requirements, including benchmarking studies and master/local file formats where applicable.',
                },
                {
                    question: 'Can you represent us during a tax audit?',
                    answer: 'Yes. Our tax controversy team manages correspondence, prepares technical responses, and negotiates with tax authorities on your behalf across all markets we operate in.',
                },
                {
                    question: 'What is the fee model for ongoing tax compliance?',
                    answer: 'We offer fixed annual retainer packages for regular compliance filings, with separate project-based pricing for advisory and controversy matters.',
                },
            ]}
        />
    </>
);

export default TaxPage;
