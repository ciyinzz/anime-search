import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeDetail } from '../features/search/searchSlice';
import { RootState, AppDispatch } from '../app/store';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selected, loading, error } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (id) dispatch(fetchAnimeDetail(Number(id)));
  }, [id, dispatch]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (!selected) return <div className="p-4 text-center">No anime found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={selected.images.jpg.image_url} alt={selected.title} className="w-full rounded" />
      <h1 className="mt-4 text-2xl font-bold">{selected.title}</h1>
      <p className="mt-2 text-gray-700">{selected.synopsis}</p>
      <div className="mt-4 space-y-1">
        <div><strong>Episodes:</strong> {selected.episodes ?? 'N/A'}</div>
        <div><strong>Status:</strong> {selected.status}</div>
        <div><strong>Score:</strong> {selected.score ?? 'N/A'}</div>
      </div>
    </div>
  );
}
