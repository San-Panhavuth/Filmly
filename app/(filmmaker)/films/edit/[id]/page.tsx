'use client';

import React, { useEffect, useState } from 'react';

const GENRES = [
  'Comedy', 'Romance', 'Drama', 'Educational', 'Documentary', 'War', 'Fantasy', 'Action',
  'Traditional', 'Western', 'Horror', 'Animation', 'Thriller', 'Adventure', 'Science Fiction', 'Musical',
];

interface Film {
  id: string;
  title: string;
  country: string;
  duration: string;
  genre: string;
  language: string;
  theme: string;
  synopsis: string;
  year: string;
}

export default function EditFilmPage({ params }: { params: { id: string } }) {
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    const films: Film[] = JSON.parse(localStorage.getItem('mock_films') || '[]');
    const found = films.find((f) => f.id === params.id);
    Promise.resolve().then(() => {
      setFilm(
        found || {
          id: params.id,
          title: '',
          country: '',
          duration: '',
          genre: '',
          language: '',
          theme: '',
          synopsis: '',
          year: '',
        }
      );
    });
  }, [params.id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (!film) return;
    setFilm({
      id: film.id,
      title: e.target.name === 'title' ? e.target.value : film.title,
      country: e.target.name === 'country' ? e.target.value : film.country,
      duration: e.target.name === 'duration' ? e.target.value : film.duration,
      genre: e.target.name === 'genre' ? e.target.value : film.genre,
      language: e.target.name === 'language' ? e.target.value : film.language,
      theme: e.target.name === 'theme' ? e.target.value : film.theme,
      synopsis: e.target.name === 'synopsis' ? e.target.value : film.synopsis,
      year: e.target.name === 'year' ? e.target.value : film.year,
    });
  }

  function saveEdit() {
    if (!film) return;
    const films: Film[] = JSON.parse(localStorage.getItem('mock_films') || '[]');
    const idx = films.findIndex((f) => f.id === film.id);
    if (idx >= 0) {
      films[idx] = film;
    } else {
      films.push(film);
    }
    localStorage.setItem('mock_films', JSON.stringify(films));
    alert('Film updated!');
    window.location.href = '/films/matching';
  }

  if (!film) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Film</h1>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Title</label>
        <input
          name="title"
          value={film.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter film title"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Year</label>
        <input
          name="year"
          value={film.year || ''}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter year"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Country</label>
        <input
          name="country"
          value={film.country}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter country"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Duration</label>
        <input
          name="duration"
          value={film.duration}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter duration (e.g. 90 min)"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Genre</label>
        <select
          name="genre"
          value={film.genre}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          title="Select genre"
        >
          <option value="">Select genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Language</label>
        <input
          name="language"
          value={film.language}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter language"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Theme</label>
        <input
          name="theme"
          value={film.theme}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter theme"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Synopsis</label>
        <textarea
          name="synopsis"
          value={film.synopsis}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter synopsis"
        />
      </div>
      <button
        onClick={saveEdit}
        className="bg-[#0C4A2A] text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}