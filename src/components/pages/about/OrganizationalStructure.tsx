import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const OrganizationalChart = () => {
  const { t } = useLanguage();

  return (
    <div className="org-chart-container">
      {/* Title */}
      <div className="chart-title">
        GROUP ORGANIZATIONAL CHART
      </div>

      {/* Top Level: Board of Directors */}
      <div className="level-1">
        <div className="board-section">
          <div className="box chairman">
            Chairman of the Board of Directors
          </div>
        </div>
      </div>

      {/* Second Level: Partners */}
      <div className="level-2">
        <div className="partner-section">
          <div className="box partner-general" style={{fontSize: '16px'}}>
            Partner, General Administration,
            <br />
            Finance & HR
          </div>
        </div>
      </div>

      {/* Third Level: Specialized Partners */}
      <div className="level-3">
        <div className="specialized-partners">
          <div className="box partner-quality">
            Partner
            <br />
            Quality & Compliance
            <br />
            Officer
          </div>
          
          <div className="box partner-audit">
            Partner
            <br />
            Audit & Consulting
          </div>
          
          <div className="box partner-management">
            Partner
            <br />
            Management &
            <br />
            Organization
          </div>
        </div>
      </div>

      {/* Fourth Level: Subordinates */}
      <div className="level-4">
        <div className="subordinates-section">
          {/* Under Quality & Compliance */}
          <div className="subordinate-group quality-group">
            <div className="box country-director">
              Country Director
              <br />
              accountants
            </div>
          </div>
          
          {/* Under Audit & Consulting */}
          <div className="subordinate-group audit-group">
            <div className="box senior-junior-auditors">
              Senior and Junior Auditors
            </div>
          </div>
          
          {/* Under Management & Organization */}
          <div className="subordinate-group management-group">
            <div className="box specialists">
              Specialists & External Consultants
              <br />
              (Doctors, Engineers, Lawyers, Sociologists,
              <br />
              Seniors, Juniors ... ETC)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalChart;