import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { setCurrentPage, fetchAnimeResults } from '../features/search/searchSlice';

export default function Pagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { query, currentPage, totalPages } = useSelector((state: RootState) => state.search);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchAnimeResults({ query, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
