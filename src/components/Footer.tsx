export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600 mt-8">
      <p>
        Powered by <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
          Jikan API
        </a>
      </p>
      <p className="mt-1">© {new Date().getFullYear()} Anime Search App</p>
    </footer>
  );
}
