'use client';

import React, { useEffect, useState } from 'react';

type Match = {

  // Festival/event match result
  id: string;
  eventId?: string | number;
  eventTitle?: string;
  eventDescription?: string;
  eventLanguage?: string;
  eventLocation?: string;
  eventDeadline?: string;
  daysUntilDeadline?: number;
  matchScore?: number;
  themeScore?: number;
  languageSupported?: boolean;
  deadlineScore?: number;
  matchReasons?: string[];
  // For legacy/compat
  festival?: string;
  score?: number;
  type?: string;
  country?: string;
  deadline?: string;
};

type AIMatchingResults = {
  filmId: string | number;
  filmTitle: string;
  results: Match[];
  userInput?: {
    theme: string;
    language: string;
  };
  totalFestivals?: number;
  compatibleMatches?: number;
};

  export default function MatchingResultsSection() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [hasResults, setHasResults] = useState(false);

    useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadResults = async () => {
      // Get timestamp from URL to trigger reload on new navigation
      const urlParams = new URLSearchParams(window.location.search);
      const timestamp = urlParams.get('t');
      console.log('MatchingResultsSection: URL timestamp:', timestamp);

      // Try to get results from sessionStorage first
      const storedResults = sessionStorage.getItem('ai_matching_results');
      console.log('MatchingResultsSection: Loading from sessionStorage:', storedResults);

      if (storedResults) {
        try {
          const parsed: AIMatchingResults = JSON.parse(storedResults);
          console.log('MatchingResultsSection: Parsed results:', parsed);

          // Transform backend results to match format
          const transformedMatches: Match[] = parsed.results.map((result: Match, index: number) => {
            // Type guard for legacy fields
            const legacyFestivalTitle = (result as { festivalTitle?: string })?.festivalTitle;
            const legacyFestivalLocation = (result as { festivalLocation?: string })?.festivalLocation;
            return {
              id: result.eventId ? `${result.eventId}` : `match-${index}`,
              eventId: result.eventId,
              eventTitle: result.eventTitle,
              eventDescription: result.eventDescription,
              eventLanguage: result.eventLanguage,
              eventLocation: result.eventLocation,
              eventDeadline: result.eventDeadline,
              daysUntilDeadline: result.daysUntilDeadline,
              matchScore: result.matchScore,
              themeScore: result.themeScore,
              languageSupported: result.languageSupported,
              deadlineScore: result.deadlineScore,
              matchReasons: result.matchReasons,
              // Legacy format for display
              festival: result.eventTitle || legacyFestivalTitle || 'Unknown Festival',
              score: result.matchScore || 0,
              type: 'Festival',
              country: result.eventLocation || legacyFestivalLocation || 'Unknown',
              deadline: result.eventDeadline
                ? new Date(result.eventDeadline as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'TBD',
            };
          });

          console.log('MatchingResultsSection: Transformed matches:', transformedMatches);
          setMatches(transformedMatches);
          setHasResults(true);
          return;
        } catch (error) {
          console.error('Error parsing stored results:', error);
        }
      }

      // Check URL parameters
      const params = new URLSearchParams(window.location.search);
      const qId = params.get('filmId');
      const qTitle = params.get('title');

      if (qId && qTitle) {
        // If we have URL params but no stored results, show empty state
        setHasResults(false);
      }
    };
    loadResults();
  }, []);

    if (!hasResults && matches.length === 0) {
      return (
        <div className="rounded-xl border border-[#EDEDED] bg-white p-8 shadow-sm w-full">
          <div className="text-center text-[#6F6F6F]">
            <p className="text-sm">No matching results yet. Click &quot;AI matching&quot; on a film to see festival matches.</p>
          </div>
        </div>
      );
    }

  // ...existing code...

// ...existing code...
}