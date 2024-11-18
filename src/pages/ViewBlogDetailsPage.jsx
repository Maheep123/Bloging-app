import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import BlogCard from '../components/BlogCard';
import { Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ViewBlogDetailsPage = () => {
  const { id } = useParams();

  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const snap = await getDoc(doc(db, 'blogs', id));
        if (snap.exists()) {
          console.log(snap.data(), 'snap.data()');
          setBlogData(snap.data());
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    getBlogData();
  }, [id]);

  // Function to mark the blog as a favorite
  const handleFavoriteBlog = async () => {
    try {
      const favoriteDocRef = doc(db, 'favorites', id); // Use the same blog ID
      await setDoc(favoriteDocRef, blogData); // Save the blog data to the "favorites" collection
      alert('Blog added to favorites!');
    } catch (error) {
      console.error('Error adding blog to favorites:', error);
      alert('Failed to add blog to favorites.');
    }
  };

  return (
    <Box>
      <BlogCard blog={blogData} showDeleteIcon={false} />
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button
          color="error"
          variant="contained"
          startIcon={<FavoriteIcon />}
          onClick={handleFavoriteBlog}
          disabled={!blogData.title} // Disable if blog data is not loaded
        >
          Mark as Favorite
        </Button>
      </Box>
    </Box>
  );
};

export default ViewBlogDetailsPage;
