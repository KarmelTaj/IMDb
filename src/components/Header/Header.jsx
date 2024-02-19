import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Link from '@mui/material/Link';
import LoginButton from './Login-button';

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
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:focus-within': {
        borderColor: '#f5c518',
    },
    borderWidth: '2px',
    borderStyle: 'solid',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#212121',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.4, 1, 0.4, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        console.log(userAuth);
        if (userAuth && userAuth.id) {
          console.log("It reached here");
          setLoggedIn(true);
          console.log('Logged In in the reached area? ', loggedIn);
        } else {
          setLoggedIn(false);
        }
      
        console.log('Logged In? ', loggedIn);
      }, [loggedIn]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, height: '10vh', width: '100%', position: 'absolute', top: 0 }}>
                <AppBar position="sticky" sx={{ py: 3.5 }}>
                    <Toolbar variant='dense' sx={{ p: 0, position: 'relative' }}>
                        <Link href="/" variant="h5" underline="none" sx={{ fontWeight: 800, bgcolor: 'secondary.main', color: 'secondary.contrastText', borderRadius: '4px', px: 0.6, py: 0.2 }}>
                            {"IMDb"}
                        </Link>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: '#868686' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <LoginButton loggedIn={loggedIn} />
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}


export default Header;