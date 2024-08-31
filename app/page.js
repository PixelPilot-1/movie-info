'use client';
import { useState } from 'react';
import { BASE_URL } from './constants';
import MovieGrid from './components/MovieGrid';
import Link from 'next/link';
import Modal from './components/Model';

async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&query=${encodeURIComponent(query)}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching data while searching movie', error);
    return [];
  }
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedmovie, setselectedmovie] = useState(null);

  function handleMovieClick(movie) {
    setselectedmovie(movie);
  }

  function handleCloseModal() {
    setselectedmovie(null);
  }

  async function handleSearch(event) {
    event.preventDefault();

    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results.results);
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Movie Explorer</h1>

        <form onSubmit={handleSearch} className="m-8">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for movies......"
            className="px-4 py-2 w-80 text-gray-900 rounded-2xl"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 rounded-2xl text-white hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />
      </main>
      <Modal movie={selectedmovie} onClose={handleCloseModal} />
    </div>
  );
}
