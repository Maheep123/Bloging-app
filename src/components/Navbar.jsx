import { AppBar, Toolbar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Listen to Firebase Auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Update state if a user is signed in
        });

        // Cleanup the subscription
        return () => unsubscribe();
    }, []);

    // List of routes where the Navbar should not be shown
    const hiddenRoutes = ['/signin', '/signup'];

    if (!isAuthenticated || hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Button to navigate to the "View Blogs" page */}
                <Button color="inherit" onClick={() => navigate('/viewblogs')}>
                    View Blogs
                </Button>

                {/* Button to navigate to the "Favorites" page */}
                <Button color="inherit" onClick={() => navigate('/favorites')}>
                    View Favorites
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
