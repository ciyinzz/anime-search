import type { Anime } from '../features/search/types';

export default function AnimeCard({ anime }: { anime: Anime }) {
  const img = anime.images.jpg?.image_url;
  return (
    <div className="card">
      <img src={img} alt={anime.title} />
      <div className="card-body">
        <h3>{anime.title}</h3>
        <p>Score: {anime.score ?? '—'}</p>
        <p>Episodes: {anime.episodes ?? '—'}</p>
        <p>Year: {anime.year ?? '—'}</p>
      </div>
    </div>
  );
}
