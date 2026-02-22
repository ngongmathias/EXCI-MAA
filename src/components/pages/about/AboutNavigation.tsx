import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, BookOpen, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../../lib/constants/routes';

const AboutNavigation: FC = () => {
    const sections = [
        {
            title: 'Leadership & Governance',
            description: 'Meet our partners and directors leading EXCI-MAA across multiple jurisdictions.',
            icon: <Users className="h-6 w-6" />,
            link: ROUTES.LEADERSHIP,
        },
        {
            title: 'Quality & Independence',
            description: 'Our commitment to the highest standards of professional audit quality and ethical independence.',
            icon: <Shield className="h-6 w-6" />,
            link: ROUTES.QUALITY,
        },
        {
            title: 'Ethics & Confidentiality',
            description: 'Our framework for maintaining professional integrity and protecting client information.',
            icon: <BookOpen className="h-6 w-6" />,
            link: ROUTES.ETHICS,
        },
    ];

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Firm Governance
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Learn more about the standards and leadership driving our professional excellence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-6">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                {section.description}
                            </p>
                            <Link
                                to={section.link}
                                className="mt-auto inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 text-sm"
                            >
                                Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutNavigation;
