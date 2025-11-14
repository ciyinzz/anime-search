import AppRoutes from '../routes/AppRoutes'; // Import the routing configuration for the app
import { BrowserRouter } from 'react-router-dom'; // Enables client-side routing in React
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-gray-900 font-sans flex flex-col 
                dark:bg-gray-950 dark:text-gray-100">

      <Header />
      <main className="flex-grow">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}
