import './App.css';
import { useRoutes } from 'react-router-dom';
import SignInPage from './pages/Signin';
import SignupPage from './pages/Signup';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ViewBlogsPage from './pages/ViewBlogsPage';
import ViewBlogDetailsPage from './pages/ViewBlogDetailsPage';
import ViewFavoritesPage from './pages/ViewFavoritesPage'; // Import the new Favorites page
import Navbar from './components/Navbar';

function App() {
  // React Router Setup
  const routes = useRoutes([
    {
      path: '/',
      element: <SignInPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/viewblogs',
      element: <ViewBlogsPage />
    },
    {
      path: '/viewblogs/:id',
      element: <ViewBlogDetailsPage />
    },
    {
      path: '/favorites', // New route for viewing favorite blogs
      element: <ViewFavoritesPage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);

  return (
    <>
      <Navbar />
      {routes}
    </>
  );
}

export default App;
