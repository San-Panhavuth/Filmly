'use client';

import React from 'react';

// Accept festivalId as prop to distinguish submission type
interface AddFilmFormProps {
  festivalId?: string;
}

export default function AddFilmForm({ festivalId }: AddFilmFormProps) {
  // Use festivalId to distinguish submission type
  const submissionType = festivalId ? 'Festival Submission' : 'AI Matching Submission';
  return <div>Submission type: {submissionType}</div>;
}
