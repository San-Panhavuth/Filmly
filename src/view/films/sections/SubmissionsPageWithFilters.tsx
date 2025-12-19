// SubmissionsPageWithFilters.tsx
'use client';
import React, { useState, useMemo } from 'react';
import SubmissionsFiltersSection from './SubmissionsFiltersSection';
import SubmissionsTableSection from './SubmissionsTableSection';

export default function SubmissionsPageWithFilters() {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [judgingFilter, setJudgingFilter] = useState<string>('All');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch submissions once, then filter in-memory
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (!token) {
          setSubmissions([]);
          setLoading(false);
          return;
        }
        const res = await fetch('/api/submissions', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (!res.ok) {
          setSubmissions([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        // Map backend fields to Submission type (snake_case from API)
        const mapSubmission = (item: any) => {
          let submissionStatus: 'Accepted' | 'Rejected' = 'Rejected';
          let judgingStatus: 'Under Review' | 'Shortlist' | 'Nominee' | '' = '';
          if (item.submission_status === 'accept') {
            submissionStatus = 'Accepted';
          } else if (item.submission_status === 'reject') {
            submissionStatus = 'Rejected';
          } else if (item.submission_status === 'under_review') {
            submissionStatus = 'Accepted';
            judgingStatus = 'Under Review';
          } else if (item.submission_status === 'shortlist') {
            submissionStatus = 'Accepted';
            judgingStatus = 'Shortlist';
          } else if (item.submission_status === 'nominee') {
            submissionStatus = 'Accepted';
            judgingStatus = 'Nominee';
          }
          return {
            id: item.id?.toString() ?? '',
            film: item.film?.title ?? '-',
            festival: item.event?.title ?? '-',
            eventDate: item.event?.deadline ?? '-',
            submissionStatus,
            judgingStatus,
            comments: item.comments || '',
            image: item.film?.filmPosterUrl || '/image/10.svg',
            eventId: item.event?.id?.toString() ?? item.event_id?.toString() ?? '',
            filmId: item.film?.id?.toString() ?? item.film_id?.toString() ?? '',
          };
        };
        const allSubs = Array.isArray(data.submissions)
          ? data.submissions.map(mapSubmission)
          : [];
        setSubmissions(allSubs);
      } catch (e) {
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      let statusOk = statusFilter === 'All' || s.submissionStatus === statusFilter;
      let judgingOk = judgingFilter === 'All' || s.judgingStatus === judgingFilter;
      return statusOk && judgingOk;
    });
  }, [submissions, statusFilter, judgingFilter]);

  return (
    <div className="flex flex-col gap-4">
      <SubmissionsFiltersSection
      statusFilter={statusFilter}
      judgingFilter={judgingFilter}
      onStatusChange={setStatusFilter}
      onJudgingChange={setJudgingFilter}
      total={filtered.length}
    />
      <SubmissionsTableSection
        submissions={filtered}
        loading={loading}
      />
    </div>
  );
}