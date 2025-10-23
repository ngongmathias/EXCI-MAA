import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const OrganizationalChart = () => {
  const { t } = useLanguage();

  return (
    <div className="org-chart-container">
      {/* Title */}
      <div className="chart-title" >
         {t('organizationalChart.title')}
      </div>

      {/* Top Level: Board of Directors */}
      <div className="level-1">
        <div className="board-section">
          <div className="box chairman">
            {t('organizationalChart.chairman')}
          </div>
        </div>
      </div>

      {/* Second Level: Partners */}
      <div className="level-2">
        <div className="partner-section">
          <div className="box partner-general" style={{fontSize: '16px'}}>
            {t('organizationalChart.partnerGeneral')}
          </div>
        </div>
      </div>

      {/* Third Level: Specialized Partners */}
      <div className="level-3">
        <div className="specialized-partners">
          <div className="box partner-quality">
            {t('organizationalChart.partnerQuality')}
          </div>
          
          <div className="box partner-audit">
            {t('organizationalChart.partnerAudit')}
          </div>
          
          <div className="box partner-management">
            {t('organizationalChart.partnerManagement')}
          </div>
        </div>
      </div>

      {/* Fourth Level: Subordinates */}
      <div className="level-4 ml-36">
        <div className="subordinates-section">
          {/* Under Quality & Compliance */}
          <div className="subordinate-group quality-group">
            <div className="box country-director">
              {t('organizationalChart.countryDirector')}
            </div>
          </div>
          
          {/* Under Audit & Consulting */}
          <div className="subordinate-group audit-group">
            <div className="box senior-junior-auditors">
              {t('organizationalChart.seniorJuniorAuditors')}
            </div>
          </div>
          
          {/* Under Management & Organization */}
          <div className="subordinate-group management-group">
            <div className="box specialists">
              {t('organizationalChart.specialists')}
              <br />
              {t('organizationalChart.specialistsDetails')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalChart;