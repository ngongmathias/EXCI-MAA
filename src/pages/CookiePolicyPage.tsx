import { FC } from 'react';
import Meta from '../components/common/Meta';
import { AlertTriangle } from 'lucide-react';

const CookiePolicyPage: FC = () => (
    <>
        <Meta title="Cookie Policy" description="EXCI-MAA's cookie policy — what cookies we use and how you can manage them." />
        <div className="min-h-screen bg-white">
            <section className="bg-blue-900 py-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
                    <p className="text-blue-200 mt-2 text-sm">Last updated: February 2026</p>
                </div>
            </section>
            <div className="container mx-auto px-6 max-w-3xl py-12 prose prose-slate prose-sm">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm mb-8 not-prose">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p><strong>Draft:</strong> This Cookie Policy is a placeholder template and must be reviewed by EXCI-MAA's legal counsel before publication.</p>
                </div>

                <h2>1. What Are Cookies</h2>
                <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience, remember your preferences, and understand how visitors use our site.</p>

                <h2>2. Types of Cookies We Use</h2>
                <h3>Essential Cookies</h3>
                <p>Required for the website to function properly (e.g., language preference, session management). These cannot be disabled.</p>
                <h3>Analytics Cookies</h3>
                <p>Help us understand how visitors interact with our website (e.g., pages visited, time on site). We use these to improve our content and user experience. These are only activated with your consent.</p>
                <h3>Functional Cookies</h3>
                <p>Enable enhanced functionality such as remembering your language choice or region. These are only activated with your consent.</p>

                <h2>3. Managing Cookies</h2>
                <p>You can manage or delete cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. Note that disabling essential cookies may affect the functionality of our website.</p>

                <h2>4. Third-Party Cookies</h2>
                <p>We may use third-party services (such as analytics providers) that set their own cookies. We do not control these cookies. Please refer to the relevant third-party privacy policies for more information.</p>

                <h2>5. Updates</h2>
                <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

                <h2>6. Contact</h2>
                <p>If you have questions about our use of cookies, please contact us at privacy@excimaa.ca.</p>
            </div>
        </div>
    </>
);

export default CookiePolicyPage;
