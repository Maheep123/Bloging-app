/* eslint-disable react/prop-types */
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Firebase Firestore imports
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, showDeleteIcon = true } = props;

    const navigate = useNavigate();

    // Handle marking the blog as favorite
    const handleFavoriteBlog = async (blog) => {
        try {
            const favoriteDocRef = doc(db, 'favorites', blog.id); // Create a reference for the blog in the "favorites" collection
            await setDoc(favoriteDocRef, blog); // Save the blog data to Firestore
            alert('Blog added to favorites!');
        } catch (error) {
            console.error('Error adding blog to favorites:', error);
            alert('Failed to add blog to favorites.');
        }
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog.image}
                title={blog.title}
            />
            {
                showDeleteIcon && (
                    <IconButton
                        style={{ position: 'absolute', right: '10px', top: '5px' }}
                        aria-label="delete"
                        size="small"
                        onClick={() => deleteBlog(blog.id)}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                )
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />
            </CardContent>
            <CardActions>
                <IconButton color="error" onClick={() => handleFavoriteBlog(blog)}>
                    <FavoriteIcon />
                </IconButton>
                <Button color="secondary" variant="contained" onClick={() => navigate(`/viewblogs/${blog.id}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
