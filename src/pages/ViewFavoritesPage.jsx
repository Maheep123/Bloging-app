import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import BlogCard from '../components/BlogCard';
import { Typography, Box } from '@mui/material';

const ViewFavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesCollection = collection(db, 'favorites'); // Reference to the 'favorites' collection
        const snapshot = await getDocs(favoritesCollection); // Fetch all documents from the collection
        const favoriteBlogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Map the data to an array
        setFavorites(favoriteBlogs); // Update state
      } catch (error) {
        console.error('Error fetching favorite blogs:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Box padding={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Favorite Blogs
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {favorites.length > 0 ? (
          favorites.map((blog) => <BlogCard key={blog.id} blog={blog} showDeleteIcon={false} />)
        ) : (
          <Typography variant="h6" align="center">
            No favorite blogs found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewFavoritesPage;
