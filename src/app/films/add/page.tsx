'use client';

import React from 'react';
import AddFilmForm from '@/view/films/add/AddFilmForm';

export default function Page() {
  // keep global navigation/layout by NOT overriding layout here.
  // Render only the AddFilmForm component as the route page component.
  return <AddFilmForm />;
}