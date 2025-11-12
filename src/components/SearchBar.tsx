import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchAnimeSuggestions, fetchAnimeResults, setCurrentPage } from '../features/search/searchSlice';
import { RootState, AppDispatch } from '../app/store';
import { useEffect, useState, useRef } from 'react';

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { query, suggestions, loading } = useSelector((state: RootState) => state.search);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length <= 2) {
      setShowDropdown(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(fetchAnimeSuggestions(trimmedQuery));
      dispatch(setCurrentPage(1));
      dispatch(fetchAnimeResults({ query: trimmedQuery, page: 1 }));
      setShowDropdown(true);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (title: string) => {
    dispatch(setQuery(title));
    dispatch(setCurrentPage(1));
    dispatch(fetchAnimeResults({ query: title, page: 1 }));
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-4" ref={dropdownRef}>
      <input
  type="text"
  value={query}
  onChange={(e) => dispatch(setQuery(e.target.value))}
  placeholder="Search anime..."
  className="border border-gray-300 p-3 rounded-lg w-full 
             focus:outline-none focus:ring-2 focus:ring-primary 
             shadow-sm bg-card text-gray-900
             dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
/>
      {showDropdown && (
        <ul className="absolute z-10 bg-card border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-y-auto shadow-lg">
          {loading && (
            <li className="p-2 text-gray-500 italic">Loading...</li>
          )}
          {!loading && suggestions.length === 0 && (
            <li className="p-2 text-gray-500 italic">No results found</li>
          )}
          {!loading && suggestions.map((anime) => (
            <li
              key={anime.mal_id}
              className="p-2 hover:bg-primary-light cursor-pointer rounded"
              onClick={() => handleSelect(anime.title)}
            >
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
