import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function AnimeList() {
  const { results, loading, error } = useSelector((state: RootState) => state.search);

  if (loading) return <div className="text-center p-4 text-primary">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (results.length === 0) return <div className="text-center p-4 text-gray-500">No results found.</div>;

  return (
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
