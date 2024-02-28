import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import LoginButton from './Login-button';
import LogoutButton from './Logout-button';
import AdminButton from './Admin-button';
import { useNavigate } from 'react-router-dom';
import { headerHeader as theme } from '../../utils/theme';

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

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

    const handleSendToHome = () => {
        navigate("/");
    }

    const handleLogout = () => {
        console.log('removing userAuth')
        localStorage.removeItem("userAuth");
        setLoggedIn(false);
        
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, height: '10vh', width: '100%', position: 'absolute', top: 0 }}>
                <AppBar position="sticky" sx={{ py: 3.5 }}>
                    <Toolbar variant='dense' sx={{ p: 0, position: 'relative' }}>
                        <Typography onClick={handleSendToHome} variant='h5' sx={{ cursor: 'pointer', fontWeight: 800, bgcolor: 'secondary.main', color: 'secondary.contrastText', borderRadius: '4px', px: 0.6, py: 0.2 }}>IMDb</Typography>
                        <Box sx={{ position: 'absolute', right: '8px' }}>
                            {isAdmin && <AdminButton />}
                            {loggedIn ? <LogoutButton handleLogout={handleLogout} /> : <LoginButton /> }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}


export default Header;