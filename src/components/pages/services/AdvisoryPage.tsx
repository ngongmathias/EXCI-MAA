import { FC } from 'react';
import Meta from '../../common/Meta';
import ServiceDetailLayout from './ServiceDetailLayout';

const AdvisoryPage: FC = () => (
    <>
        <Meta
            title="Advisory Services"
            description="CFO advisory, financial modelling, business plans, and transaction support for businesses growing across Africa."
        />
        <ServiceDetailLayout
            accentColor="blue"
            badgeLabel="Advisory"
            title="Advisory & CFO Services"
            tagline="Strategic financial guidance for businesses navigating complexity, growth, and transformation."
            whatWeDo={{
                intro:
                    'Our Advisory practice provides senior-level financial expertise to management teams that need strategic support without the cost of a full-time executive. We work on high-impact projects — from business planning to transactions and financial transformation.',
                bullets: [
                    'CFO-on-demand and interim financial leadership',
                    'Finance function transformation and process redesign',
                    'Financial modelling (3-statement, DCF, LBO, scenario analysis)',
                    'Business plans and investor-ready financial projections',
                    'Fundraising support and data room preparation',
                    'Valuation and commercial due diligence support',
                    'Post-merger integration financial advisory',
                    'Budget oversight and strategic financial planning',
                ],
            }}
            whoItIsFor={[
                'Scale-ups and growth businesses seeking experienced financial guidance',
                'Boards and founders preparing for fundraising or M&A',
                'International companies entering or expanding in African markets',
                'PE / VC-backed businesses requiring financial restructuring or reporting uplift',
                'Companies in transition (leadership change, ERP migration, rapid growth)',
            ]}
            deliverables={[
                'Integrated financial model (P&L, balance sheet, cash flow)',
                'Business plan with financial narrative and projections',
                'Investor pitch deck financials and supporting data room materials',
                'Valuation report or indicative range memo',
                'Finance function review and transformation roadmap',
                'Monthly CFO reporting pack (board-level)',
            ]}
            process={[
                {
                    step: 1,
                    title: 'Discovery & Diagnostic',
                    description: 'Understand the business, strategic objectives, key decisions to be made, and where financial clarity is most critical.',
                },
                {
                    step: 2,
                    title: 'Analytical Work & Modelling',
                    description: 'Build or review financial models, conduct analysis, and develop structured recommendations grounded in financial data.',
                },
                {
                    step: 3,
                    title: 'Output Delivery & Presentation',
                    description: 'Deliver written outputs, present to boards or investors, and provide senior sign-off on key financial assumptions.',
                },
                {
                    step: 4,
                    title: 'Ongoing Engagement (Optional)',
                    description: 'Remain available as a retained strategic advisor for quarterly reviews, board meetings, and ongoing decision support.',
                },
            ]}
            timeline="Project-based: 2–8 weeks. Retained advisory: ongoing monthly."
            faqs={[
                {
                    question: 'What is a CFO-on-demand service?',
                    answer: 'It means you get access to a senior finance professional at a fraction of the cost of a full-time CFO. We attend board meetings, prepare financial reports, manage relationships with banks and auditors, and guide your finance team.',
                },
                {
                    question: 'Do you build financial models from scratch?',
                    answer: 'Yes. We build integrated 3-statement models, DCF valuations, project finance models, and scenario models tailored to your business and audience (internal, investor, or bank).',
                },
                {
                    question: 'Can you help us prepare for a fundraising round?',
                    answer: 'Yes. We prepare the financial section of your pitch deck, build your financial model, stress-test assumptions, and help prepare the data room for investor due diligence.',
                },
                {
                    question: 'Do you provide valuation opinions?',
                    answer: 'We provide indicative valuation analyses for internal and commercial purposes. For regulatory or court purposes, we would refer to our licensed corporate finance partners.',
                },
            ]}
        />
    </>
);

export default AdvisoryPage;
