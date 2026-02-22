import { FC } from 'react';
import Meta from '../components/common/Meta';
import { AlertTriangle } from 'lucide-react';

/**
 * PLACEHOLDER CONTENT — this privacy policy is a generic template.
 * It MUST be reviewed and approved by the firm's legal team before launch.
 */

const PrivacyPolicyPage: FC = () => (
    <>
        <Meta title="Privacy Policy" description="EXCI-MAA's privacy policy — how we collect, use, and protect your personal information." />
        <div className="min-h-screen bg-white">
            <section className="bg-blue-900 py-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
                    <p className="text-blue-200 mt-2 text-sm">Last updated: February 2026</p>
                </div>
            </section>
            <div className="container mx-auto px-6 max-w-3xl py-12 prose prose-slate prose-sm">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm mb-8 not-prose">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p><strong>Draft:</strong> This Privacy Policy is a placeholder template and must be reviewed by EXCI-MAA's legal counsel before publication.</p>
                </div>

                <h2>1. Who We Are</h2>
                <p>EXCI-MAA ("we", "us", "our") is an international accounting, audit, tax, and advisory firm operating through affiliated entities across Africa and Canada. This policy explains how we handle personal data collected through our website (excimaa.ca) and related services.</p>

                <h2>2. Information We Collect</h2>
                <p>We may collect the following categories of personal information:</p>
                <ul>
                    <li><strong>Contact details:</strong> name, email address, phone number, organisation name</li>
                    <li><strong>Inquiry information:</strong> service type, country, entity type, message content, uploaded documents</li>
                    <li><strong>Technical data:</strong> IP address, browser type, device information, pages visited</li>
                    <li><strong>Cookie data:</strong> as described in our Cookie Policy</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                    <li>To respond to your inquiries and provide the services you request</li>
                    <li>To route your inquiry to the appropriate office or practice team</li>
                    <li>To improve our website and user experience</li>
                    <li>To comply with legal and regulatory obligations</li>
                </ul>

                <h2>4. Legal Basis for Processing</h2>
                <p>We process personal data on the following legal bases: your consent (where applicable), performance of a contract or pre-contractual steps, compliance with legal obligations, and our legitimate interests in operating and improving our services.</p>

                <h2>5. Data Sharing</h2>
                <p>We do not sell personal data. We may share data with:</p>
                <ul>
                    <li>Affiliated EXCI-MAA entities in other jurisdictions (for service delivery)</li>
                    <li>Technology service providers (hosting, email, CRM — under data processing agreements)</li>
                    <li>Regulatory bodies, where required by law</li>
                </ul>

                <h2>6. Data Retention</h2>
                <p>We retain personal data for as long as necessary to fulfil the purposes described above and to comply with legal, accounting, or regulatory requirements. Inquiry data is typically retained for 3 years.</p>

                <h2>7. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data, and to withdraw consent or object to processing. Contact us at privacy@excimaa.ca to exercise these rights.</p>

                <h2>8. Security</h2>
                <p>We implement appropriate technical and organisational measures to protect personal data against unauthorized access, alteration, disclosure, or destruction.</p>

                <h2>9. Contact</h2>
                <p>For questions about this policy or our data practices, contact:<br />
                    <strong>Data Protection Contact</strong><br />
                    Email: privacy@excimaa.ca</p>
            </div>
        </div>
    </>
);

export default PrivacyPolicyPage;
