import { Link } from 'react-router-dom'; // Link lets us navigate to anime detail pages without reloading
import { useSelector } from 'react-redux'; // useSelector reads data from the Redux store
import { RootState } from '../app/store'; // Import the RootState type for proper TypeScript typing

export default function AnimeList() {
  // Extract values from the Redux search slice: results, loading status, error message
  const { results, loading, error } = useSelector((state: RootState) => state.search);
 // Show loading state while fetching data
  if (loading) return <div className="text-center p-4 text-primary">Loading...</div>;
    // Show error message if the search failed
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  // Show fallback message when no anime results are found
  if (results.length === 0) return <div className="text-center p-4 text-gray-500">No results found.</div>;

  return (
    // Grid layout for displaying anime cards
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {results.map((anime) => (
        <Link
  key={anime.mal_id}
  to={`/anime/${anime.mal_id}`}
  className="bg-card border rounded-lg shadow hover:shadow-xl transition p-3 block
             dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl"
>
  <img
    src={anime.images.jpg.image_url}
    alt={anime.title}
    className="w-full h-56 object-cover rounded-md"
  />
  <h3 className="mt-3 text-base font-semibold text-primary dark:text-secondary">
    {anime.title}
  </h3>
</Link>


      ))}
    </div>
  );
}
