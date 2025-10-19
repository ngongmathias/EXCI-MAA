import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { fetchAll } from '../../../services/supabaseCrud';

const JobListings: React.FC = () => {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const rows = await fetchAll<any>('careers' as any);
        setJobs(rows.filter((j) => (j.status ?? 'open') !== 'closed'));
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('careers.jobsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('careers.jobsSubtitle')}
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading && <div className="text-center text-gray-500">Loading...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
          {!loading && !error && jobs.map((job) => (
            <a key={job.id} href={job.application_url || `mailto:${job.apply_email || ''}`} target="_blank" rel="noreferrer"
               className="block rounded-xl border border-gray-200 p-5 hover:shadow-lg transition bg-white">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{job.department} • {job.location}</p>
                {job.salary_range && (
                  <p className="text-sm text-gray-500 mt-1">{job.salary_range}</p>
                )}
                <p className="text-sm text-gray-700 mt-3 line-clamp-3">{job.description}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium">Apply →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;


