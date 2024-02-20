import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import LoginButton from './Login-button';
import AdminButton from './Admin-button';

const theme = createTheme({
    spacing: 8,
    palette: {
        primary: {
            main: '#121212',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f5c518',
            contrastText: '#000',
        },
        icon: {
            main: '#5799ef',
            contrastText: '#1f1f1f',
        }
    },
});

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        if (userAuth && userAuth.id) {
            setLoggedIn(true);
            setIsAdmin(userAuth.isadmin)
        } else {
            setLoggedIn(false);
            setIsAdmin(false)
        }
    }, [loggedIn]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, height: '10vh', width: '100%', position: 'absolute', top: 0 }}>
                <AppBar position="sticky" sx={{ py: 3.5 }}>
                    <Toolbar variant='dense' sx={{ p: 0, position: 'relative' }}>
                        <Link href="/" variant="h5" underline="none" sx={{ fontWeight: 800, bgcolor: 'secondary.main', color: 'secondary.contrastText', borderRadius: '4px', px: 0.6, py: 0.2 }}>
                            {"IMDb"}
                        </Link>
                        <Box sx={{ position: 'absolute', right: '8px' }}>
                            {isAdmin && <AdminButton />}
                            <LoginButton loggedIn={loggedIn} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}


export default Header;