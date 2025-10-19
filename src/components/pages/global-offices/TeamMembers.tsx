import React, { useState } from 'react';
import { teamMembers } from '../../../data/teamMembers';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Mail, Phone, Briefcase } from 'lucide-react';

const TeamMemberCard: React.FC<{ member: typeof teamMembers[0] }> = ({ member }) => {
  const { t } = useLanguage();
  const [showFullBio, setShowFullBio] = useState(false);

  // Get translated data from locales
  const memberName = t(`teamMembers.members.${member.id}.name`);
  const memberTitle = t(`teamMembers.members.${member.id}.title`);
  const memberBio = t(`teamMembers.members.${member.id}.bio`);
  
  // Get qualifications array
  const qualifications = member.qualifications.map((qual, index) => {
    const translatedQual = t(`teamMembers.members.${member.id}.qualifications.${index}`, { defaultValue: qual });
    return translatedQual;
  });

  // Get specialties array
  const specialties = member.specialties.map((_, index) => {
    const translatedSpecialty = t(`teamMembers.members.${member.id}.specialties.${index}`);
    return translatedSpecialty;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header with Photo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
          <img
            src={member.image}
            alt={memberName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/team/placeholder.jpg';
            }}
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{memberName}</h3>
        <p className="text-blue-100 font-medium">{memberTitle}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Qualifications */}
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {qualifications.map((qual, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
              >
                {qual}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed text-center">
            {showFullBio ? memberBio : `${memberBio.substring(0, 120)}...`}
          </p>
          {memberBio.length > 120 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 w-full"
            >
              {showFullBio ? t('teamMembers.showLess') : t('teamMembers.readMore')}
            </button>
          )}
        </div>

        {/* Specialties */}
        <div className="mb-4 border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center justify-center">
            <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
            {t('teamMembers.specialties')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {specialties.slice(0, 4).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-4 space-y-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm"
            >
              <Mail className="h-4 w-4 mr-2" />
              {member.email}
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm"
            >
              <Phone className="h-4 w-4 mr-2" />
              {member.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamMembers: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('teamMembers.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('teamMembers.subtitle')}
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;