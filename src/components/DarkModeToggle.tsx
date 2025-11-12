import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="ml-4 px-3 py-1 rounded-md border 
                 bg-card text-primary hover:bg-primary-light 
                 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
