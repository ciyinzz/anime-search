import { useDispatch, useSelector } from 'react-redux';
// useDispatch → sends actions to Redux
// useSelector → reads values from Redux store
import { RootState, AppDispatch } from '../app/store';
// Import TypeScript types for the store and dispatch
import { setCurrentPage, fetchAnimeResults } from '../features/search/searchSlice';
// Actions for updating the current page and fetching new results

export default function Pagination() {
  // Typed dispatch so TypeScript knows what actions can be dispatched
  const dispatch = useDispatch<AppDispatch>();
  // Extract search-related values from Redux
  const { query, currentPage, totalPages } = useSelector((state: RootState) => state.search);

  // Runs when a user clicks a page button
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));  // Update Redux state for current page
    dispatch(fetchAnimeResults({ query, page })); // Fetch new results for the selected page
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll back to top
  };

    // Generate an array of page numbers (max 10 for cleaner UI)
  const pages = Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {pages.map((page) => {
        const isActive = page === currentPage;

        const baseBtn =
          'px-4 py-2 rounded-lg border transition font-medium focus:outline-none focus:ring-2';
        const activeBtn =
          'bg-primary text-white shadow focus:ring-primary dark:bg-secondary dark:text-gray-900';
        const inactiveBtn =
          'bg-card text-primary hover:bg-primary-light focus:ring-primary ' +
          'dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700';

        const btnClass = `${baseBtn} ${isActive ? activeBtn : inactiveBtn}`;

        return (
          <button key={page} onClick={() => handlePageChange(page)} className={btnClass}>
            {page}
          </button>
        );
      })}
    </div>
  );
}
