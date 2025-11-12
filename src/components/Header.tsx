import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="bg-primary text-white shadow dark:bg-gray-900 dark:text-gray-100">
  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
    <h1 className="text-xl font-bold tracking-wide">Anime Search App</h1>
    <DarkModeToggle />
  </div>
</header>

  );
}
