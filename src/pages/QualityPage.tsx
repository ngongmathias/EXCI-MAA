import { FC } from 'react';
import Meta from '../components/common/Meta';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const QualityPage: FC = () => (
    <>
        <Meta title="Quality & Independence" description="EXCI-MAA's approach to engagement quality, audit independence, and continuous improvement." />
        <div className="min-h-screen bg-white">
            <section className="bg-blue-900 py-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="text-3xl font-bold text-white">Quality & Independence</h1>
                    <p className="text-blue-200 mt-2 text-sm">Our commitment to professional excellence</p>
                </div>
            </section>
            <div className="container mx-auto px-6 max-w-3xl py-12 prose prose-slate prose-sm">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm mb-8 not-prose">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p><strong>Draft:</strong> This statement is a placeholder and must be reviewed and endorsed by the firm's quality assurance partner before publication.</p>
                </div>

                <h2>Quality Assurance</h2>
                <p>EXCI-MAA maintains a firm-wide system of quality management designed to provide reasonable assurance that our engagements are conducted in accordance with professional standards and applicable legal and regulatory requirements.</p>

                <p>Our quality framework includes:</p>
                <ul>
                    <li><strong>Engagement acceptance and continuance procedures</strong> — assessing competence, capacity, ethical requirements, and risk before accepting any engagement.</li>
                    <li><strong>Standardized methodology</strong> — all audit and assurance engagements follow documented procedures aligned with International Standards on Auditing (ISA) and applicable local standards.</li>
                    <li><strong>Engagement quality reviews</strong> — independent partner review for high-risk engagements, listed entities, and public interest engagements.</li>
                    <li><strong>Staff training and development</strong> — annual mandatory CPD hours for all professional staff, including ethics, methodology updates, and technical topics.</li>
                    <li><strong>File review and monitoring</strong> — periodic internal review of completed engagement files to ensure quality and identify areas for improvement.</li>
                </ul>

                <h2>Independence</h2>
                <p>For audit and assurance engagements, we maintain independence from the entities we audit. Our independence framework is based on the IESBA Code of Ethics and applicable local requirements. This includes:</p>
                <ul>
                    <li>Pre-engagement independence assessments and conflict checks</li>
                    <li>Annual independence declarations by all professional staff</li>
                    <li>Restrictions on financial interests, business relationships, and personal relationships with audit clients</li>
                    <li>Partner rotation policies for recurring audit engagements</li>
                    <li>Documented safeguards where threats to independence are identified</li>
                </ul>

                <h2>Continuous Improvement</h2>
                <p>We are committed to learning from every engagement. Findings from quality reviews, client feedback, and regulatory inspections are analysed and incorporated into our methodology, training programmes, and operational procedures.</p>

                <h2>Contact</h2>
                <p>For questions about our quality management or independence policies, contact quality@excimaa.ca.</p>
            </div>
        </div>
    </>
);

export default QualityPage;
