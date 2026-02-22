import { FC } from 'react';
import Meta from '../components/common/Meta';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, FileText, Users, AlertTriangle, ArrowRight } from 'lucide-react';

/**
 * PLACEHOLDER CONTENT — all case studies below are fictional/anonymized.
 * Replace with real client examples before going live.
 */

const CASE_STUDIES = [
    {
        id: 1,
        icon: <FileText className="w-6 h-6" />,
        industry: 'Oil & Gas — Central Africa',
        title: 'Multi-Entity Statutory Audit Across 3 CEMAC Jurisdictions',
        challenge:
            "A mid-size international oil exploration company needed to complete statutory audits across its Cameroon, Congo, and Gabon subsidiaries within a tight 8-week window to meet parent company reporting deadlines. The previous auditors had resigned with minimal handover.",
        workPerformed:
            "EXCI-MAA deployed three country audit teams simultaneously, supported by a central engagement manager. We rebuilt opening balances from source data, conducted full-scope OHADA audits, and coordinated group reporting schedules with the client's head office.",
        result:
            "All three audit opinions were issued within the client's 8-week deadline. Management letter findings were resolved within 30 days, and EXCI-MAA was retained for the following two fiscal years.",
        metric: '3 audits in 8 weeks',
    },
    {
        id: 2,
        icon: <Shield className="w-6 h-6" />,
        industry: 'NGO / Donor-Funded — East Africa',
        title: 'Grant Compliance Audit for USAID-Funded Health Programme',
        challenge:
            'A health-focused NGO operating in Kenya and Uganda required an independent audit of a $12M USAID-funded programme. The audit needed to meet USAID-specific reporting requirements, including Single Audit Act compliance and cost-allowability testing.',
        workPerformed:
            "Our East Africa team designed a risk-based audit plan covering procurement, payroll, sub-recipient monitoring, and cost allocation. We conducted fieldwork across two countries and coordinated with the NGO's Washington-based compliance team.",
        result:
            "Clean audit opinion issued with zero questioned costs. The client used the audit report to successfully secure a follow-on grant. EXCI-MAA was recommended to two other organisations in the donor's portfolio.",
        metric: '$12M — zero questioned costs',
    },
    {
        id: 3,
        icon: <TrendingUp className="w-6 h-6" />,
        industry: 'Financial Services — Central Africa',
        title: 'Tax Restructuring for a Regional Microfinance Group',
        challenge:
            "A microfinance group with operations in Cameroon and DRC was paying effective tax rates significantly above the statutory rate due to uncoordinated filings and missed incentives. Management needed a clear view of their cross-border tax position.",
        workPerformed:
            'EXCI-MAA conducted a full tax diagnostic across both jurisdictions, identified applicable tax incentives, corrected historical filings, and designed a compliant group tax structure with proper intercompany pricing documentation.',
        result:
            'Effective tax rate reduced by 11 percentage points. Historical overpayments recovered via amended filings. The group now operates on a unified tax compliance calendar managed by EXCI-MAA.',
        metric: '11% effective tax rate reduction',
    },
    {
        id: 4,
        icon: <Users className="w-6 h-6" />,
        industry: 'FMCG / Retail — East Africa',
        title: 'Multi-Country Payroll Setup for Market Entry',
        challenge:
            'A European consumer goods company entering Kenya, Uganda, and Tanzania needed to hire 45 staff across three countries within two months. They had no local HR infrastructure and needed compliant payroll, employment contracts, and statutory registrations.',
        workPerformed:
            'EXCI-MAA designed and implemented full payroll operations in all three countries, including NSSF/NHIF registration (Kenya), NSSF (Uganda), and NSSF/WCF (Tanzania). We drafted compliant employment contracts per local labour law and processed the first three months of payroll.',
        result:
            'All 45 staff onboarded within the deadline. Zero compliance issues flagged in the first 12 months. The client retained EXCI-MAA as their ongoing payroll provider.',
        metric: '45 staff, 3 countries, 8 weeks',
    },
];

const CaseStudiesPage: FC = () => {
    return (
        <>
            <Meta
                title="Case Studies"
                description="See how EXCI-MAA has delivered audit, tax, and advisory results for clients across Africa."
            />
            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="bg-blue-900 py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 bg-white/10 text-white">
                            Our Work
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h1>
                        <p className="text-xl text-blue-100 max-w-2xl">
                            Client challenge → Work performed → Result. Anonymized examples from our practice.
                        </p>
                    </div>
                </section>

                {/* Placeholder notice */}
                <div className="container mx-auto px-6 max-w-5xl mt-8">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p><strong>Note:</strong> The case studies below are placeholder examples for demonstration purposes. They will be replaced with real anonymized client engagements prior to launch.</p>
                    </div>
                </div>

                {/* Case Studies */}
                <section className="container mx-auto px-6 max-w-5xl py-16 space-y-10">
                    {CASE_STUDIES.map((cs) => (
                        <article key={cs.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {/* Header strip */}
                            <div className="bg-blue-50 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-800">{cs.icon}</div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">{cs.industry}</p>
                                        <h3 className="text-lg font-bold text-slate-900">{cs.title}</h3>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-right">
                                    <p className="text-xl font-bold text-blue-900">{cs.metric}</p>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="p-6 grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Challenge</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{cs.challenge}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Work Performed</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{cs.workPerformed}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Result</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{cs.result}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                {/* CTA */}
                <section className="bg-slate-50 py-16">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Have a similar challenge?</h2>
                        <p className="text-slate-500 mb-6 text-sm">Share your situation with us — we'll connect you with the right practice team.</p>
                        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-900 text-white font-semibold text-sm hover:opacity-90 transition">
                            Start a Conversation <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CaseStudiesPage;
