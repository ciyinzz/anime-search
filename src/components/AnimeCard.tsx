import type { Anime } from '../features/search/types'; // Import the Anime type so this component knows the shape of the anime data it receives

export default function AnimeCard({ anime }: { anime: Anime }) {
  const img = anime.images.jpg?.image_url; // Extract the image URL safely, using optional chaining in case the value is missing
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
