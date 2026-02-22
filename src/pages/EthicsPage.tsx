import { FC } from 'react';
import Meta from '../components/common/Meta';
import { AlertTriangle } from 'lucide-react';

const EthicsPage: FC = () => (
    <>
        <Meta title="Ethics & AML Statement" description="EXCI-MAA's commitment to professional ethics, anti-money laundering compliance, and confidentiality." />
        <div className="min-h-screen bg-white">
            <section className="bg-blue-900 py-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="text-3xl font-bold text-white">Ethics & Anti-Money Laundering Statement</h1>
                    <p className="text-blue-200 mt-2 text-sm">Last updated: February 2026</p>
                </div>
            </section>
            <div className="container mx-auto px-6 max-w-3xl py-12 prose prose-slate prose-sm">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm mb-8 not-prose">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p><strong>Draft:</strong> This statement is a placeholder and must be reviewed and endorsed by EXCI-MAA's managing partner and compliance officer before publication.</p>
                </div>

                <h2>Our Commitment</h2>
                <p>EXCI-MAA is committed to the highest standards of professional and ethical conduct. We operate in accordance with the International Ethics Standards Board for Accountants (IESBA) Code of Ethics and applicable local professional codes in each jurisdiction where we practise.</p>

                <h2>Anti-Money Laundering (AML)</h2>
                <p>As a professional services firm providing accounting, audit, and advisory services, we are subject to anti-money laundering and counter-terrorist financing regulations in the jurisdictions where we operate. We maintain policies and procedures to:</p>
                <ul>
                    <li>Conduct client identification and verification (Know Your Client — KYC) before accepting any engagement</li>
                    <li>Assess and document money laundering risk for all client relationships</li>
                    <li>Monitor for suspicious transactions and activity</li>
                    <li>Report suspicious activity to the appropriate authorities as required by law</li>
                    <li>Train all staff on AML obligations and red flags</li>
                </ul>

                <h2>Client Acceptance</h2>
                <p>We evaluate every prospective client and engagement for ethical and reputational risk. We decline engagements where we identify unacceptable risk, conflicts of interest, or where we cannot satisfy ourselves as to the integrity of the client.</p>

                <h2>Confidentiality</h2>
                <p>We take confidentiality seriously. All client information is treated as strictly confidential and is not disclosed to any third party without the client's prior consent, except where required by law or professional regulation. All staff sign confidentiality agreements as a condition of employment.</p>

                <h2>Whistleblowing</h2>
                <p>We maintain a confidential reporting channel for staff to report concerns about unethical or illegal behaviour without fear of retaliation. All reports are investigated promptly and independently.</p>

                <h2>Contact</h2>
                <p>For questions about our ethics or AML policies, contact our Compliance Officer at ethics@excimaa.ca.</p>
            </div>
        </div>
    </>
);

export default EthicsPage;
