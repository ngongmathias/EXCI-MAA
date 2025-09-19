'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone, Award, Briefcase, Globe } from 'lucide-react';

const team = [
  {
    name: 'Pierre Kemeni',
    role: 'Founder & CEO',
    bio: 'MBA, CPA, DEC with over 27 years of international accounting and auditing experience.',
    image: '/images/team/pierre-kemeni.jpg',
    social: {
      linkedin: '#',
      email: 'pierre.kemeni@exci-maa.com',
      phone: '+237 6XX XXX XXX'
    },
    expertise: [
      'International Accounting',
      'Financial Auditing',
      'Business Strategy',
      'Corporate Finance'
    ]
  },
  {
    name: 'Patrick Ngatcha',
    role: 'Managing Director',
    bio: 'DEC, DSCG, Master CCA, MSTCF with 13+ years in business development and financial consulting.',
    image: '/images/team/patrick-ngatcha.jpg',
    social: {
      linkedin: '#',
      email: 'patrick.ngatcha@exci-maa.com',
      phone: '+237 6XX XXX XXX'
    },
    expertise: [
      'Business Development',
      'Financial Consulting',
      'Tax Planning',
      'Corporate Strategy'
    ]
  },
  {
    name: 'Marie Laure Ngo Bikoi',
    role: 'Senior Audit Manager',
    bio: 'HEC, DSCG with 15+ years of experience in audit and financial advisory services.',
    image: '/images/team/marie-laure.jpg',
    social: {
      linkedin: '#',
      email: 'marie.laure@exci-maa.com',
      phone: '+237 6XX XXX XXX'
    },
    expertise: [
      'Financial Auditing',
      'Internal Controls',
      'Risk Management',
      'Compliance'
    ]
  }
];

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

export default function TeamSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our experienced team is dedicated to delivering exceptional service and value to our clients.
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
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={item}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-exci-yellow-400">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-exci-blue-100 text-exci-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-exci-blue-600">
                      <span className="sr-only">Email</span>
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-exci-blue-600">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={`tel:${member.social.phone.replace(/\D/g, '')}`} className="text-gray-400 hover:text-exci-blue-600">
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
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-exci-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-exci-blue-700 md:py-4 md:px-8 md:text-lg"
            >
              View all team members
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}