import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchAnimeSuggestions, fetchAnimeResults, setCurrentPage } from '../features/search/searchSlice';
// Import Redux actions for updating search text, suggestions, results, and pagination
import { RootState, AppDispatch } from '../app/store';
import { useEffect, useState, useRef } from 'react';
// useEffect → run side effects (API calls)
// useState → local component state
// useRef → reference DOM elements for click detection

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  // Extract search-related state from Redux
  const { query, suggestions, loading } = useSelector((state: RootState) => state.search);
   // Controls whether the dropdown is visible
  const [showDropdown, setShowDropdown] = useState(false);
    // Reference to the dropdown container (used to detect clicks outside)
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    // If query is too short, close dropdown and stop API calls
    if (trimmedQuery.length <= 2) {
      setShowDropdown(false);
      return;
    }

   // Add a debounce (wait 250ms after typing)
    const timeoutId = setTimeout(() => {
      dispatch(fetchAnimeSuggestions(trimmedQuery));  // Fetch autocomplete suggestions
      dispatch(setCurrentPage(1)); // Reset pagination to page 1
      dispatch(fetchAnimeResults({ query: trimmedQuery, page: 1 })); // Fetch actual anime results
      setShowDropdown(true); // Open dropdown
    }, 250);

    return () => clearTimeout(timeoutId);  // Cleanup on rapid typing
  }, [query, dispatch]);

  // ------- Close dropdown when clicking outside ------- //
  useEffect(() => {
     // If click is outside dropdown container, close it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    // Listen for outside clicks
    document.addEventListener('mousedown', handleClickOutside);
    // Cleanup listener on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ------- Handle selecting a suggestion ------- //
  const handleSelect = (title: string) => {
    dispatch(setQuery(title)); // Update search query in Redux
    dispatch(setCurrentPage(1)); // Reset to first page
    dispatch(fetchAnimeResults({ query: title, page: 1 })); // Fetch results for selected title
    setShowDropdown(false); // Close dropdown
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
