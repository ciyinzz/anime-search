import SearchBar from '../components/SearchBar';
import AnimeList from '../components/AnimeList';
import Pagination from '../components/Pagination';

export default function SearchPage() {
  return (
    <div>
      <SearchBar />
      <AnimeList />
      <Pagination />
    </div>
  );
}
