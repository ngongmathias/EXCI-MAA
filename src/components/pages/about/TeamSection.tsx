import { FC } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const TeamSection: FC = () => {
  const { t } = useLanguage();
  
  const team = t('aboutPage.team.members', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    bio: string;
    expertise: string[];
  }>;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('aboutPage.team.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('aboutPage.team.subtitle')}
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={item}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    src={`/images/team/member-${index + 1}.jpg`}
                    alt={member.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-yellow-400">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{t('aboutPage.team.expertise')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@exci-maa.com`} className="text-gray-400 hover:text-blue-600">
                      <span className="sr-only">Email</span>
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="tel:+2376XXXXXXXX" className="text-gray-400 hover:text-blue-600">
                      <span className="sr-only">Phone</span>
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-8 md:text-lg"
            >
              {t('aboutPage.team.viewAllMembers')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;