import { FC } from 'react';
import Meta from '../components/common/Meta';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Globe, Award, AlertTriangle } from 'lucide-react';

/**
 * PLACEHOLDER CONTENT — all names, credentials, photos, and bios below are fictional.
 * Replace with real team information before going live.
 */

interface TeamMember {
    name: string;
    title: string;
    credentials: string[];
    bio: string;
    languages: string[];
    jurisdictions: string[];
    initials: string;
    image?: string;
}

const LEADERSHIP: TeamMember[] = [
    {
        name: 'Jean-Pierre Ndoumbe',
        title: 'Managing Partner — Cameroon & Central Africa',
        credentials: ['ACCA Fellow', 'OHADA Certified Expert', 'MBA (ESSEC Douala)'],
        bio: "Jean-Pierre founded EXCI-MAA in 2012 with a vision to build an African accounting firm that meets international standards. He has over 20 years of experience in statutory audit, OHADA accounting, and tax advisory across CEMAC jurisdictions. He leads the firm's strategy and quality assurance framework.",
        languages: ['French', 'English'],
        jurisdictions: ['Cameroon', 'Congo', 'Gabon', "Côte d'Ivoire"],
        initials: 'JN',
        image: '/images/team/placeholder-partner.png',
    },
    {
        name: 'Grace Akinyi Odhiambo',
        title: 'Partner — East Africa',
        credentials: ['CPA (K)', 'ICPAK Member', 'IFRS Specialist'],
        bio: "Grace leads EXCI-MAA's East African operations and brings 15 years of experience in audit, tax, and advisory services for multinationals and NGOs operating in Kenya, Uganda, Tanzania, and Rwanda. She specializes in donor-funded project audits and IFRS compliance.",
        languages: ['English', 'Swahili', 'French'],
        jurisdictions: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
        initials: 'GO',
    },
    {
        name: 'François Mbala Ekotto',
        title: 'Director — Audit & Assurance',
        credentials: ['Commissaire aux Comptes', 'CEMAC Licensed Auditor', 'DESS Comptabilité'],
        bio: "François oversees all audit and assurance engagements across the firm. He has led statutory audits for banking institutions, extractive industry companies, and international NGOs. He is responsible for methodology, quality control, and staff development in the audit practice.",
        languages: ['French', 'English'],
        jurisdictions: ['Cameroon', 'Congo', 'DRC'],
        initials: 'FE',
    },
    {
        name: 'Amina Uwimana',
        title: 'Director — Tax & Regulatory',
        credentials: ['CPA Rwanda', 'LL.B (Kigali)', 'Tax Advisory Certificate'],
        bio: "Amina manages tax compliance and advisory mandates for the firm's corporate clients. She has particular expertise in transfer pricing, cross-border structuring, and VAT compliance across EAC and CEMAC zones. She also advises on regulatory matters for financial institutions.",
        languages: ['Kinyarwanda', 'French', 'English'],
        jurisdictions: ['Rwanda', 'DRC', 'Cameroon'],
        initials: 'AU',
    },
    {
        name: 'David Tshimanga',
        title: 'Senior Manager — Accounting & Outsourcing',
        credentials: ['CPA DRC', 'QuickBooks ProAdvisor', 'OHADA Expert'],
        bio: "David manages the outsourced accounting function for over 30 clients across Central Africa. He specializes in bookkeeping, management reporting, and OHADA conversion projects. He leads a team of 12 accountants delivering monthly closes and audit preparation.",
        languages: ['French', 'Lingala', 'English'],
        jurisdictions: ['DRC', 'Congo'],
        initials: 'DT',
    },
    {
        name: 'Patricia Nalubega',
        title: 'Manager — Payroll & HR Compliance',
        credentials: ['CHRP (Uganda)', 'NSSF Compliance Specialist'],
        bio: "Patricia runs multi-country payroll operations and HR compliance for the firm's clients in East Africa. She ensures timely statutory filings, social security compliance, and has deep knowledge of labour law across Uganda, Tanzania, and Kenya.",
        languages: ['English', 'Luganda', 'Swahili'],
        jurisdictions: ['Uganda', 'Tanzania', 'Kenya'],
        initials: 'PN',
    },
];

const LeadershipPage: FC = () => {
    return (
        <>
            <Meta
                title="Leadership & Governance"
                description="Meet the partners, directors, and senior managers leading EXCI-MAA across Africa."
            />
            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="bg-blue-900 py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 bg-white/10 text-white">
                            Our People
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Leadership & Governance</h1>
                        <p className="text-xl text-blue-100 max-w-2xl">
                            Experienced professionals with deep expertise in African markets, international standards, and cross-border compliance.
                        </p>
                    </div>
                </section>

                {/* Placeholder notice */}
                <div className="container mx-auto px-6 max-w-5xl mt-8">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p><strong>Note:</strong> The team profiles below contain placeholder information for demonstration purposes. Actual names, credentials, and photographs will be updated prior to launch.</p>
                    </div>
                </div>

                {/* Team Grid */}
                <section className="container mx-auto px-6 max-w-5xl py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {LEADERSHIP.map((member, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                {/* Photo / Initials */}
                                <div className="h-56 bg-slate-100 flex items-center justify-center overflow-hidden">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">
                                            {member.initials}
                                        </div>
                                    )}
                                </div>
                                {/* Info */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                                    <p className="text-sm text-blue-800 font-medium mb-3">{member.title}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                                    {/* Credentials */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {member.credentials.map((c, j) => (
                                            <span key={j} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-800 rounded text-xs font-medium">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                    {/* Languages & Jurisdictions */}
                                    <div className="text-xs text-slate-500 space-y-1">
                                        <div className="flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5" />
                                            {member.languages.join(' · ')}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Award className="w-3.5 h-3.5" />
                                            {member.jurisdictions.join(' · ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-slate-50 py-16">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Want to speak with a partner directly?</h2>
                        <p className="text-slate-500 mb-6 text-sm">Book a confidential consultation or contact the office nearest to you.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-900 text-white font-semibold text-sm hover:opacity-90 transition">
                                <Mail className="w-4 h-4" /> Book a Consultation
                            </Link>
                            <Link to="/global-offices" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-300 transition">
                                <Linkedin className="w-4 h-4" /> Find an Office
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LeadershipPage;
