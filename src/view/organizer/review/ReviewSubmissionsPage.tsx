'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { FiFilm, FiAward, FiX, FiTrash2 } from 'react-icons/fi';
import { getMyEvents, getEventSubmissions, updateSubmissionStatus, assignWinner, getFilmCrew, getEventWinners, deleteWinner } from '@/api/organizerApi';
import { getUserProfileById } from '@/api/userApi';

interface Winner {
  id: number;
  category: string;
  crewName?: string;
  crewRole?: string;
}

interface Film {
  title?: string;
  genre?: string[];
  duration?: number;
}

interface CrewMember {
  id: number;
  crewName: string;
  crewRole: string;
}

interface Festival {
  id: number;
  title: string;
}

interface Submission {
  id: number;
  filmOwner?: {
    id?: number;
    email?: string | null;
    username?: string;
  };
  submissionStatus?: string;
  awards?: Winner[];
  film?: Film;
  film_id?: number;
  title?: string;
  event_id?: number;
  judgingStatus?: string;
  judging_status?: string;
  submission_status?: string;
}

const statusColors = {
  'under_review': 'bg-blue-500 text-white',
  'shortlist': 'bg-yellow-500 text-white',
  'accept': 'bg-green-500 text-white',
  'reject': 'bg-red-500 text-white',
  'nominee': 'bg-purple-500 text-white',
};

const statusOptions = [
  'All Status',
  'under_review',
  'shortlist',
  'accept',
  'reject',
  'nominee',
];

const PAGE_SIZE = 10;

const statusButtons = [
  { label: 'under_review', value: 'under_review', color: 'bg-blue-500 text-white' },
  { label: 'shortlist', value: 'shortlist', color: 'bg-yellow-500 text-white' },
  { label: 'accept', value: 'accept', color: 'bg-green-500 text-white' },
  { label: 'reject', value: 'reject', color: 'bg-red-500 text-white' },
  { label: 'nominee', value: 'nominee', color: 'bg-purple-500 text-white' },
];

const allAwards = [
  { value: '1st', label: '1st Place', requiresCrew: false },
  { value: '2nd', label: '2nd Place', requiresCrew: false },
  { value: '3rd', label: '3rd Place', requiresCrew: false },
  { value: 'Comedy', label: 'Best Comedy', requiresCrew: false },
  { value: 'Romance', label: 'Best Romance', requiresCrew: false },
  { value: 'Drama', label: 'Best Drama', requiresCrew: false },
  { value: 'Educational', label: 'Best Educational', requiresCrew: false },
  { value: 'Documentary', label: 'Best Documentary', requiresCrew: false },
  { value: 'War', label: 'Best War', requiresCrew: false },
  { value: 'Fantasy', label: 'Best Fantasy', requiresCrew: false },
  { value: 'Action', label: 'Best Action', requiresCrew: false },
  { value: 'Traditional', label: 'Best Traditional', requiresCrew: false },
  { value: 'Western', label: 'Best Western', requiresCrew: false },
  { value: 'Horror', label: 'Best Horror', requiresCrew: false },
  { value: 'Animation', label: 'Best Animation', requiresCrew: false },
  { value: 'Thriller', label: 'Best Thriller', requiresCrew: false },
  { value: 'Adventure', label: 'Best Adventure', requiresCrew: false },
  { value: 'Science Fiction', label: 'Best Sci-Fi', requiresCrew: false },
  { value: 'Cinematography', label: 'Best Cinematography', requiresCrew: false },
  { value: 'Screenplay', label: 'Best Screenplay', requiresCrew: false },
  { value: 'Director', label: 'Best Director', requiresCrew: true },
  { value: 'Actor', label: 'Best Actor', requiresCrew: true },
  { value: 'Actress', label: 'Best Actress', requiresCrew: true },
  { value: 'Youth Film', label: 'Best Youth Film', requiresCrew: false },
  { value: 'Audience Choice', label: 'Audience Choice Award', requiresCrew: false },
];

export default function ReviewSubmissionsPage(): React.ReactElement {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<Submission | null>(null);
  const [status, setStatus] = useState('submitted');
  // const [juryScore, setJuryScore] = useState(''); // Unused
  const [judgeComment, setJudgeComment] = useState('');
  const [awardModal, setAwardModal] = useState<Submission | null>(null);
  const [selectedAward, setSelectedAward] = useState('');
  const [filmCrewMembers, setFilmCrewMembers] = useState<CrewMember[]>([]);
  const [selectedCrewId, setSelectedCrewId] = useState<number | null>(null);
  const [loadingCrew, setLoadingCrew] = useState(false);

  // State for API data
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All Status');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch festivals
  const fetchFestivals = async () => {
    try {
      const response = await getMyEvents();
      setFestivals((response.events || []) as Festival[]);
    } catch (err) {
      console.error('Error fetching festivals:', err);
    }
  };

  // Fetch submissions
  const fetchSubmissions = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      let allSubmissions: Submission[] = [];
      let allWinnersData: unknown[] = [];
      if (selectedFestival === 'all') {
        // Fetch submissions and winners from all festivals
        const allPromises = festivals.map(async (festival) => {
          const [submissionsResponse, winnersResponse] = await Promise.all([
            getEventSubmissions(festival.id),
            getEventWinners(festival.id)
          ]);
          return { submissionsResponse, winnersResponse };
        });
        const results = await Promise.all(allPromises);
        results.forEach(({ submissionsResponse, winnersResponse }) => {
          allSubmissions = allSubmissions.concat((submissionsResponse.submissions || []) as Submission[]);
          allWinnersData = allWinnersData.concat(winnersResponse.winners || []);
        });
      } else {
        // Fetch submissions and winners for specific event
        const eventId = parseInt(selectedFestival);
        const [submissionsResponse, winnersResponse] = await Promise.all([
          getEventSubmissions(eventId),
          getEventWinners(eventId)
        ]);
        allSubmissions = (submissionsResponse.submissions || []) as Submission[];
        allWinnersData = winnersResponse.winners || [];
      }
      console.log('[ReviewSubmissions] All Submissions:', allSubmissions);
      // Log the first submission's filmOwner for debugging
      if (allSubmissions.length > 0) {
        console.log('[ReviewSubmissions] First submission filmOwner:', allSubmissions[0].filmOwner);
      }
      console.log('[ReviewSubmissions] All Winners:', allWinnersData);
      // Map winners to submissions by eventFilmSubmissionId
      const winnersMap = new Map();
      if (allWinnersData && Array.isArray(allWinnersData)) {
        allWinnersData.forEach((winner) => {
          if (winner && typeof winner === 'object' && winner !== null && 'eventFilmSubmissionId' in winner) {
            const w = winner as { eventFilmSubmissionId: number; id: number; category: string; crewName?: string; crewRole?: string };
            const submissionId = w.eventFilmSubmissionId;
            if (!winnersMap.has(submissionId)) {
              winnersMap.set(submissionId, []);
            }
            winnersMap.get(submissionId).push({
              id: w.id,
              category: w.category,
              crewName: w.crewName,
              crewRole: w.crewRole,
            });
          }
        });
      }
      // Add awards to each submission, and fetch email if missing
      const submissionsWithAwards = await Promise.all(
        allSubmissions.map(async (submission) => {
          if (submission && typeof submission === 'object' && submission !== null) {
            const s = submission as { id: number; filmOwner?: { email?: string; id?: number }; film?: unknown };
            let email = s.filmOwner?.email || null;
            if (!email && s.filmOwner?.id) {
              try {
                const profile = await getUserProfileById(String(s.filmOwner.id));
                email = profile?.email || 'N/A';
              } catch (e) {
                console.warn('[ReviewSubmissions] Could not fetch email for filmOwner:', s.filmOwner, e);
                email = 'N/A';
              }
            }
            return {
              ...s,
              awards: winnersMap.get(s.id) || [],
              filmOwner: {
                ...s.filmOwner,
                email,
              },
              film: s.film as Film,
            };
          }
          return submission;
        })
      );
      console.log('[ReviewSubmissions] Submissions with awards:', submissionsWithAwards);
      setSubmissions(submissionsWithAwards);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedFestival, festivals]);

  // Fetch festivals on mount
  useEffect(() => {
    fetchFestivals();
  }, []);

  // Fetch submissions when festival changes
  useEffect(() => {
    if (selectedFestival === 'all' && festivals.length > 0) {
      fetchSubmissions();
    } else if (selectedFestival && selectedFestival !== 'all') {
      fetchSubmissions();
    }
  }, [selectedFestival, festivals, fetchSubmissions]);

  const handleStatusUpdate = async () => {
    if (!modal) return;

    try {
      await updateSubmissionStatus((modal as Submission).id, status as "submitted" | "under_review" | "reviewed");
      // Refresh submissions
      fetchSubmissions(true);
      setModal(null);
    } catch (err) {
      const errorMsg = (typeof err === 'object' && err && 'message' in err) ? (err as { message?: string }).message : undefined;
      alert('Failed to update status: ' + (errorMsg || 'Unknown error'));
    }
  };

  const handleAwardChange = async (value: string) => {
    setSelectedAward(value);
    setSelectedCrewId(null);
    
    // Check if this award requires crew selection
    const awardInfo = allAwards.find(a => a.value === value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (awardInfo?.requiresCrew && (awardModal as any)?.film?.id) {
      // Fetch crew members for this film
      setLoadingCrew(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await getFilmCrew((awardModal as any).film.id);
        setFilmCrewMembers((response.crew as CrewMember[]) || []);
      } catch (err) {
        console.error('Error fetching crew:', err);
        setFilmCrewMembers([]);
      } finally {
        setLoadingCrew(false);
      }
    } else {
      setFilmCrewMembers([]);
    }
  };

  const handleAssignAward = async () => {
    if (!awardModal) return;

    if (!selectedAward) {
      alert('Please select an award');
      return;
    }

    // Check if crew selection is required
    const awardInfo = allAwards.find(a => a.value === selectedAward);
    if (awardInfo?.requiresCrew && !selectedCrewId) {
      alert('Please select a crew member for this award');
      return;
    }

    // Get the event ID from the submission, not from the selected filter
    const eventId = (awardModal as Submission).event_id;
    if (!eventId) {
      alert('Unable to determine event for this submission');
      return;
    }

    try {
      const winnerData: { eventFilmSubmissionId: number; category: string; filmCrewId?: number } = {
        eventFilmSubmissionId: (awardModal as Submission).id,
        category: selectedAward,
      };

      if (selectedCrewId) {
        winnerData.filmCrewId = selectedCrewId;
      }

      await assignWinner(eventId, winnerData);
      // Refresh submissions
      fetchSubmissions(true);
      setAwardModal(null);
      setSelectedAward('');
      setFilmCrewMembers([]);
      setSelectedCrewId(null);
    } catch (err) {
      const errorMsg = (typeof err === 'object' && err && 'message' in err) ? (err as { message?: string }).message : undefined;
      alert('Failed to assign award: ' + (errorMsg || 'Unknown error'));
    }
  };

  const handleDeleteAward = async (winnerId: number, eventId: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (!confirm('Are you sure you want to remove this award?')) {
      return;
    }

    try {
      await deleteWinner(eventId, winnerId);
      // Refresh submissions
      fetchSubmissions(true);
    } catch (err) {
      const errorMsg = (typeof err === 'object' && err && 'message' in err) ? (err as { message?: string }).message : undefined;
      alert('Failed to delete award: ' + (errorMsg || 'Unknown error'));
    }
  };

  // Filter and paginate submissions
  const filteredSubmissions = selectedStatusFilter === 'All Status'
    ? submissions
    : submissions.filter((s) => s.submissionStatus === selectedStatusFilter);

  const totalPages = Math.ceil(filteredSubmissions.length / PAGE_SIZE);
  const paged = filteredSubmissions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-green-900 mb-1">Review Submissions</h1>
          <p className="text-gray-500 text-base">Evaluate films and assign awards</p>
        </div>
        <div className="flex gap-3">
          <select
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 min-w-[220px] shadow-sm"
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
            title="Festival Filter"
          >
            <option value="all">All Events</option>
            {festivals.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 min-w-[150px] shadow-sm"
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            title="Status Filter"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900"></div>
        </div>
      )}


      <div className="bg-white rounded-xl shadow p-6 relative">
        {refreshing && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-900"></div>
              <span className="text-sm text-gray-700 font-medium">Refreshing...</span>
            </div>
          </div>
        )}
        <table className="min-w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Film</th>
              <th className="px-4 py-2 font-semibold">Filmmaker</th>
              <th className="px-4 py-2 font-semibold">Genre</th>
              <th className="px-4 py-2 font-semibold">Duration</th>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">Award</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? null : paged.length > 0 ? (
              paged.map((s) => (
                <tr key={s.id} className="bg-white border-b last:border-b-0">
                  <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                    {s.filmOwner?.email || 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-gray-900 whitespace-nowrap flex items-center gap-2">
                    <span className="inline-flex items-center justify-center bg-green-100 rounded p-1">
                      <FiFilm className="text-green-900 text-lg" />
                    </span>
                    <span>{s.film?.title || 'Untitled'}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                    {s.filmOwner?.username || 'Unknown'}
                  </td>
                  <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                    {s.film?.genre?.join(', ') || 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                    {s.film?.duration ? `${s.film.duration} min` : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                        statusColors[s.submissionStatus as keyof typeof statusColors] || 'bg-gray-400 text-white'
                      }`}
                      onClick={() => {
                        setModal(s);
                        setStatus(s.submissionStatus || 'submitted');
                      }}
                    >
                      {s.submissionStatus?.replace('_', ' ') || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-900">
                    {s.awards && s.awards.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {Array.isArray(s.awards) && s.awards.map((award, idx: number) => {
                          if (award && typeof award === 'object' && award !== null) {
                            const a = award as { id: number; category: string; crewName?: string };
                            return (
                              <div key={idx} className="flex items-center gap-2 group">
                                <FiAward className="text-yellow-500 flex-shrink-0" />
                                <span className="text-sm font-medium flex-1">
                                  {a.category}
                                  {a.crewName && (
                                    <span className="text-gray-500 text-xs ml-1">
                                      ({a.crewName})
                                    </span>
                                  )}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteAward(a.id, s.event_id!, e)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                                  title="Remove award"
                                >
                                  <FiTrash2 className="text-red-500 text-sm" />
                                </button>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No award</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="border border-green-900 text-green-900 font-bold px-4 py-1 rounded flex items-center gap-1 hover:bg-green-50"
                      onClick={() => {
                        setAwardModal(s);
                        setSelectedAward('');
                        setFilmCrewMembers([]);
                        setSelectedCrewId(null);
                      }}
                    >
                      <FiAward className="text-green-900" /> Award
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  {selectedFestival === 'all' ? 'No submissions yet across all events' : selectedFestival ? 'No submissions yet for this festival' : 'Please select a festival'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className={`px-4 py-2 rounded border font-semibold ${
              page === 1
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-green-900 border-gray-300'
            }`}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded border font-semibold ${
              page === totalPages
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-green-900 border-gray-300'
            }`}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* Modal for status update */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setModal(null)} title="Close"><FiX size={20} /></button>
            <h2 className="text-xl font-bold text-green-900 mb-1">{modal.film?.title || 'Untitled'}</h2>
            <p className="text-gray-500 mb-4">Review details and submission information</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <div className="text-xs text-gray-500">Filmmaker</div>
                <div className="font-medium text-gray-900">{modal.filmOwner?.username || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Genre</div>
                <div className="font-medium text-gray-900">{modal.film?.genre?.join(', ') || 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-medium text-gray-900">{modal.film?.duration ? `${modal.film.duration} min` : 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Submission ID</div>
                <div className="font-medium text-gray-900">#{modal.id}</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-xs text-gray-500 mb-1">Current Status</div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status as keyof typeof statusColors]}`}>{status}</span>
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Judge Comments</div>
              <textarea
                className="bg-gray-100 rounded px-3 py-2 text-gray-700 text-sm w-full min-h-[48px]"
                value={judgeComment}
                placeholder="Add or update judge comments..."
                onChange={e => setJudgeComment(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <div className="text-xs text-gray-500 mb-1">Change Status</div>
              <div className="flex gap-2 mt-1">
                {statusButtons.map((btn) => (
                  <button
                    key={btn.value}
                    type="button"
                    className={`px-3 py-1 rounded font-semibold text-xs focus:outline-none ${btn.color} ${
                      status === btn.value ? 'ring-2 ring-green-900' : ''
                    }`}
                    onClick={() => setStatus(btn.value)}
                  >
                    {btn.label.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="bg-green-900 text-white font-bold px-6 py-2 rounded hover:bg-green-800 w-full"
              onClick={handleStatusUpdate}
            >
              Update Status
            </button>
          </div>
        </div>
      )}
      {/* Assign Award Modal */}
      {awardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative animate-fade-in">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setAwardModal(null)} title="Close"><FiX size={20} /></button>
            <h2 className="text-xl font-bold text-green-900 mb-1">Assign Award</h2>
            <p className="text-gray-500 mb-6">Assign an award to <span className="font-semibold text-gray-900">{awardModal.film?.title || 'this film'}</span></p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Award Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                value={selectedAward}
                onChange={(e) => handleAwardChange(e.target.value)}
                title="Award Category"
              >
                <option value="">Choose an award...</option>
                <optgroup label="Main Awards">
                  {allAwards.filter(a => ['1st', '2nd', '3rd'].includes(a.value)).map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Genre Awards">
                  {allAwards.filter(a => ['Comedy', 'Romance', 'Drama', 'Educational', 'Documentary', 'War', 'Fantasy', 'Action', 'Traditional', 'Western', 'Horror', 'Animation', 'Thriller', 'Adventure', 'Science Fiction'].includes(a.value)).map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Technical & Special Awards">
                  {allAwards.filter(a => ['Cinematography', 'Screenplay', 'Director', 'Actor', 'Actress', 'Youth Film', 'Audience Choice'].includes(a.value)).map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Show crew selection if award requires it */}
            {selectedAward && allAwards.find(a => a.value === selectedAward)?.requiresCrew && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Crew Member
                  {loadingCrew && <span className="text-gray-400 text-xs ml-2">(Loading...)</span>}
                </label>
                {!loadingCrew && filmCrewMembers.length > 0 ? (
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-transparent"
                    value={selectedCrewId || ''}
                    onChange={(e) => setSelectedCrewId(parseInt(e.target.value))}
                    title="Crew Member"
                  >
                    <option value="">Select crew member...</option>
                    {filmCrewMembers.map(crew => (
                      <option key={crew.id} value={crew.id}>
                        {crew.crewName} - {crew.crewRole}
                      </option>
                    ))}
                  </select>
                ) : !loadingCrew ? (
                  <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded p-3">
                    No crew members found for this film. Please add crew members first.
                  </p>
                ) : null}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-8">
              <button
                className="border border-gray-300 rounded px-6 py-2 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setAwardModal(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-900 text-white font-bold px-6 py-2 rounded hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleAssignAward}
                disabled={!selectedAward || (allAwards.find(a => a.value === selectedAward)?.requiresCrew && !selectedCrewId)}
              >
                Assign Award
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
